const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChatMessages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ChatGroups',
        key: 'id'
      }
    },
    userIdSender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    messageText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'ChatMessages',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "chatGroupId",
        using: "BTREE",
        fields: [
          { name: "chatGroupId" },
        ]
      },
      {
        name: "userIdSender",
        using: "BTREE",
        fields: [
          { name: "userIdSender" },
        ]
      },
    ]
  });
};
