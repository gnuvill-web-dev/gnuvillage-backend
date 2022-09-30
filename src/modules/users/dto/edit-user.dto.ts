import { IsString, Matches } from 'class-validator';

export class EditUserDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,20}$/) //1이상의 알파벳, 숫자를 포함하는 6~20자 비밀번호(알파벳 대소문자, 숫자, 특수문자 사용가능)
  readonly password: string;
}
