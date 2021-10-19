const { Router } = require('express')
const router = Router()
const {check} = require('express-validator')
const {userCreate, userLogin, tokenRevalidate} = require('../controllers/authController')
const { checkToken } = require('../middlewares/check-token')
const { fillValidate } = require('../middlewares/fill-validator')

router.post('/new',
     [
         check('name', 'El nombre es obligatorio').not().isEmpty(),
         check('email', 'El email es obligatorio').isEmail(),
         check('password', 'El password debe ser mayor de 6 caracteres').isLength({min: 6}),
         fillValidate
     ] ,
     userCreate)

router.post('/',
     [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser mayor de 6 caracteres').isLength({min: 6}),
        fillValidate
     ]
    ,userLogin)

router.get('/renew', checkToken, tokenRevalidate)

module.exports = router