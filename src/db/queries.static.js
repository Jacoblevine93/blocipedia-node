const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");
var stripe = require("stripe")(process.env.SECRET_KEY);

module.exports = {

   upgradeUser(req, upgradedUser, callback){

  const token = req.body.stripeToken; // Using Express

  const charge = stripe.charges.create({
  amount: 1500,
  currency: 'usd',
  description: 'Example charge',
  source: token,
});

// #1
     return User.findById(req.user.id)
     .then((user) => {

// #2
       if(!user){
         return callback("User not found");
       }

         user.update({
           role: 'premium'
         })
         .then(() => {
           callback(null, user);
         })
         .catch((err) => {
           callback(err);
         });

     });
   },

   downgradeUser(req, downgradedUser, callback){
// #1
     return User.findById(req.user.id)
     .then((user) => {

// #2
       if(!user){
         return callback("User not found");
       }

         user.update({
           role: 'standard'
         })

         .then(() => {
           callback(null, user);
         })
         .catch((err) => {
           callback(err);
         });

     });

// #1
     return Wiki
     .then((wiki) => {
          console.log("here")
          console.log(wiki);
          wiki.update({ private: false }, { where: {  userId: req.user.id }})
         .then(() => {
          console.log(wiki);
           callback(null, wiki);
         })
         .catch((err) => {
            console.log(err);          
           callback(err);
         });
     });      

  }        
  
}   
