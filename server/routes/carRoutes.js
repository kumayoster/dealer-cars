const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const { getCars, addCar, updateCar, deleteCar } = require('../controllers/carController')

router.get('/', getCars)
router.use(roleMiddleware(['Admin']));
router.post('/', addCar)
router.put('/:id', updateCar)
router.delete('/:id', deleteCar)

module.exports = router;