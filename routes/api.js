/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const {modelDB} = require("../model/connect");

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try{
        const data = await modelDB.find();
        res.json(data);
      }catch(err){
        console.log('Error nih cuy!');
      }
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) return res.send("Missing required field title");
      const data = new modelDB({
        title,
        commentcount: 0
      });
      data
        .save()
        .then((user)=>{
          return res.json({
            _id: user._id,
            title: user.title
          });
        }).catch((err)=>{
          console.error("Error cuk", err);
          return;
        });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
