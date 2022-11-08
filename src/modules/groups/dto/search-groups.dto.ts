import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { PageRequest } from 'src/common/utils/page-request';

export class SearchGroupsDto extends PageRequest {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly name: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  readonly description: string;
}
