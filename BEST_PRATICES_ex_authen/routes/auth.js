const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login-controller');
const profileController = require('../controllers/profile-controller');
const registerController = require('../controllers/register-controller');
const authChecker = require('../middlewares/auth-middleware');

router.get('/login',loginController.login);
router.get('/logout',loginController.logout);
router.get('/register',registerController.register);
router.get('/profile',profileController.profile);
router.get('/profile',authChecker,profileController.profile);
router.post('/login',loginController.postLogin);
router.post('/register',registerController.postRegister);


module.exports = router;