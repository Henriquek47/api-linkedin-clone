module.exports.definePost = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      like_count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
      tableName: 'post'
     });
     Post.associate = (models) => {
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: "user" });
    }
  
    return Post;
  };
  