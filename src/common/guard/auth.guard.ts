import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { GuardType } from '../utils/enum';
import { GroupsService } from 'src/modules/groups/groups.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private groupsService: GroupsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    //메타데이터에서 키 guardTypes의 값을 가져옴
    const guardTypes = this.reflector.getAllAndMerge<GuardType[]>(
      'guardTypes',
      [context.getHandler(), context.getClass()],
    );

    //guardTypes 메타데이터가 없으면 통과.
    //또는 superuser라면 통과.
    //guardTypes이 있다면 검증을 거친다.
    if (guardTypes.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const jwtPayload = this.getJwtPayload(request);
    if (jwtPayload.userId === 'superuser') return true;

    let isValid = false;
    if (guardTypes.length > 0) {
      //guardTypes 중에 적어도 하나 통과해야 접근이 가능하다.
      for (let i = 0; i < guardTypes.length; i++) {
        //로그인 상태를 요구하는 권한에 접근하는 경우(이미 getJwtPayload 통해 토큰 검증 완료)
        if (guardTypes[i] === GuardType.MemberRes) isValid ||= true;
        //사용자 본인의 권한에 접근하는 경우
        else if (guardTypes[i] === GuardType.OwnRes)
          isValid ||= await this.validateOwnResRequest(jwtPayload, request);
        //특정 그룹의 권한에 접근하는 경우
        else if (guardTypes[i] === GuardType.GroupRes)
          isValid ||= await this.validateGroupResRequest(jwtPayload, request);
        //특정 그룹의 관리자 권한에 접근하는 경우
        else if (guardTypes[i] === GuardType.GroupAdminRes)
          isValid ||= await this.validateGroupAdminResRequest(
            jwtPayload,
            request,
          );
      }
    }
    return isValid;
  }

  private async validateOwnResRequest(jwtPayload: any, request: any) {
    let userId = request.params.userId;
    //파라미터에 없으면 헤더에서 userId를 찾는다.
    if (userId === undefined) userId = request.headers['user-id'];
    if (jwtPayload.userId !== userId) return false;
    return true;
  }

  private async validateGroupResRequest(jwtPayload: any, request: any) {
    const userId = jwtPayload.userId;
    let groupId = request.params.groupId;
    //파라미터에 없으면 헤더에서 groupId를 찾는다.
    if (groupId === undefined) groupId = request.headers['group-id'];

    const assignment =
      await this.groupsService.assignedGroupsRepository.findOneBy({
        userId,
        groupId,
      });
    if (assignment === undefined) return false;
    return true;
  }

  private async validateGroupAdminResRequest(jwtPayload: any, request: any) {
    const userId = jwtPayload.userId;
    let groupId = request.params.groupId;
    //파라미터에 없으면 헤더에서 groupId를 찾는다.
    if (groupId === undefined) groupId = request.headers['group-id'];
    const assignment =
      await this.groupsService.assignedGroupsRepository.findOneBy({
        userId,
        groupId,
      });
    if (assignment === undefined || assignment.admin === false) return false;
    return true;
  }

  private getJwtPayload(request: any) {
    try {
      const jwtString = request.headers.authorization.split('Bearer ')[1];
      const payload = jwt.verify(jwtString, process.env.AUTH_JWT_KEY);
      if (payload.userId === 'superuser')
        request.headers['user-id'] = undefined;
      else request.headers['user-id'] = payload.userId;
      return payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
