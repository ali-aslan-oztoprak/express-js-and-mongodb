const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/login', userController.getUserLogin);
router.get('/logout', userController.getUserLogout);
router.get('/register', userController.getUserRegister);
router.post('/login', userController.postUserLogin);
router.post('/register', userController.postUserRegister);

router.use((req, res, next) => {
    res.render('pages/static/404');
});

module.exports = router;   
