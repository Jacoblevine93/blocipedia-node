const User = require("./models").User;
const bcrypt = require("bcryptjs");
var stripe = require("stripe")("sk_test_cURohRRS3XKjTL2Af2vBl9nt");

module.exports = {

   upgradeUser(req, upgradedUser, callback){

  const token = request.body.stripeToken; // Using Express

  const charge = stripe.charges.create({
  amount: 15,
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

         user.update(upgradedUser, {
           role: 'premium'
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