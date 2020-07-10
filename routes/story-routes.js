// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Story = require('../models/story-model');
// const Task = require('../models/task-model'); // <== !!!

// GET route => to get all the stories
router.get('/stories', (req, res, next) => {
  console.log(req.user);
  Story.find()
    .then(allTheStories => {
      res.json(allTheStories);
    })
});

// POST route => to create a new project
router.post('/stories', (req, res, next) => {
  console.log('POST', req.body);
  console.log('USER', req.user);
  Story.create({
    title: req.body.title,
    image: req.body.image,
    icon: req.body.icon,
    imageName: req.body.imageName,
    category: req.body.category,
    headline: req.body.headline,
    content: req.body.content,
    likes: req.body.likes,
    duration: req.body.duration,
    icon: req.body.icon,
    owner: req.user._id
  })
    .then(newProject => {

      res.json(newProject);
    })

});

// GET route => to get a specific project/detailed view
router.get('/stories/:id', (req, res, next) => {
  console.log(req.params.id);
  Story.findById(req.params.id)
    .then(response => {
      res.json(response);
    })
})

// PUT route => to update a specific project
router.put('/stories/:id', (req, res, next) => {
  console.log(req.body)
  Story.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      image: req.body.image,
      icon: req.body.icon,
      imageName: req.body.imageName,
      category: req.body.category,
      headline: req.body.headline,
      content: req.body.content,
      duration: req.body.duration,
      icon: req.body.icon

    })
    .then(() => {
      res.json({ message: `Story with ${req.params.id} is updated successfully.` });
    })
})

// DELETE route => to delete a specific project
router.delete('/stories/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  //how to add actual security
  // Project.findById(req.params.id).then((project)=>{
  //   if(project && project.owner === req.user._id){
  //     //now this actually secure
  //   }
  // })

  Story.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Story with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;