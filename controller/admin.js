require('../model/data')
const mongoose = require('mongoose');
var fs = require('fs');
const Englishword = mongoose.model('Englishword');
const Malayalamword = mongoose.model('Malayalamword');
const Malayalamwordreq = mongoose.model('Malayalamwordreq');
const Englishwordreq = mongoose.model('Englishwordreq');
const User = mongoose.model('User');
exports.getlogin = (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('admin/login', {

        path: '/login',
        errorMessage: message
    })


}
exports.postlogin = (req, res) => {
    User.findOne({ name: req.body.name }).then(docs => {
        if (!docs) {
            req.flash('error', "sorry no data found")
            req.session.isLoggedIn = true;
            res.redirect('/controller/englishword')
                // return res.redirect('/controller/login')
        } else {
            if (docs.password == req.body.password) {
                req.session.isLoggedIn = true;
                res.redirect('/controller/englishword')
            } else {
                req.flash('error', "password does not match")
                return res.redirect('/controller/login')
            }
        }
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
    const image = req.file;
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)

    Englishword.findOne({ word: word }).then(docs => {
        if (docs) {
            req.flash('error', 'Record already exist please edit.');
            return res.redirect('/controller/addenglishword')
        } else {
            if (image) {
                const imageUrl = image.path;
                var newword = new Englishword({
                    word: word,
                    method: req.body.type,
                    meaning: req.body.meaning,
                    image: imageUrl
                })
                newword.save((err, docs) => {
                    req.flash('error', 'Record added.');
                    return res.redirect('/controller/addenglishword')
                })
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
        }
    });




}

exports.postaddmalayalam = (req, res) => {
    const image = req.file;
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)

    Malayalamword.findOne({ word: word }).then(docs => {
        if (docs) {
            req.flash('error', 'Record already exist please edit.');
            return res.redirect('/controller/addmalayalam')
        } else {
            if (image) {
                const imageUrl = image.path;
                var newword = new Malayalamword({
                    word: word,
                    method: req.body.type,
                    meaning: req.body.meaning,
                    image: imageUrl
                })
                newword.save((err, docs) => {
                    req.flash('error', 'Record added.');
                    return res.redirect('/controller/addmalayalam')
                })
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
    const image = req.file;
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)
    Englishword.findById(req.body.id).then(docs => {
        if (!docs) {
            req.flash('error', 'Some error occured record couldnt fetch');
            return res.redirect('/controller/addenglishword')
        } else {
            if (image) {
                docs.word = word;
                docs.method = req.body.type;
                docs.meaning = req.body.meaning;
                docs.image = image.path;
                docs.save()
                return res.redirect('/controller/englishword')
            } else {
                docs.word = word;
                docs.method = req.body.type;
                docs.meaning = req.body.meaning;
                docs.save()
                return res.redirect('/controller/englishword')
            }

        }
    });




}
exports.posteditmalayalam = (req, res) => {
    const image = req.file;
    const word = req.body.word.charAt(0).toUpperCase() + req.body.word.slice(1)
    Malayalamword.findById(req.body.id).then(docs => {
        if (!docs) {
            req.flash('error', 'Some error occured record couldnt fetch');
            return res.redirect('/controller/addmalayalam')
        } else {
            if (image) {
                docs.word = word;
                docs.method = req.body.type;
                docs.meaning = req.body.meaning;
                docs.image = image.path;
                docs.save()
                return res.redirect('/controller/malayalamword')
            } else {
                docs.word = word;
                docs.method = req.body.type;
                docs.meaning = req.body.meaning;
                docs.save()
                return res.redirect('/controller/malayalamword')
            }
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
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }


    res.render('admin/manageprofile', {

        path: '/manageprofile',
        errorMessage: message
    })


}
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/controller/login');
    });

};
exports.postmanageprofile = (req, res) => {
    User.findByIdAndUpdate('611e27f96259945e3272ecf4').then(docs => {
        docs.name = req.body.name;
        docs.password = req.body.password;
        docs.save()
        req.flash('error', "login changed")
        res.redirect('/controller/manageprofile')
    })



}