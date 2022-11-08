import { IsString, MaxLength, MinLength } from 'class-validator';

export class EditGroupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MaxLength(1000)
  readonly description: string;
}
