module.exports.defineLike = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    }, {
      timestamps: true,
      underscored: true,
      paranoid: false,
      freezeTableName: true,
      tableName: 'like'
     });

     Like.associate = (models) => {
      Like.belongsTo(models.User, { foreignKey: 'user_id', as: "user_like" });
      Like.belongsTo(models.Post, { foreignKey: 'post_id', as: "post_like" });
      models.Post.hasMany(Like, { foreignKey: 'post_id', as: "post_likes" })
      models.User.hasMany(Like, { foreignKey: 'user_id', as: "user_likes" })
    }
     
    return Like;
  };
  