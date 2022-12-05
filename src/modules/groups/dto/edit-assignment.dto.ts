import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class EditAssignmentDto {
  @Transform(({ value }) => value === '1' || value === 'true'|| value === true)
  @IsBoolean()
  readonly admin: boolean;
}
