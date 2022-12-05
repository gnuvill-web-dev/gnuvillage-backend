import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsDate,
  Matches,
  IsBoolean,
} from 'class-validator';
import { PageRequest } from 'src/common/utils/page-request';

export class SearchPostsDto extends PageRequest {
  @IsString()
  @Matches(/^[a-z\d]{6,20}$/) //알파벳 소문자, 숫자로 이뤄진 6~20자 id
  @IsOptional()
  readonly userId: string;

  @IsString()
  @MaxLength(60)
  @IsOptional()
  readonly title: string;

  @IsString()
  @MaxLength(65535)
  @IsOptional()
  readonly content: string;

  @IsDate()
  @IsOptional()
  readonly createdDate: Date;

  @IsDate()
  @IsOptional()
  readonly updatedDate: Date;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  readonly category: string;

  @Transform(({ value }) => value === '1' || value === 'true'|| value === true)
  @IsBoolean()
  @IsOptional()
  readonly admin: boolean;
}
