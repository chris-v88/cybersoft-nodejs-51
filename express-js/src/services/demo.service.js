import pool from '../common/mysql2/init.mysql2';
import sequelize from '../common/sequelize/init.sequelize.js';
import models from '../models/app.model.js';
import prisma from '../common/prisma/init.prisma.js';

const demoService = {
  service: () => {
    return 'Hello world';
  },
  query: async (req) => {
    const query = req.query;

    // MYSQL 2
    const [dataMySQL, fields] = await pool.query('SELECT * FROM `Roles`');
    console.log('Query parameters:', { dataMySQL, fields });

    // SEQUELIZE
    // tương tự cái MYSQL trên trê
    // sequelize
    //   .query('SELECT * FROM `Roles`', { type: sequelize.QueryTypes.SELECT })
    //   .then((results) => {
    //     console.log('Sequelize query results:', results);
    //   })
    //   .catch((error) => {
    //     console.error('Sequelize query error:', error);
    //   });

    // Role
    const dataSequelize = await models.Roles.findAll();

    // Prisma
    const dataPrisma = await prisma.roles.findMany();

    // lỗi kiểm soát được
    // const passDB = '123';
    // const passUser = '111';
    // if (passDB !== passUser) {
    //   // throw new Error('Mật khẩu không khớp');
    //   throw new BadResquestException('Mật khẩu không khớp');
    // }

    return {
      message: 'Data updated successfully',
      mysql2: dataMySQL,
      sequelize: dataSequelize,
      prisma: dataPrisma,
      data: query,
    };
  },
  path: async (req) => {
    console.log('Path parameter:', param);
    return {
      message: 'Path parameter received',
      data: param,
    };
  },
  delete: async (headers) => {
    console.log('Headers:', headers);
    return {
      message: 'Headers received',
      data: headers,
    };
  },
  body: async (body) => {
    console.log('Body:', body);
    return {
      message: 'Body received',
      data: body,
    };
  },
};

export default demoService;
