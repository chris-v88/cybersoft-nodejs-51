import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../constants/app.constant';

const sequelize = new Sequelize(DATABASE_URL, { logging: true });

try {
  await sequelize.authenticate();
  console.log('SEQUELIZE: \t Connection has been established successfully.');
} catch (error) {
  console.error('SEQUELIZE: Unable to connect to the database:', error);
}

export default sequelize;
