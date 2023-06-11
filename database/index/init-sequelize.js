let sequelize;

async function loadSequelize(Sequelize){
    if (!sequelize) {
        sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
            host: 'localhost',
            port: "5432",
            dialect: 'postgres',
        });
    }
    await sequelize.authenticate();

    return sequelize;
}

module.exports = {
    loadSequelize,
};