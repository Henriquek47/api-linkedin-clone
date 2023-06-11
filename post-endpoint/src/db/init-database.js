const db = require('../../../database/index/init-sequelize.js');
const { Sequelize } = require('sequelize');
const { definePost } = require('../../../database/models/post-model.js');
const { defineUser } = require('../../../database/models/user-model.js');
const { defineFollowers } = require('../../../database/models/followers-model.js');
const { defineLike } = require('../../../database/models/like-model.js');
const models = {};

async function initDatabase() {
    const sequelize = await db.loadSequelize(Sequelize);
    getModel(sequelize)
}

function getModel(sequelize) {
    models.Post = definePost(sequelize, Sequelize.DataTypes);
    models.User = defineUser(sequelize, Sequelize.DataTypes);
    models.Followers = defineFollowers(sequelize, Sequelize.DataTypes);
    models.Like = defineLike(sequelize, Sequelize.DataTypes);
    for (const model in models) {
        if (models[model].associate) {
            models[model].associate(models);
        }
    }
    return models;
}

module.exports = {initDatabase, models};