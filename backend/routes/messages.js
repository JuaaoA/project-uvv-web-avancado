var express = require('express')
var router = express.Router();

const Message = require('../models/message')

router.get('/', async function (req, res, next) {
    try {
        const messageFindTodos = await Message.find({});

        res.status(200).json({
            myMsgSucesso: "Recuperou tudo paizao, pode ver ai",
            objSMessageSRecuperadoS: messageFindTodos
        });
    }
    catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-side: Um erro aconteceu ao buscar as mensagens",
            myError: err
        })
    }
});

router.post('/', async function (req, res, next) {
    const messageObj = new Message({
        content: req.body.conteudo,
        user: req.body.autor,
        gender: req.body.gender,
        age: req.body.idade,
        color: req.body.color
    })

    try {
        const messageSave = await messageObj.save()
        console.log(messageSave)

        res.status(201).json({
            success: "Mensagem salva com sucesso",
            messageSave: messageSave
        })
    } catch (err) {
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao salvar a mensagem" ,
            error: err
        })
    }
})

module.exports = router