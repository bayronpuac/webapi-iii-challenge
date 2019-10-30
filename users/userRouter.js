const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser,  (req, res) => {
    userDb
    .insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(() => {
        res.status(500).json({ message: "There was an error adding the user to the database." })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    userDb
    .insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(() => {
        res.status(500).json({ message: "There was an error adding the post to the database." })
    })

});

router.get('/', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user list could not be retrieved." })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    userDb
    .getById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ error: "the users posts could not be retieved"})
    })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
    userDb
        .getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({ message: "We couldn't retrieve posts for this user." })
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    userDb
        .remove(req.params.id)
        .then(deleteId => {
            if (deleteId > 0) {
                res.status(200).json({ message: "successfully deleted user" })
            } else {
                res.status(500).json({ message: "unable to delete user" })
            }
        })
});

router.put('/:id', validateUserId,validateUserId, (req, res) => {
    const changes = req.body

    userDb
        .update(req.params.id, changes)
        .then(edit => {
            if (edit) {
                res.status(200).json({ message: "sucessfully edited user" })
            } else {
                res.status(500).json({ message: "unable to edit user" })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "error on edit" })
        })
});


//custom middleware

function validateUserId(req, res, next) {
const {id} = req.params;
  if(Number(id)){
      next();
  } else {
      res.status(400).json({message: 'Invalid User id'})
  } 
};

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    if (req.body) {
        console.log(req.body)
         next();
    } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" })
    } else {
       res.status(400).json({ message: "missing post data" })
    }
};

module.exports = router;
