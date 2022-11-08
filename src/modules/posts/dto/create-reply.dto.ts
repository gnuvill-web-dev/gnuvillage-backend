import { IsString, MaxLength } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @MaxLength(256)
  readonly content: string;
}
