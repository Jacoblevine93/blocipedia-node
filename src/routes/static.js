const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');

router.get('/', staticController.index);
router.get("/upgrade", staticController.upgradeForm);
router.post("/upgrade", staticController.upgradeUser);

module.exports = router;