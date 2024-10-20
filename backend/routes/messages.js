var express = require('express')
var router = express.Router();

const Message = require('../models/message')

router.patch('/edit', async function (req, res, next) {
    try {
        // Pegar o conteudo que foi editado
        const messageEdit = {
            content: req.body.conteudo,
            _id: req.body._id
        }

        // Editar no banco
        await Message.updateOne({_id: messageEdit._id}, {$set: { content: messageEdit.content }})
        
        const edited = await Message.findById(messageEdit._id)

        // Indicar que tudo deu certo
        return res.status(200).json({
            myMsgSucesso: "Deu certo no editar paizao, pode ver denovo ai",
            mensagemEditada: edited
        })
    }
    catch (err) {
        return res.status(500).json({
            myErrorTitle: "Server-side: Ocorreu um erro ao editar a mensagem",
            myError: err
        })
    }
})

router.post('/delete', async function (req, res, next) {
    try {
        const messageId = req.body._id;
        
        console.log(messageId)
        console.log("chegou aqui")

        await Message.deleteOne({ _id: messageId });

        return res.status(200).json({
            myMsgSucesso: "Deu certo no apagar paizao, pode nao ver ai"
        })

    }
    catch (err) {
        return res.status(500).json({
            myErrorTitle: "Server-side: Ocorreu um erro ao deletar a mensagem",
            myError: err
        })
    }
})

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
        color: req.body.color,
        icone: req.body.icone
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