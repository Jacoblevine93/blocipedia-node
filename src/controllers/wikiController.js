const wikiQueries = require('../db/queries.wikis.js');
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;

module.exports = {
  index(req, res, next){
    
    wikiQueries.getAllWikis((err, wikis) => {

      if(err){
        res.redirect(500, 'static/index');
      } else {
        res.render('wikis/index', {wikis});
      }
    })

  },

  new(req, res, next){
    res.render('wikis/new');
  },

   create(req, res, next){
       let newWiki = {
         title: req.body.title,
         body: req.body.body,
         userId: req.user.id,
         private: req.body.private
       };
       wikiQueries.addWiki(newWiki, (err, wiki) => {
          if(err){
            res.redirect(500, "wikis/new");
          } else {
          res.redirect(303, `/wikis/${wiki.id}`);
          }       
       });
   },

  show(req, res, next){
      wikiQueries.getWiki(req.params.id, (err, wiki) => {
        var markdownWiki = wiki;
        markdownWiki.body = markdown.toHTML(markdownWiki.body);
        
        if(err || markdownWiki == null){
          res.redirect(404, "/");
        } else {
          res.render("wikis/show", {markdownWiki});
        }
      })
  },

   destroy(req, res, next){

 // #1
     wikiQueries.deleteWiki(req, (err, wiki) => {
       if(err){
         res.redirect(err, `/wikis/${req.params.id}`)
       } else {
         res.redirect(303, "/wikis")
       }
     });
   },

  edit(req, res, next){

 // #1
     wikiQueries.getWiki(req.params.id, (err, wiki) => {
       if(err || wiki == null){
         res.redirect(404, "/");
       } else {
           res.render("wikis/edit", {wiki});
      }
     });
   },   

   update(req, res, next){

 // #1
     wikiQueries.updateWiki(req, req.body, (err, wiki) => {
       if(err || wiki == null){
         res.redirect(401, `/wikis/${req.params.id}/edit`);
       } else {
         res.redirect(`/wikis/${req.params.id}`);
       }
     });
   },

   addCollaborator(req, res, next){
     wikiQueries.addCollaborator(req, (err, collaborator) => {
       if(err || collaborator == null){
         res.redirect(401, `/wikis/`);
       } else {
         res.redirect(`/wikis/`);
       }
     });
   },   

   deleteCollaborator(req, res, next){
     wikiQueries.deleteCollaborator(req, (err, collaborator) => {
       if(err){
         res.redirect(401, `/wikis/`);
       } else {
         res.redirect(`/wikis/`);
       }
     });
   },

   editCollaborators(req, res, next){

     wikiQueries.getWiki(req.params.id, (err, wiki) => {
       if(err || wiki == null){
         res.redirect(404, "/");
       } else {
           res.render(`wikis/collaborators`, {wiki});
      }
     });
   }    

}