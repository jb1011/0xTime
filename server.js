const express = require('express')


const path = require('path')
//pour pouvoir mettre des variable d'environnement dans le .env
require('dotenv').config()


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(express.static('client/build'))

app.get('/api/youtube', (req, res) => {
    res.send({
        msg: 'Salut World'
    })
})

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//on dit à l'app de se lancer sur le port https://5000
app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ! ${PORT}`)
})