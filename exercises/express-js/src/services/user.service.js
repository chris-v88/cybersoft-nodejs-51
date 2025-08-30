import prisma from '../common/prisma/init.prisma';

export const userService = {
  create: async (req) => {
    return `This action create`;
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
        // delete filters['id']; // ❌ This always deletes 'id' regardless of the key
        delete filters[key]; // ✅ Delete the actual key, not always 'id'
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
    // eslint-disable-next-line no-undef
    console.log({ page, pageSize, index, filters });

    const usersPromise = prisma.users.findMany({
      skip: index, // SQL: OFFSET
      take: pageSize, // SQL: LIMIT
      where: filters,
    });

    // đếm số lượng row trong table
    const totalItemPromise = prisma.users.count(); // SQL: COUNT

    const [users, totalItem] = await Promise.all([usersPromise, totalItemPromise]);

    const totalPage = totalItem / pageSize;

    return {
      page,
      pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalPage),
      items: users || [],
    };
  },

  findOne: async (req) => {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        Roles: true,
      },
    });

    return user;
  },

  update: async (req) => {
    const user = await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    return user;
  },

  remove: async (req) => {
    const user = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return user;
  },
};
