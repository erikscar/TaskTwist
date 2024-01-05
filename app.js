require('./config/database')

const express = require('express')
const app = express()
const indexRouter = require('./src/routes/index.js')
const checkListRouter = require('./src/routes/checklist.js')

app.use(express.static('public'))
app.set('view engine', "ejs")
app.set('views', './src/views')

app.use('/', indexRouter)
app.use('/showCheckLists', checkListRouter)



app.listen('3000', () => {
    console.log('Servidor Express em Execução')
})