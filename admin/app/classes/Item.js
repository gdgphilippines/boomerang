function Item() {
	this.name = "";
	this.id = 0;
	this.description = "";
	this.unit = "";
	this.stored = false;
}
Item.prototype = {
	"set": function(id, c) {
		var item = this;
		App.Firebase.ref("items/"+id).once("value", function(data) {
			item.id = id;
			item.name = data.val().name;
			item.description = data.val().description;
			item.unit = data.val().unit;
			item.stored = false;
			if(data.val().hasOwnProperty("stored"))
				item.stored = data.val().stored;
			if(c) c();
		});
	},
	"add": function(data) {
		this.id = App.Firebase.ref("items/").push(data).getKey();
		this.name = name;
	},
	update: function(data, c) {
		App.Firebase.ref("items/"+this.id).update(data, function() {
			if(c) c();
		})
	},
	updateStorage: function(storageid, data, c) {
		var temp = {};
		temp[storageid] = data;
		App.Firebase.ref("items/"+this.id+"/stored/").update(temp, function() {
			if(c) c();
		})
	},
	delete: function(c) {
		App.Firebase.ref("items/"+this.id).remove(function() {
			if(c) c();
		});
	},
	"getAll": function(c) {
		App.Firebase.ref("items/").once("value", function(data) {
			if(c) c(data.val());
		});
	},
	"getJson": function() {
		var item = this;
		return {
			"description": item.description,
			"name": item.name,
			"stored": item.stored,
			"unit": item.unit
		}
	}
}