function Storage() {
	this.id = 0;
	this.name = false;	
}

Storage.prototype = {
	"set": function(id, c) {
		var storage = this;
		App.Firebase.ref("storage/"+id).once("value", function(data) {
			storage.id = id;
			storage.name = data.val();
			if(c) c();
		});
	},
	"add": function(name) {
		this.id = App.Firebase.ref("storage/").push(name).getKey();
		this.name = name;
	},
	"getAll": function(c) {
		App.Firebase.ref("storage/").once("value", function(data) {
			if(c) c(data.val());
		});
	}
}