export const authSwagger = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description: 'Creates a new user account with email, password, and full name.',
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
                fullName: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  email: { type: 'string' },
                  fullName: { type: 'string' }
                }
              }
            }
          }
        },
        400: { description: 'User already exists or invalid input' }
      }
    }
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      description: 'Authenticate user and return JWT tokens.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login successful, returns tokens',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string' },
                  refreshToken: { type: 'string' }
                }
              }
            }
          }
        },
        400: { description: 'Invalid credentials or login error' }
      }
    }
  },
  '/auth/get-info': {
    get: {
      tags: ['Auth'],
      summary: 'Get user info',
      description: 'Returns user info for the authenticated user.',
      security: [{ anhlong: [] }],
      responses: {
        200: {
          description: 'User info returned',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  email: { type: 'string' },
                  fullName: { type: 'string' }
                }
              }
            }
          }
        },
        401: { description: 'Unauthorized' }
      }
    }
  },
  '/auth/refresh-token': {
    post: {
      tags: ['Auth'],
      summary: 'Refresh JWT tokens',
      description: 'Refresh access and refresh tokens using valid tokens.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['accessToken', 'refreshToken'],
              properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Tokens refreshed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string' },
                  refreshToken: { type: 'string' }
                }
              }
            }
          }
        },
        401: { description: 'Token invalid or user invalid' }
      }
    }
  }
};