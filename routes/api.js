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
      if (!title) return res.send("missing required field title");
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
          console.error("Error saving user:", err);
          return;
        });
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      await modelDB.deleteMany({});
      return res.send("complete delete successful");
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try{
        const data = await modelDB.findById(bookid);
        if (!data) return res.send("no books exists");
        return res.json(data);
      }catch(error){
        return "its error";
      }
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.send("missing required field comment");
      const checkdata = await modelDB.findById(bookid);
      if(!checkdata) return res.send("no book exists");
      try{
        await modelDB.updateOne({
          _id: bookid,
        },
        {
          $push: {comment: comment},
          $inc: {commentcount: 1},
        },
      );
      const data = await modelDB.findById(bookid);
      return res.json(data);
      }catch(error){
        console.log(error);
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      try{
        const data = await modelDB.findById(bookid);
        if (!data) return res.send("no book exists");
        await modelDB.deleteOne({_id: bookid});
        return res.send("delete successful");
      }catch(error){
        
      }
    });
  
};
