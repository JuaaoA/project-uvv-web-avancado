var express = require('express')
var router = express.Router();

const Message = require('../models/message')

router.post('/', async function (req, res, next) {
    const messageObj = new Message({
        content: req.body.content
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