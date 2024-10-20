var express = require('express'); 
var router = express.Router();

const Message = require('../models/message')

router.get('/', (req, res, next) => {
    res.render('index');
});

var User = require('../models/user');
router.get('/node-mongodb-mongoose-user', (req, res, next) => {
    res.render('node');
});

router.post('/node-mongodb-mongoose-user', async (req, res, next) => {
    var emailVar = req.body.emailBody;
    var userObject = new User({
        firstName: "vinicius",
        lastName: 'rosalen',
        password: 'segredo',
        email: emailVar
    });

    await userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});

router.get('/node-mongodb-mongoose-user-busca', async (req, res, next) => {
    try {
        const userFind = await User.findOne({});

        res.render('node', {firstNameV: userFind.firstName,
            lastNameV: userFind.lastName,
            passwordV: userFind.password,
            emailV: userFind.email,
            messagesV: userFind.messages,
        });
    }
    catch (error) {
        return res.send("deu erro tropa");
    }
})

module.exports = router; 

 