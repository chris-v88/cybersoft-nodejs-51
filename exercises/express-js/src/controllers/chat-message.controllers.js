import { responseSuccess, responseError } from '../common/helpers/response.helpers';
import { chatMessageService } from '../services/chat-message.service.js';

export const chatMessageController = {
  create: async function (req, res, next) {
    try {
      const result = await chatMessageService.create(req);
      const response = responseSuccess(result, 'Create chatMessage successfully');
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  findAll: async function (req, res, next) {
    try {
      const result = await chatMessageService.findAll(req);
      const response = responseSuccess(result, 'Get all chatMessages successfully');
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  findOne: async function (req, res, next) {
    try {
      const result = await chatMessageService.findOne(req);
      const response = responseSuccess(result, `Get chatMessage #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  update: async function (req, res, next) {
    try {
      const result = await chatMessageService.update(req);
      const response = responseSuccess(result, `Update chatMessage #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  remove: async function (req, res, next) {
    try {
      const result = await chatMessageService.remove(req);
      const response = responseSuccess(result, `Remove chatMessage #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};