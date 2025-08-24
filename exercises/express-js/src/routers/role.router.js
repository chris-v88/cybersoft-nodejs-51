import express from 'express';
import { protect } from '../common/middlewares/protect.middleware';
import { roleController } from '../controllers/role.controller';
;

const roleRouter = express.Router();

// Tạo route CRUD
roleRouter.post('/', roleController.create);
roleRouter.get('/', roleController.findAll);
roleRouter.post('/toggle-is-active/:roleId', protect, roleController.toggleIsActive);

roleRouter.get('/:id', roleController.findOne);
roleRouter.patch('/:id', roleController.update);
roleRouter.delete('/:id', roleController.remove);

export default roleRouter;