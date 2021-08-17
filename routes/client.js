
const express = require('express');
const router = express.Router();

const clientController = require('../controller/client');
router.get('/', clientController.getindex);
router.get('/englishwords', clientController.englishwords);

router.get('/malayalamwords', clientController.malayalamwords);

router.get('/adwords', clientController.adwords);

router.post('/searchenglish', clientController.searchenglish);
router.post('/searchmalayalam', clientController.searchmalayalam);
//router.post('/results', clientController.getindex);
//router.post('/results', clientController.getindex);
module.exports = router;