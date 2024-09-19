const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const { getSales } = require('../controllers/salesController')

router.use(roleMiddleware(['Admin']));
router.get('/', getSales)

module.exports = router;