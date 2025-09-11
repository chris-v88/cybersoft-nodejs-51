import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/modules-system/prisma/prisma.service';
import { QueryArticleDto } from './dto/query-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService để truy cập database

  async findAll(query: QueryArticleDto) {
    const {
      page: pageParam,
      pageSize: pageSizeParam,
      filters: filtersStringJson,
    } = query;
    const page = Number(pageParam) > 0 ? Number(pageParam) : 1;
    const pageSize = Number(pageSizeParam) > 0 ? Number(pageSizeParam) : 1;

    // Parse filters safely
    let parsedFilters: Record<string, any> = {};
    try {
      parsedFilters = filtersStringJson
        ? (JSON.parse(filtersStringJson) as Record<string, any>)
        : {};
    } catch {
      parsedFilters = {};
    }

    Object.entries(parsedFilters).forEach(([key, value]) => {
      if (!value) {
        delete parsedFilters[key];
        return;
      }

      if (typeof value === 'string') {
        parsedFilters[key] = {
          contains: value, // SQL: CONTAINS
          // mode: 'insensitive',
        };
      }

      // TODO: xử lý ngày tháng
    });
    // index (OFFSET) = ( page - 1 ) * pageSize
    const index = (page - 1) * pageSize;

    // debug
    console.log({ page, pageSize, index, filters: parsedFilters });

    const articlesPromise = this.prisma.articles.findMany({
      skip: index, // SQL: OFFSET
      take: pageSize, // SQL: LIMIT
      where: parsedFilters,
    });

    // đếm số lượng row trong table
    const totalItemPromise = this.prisma.articles.count(); // SQL: COUNT

    const [articles, totalItem] = await Promise.all([
      articlesPromise,
      totalItemPromise,
    ]);

    const totalPage = totalItem / pageSize;

    return {
      page,
      pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalPage),
      items: articles || [],
    };
  }
}
