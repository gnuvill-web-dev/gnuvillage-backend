import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditProfileDto {
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
