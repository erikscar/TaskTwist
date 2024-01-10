const express = require('express')
const router = express.Router()

const CheckListModel = require('../models/checklist')
const taskModel = require('../models/task')

//Show all CheckLists
router.get('/', async (req, res) => {
    try {
        let checkLists = await CheckListModel.find({})
        res.status(200).render('checklists', { checkLists: checkLists })
    } catch (err) {
        res.status(404).render('error')
    }
})

//Show Create Page
router.get('/create', async (req, res) => {
    try {
        let checkList = new CheckListModel()
        res.status(200).render('create', { checkList: checkList })
    } catch (error) {
        res.status(404).render('error')
    }
})

//Show Edit page
router.get('/:id/edit', async (req, res) => {
    try {
        let checkList = await CheckListModel.findById(req.params.id)
        res.status(200).render('edit', { checkList: checkList })
    } catch (error) {
        res.status(404).render('error')
    }
})


//Save Informations
router.post('/', async (req, res) => {
    let { name, image } = req.body.checkList
    let checkList = new CheckListModel({ name, image })
    try {
        await checkList.save()
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('create', { checkList: { ...checkList } })
    }
})

//Show CheckList Tasks
router.get('/:id', async (req, res) => {
    try {
        let checkList = await CheckListModel.findById(req.params.id).populate('tasks')
        res.status(200).render('task', { checkList: checkList })
    } catch (error) {
        console.error(error)
        res.status(404).render('error')
    }
})

//Edit Checklist
router.put('/:id', async (req, res) => {
    let { name } = req.body.checkList
    let checkList = await CheckListModel.findById(req.params.id)

    try {
        checkList.name = name
        await checkList.save({ name })
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('/checklists/edit', { checkList: { ...checkList } })
    }
})

//Delete CheckList
router.delete('/:id', async (req, res) => {
    try {
        await CheckListModel.findByIdAndDelete(req.params.id)
        res.redirect('/checklists')
    } catch (error) {
        res.status(500).render('error')
    }
})

module.exports = router