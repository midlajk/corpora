require('../model/data')
const mongoose = require('mongoose');
var fs = require('fs');
const Englishword = mongoose.model('Englishword');
const Malayalamword = mongoose.model('Malayalamword');
const Malayalamwordreq = mongoose.model('Malayalamwordreq');
const Englishwordreq = mongoose.model('Englishwordreq');
const User = mongoose.model('User');
exports.getindex = (req, res) => {

    res.render('client/index', {
        path: 'index'
    })


}
exports.englishwords = (req, res) => {

    res.render('client/englishword', {
        path: 'englishword'
    })


}
exports.malayalamwords = (req, res) => {

    res.render('client/malayalamword', {
        path: 'malayalamword'
    })


}
exports.adwords = (req, res) => {

    res.render('client/adword', {
        path: 'adword'
    })


}
exports.searchenglish = (req, res) => {
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)
    Englishword.findOne({ word: word }).then(docs => {
        Englishword.find({ "word": { "$regex": word, "$options": "i" } },
            function(err, doc) {
                res.render('client/result', {
                    path: 'index',
                    result: docs,
                    data: doc,
                    word: word
                })
            }
        );

    })




}
exports.searchmalayalam = (req, res) => {

    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)
    Malayalamword.findOne({ word: word }).then(docs => {
        Malayalamword.find({ "word": { "$regex": word, "$options": "i" } },
            function(err, doc) {
                res.render('client/result', {
                    path: 'index',
                    result: docs,
                    data: doc,
                    word: word
                })
            }
        );

    })



}