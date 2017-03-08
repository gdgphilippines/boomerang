function Storage() {
	this.id = 0;
	this.name = false;	
}

Storage.prototype = {
	"set": function(id, c) {
		var storage = this;
		App.Firebase.ref("storages/"+id).once("value", function(data) {
			storage.id = id;
			storage.name = data.val();
			if(c) c();
		});
	},
	"add": function(name) {
		this.id = App.Firebase.ref("storages/").push(name).getKey();
		this.name = name;
	},
	"getAll": function(c) {
		App.Firebase.ref("storages/").once("value", function(data) {
			if(c) c(data.val());
		});
	}
}