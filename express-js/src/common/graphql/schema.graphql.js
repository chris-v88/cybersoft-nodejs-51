import { buildSchema } from 'graphql';

/**
 * Int : số nguyên
 * Float : số thực - số có dấu phẩy
 * String : 0chuỗi
 * Boolean : true/false
 * ID : định danh duy nhất, thường là số hoặc chuỗi
 * ! : field không đượcc phép null
 * [type] : danh sách array của type đó
 */

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(/* GraphQL */ `
  type TArticle {
    id: ID
    title: String
    content: String
    imageUrl: String
    views: Int
    userId: Int
    deletedBy: Int
    isDeleted: Boolean
    deletedAt: String
    createdAt: String
    updatedAt: String
  }

  type TPaginationArticle {
    page: Int
    pageSize: Int
    totalItem: Int
    totalPage: Int
    items: [TArticle]
  }

  type TLoginRes {
    accessToken: String
    refreshToken: String
  }

  type Query {
    hello: String
    getListArticle(page: Int, pageSize: Int): TPaginationArticle
  }

  type Mutation {
    login(email: String, password: String): TLoginRes
  }
`);
