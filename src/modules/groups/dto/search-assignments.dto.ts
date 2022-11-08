import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { PageRequest } from 'src/common/utils/page-request';

export class SearchAssignmentsDto extends PageRequest {
  @IsString()
  @Matches(/^[a-z\d]{6,20}$/) //알파벳 소문자, 숫자로 이뤄진 6~20자 id
  @IsOptional()
  readonly userId: string;

  @IsString()
  @IsOptional()
  readonly groupId: string;

  @IsBoolean()
  @IsOptional()
  readonly admin: boolean;
}
