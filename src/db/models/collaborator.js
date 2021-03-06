'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
     },
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false
     }       
  }, {});
  Collaborator.associate = function(models) {
    Collaborator.belongsTo(models.Wiki, {
       foreignKey: "wikiId",
       as: "wikis"
     });
    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      as: "users"
   });    
  };
  return Collaborator;
};