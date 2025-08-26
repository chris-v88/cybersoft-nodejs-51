export const userSwagger = {
  '/users': {
    get: {
      tags: ['User'],
      summary: 'Get all users',
      description: 'Retrieve a list of all users with pagination support.',
      security: [{ anhlong: [] }],
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page number',
          required: false,
          schema: { type: 'integer', default: 1 }
        },
        {
          name: 'pageSize',
          in: 'query',
          description: 'Number of items per page',
          required: false,
          schema: { type: 'integer', default: 10 }
        }
      ],
      responses: {
        200: {
          description: 'Get all users success',
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
                          properties: {
                            id: { type: 'integer' },
                            email: { type: 'string' },
                            fullName: { type: 'string' },
                            avatar: { type: 'string', nullable: true },
                            roleId: { type: 'integer' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/users/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get user by ID',
      description: 'Retrieve a specific user by their ID.',
      security: [{ anhlong: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User ID',
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: {
          description: 'Get user success',
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
                      email: { type: 'string' },
                      fullName: { type: 'string' },
                      avatar: { type: 'string', nullable: true },
                      roleId: { type: 'integer' }
                    }
                  }
                }
              }
            }
          }
        },
        404: { description: 'User not found' }
      }
    }
  },
  '/users': {
    post: {
      tags: ['User'],
      summary: 'Create a new user',
      description: 'Create a new user with email, password, and full name.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password', 'fullName'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 },
                fullName: { type: 'string' },
                avatar: { type: 'string', nullable: true },
                roleId: { type: 'integer' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  email: { type: 'string' },
                  fullName: { type: 'string' },
                  avatar: { type: 'string', nullable: true },
                  roleId: { type: 'integer' }
                }
              }
            }
          }
        },
        400: { description: 'User already exists or invalid input' }
      }
    }
  },
  '/users/{id}': {
    patch: {
      tags: ['User'],
      summary: 'Update user',
      description: 'Update user information by ID.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User ID',
          schema: { type: 'integer' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                fullName: { type: 'string' },
                avatar: { type: 'string', nullable: true },
                roleId: { type: 'integer' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'User updated successfully' },
        404: { description: 'User not found' }
      }
    },
    delete: {
      tags: ['User'],
      summary: 'Delete user',
      description: 'Delete a user by ID.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User ID',
          schema: { type: 'integer' }
        }
      ],
      responses: {
        200: { description: 'User deleted successfully' },
        404: { description: 'User not found' }
      }
    }
  }
};