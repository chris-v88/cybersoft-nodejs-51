export const articleService = {
  create: async (req) => {
    return `created`;
  },
  findAll: async (req) => {
    return `all articles`;
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
