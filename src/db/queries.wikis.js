const Wiki = require('./models').Wiki;

module.exports = {

	getAllWikis(callback) {
		return Wiki.all()

		.then((wikis) => {
			callback(null, wikis);
		})
		.catch((err) => {
			callback(err);
		})
	},

   getWiki(id, callback){
     return Wiki.findById(id) 
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       callback(err);
     })
   },

   addWiki(newWiki, callback){
      return Wiki.create({
        title: newWiki.title,
        body: newWiki.body,
        userId: newWiki.userId
      })
      .then((wiki) => {
        callback(null, wiki);
      })
      .catch((err) => {
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
           callback(null, wiki);
         })
         .catch((err) => {
           callback(err);
         });
     });
   }

}