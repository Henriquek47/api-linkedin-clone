const {initDatabase, models} = require("../db/init-database");

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const likeBody = JSON.parse(event.body);
  
    try {
      await initDatabase();
  
      await models.Like.create(likeBody);
  
      return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Success'
          })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'An error occurred'
      };
    }
  };
