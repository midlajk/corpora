
const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');
router.get('/login', adminController.getlogin);
router.get('/englishword', adminController.englishword);
router.get('/malayalamword', adminController.malayalamword);
router.get('/englishwordreq', adminController.englishwordreq);
router.get('/malayalamwordreq', adminController.malayalamwordreq);
router.get('/addmalayalam', adminController.addmalayalam);
router.get('/addenglishword', adminController.addenglishword);
router.post('/addmalayalam', adminController.postaddmalayalam);
router.post('/addenglishword', adminController.postaddenglishword);
router.get('/editmalayalam/:id', adminController.editmalayalam);
router.get('/editenglish/:id', adminController.editenglish);
router.post('/editmalayalam', adminController.posteditmalayalam);
router.post('/editenglish', adminController.posteditenglish);
router.get('/deletemalayalam/:id', adminController.deletemalayalam);
router.get('/deleteenglish/:id', adminController.deleteenglish);
router.get('/manageprofile', adminController.manageprofile);
router.get('/logout', adminController.logout);
module.exports = router;