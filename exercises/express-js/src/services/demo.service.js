import pool from '../common/mysql2/init.mysql2';

const demoService = {
  service: () => {
    return 'Hello world';
  },
  query: async (req) => {
    const query = req.query;

    const [rows, fields] = await pool.query('SELECT * FROM `Roles`');
    console.log('Query parameters:', { rows, fields });
    return {
      message: 'Data updated successfully',
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
