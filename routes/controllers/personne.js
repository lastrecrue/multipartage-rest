// Person.prototype.who = function() {
// var result = "Name : " + this.name + " age : " + this.age;
// console.log(result);
// return result;
// };

// alerts 'Male'

//exports.Personne = function (){}

exports.Personne = function Personne(req) {
	this.name = req.name;
	this.age = req.age;

}

var Dao = function Dao() {
}

Dao.prototype.save = function(dto) {
	console.log(dto);
}

exports.Personne.prototype.ajouter = function() {
	var result = {
		name : this.name,
		age : this.age
	};

	var dao = new Dao();
	dao.save(this);
	return result;
}
