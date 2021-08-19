
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
const isauth = require('../middleware/is-auth');

router.get('/login', adminController.getlogin);
router.post('/login', adminController.postlogin);
router.get('/englishword',isauth, adminController.englishword);
router.get('/malayalamword',isauth, adminController.malayalamword);
router.get('/englishwordreq',isauth, adminController.englishwordreq);
router.get('/malayalamwordreq',isauth, adminController.malayalamwordreq);
router.get('/addmalayalam',isauth, adminController.addmalayalam);
router.get('/addenglishword',isauth, adminController.addenglishword);
router.post('/addmalayalam',isauth, adminController.postaddmalayalam);
router.post('/addenglishword', isauth,adminController.postaddenglishword);
router.get('/editmalayalam/:id',isauth, adminController.editmalayalam);
router.get('/editenglish/:id',isauth, adminController.editenglish);
router.post('/editmalayalam',isauth, adminController.posteditmalayalam);
router.post('/editenglish',isauth, adminController.posteditenglish);
router.get('/deletemalayalam/:id',isauth, adminController.deletemalayalam);
router.get('/deleteenglish/:id',isauth, adminController.deleteenglish);
router.get('/manageprofile',isauth, adminController.manageprofile);
router.post('/manageprofile',isauth, adminController.postmanageprofile);
router.get('/logout',isauth, adminController.logout);
module.exports = router;