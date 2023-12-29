import { IsString, MaxLength, MinLength } from 'class-validator';

export class OgQueryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;
}
