const { initDatabase, models } = require("../db/init-database");

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const userId = event.headers['user-id'];
    const postId = event.pathParameters.postId;

    try {
        await initDatabase();

        await models.Like.destroy({ where: { user_id: userId, post_id: postId } });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Success'
            })
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
