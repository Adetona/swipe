var mongoose = require('mongoose');



/*var userSchema = mongoose.Schema ({




users: {

	email: String,

	username: String
	
}, 

	

}); */ 


var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String, 
  email: String
}, { collection: 'nairabox' });

//make the model available public
module.exports = mongoose.model('User', userSchema); 