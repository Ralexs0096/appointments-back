const { Router } = require('express')
const router = Router()
const { checkToken } = require('../middlewares/check-token');
const {check} = require('express-validator')
const { fillValidate } = require('../middlewares/fill-validator');
const {isDate} = require('../helpers/isDate')

const {
  getAppoitments,
  createAppoitment,
  updateAppoitment,
  deleteAppoitment,
} = require("../controllers/appoitmentController");


router.use(checkToken)

router.get('/', getAppoitments)
router.post('/',
  [
    check('title', 'El titulo es Obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de inicio es obligatoria').custom(isDate),
    fillValidate
  ],
  createAppoitment)
router.put('/:id',
  [
    check('title', 'El titulo es Obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de inicio es obligatoria').custom(isDate),
    fillValidate
  ],
  updateAppoitment)
router.delete('/:id', deleteAppoitment)

module.exports = router