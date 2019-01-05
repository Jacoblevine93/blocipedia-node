const express = require('express');
const router = express.Router();
const validation = require("./validation");

const wikiController = require('../controllers/wikiController')

router.get('/wikis', wikiController.index);
router.get('/wikis/new', wikiController.new);
router.post("/wikis/create", wikiController.create);
router.get("/wikis/:id", wikiController.show);
router.post('/wikis/:id/destroy', wikiController.destroy);
router.get("/wikis/:id/edit", wikiController.edit);
router.get("/wikis/:id/collaborators", wikiController.editCollaborators);
router.post('/wikis/:id/update', wikiController.update);
router.post('/wikis/:id/collaborator-add', wikiController.addCollaborator);
router.post('/wikis/:id/collaborator-delete', wikiController.deleteCollaborator);

module.exports = router;