exports.router = (app) => {
    const auth = require('./auth.token');
    const logger = require('./auth.controller');

    app.post('/auth/login',logger.login);
    app.post('/auth/signin',auth.ensureAuthenticated,logger.signin);

}