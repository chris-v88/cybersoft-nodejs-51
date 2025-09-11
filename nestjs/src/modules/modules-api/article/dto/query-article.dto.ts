/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { Transform } from 'class-transformer';
import { IsInt, IsJSON, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class QueryArticleDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  pageSize: number;

  @IsJSON()
  @IsOptional()
  filters: string;
}
