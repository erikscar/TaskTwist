const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/tasktwist-db')
}

main().then(() => console.log('Conectado ao MongoDB'))
main().catch(err => console.log(err))