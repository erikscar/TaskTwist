const express = require('express')
const router = express.Router()
const deleteRouter = express.Router()

const CheckListModel = require('../models/checklist')
const TaskModel = require('../models/task')

router.get('/:id/newTask', async (req, res) => {
  try {
    let task = TaskModel()
    res.status(200).render('newTask', { checkListId: req.params.id, task: task })
  } catch (error) {
    res.status(404).render('error')
  }
})

router.post('/:id/task', async (req, res) => {
  let { name, image } = req.body.task
  let task = new TaskModel({ name, image, checkList: req.params.id })
  try {
    await task.save()
    let checkList = await CheckListModel.findById(req.params.id)
    checkList.tasks.push(task)
    await checkList.save()
    res.redirect(`/checklists/${req.params.id}`)
  } catch (error) {
    res.status(404).render('newTask', { task: { ...task }, checkListId: req.params.id })
  }
})

router.post('/:checkListId/tasks/:taskId/toDo', async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.params.taskId, { done: 'to-do' }, { new: true });
    res.redirect(`/checklists/${req.params.checkListId}`);
  } catch (error) {
    res.status(404).render('error');
  }
});

router.post('/:checkListId/tasks/:taskId/inProgress', async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.params.taskId, { done: 'inProgress' }, { new: true });
    res.redirect(`/checklists/${req.params.checkListId}`);
  } catch (error) {
    res.status(404).render('error');
  }
});

router.post('/:checkListId/tasks/:taskId/completed', async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.params.taskId, { done: 'completed' }, { new: true });
    res.redirect(`/checklists/${req.params.checkListId}`);
  } catch (error) {
    res.status(404).render('error');
  }
});

deleteRouter.delete("/:id", async (req, res) => {
  try {
    let task = await TaskModel.findByIdAndDelete(req.params.id)
    let checkList = await CheckListModel.findById(task.checkList)
    let taskToRemove = checkList.tasks.indexOf(task._id)
    checkList.tasks.splice(taskToRemove, 1)
    checkList.save()
    res.redirect(`/checklists/${checkList._id}`)
  } catch (error) {
    console.log(error)
    res.status(404).render('error')
  }
})

module.exports = { router: router, delete: deleteRouter }