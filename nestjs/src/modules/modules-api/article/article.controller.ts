import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import { ArticleService } from './article.service';
import { QueryArticleDto } from './dto/query-article.dto';

@Controller('article')
export class ArticleController {
  // private readonly articleService: ArticleService;

  constructor(private readonly articleService: ArticleService) {}

  // @Post()
  // @Put()
  // @Patch()
  // @Delete()

  // http://localhost:3000/article/get-list-article
  @Get(':id')
  findAll(
    @Query()
    query: QueryArticleDto,
    @Param()
    param,
    @Headers()
    headers,
    @Body()
    body,
    @Req()
    req: Request,
    // @Res()
    // res: Response,
  ) {
    console.log('query', query);
    console.log('param', param);
    console.log('headers', headers);
    console.log('body', body);
    console.log('req', req);
    // console.log('res', res);

    return this.articleService.findAll(query);
  }
}
