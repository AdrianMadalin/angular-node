const app = require('express');
const router = app.Router();

router.get('/users', (req,res)=>{
    res.send('Users')
});

router.get('/register', (req,res)=>{
    res.send('register')
});

router.get('/authenticate', (req,res)=>{
    res.send('authenticate')
});

router.get('/profile', (req,res)=>{
    res.send('profile')
});

router.get('/validate', (req,res)=>{
    res.send('validate')
});

module.exports = router;