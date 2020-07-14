// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Story = require('../models/story-model');
// const Task = require('../models/task-model'); // <== !!!

// GET route => to get all the stories for discovery page
router.get('/stories', (req, res, next) => {
  console.log(req.user);
  Story.find()
    .then(allTheStories => {
      res.json(allTheStories);
    })
});

// GET route => to get all the stories for profile page
router.get('/profileStories', (req, res, next) => {
  let newList = []
  Story.find().then(allTheStories => {
    console.log("outPut: allTheStories", allTheStories)
    allTheStories.forEach((e) => {
      if (req.user.id.localeCompare(e.owner) === 0) {
        newList.push(e)
      }
    })
    res.json(newList);
  });

})

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
    likes: [],
    duration: req.body.duration,
    owner: req.user._id
  })
    .then(newProject => {
      res.json(newProject);
    }).catch((err) => {
      console.log("outPut: err", err)
      res.send(500).json(err)
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
      // $set: {
        title: req.body.title,
        image: req.body.image,
        icon: req.body.icon,
        imageName: req.body.imageName,
        category: req.body.category,
        headline: req.body.headline,
        content: req.body.content,
        duration: req.body.duration,
      // }
    }, { new: true })
    .then((resp) => {
      res.json(resp);
    }).catch(err => {
      res.json(err);
    })
})

router.put('/stories/:id/liked', (req, res, next) => {
  console.log(req.body)
  Story.findById(req.params.id).then((story) => {
    console.log(story)
    let promise;
    if (story.likes.includes(req.user._id)) {
      promise = Story.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.user._id }
      }, { new: true })
    } else {
      promise = Story.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.user._id }
      }, { new: true })
    }
    promise
      .then((resp) => {
        res.json(resp);
      })
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