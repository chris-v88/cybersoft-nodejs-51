import { Injectable } from "@nestjs/common";

@Injectable()
export class ArticleService {
    findAll() {
        return 'Find all Article';
    }
}