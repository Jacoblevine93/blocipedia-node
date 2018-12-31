const User = require("./models").User;
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
   }   
}   