const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const { placeOrder, getOrders, updateOrder } = require('../controllers/orderController')

router.post('/', placeOrder)
router.use(roleMiddleware(['Admin']));
router.get('/', getOrders)
router.put('/:id', updateOrder)

module.exports = router;