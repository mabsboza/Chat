const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const  { getMessages } = require('../controllers/messages_controller');

const router = Router();

router.get('/:from',
validateJWT, getMessages);

module.exports = router;