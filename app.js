require('./config/database')

const express = require('express')
const app = express()

const methodOverride = require('method-override')
const indexRouter = require('./src/routes/index.js')
const checkListRouter = require('./src/routes/checklist.js')
const taskRouter = require('./src/routes/task.js')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method', { methods: ['POST', 'GET', 'PUT'] }))

app.set('view engine', "ejs")
app.set('views', './src/views')

app.use('/', indexRouter)
app.use('/checklists', checkListRouter)
app.use('/checklists', taskRouter.router)
app.use('/tasks', taskRouter.delete)


app.listen('3000', () => {
    console.log('Servidor Express em Execução')
})