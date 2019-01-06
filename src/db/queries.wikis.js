const Wiki = require('./models').Wiki;
const User = require("./models").User;
const Collaborator = require("./models").Collaborator;
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;

module.exports = {

	getAllWikis(callback) {
		return Wiki.all()

		.then((wikis) => {
			callback(null, wikis);
		})
		.catch((err) => {
      console.log(err);
			callback(err);
		})
	},

   getWiki(id, callback){
     return Wiki.findById(id) 
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       console.log(err);
       callback(err);
     })
   },

   addWiki(newWiki, callback){
      return Wiki.create({
        title: newWiki.title,
        body: newWiki.body,
        userId: newWiki.userId,
        private: newWiki.private
      })
      .then((wiki) => {
        callback(null, wiki);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
    },

   deleteWiki(req, callback){

// #1
     return Wiki.findById(req.params.id)
     .then((wiki) => {
         wiki.destroy()
         .then((res) => {
           callback(null, wiki);
        })
      })
      .catch((err) => {
        callback(err);
      });
  }, 

   updateWiki(req, updatedWiki, callback){

// #1
     return Wiki.findById(req.params.id)
     .then((wiki) => {

// #2
       if(!wiki){
         return callback("Wiki not found");
       }

         wiki.update(updatedWiki, {
           fields: Object.keys(updatedWiki)
         })
         .then(() => {
            console.log(req);
            console.log(req.body);
            console.log(req.params);
           callback(null, wiki);
         })
         .catch((err) => {
           callback(err);
         });
     });
   },

   addCollaborator(req, callback){


     return User.findAll({where: {email: req.body.email} })
           .then((user) => {
            console.log(user);
            console.log(user.id);
          Collaborator.create({
           wikiId: req.params.id,
           userId: user.id           
           })
        }) 
         .then((collaborator) => {
           console.log(collaborator);
           callback(null, collaborator);
         })
         .catch((err) => {
          console.log(err);
           callback(err);
         });
     },

   deleteCollaborator(req, callback){

               
          User.findAll({where: {email: req.body.email} })
           .then((user) => {
              var userId = user.id;
           });


      return Collaborator.findAll({where: {userId: user.id} })
     .then((collaborator) => {
         collaborator.update({wikiId: null}), {where: {wikiId: req.params.id}}
         .then((collaborator) => {
           console.log(collaborator);
           callback(null, collaborator);
         })
         .catch((err) => {
           console.log(err);
           callback(err);
         });
     });
   }   


}