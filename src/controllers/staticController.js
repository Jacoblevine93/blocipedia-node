const staticQueries = require('../db/queries.static.js');
const Authorizer = require("../policies/application");

module.exports = {
	index(req,res,next) {
		res.render('static/index', {title: 'Welcome to Blocipedia'})
	},
  
   upgradeUser(req, res, next){

     staticQueries.upgradeUser(req, req.body, (err, user) => {
       if(err || user == null){
         res.redirect(401, `/upgrade`);
       } else {
         res.redirect(`/`);
       }
     });
   },

   upgradeForm(req, res, next){
     res.render("static/upgrade");
   },

   downgradeForm(req, res, next){
     res.render("static/downgrade");
   },

   downgradeUser(req, res, next){

     staticQueries.downgradeUser(req, req.body, (err, user) => {
       if(err || user == null){
         res.redirect(401, `/downgrade`);
       } else {
         res.redirect(`/`);
       }
     });
   },      

}