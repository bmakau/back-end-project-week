const express = require('express');
const User = require('./userModel');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    User.find({}).then(users => {
      res.status(200).json(users);

    })
    .catch(err => {
      res.status(500).json(err);
    });
  })

  .post( (req, res) => {
    const user = new User(req.body);

    user
    .save().then(savedUser=>{
      res.status(201).json(savedUser);
    })
    .catch(err => res.status(500).json(err));
    
  });

  router
  .route('/:id')
  .get( (req, res) => {
    user.findById(req.params.id)
    .then(user => {
res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })

  .delete( (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
    .then(response => {
      if(response === null) {
        res.status(404).json({message:'not found'});
      }else{
      res.status(200).json(response);
      }
    })
    .catch(err => {
      if(err.email === 'CastError'){
        res
        .status(400)
        .json({message:'The id is invalid' });
      }else{
        res.status(500)
        .json({errorMessage:'The user could not be removed', err});
      }
  });
  })

  .put( (req, res) => {
    user.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
      if(response === null){
        res.status(404).json({ message:'not found'});
      }
      else{
        res.status(200).json(response);
      }
      
    })
    .catch(err =>{
      if(err.email === 'CastError'){
        res.status(400).json({
          message:'The id provided is invalid, please check and try again'
        })
      }
      else{
        res.status(500).json({
          errorMessage:'the message has been removed',err
        })
      }
    })
  });



  module.exports = router;