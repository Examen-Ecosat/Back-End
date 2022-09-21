const router = require('express').Router();

const userCtrl = require('../controllers/Users');

router.get('/test', (req, res) => {
    res.json('Hola Mundo');
});

router.post('/signup', userCtrl.signup_post);
// router.use('login');
router.post('/login', userCtrl.login_post);
router.get('/login', userCtrl.login_get);

router.get('/logout', userCtrl.logout_get);

router.delete('/delete', userCtrl.delete_user);

router.get('/hash-test', userCtrl.user_test);

module.exports = router;