const router = require('express').Router();

// const Messages = require('../models/messages/messages.model');

//Logger ================================================
require('../auth/auth.router').router(router);

//User rest ============================================
require('../models/users/users.router').router(router);

//notes rest =======================================================
require('../models/notes/notes.router').router(router);



module.exports = router;