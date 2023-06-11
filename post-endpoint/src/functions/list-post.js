const {initDatabase, models} = require("../db/init-database");

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const userId = event.headers['user-id'];
  
    try {
      await initDatabase();
  
      const posts = await models.Post.findAll(
        {
            include: [
                { model: models.User, as: "user", required: false },
                {
                  model: models.Like,
                  where: { user_id: userId },
                  as: 'post_likes',
                  required: false // Isso permitirá que você obtenha todos os posts, mesmo que não haja likes do usuário
                }
            ],
            order: [['createdAt', 'DESC']]
        }
      );
  
      return {
        statusCode: 200,
        body: JSON.stringify(posts)
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
