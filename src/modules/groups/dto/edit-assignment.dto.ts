import { IsBoolean, IsString } from 'class-validator';

export class EditAssignmentDto {
  @IsBoolean()
  readonly admin: boolean;
}
