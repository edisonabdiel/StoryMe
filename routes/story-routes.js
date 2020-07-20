// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Story = require('../models/story-model');

// const Task = require('../models/task-model'); // <== !!!

// GET route => to get all the stories for discovery page
router.get('/stories', (req, res, next) => {
  console.log(req.user);
  Story.find().populate("owner")
    .then(allTheStories => {
      console.log("outPut: allTheStories", allTheStories.owner)
      res.json(allTheStories);
    })
});

router.get('/stories/filter', (req, res, next) => {
  Story.find().populate("owner")
    .then(allTheStories => {
      const filterStory = allTheStories.filter((story) => {
        return (req.user._id).toString().localeCompare(story.owner._id) === 1 &&
          !story.likes.includes(req.user._id)
      }
      )
      // console.log("fileStory =====>",filterStory)
      res.json(filterStory);
    })
});

// GET route => to get all the stories for profile page
router.get('/profileStories/:id', (req, res, next) => {
  let newList = []
  Story.find().populate("owner").then(allTheStories => {
    console.log("outPut: allTheStories", allTheStories)
    newList = allTheStories.filter((story) => req.params.id.localeCompare(story.owner._id) === 0)
    res.json(newList);
  });

})


// POST route => to create a new project
router.post('/stories', (req, res, next) => {
  console.log('POST', req.body);
  console.log('USER', req.user);
  let cardBgColor = ["gray", "red", "black"]
  let randomBgIdx = Math.floor(Math.random() * cardBgColor.length)
  Story.create({
    title: req.body.title,
    image: req.body.image,
    icon: req.body.icon,
    imageName: req.body.imageName,
    category: req.body.category,
    headline: req.body.headline,
    content: req.body.content,
    likes: [],
    cardBgColor: cardBgColor[randomBgIdx],
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
  Story.findById(req.params.id).populate('owner')
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

router.get('/stories/:id/liked', (req, res, next) => {
  Story.find().populate("owner")
    .then(allTheStories => {
      console.log('HELLOOOOOOOOOO');
      const filterLikedStory = allTheStories.filter((item) => {
        return (item.likes.includes(req.params.id))
      })
      // console.log("fileStory =====>",filterStory)
      res.json(filterLikedStory);
    }).catch((err) => {
      console.log('Error', err);
      res.json(err)
    })
})

router.put('/stories/:id/liked', (req, res, next) => {
  console.log(req.body)
  Story.findById(req.params.id).populate("owner").then((story) => {
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
    promise.populate("owner")
      .then((resp) => {
        console.log("outPut: resp", resp)
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