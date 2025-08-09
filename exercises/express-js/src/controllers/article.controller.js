import {
  responseSuccess,
  responseError,
} from '../common/helpers/response.helpers';
import { articleService } from '../services/article.service';

export const articleController = {
  create: async (req, res) => {
    const result = await articleService.create(req);
    const response = responseSuccess(result, 'Article created successfully');
    res.status(response.statusCode).json(response);
  },

  findAll: async (req, res) => {
    const result = await articleService.findAll(req);
    const response = responseSuccess(result, 'Articles retrieved successfully');
    res.status(response.statusCode).json(response);
  },

  findOne: async (req, res) => {
    const result = await articleService.findOne(req);
    const response = responseSuccess(result, 'Article retrieved successfully');
    res.status(response.statusCode).json(response);
  },

  update: async (req, res) => {
    const result = await articleService.update(req);
    const response = responseSuccess(result, 'Article updated successfully');
    res.status(response.statusCode).json(response);
  },

  remove: async (req, res) => {
    const result = await articleService.remove(req);
    const response = responseSuccess(result, 'Article removed successfully');
    res.status(response.statusCode).json(response);
  },
};
