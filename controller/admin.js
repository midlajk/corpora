require('../model/data')
const mongoose = require('mongoose');
var fs = require('fs');
const Englishword = mongoose.model('Englishword');
const Malayalamword = mongoose.model('Malayalamword');
const Malayalamwordreq = mongoose.model('Malayalamwordreq');
const Englishwordreq = mongoose.model('Englishwordreq');
const User = mongoose.model('User');
exports.getlogin = (req, res) => {

    res.render('admin/login', {

        path: '/login',
        errorMessage: null
    })


}
exports.englishword = (req, res) => {
    Englishword.find().then(docs => {
        res.render('admin/englishdic', {

            path: '/englishword',
            docs: docs

        })
    })



}
exports.malayalamword = (req, res) => {
    Malayalamword.find().then(docs => {
        res.render('admin/malayalamdic', {

            path: '/malayalamword',
            docs: docs

        })
    })



}
exports.englishwordreq = (req, res) => {

    res.render('admin/englishwordreq', {

        path: '/login',
        errorMessage: null
    })


}
exports.malayalamwordreq = (req, res) => {

    res.render('admin/malayalamreq', {

        path: '/login',
        errorMessage: null
    })


}

exports.addenglishword = (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('admin/addenglish', {

        path: '/addword',
        editing: "main",
        errorMessage: message,
        doc: []
    })


}

exports.addmalayalam = (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('admin/addmalayalam', {

        path: '/addword',
        editing: "main",
        errorMessage: message,
        doc: []
    })


}

exports.postaddenglishword = (req, res) => {

    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)

    Englishword.findOne({ word: word }).then(docs => {
        if (docs) {
            req.flash('error', 'Record already exist please edit.');
            return res.redirect('/controller/addenglishword')
        } else {
            var newword = new Englishword({
                word: word,
                method: req.body.type,
                meaning: req.body.meaning,
            })
            newword.save((err, docs) => {
                req.flash('error', 'Record added.');
                return res.redirect('/controller/addenglishword')
            })
        }
    });




}

exports.postaddmalayalam = (req, res) => {

    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)

    Malayalamword.findOne({ word: word }).then(docs => {
        if (docs) {
            req.flash('error', 'Record already exist please edit.');
            return res.redirect('/controller/addmalayalam')
        } else {
            var newword = new Malayalamword({
                word: word,
                method: req.body.type,
                meaning: req.body.meaning,
            })
            newword.save((err, docs) => {
                req.flash('error', 'Record added.');
                return res.redirect('/controller/addmalayalam')
            })
        }
    });




}
exports.editmalayalam = (req, res) => {

    Malayalamword.findById(req.params.id).then(docs => {
        if (!docs) {
            req.flash('error', 'Some error occured record couldnt fetch');
            return res.redirect('/controller/addmalayalam')
        } else {
            res.render('admin/addmalayalam', {

                path: '/addword',
                editing: "editmain",
                errorMessage: null,
                doc: docs
            })
        }
    });




}
exports.editenglish = (req, res) => {

    Englishword.findById(req.params.id).then(docs => {
        if (!docs) {
            req.flash('error', 'Some error occured record couldnt fetch');
            return res.redirect('/controller/addenglishword')
        } else {
            res.render('admin/addenglish', {

                path: '/addword',
                editing: "editmain",
                errorMessage: null,
                doc: docs
            })
        }
    });




}
exports.posteditenglish = (req, res) => {
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)
    console.log(req.body.id)
    Englishword.findById(req.body.id).then(docs => {
        if (!docs) {
            req.flash('error', 'Some error occured record couldnt fetch');
            return res.redirect('/controller/addenglishword')
        } else {
            docs.word = word;
            docs.method = req.body.type;
            docs.meaning = req.body.meaning;
            docs.save()
            return res.redirect('/controller/englishword')
        }
    });




}
exports.posteditmalayalam = (req, res) => {
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)
    Malayalamword.findById(req.body.id).then(docs => {
        if (!docs) {
            req.flash('error', 'Some error occured record couldnt fetch');
            return res.redirect('/controller/addmalayalam')
        } else {
            docs.word = word;
            docs.method = req.body.type;
            docs.meaning = req.body.meaning;
            docs.save()
            return res.redirect('/controller/malayalamword')
        }
    });




}

exports.deletemalayalam = (req, res) => {

    Malayalamword.findByIdAndDelete(req.params.id).then(docs => {

        return res.redirect('/controller/malayalamword')

    });




}
exports.deleteenglish = (req, res) => {

    Englishword.findByIdAndDelete(req.params.id).then(docs => {

        return res.redirect('/controller/englishword')

    });
}
exports.manageprofile = (req, res) => {

    res.render('admin/manageprofile', {

        path: '/manageprofile',
        errorMessage: null
    })


}
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/controller/login');
    });

};