var DataTypes = require("sequelize").DataTypes;
var _Articles = require("./Articles");
var _ChatGroupMembers = require("./ChatGroupMembers");
var _ChatGroups = require("./ChatGroups");
var _ChatMessages = require("./ChatMessages");
var _Chats = require("./Chats");
var _Permissions = require("./Permissions");
var _RolePermission = require("./RolePermission");
var _Roles = require("./Roles");
var _TABLE_TEMPLATE = require("./TABLE_TEMPLATE");
var _Users = require("./Users");

function initModels(sequelize) {
  var Articles = _Articles(sequelize, DataTypes);
  var ChatGroupMembers = _ChatGroupMembers(sequelize, DataTypes);
  var ChatGroups = _ChatGroups(sequelize, DataTypes);
  var ChatMessages = _ChatMessages(sequelize, DataTypes);
  var Chats = _Chats(sequelize, DataTypes);
  var Permissions = _Permissions(sequelize, DataTypes);
  var RolePermission = _RolePermission(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var TABLE_TEMPLATE = _TABLE_TEMPLATE(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  ChatGroupMembers.belongsTo(ChatGroups, { as: "chatGroup", foreignKey: "chatGroupId"});
  ChatGroups.hasMany(ChatGroupMembers, { as: "ChatGroupMembers", foreignKey: "chatGroupId"});
  ChatMessages.belongsTo(ChatGroups, { as: "chatGroup", foreignKey: "chatGroupId"});
  ChatGroups.hasMany(ChatMessages, { as: "ChatMessages", foreignKey: "chatGroupId"});
  RolePermission.belongsTo(Permissions, { as: "permission", foreignKey: "permissionId"});
  Permissions.hasMany(RolePermission, { as: "RolePermissions", foreignKey: "permissionId"});
  RolePermission.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(RolePermission, { as: "RolePermissions", foreignKey: "roleId"});
  Users.belongsTo(Roles, { as: "role", foreignKey: "roleId"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "roleId"});
  ChatGroupMembers.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(ChatGroupMembers, { as: "ChatGroupMembers", foreignKey: "userId"});
  ChatGroups.belongsTo(Users, { as: "owner", foreignKey: "ownerId"});
  Users.hasMany(ChatGroups, { as: "ChatGroups", foreignKey: "ownerId"});
  ChatMessages.belongsTo(Users, { as: "userIdSender_User", foreignKey: "userIdSender"});
  Users.hasMany(ChatMessages, { as: "ChatMessages", foreignKey: "userIdSender"});
  Chats.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Chats, { as: "Chats", foreignKey: "userId"});

  return {
    Articles,
    ChatGroupMembers,
    ChatGroups,
    ChatMessages,
    Chats,
    Permissions,
    RolePermission,
    Roles,
    TABLE_TEMPLATE,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
