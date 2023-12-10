import { IsInt, Min, Max } from 'class-validator';

export class OgQueryDto {
  @IsInt()
  @Min(0)
  @Max(10)
  amount: number;
}
