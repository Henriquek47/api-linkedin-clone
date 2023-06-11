module.exports.defineFollowers = (sequelize, DataTypes) => {
    const Followers = sequelize.define('Followers', {
        follower_id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      followed_id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
    }, {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
      tableName: 'followers'
     });
     
    return Followers;
  };
  