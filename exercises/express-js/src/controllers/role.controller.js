import { responseSuccess } from "../common/helpers/response.helpers";
import { roleService } from "../services/role.service";

export const roleController = {
  create: async (req, res, next) => {
    const result = await roleService.create(req);
    const response = responseSuccess(result, `Create role successfully`);
    res.status(response.statusCode).json(response);
  },

  findAll: async (req, res, next) => {
    const result = await roleService.findAll(req);
    const response = responseSuccess(result, `Get all roles successfully`);
    res.status(response.statusCode).json(response);
  },

  findOne: async (req, res, next) => {
    const result = await roleService.findOne(req);
    const response = responseSuccess(result, `Get role #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },

  toggleIsActive: async (req, res, next) => {
    const result = await roleService.toggleIsActive(req);
    const response = responseSuccess(result, `Toggle role #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },

  update: async (req, res, next) => {
    const result = await roleService.update(req);
    const response = responseSuccess(result, `Update role #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },

  remove: async (req, res, next) => {
    const result = await roleService.remove(req);
    const response = responseSuccess(result, `Remove role #${req.params.id} successfully`);
    res.status(response.statusCode).json(response);
  },
};