const express = require('express')
const router = express.Router()

// Main Page route
router.get('/', async (req, res) => {
    res.render('index')
})

module.exports = router