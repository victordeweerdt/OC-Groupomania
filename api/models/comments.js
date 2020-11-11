'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false,
          name: 'user_id'
        },
        onDelete: 'CASCADE',
      });
      models.Comments.belongsTo(models.Posts, {
        foreignKey: {
          allowNull: false,
          name: 'post_id'
        },
        onDelete: 'CASCADE',
      });
    }
  };
  Comments.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};