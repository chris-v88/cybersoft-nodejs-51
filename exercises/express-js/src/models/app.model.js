import initModels from './sequelize-auto/init-models.js';
import sequelize from '../common/sequelize/init.sequelize.js';

const models = initModels(sequelize);

export default models;
