// CODE FIRST
/**
import { DataTypes } from 'sequelize';
import sequelize from '../../common/sequelize/init.sequelize';

const Role = sequelize.define(
  'Roles', // tên trong model code
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING(255),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN, // 0 : false, 1 : true
      allowNull: false,
      defaultValue: 0,
    },
    deletedAt: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      ),
    },
  },
  {
    tableName: 'Roles', // tên table trong DB
    timestamps: false, // default: true, nếu true sẽ tự động thêm createdAt, updatedAt
  }
);

Role.sync({ alter: false }); // alter: true sẽ tự động cập nhật schema nếu có thay đổi, false sẽ không cập nhật

export default Role;
*/

// DATA FIRST: đi tạo DB trước, rồi mới kéo vào. ode
// DB => Code | dùng thư viện sequelize-auto để kéo voà code

// sequelize-auto -h -d <database> -u <user> -p <port> --dialect [dialect] -c [/path/to/config.json] -o [path/to/model] -t <table_name> -l <language> -a <additional_options>
// <host> : localhost | 127.0.0.1
// <database> : db_cyber_community
// <user> : root
// <password> : 1234
// <port> : 3307
// dialect : mysql | mariadb | postgres | mssql hệ cơ sở dữ liệu
// -c [/path/to/config.json] : đường dẫn đến file config.json, k có xài nên bỏ
// <table_name> : chỉ định cụ thể 1 table muốn kéo vào, nếu muốn kéo vào hết thì bỏ thông số này
// <language> : js | ts, nếu không có thì mặc định là js, chọn esm để mặc định syntax là import/export
// <additional_options> : các tùy chọn bổ sung, ví dụ như --useDefineForClassFields để sử dụng cú pháp define cho class fields trong TypeScript

// sequelize-auto -h localhost -d db_cyber_community -u root -x 1234 -p 3307 --dialect mysql -o src/models/sequelize-auto -l esm -a src/models/additional.json
