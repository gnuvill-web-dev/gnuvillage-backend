import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^[a-z\d]{6,20}$/) //알파벳 소문자, 숫자로 이뤄진 6~20자 id
  readonly id: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,20}$/) //1이상의 알파벳, 숫자를 포함하는 6~20자 비밀번호(알파벳 대소문자, 숫자, 특수문자 사용가능)
  readonly password: string;
}
