import { responseSuccess } from '../common/helpers/response.helpers';
import { BadResquestException } from '../common/helpers/exception.helper';
import { userService } from '../services/user.service';

export const userController = {
  avatarLocal: async function (req, res, next) {
    const result = await userService.avatarLocal(req);
    const response = responseSuccess(result, `Avatar Local successfully`);
    res.status(response.statusCode).json(response);
  },

  avatarCloud: async function (req, res, next) {
    const result = await userService.avatarCloud(req);
    const response = responseSuccess(result, `Avatar Cloud successfully`);
    res.status(response.statusCode).json(response);
  },

  create: async (req, res, next) => {
    const result = await userService.create(req);
    const response = responseSuccess(result, `Create user successfully`);
    res.status(response.statusCode).json(response);
  },

  findAll: async (req, res, next) => {
    const result = await userService.findAll(req);
    const response = responseSuccess(result, `Get all users successfully`);
    res.status(response.statusCode).json(response);
  },

  findOne: async (req, res, next) => {
    const result = await userService.findOne(req);
    const response = responseSuccess(result, `Get user #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },

  update: async (req, res, next) => {
    const result = await userService.update(req);
    const response = responseSuccess(result, `Update user #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },

  remove: async (req, res, next) => {
    const result = await userService.remove(req);
    const response = responseSuccess(result, `Remove user #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },
};
