import prisma from '../common/prisma/init.prisma';

export const roleService = {
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
    // eslint-disable-next-line no-undef
    console.log({ page, pageSize, index, filters });

    const rolesPromise = prisma.roles.findMany({
      skip: index, // SQL: OFFSET
      take: pageSize, // SQL: LIMIT
      where: filters,
    });

    // đếm số lượng row trong table
    const totalItemPromise = prisma.roles.count(); // SQL: COUNT

    const [roles, totalItem] = await Promise.all([rolesPromise, totalItemPromise]);

    const totalPage = totalItem / pageSize;

    return {
      page,
      pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalPage),
      items: roles || [],
    };
  },

  findOne: async (req) => {
    const role = await prisma.roles.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    // eslint-disable-next-line no-undef
    console.log(`🔎 Roles - findOne role:`, role);
    return role;
  },

  toggleIsActive: async (req) => {
    const user = req.user;
    // eslint-disable-next-line no-undef
    console.log(`🔎 Roles - /toggle-is-active user:`, user);

    if (!user) {
      throw new Error(`You don't have permission to toggle role`);
    }

    // const role = await prisma.roles.findUnique({
    //   where: {
    //     id: +req.params.id
    //   }
    // });

    // if (!role) {
    //   throw new Error(`Role not found`);
    // }

    // const updatedRole = await prisma.roles.update({
    //   where: {
    //     id: +req.params.id
    //   },
    //   data: {
    //     isActive: !role.isActive
    //   }
    // });

    // return updatedRole;

    return 'Toggle role successfully';
  },

  update: async (req) => {
    return `This action updates a id: ${req.params.id} role`;
  },

  remove: async (req) => {
    return `This action removes a id: ${req.params.id} role`;
  },
};
