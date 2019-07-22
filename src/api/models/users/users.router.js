exports.router = (app) => {
    const user = require('./users.controller');
    const auth = require('../../auth/auth.token');
    
    app.post('/user',user.create);
    app.get('/user',auth.ensureAuthenticated,user.findAll);
    app.get('/user/:id',auth.ensureAuthenticated,user.findOne);
    app.delete('/user/:id',auth.ensureAuthenticated,user.delete);

}