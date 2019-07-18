exports.router = (app) => {
    const notes = require('./notes.controller');
    const auth = require('../../auth/auth.token');
    
    app.post('/note',auth.ensureAuthenticated,notes.create);
    app.get('/note',auth.ensureAuthenticated,notes.findAll);
    app.get('/note/:id',auth.ensureAuthenticated,notes.findOne);
    app.put('/note/:id',auth.ensureAuthenticated,notes.update);
    app.delete('note/:id',auth.ensureAuthenticated,notes.delete);

}