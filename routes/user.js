/* GET users listing. */

var Personne = require('./controllers/personne').Personne;
exports.list = function(req, res) {
	console.log("POST: ");
	console.log(req.body);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var person = new Personne({
		name : req.body.name ? req.body.name : "",
		age : req.body.age ? req.body.age : ""
	});
	var result = person.ajouter();
//	res.set('Content-Type', 'application/json;charset=UTF-8');
//	res.respond(result, 200);
	res.jsonp(result);
};
