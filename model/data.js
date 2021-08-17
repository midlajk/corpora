const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var englishword = new Schema({

    word: String,
    method:String,
    meaning:String,
    

});

var Englishword =
    mongoose.model('Englishword', englishword);
module.exports = Englishword;


var malayalamword = new Schema({

    word: String,
    method:String,
    meaning:String,
    

});

var Malayalamword =
    mongoose.model('Malayalamword', malayalamword);
module.exports = Malayalamword;


var englishwordreq = new Schema({

    word: String,
    method:String,
    meaning:String,
    

});

var Englishwordreq =
    mongoose.model('Englishwordreq', englishwordreq);
    module.exports = Englishwordreq;

    var malayalamwordreq = new Schema({

        word: String,
        method:String,
        meaning:String,
        
    
    });
    
    var Malayalamwordreq =
        mongoose.model('Malayalamwordreq', malayalamwordreq);
    module.exports = Malayalamwordreq;

    var user = new Schema({

        name: String,
        password:String,
       
        
    
    });
    
    var User =
        mongoose.model('User', user);
    module.exports = User;