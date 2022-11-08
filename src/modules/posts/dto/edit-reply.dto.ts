import { IsString, MaxLength, IsOptional } from 'class-validator';

export class EditReplyDto {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  readonly content: string;
}
