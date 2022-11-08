import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(60)
  readonly title: string;

  @IsString()
  @MaxLength(65535)
  readonly content: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly category: string;
}
