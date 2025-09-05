import { Controller, Get, Put } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller('article')
export class ArticleController {
    // private readonly articleService: ArticleService;

    constructor(private readonly articleService: ArticleService) {}

    // @Post()
    // @Put()
    // @Patch()
    // @Delete()

    // http://localhost:3000/article/get-list-article
    @Get('get-list-article')
    findAll() {
        return this.articleService.findAll();
    }
}