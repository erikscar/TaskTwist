const express = require('express')
const router = express.Router()

const CheckListModel = require('../models/checklist')

router.get('/', async(req, res) => {
    try {
        let CheckLists = await CheckListModel.find({})
        res.status(200).render('showCheckLists', {checklists: CheckLists})
    } catch (err) {
        res.status(404).render('error', {error: 'Error'})
    }
})