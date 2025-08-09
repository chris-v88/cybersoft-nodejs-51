import prisma from '../common/prisma/init.prisma';

export const articleService = {
  create: async (req) => {
    return `created`;
  },
  findAll: async (req) => {
    let { page, pageSize, filters } = req.query;
    page = Number(page) > 0 ? Number(page) : 1;
    pageSize = Number(pageSize) > 0 ? Number(pageSize) : 1;

    // Parse filters safely
    try {
      filters = filters ? JSON.parse(filters) : {};
    } catch (error) {
      filters = {};
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) {
        delete filters['id'];
        return;
      }

      if (typeof value === 'string') {
        filters[key] = {
          contains: value, // SQL: CONTAINS
          // mode: 'insensitive',
        };
      }

      // TODO: xử lý ngày tháng
    });
    // index (OFFSET) = ( page - 1 ) * pageSize
    const index = (page - 1) * pageSize;

    // debug
    console.log({ page, pageSize, index, filters });

    const articlesPromise = prisma.articles.findMany({
      skip: index, // SQL: OFFSET
      take: pageSize, // SQL: LIMIT
      where: filters,
    });

    // đếm số lượng row trong table
    const totalItemPromise = prisma.articles.count(); // SQL: COUNT

    const [articles, totalItem] = await Promise.all([
      articlesPromise,
      totalItemPromise,
    ]);

    const totalPage = totalItem / pageSize;

    return {
      totalItem: totalItem,
      totalPage: Math.ceil(totalPage),
      items: articles,
    };
  },
  findOne: async (req) => {
    return `one article - ${req.params.id}`;
  },
  update: async (req) => {
    return `updated article - ${req.params.id}`;
  },
  remove: async (req) => {
    return `removed article - ${req.params.id}`;
  },
};
