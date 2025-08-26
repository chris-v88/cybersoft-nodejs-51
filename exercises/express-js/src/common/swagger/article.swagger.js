export const articleSwagger = {
  '/articles': {
    get: {
      tags: ['Article'],
      summary: 'Get all articles',
      security: [{ anhlong: [] }],
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page number',
          required: false,
          schema: {
            type: 'integer',
            default: 1,
          },
        },
        {
          name: 'pageSize',
          in: 'query',
          description: 'Number of items per page',
          required: false,
          schema: {
            type: 'integer',
            default: 10,
          },
        },
      ],
      responses: {
        200: {
          description: 'Get all article success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  statusCode: { type: 'integer' },
                  message: { type: 'string' },
                  data: {
                    type: 'object',
                    properties: {
                      page: { type: 'integer' },
                      pageSize: { type: 'integer' },
                      totalItem: { type: 'integer' },
                      totalPage: { type: 'integer' },
                      items: {
                        type: 'array',
                        items: {
                          type: 'object',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/articles/{id}': {
    get: {
      tags: ['Article'],
      summary: 'Get article by ID',
      description: 'Retrieve a specific article by its ID',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Article ID',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'Get article success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string' },
                  statusCode: { type: 'integer' },
                  message: { type: 'string' },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      content: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
            example: {
              status: "success",
              statusCode: 200,
              message: "Get article success",
              data: {
                id: 1,
                title: "How to use Swagger",
                content: "Swagger makes API docs easy!"
              }
            }
        },
        404: {
          description: 'Article not found',
        },
      },
    },
  },
};
