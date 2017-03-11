function Item(id) {
	if(id != undefined)
		this.id = id;
	else
		this.id = 0;
	this.val = {};
}
Item.prototype = {
	"set": function(id, c) {
		var item = this;
		App.Firebase.ref("items/"+id).once("value", function(data) {
			item.id = id;
			item.val = data.val();
			if(c) c();
		});
	},
	"add": function(data) {
		this.id = App.Firebase.ref("items/").push(data).getKey();
		this.name = name;
	},
	update: function(data, c) {
		var item = this;
		App.Firebase.ref("items/"+this.id).update(data, function() {
			for(var i in data)
				item[i] = data[i];
			if(c) c();
		});
	},
	updateStorage: function(storageid, data, c) {
		var temp = {};
		temp[storageid] = data;
		App.Firebase.ref("items/"+this.id+"/stored/").update(temp, function() {
			if(c) c();
		})
	},
	deleteStorage: function(storageid) {
		App.Firebase.ref("items/"+this.id+"/stored/"+storageid).remove();
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