import { responseSuccess } from '../common/helpers/response.helpers.js';
import { authService } from '../services/auth.service.js';

export const authController = {
  create: async (req, res) => {
    const result = await authService.create(req);
    const response = responseSuccess(result, 'auth');
    res.status(response.statusCode).json(response);
  },

  findAll: async (req, res) => {
    const result = await authService.findAll(req);
    const response = responseSuccess(result, 'auth');
    res.status(response.statusCode).json(response);
  },

  findOne: async (req, res) => {
    const result = await authService.findOne(req);
    const response = responseSuccess(result, 'auth');
    res.status(response.statusCode).json(response);
  },

  update: async (req, res) => {
    const result = await authService.update(req);
    const response = responseSuccess(result, 'auth');
    res.status(response.statusCode).json(response);
  },

  remove: async (req, res) => {
    const result = await authService.remove(req);
    const response = responseSuccess(result, 'auth');
    res.status(response.statusCode).json(response);
  },

  register: async (req, res) => {
    const result = await authService.register(req);
    const response = responseSuccess(result, 'Register auth successfully');
    res.status(response.statusCode).json(response);
  },

  login: async (req, res) => {
    const result = await authService.login(req);
    const response = responseSuccess(result, 'Login auth successfully');
    res.status(response.statusCode).json(response);
  },

  getInfo: async (req, res) => {
    const result = await authService.getInfo(req);
    const response = responseSuccess(result, 'Get user info successfully');
    res.status(response.statusCode).json(response);
  },
};
