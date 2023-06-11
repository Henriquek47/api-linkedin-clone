const {initDatabase, models} = require("../db/init-database");

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const userId = event.headers['user-id'];
  
    try {
      await initDatabase();
  
      const user = await models.User.findByPk(userId, {
        include: [
            { model: models.User, as: 'followers' },
            { model: models.User, as: 'following' },
          ],
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify(user)
      };
    } catch (error) {
      // Tratando qualquer erro que possa ocorrer
      console.error(error);
  
      return {
        statusCode: 500,
        body: 'An error occurred'
      };
    }
  };
