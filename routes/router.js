const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', (req, res, next) => {
    res.render('pages/index');
});

router.get('/login', userController.getUserLogin);
router.get('/register', userController.getUserRegister);
router.post('/login', userController.postUserLogin);
router.post('/register', userController.postUserRegister);

router.use((req, res, next) => {
    res.render('pages/static/404');
});

module.exports = router;   