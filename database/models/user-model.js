module.exports.defineUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      profile_picture: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.UUID,
        allowNull: true
      }
    }, {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
      tableName: 'user'
     });

     User.associate = function(models) {

      User.belongsToMany(models.User, {
        foreignKey: 'follower_id',
        as: 'followers',
        through: models.Followers
      });
      User.belongsToMany(models.User, {
        foreignKey: 'followed_id',
        as: 'following',
        through: models.Followers
      });
    };
    
  
    return User;
  };
  