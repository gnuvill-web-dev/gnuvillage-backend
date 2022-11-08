import { IsBoolean, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  readonly userId: string;
  @IsBoolean()
  readonly admin: boolean;
}
