import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PageRequest } from 'src/common/utils/page-request';

export class SearchProfilesDto extends PageRequest {
  @IsString()
  @Matches(/^[a-z\d]{6,20}$/) //알파벳 소문자, 숫자로 이뤄진 6~20자 id
  @IsOptional()
  readonly uesrId: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly name: string;

  @IsEmail()
  @MaxLength(40)
  @IsOptional()
  readonly email: string;

  @IsMobilePhone('ko-KR')
  @IsOptional()
  readonly phone: string;

  @IsString()
  @MaxLength(40)
  @IsOptional()
  readonly department: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  readonly message: string;
}
