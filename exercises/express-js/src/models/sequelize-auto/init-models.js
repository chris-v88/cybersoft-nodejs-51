import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Articles from  "./Articles.js";
import _ChatGroupMembers from  "./ChatGroupMembers.js";
import _ChatGroups from  "./ChatGroups.js";
import _ChatMessages from  "./ChatMessages.js";
import _Chats from  "./Chats.js";
import _Permissions from  "./Permissions.js";
import _RolePermission from  "./RolePermission.js";
import _Roles from  "./Roles.js";
import _TABLE_TEMPLATE from  "./TABLE_TEMPLATE.js";
import _Users from  "./Users.js";

export default function initModels(sequelize) {
  const Articles = _Articles.init(sequelize, DataTypes);
  const ChatGroupMembers = _ChatGroupMembers.init(sequelize, DataTypes);
  const ChatGroups = _ChatGroups.init(sequelize, DataTypes);
  const ChatMessages = _ChatMessages.init(sequelize, DataTypes);
  const Chats = _Chats.init(sequelize, DataTypes);
  const Permissions = _Permissions.init(sequelize, DataTypes);
  const RolePermission = _RolePermission.init(sequelize, DataTypes);
  const Roles = _Roles.init(sequelize, DataTypes);
  const TABLE_TEMPLATE = _TABLE_TEMPLATE.init(sequelize, DataTypes);
  const Users = _Users.init(sequelize, DataTypes);

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
