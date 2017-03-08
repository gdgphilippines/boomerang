App.Controller["InventoryController"] = {
	"construct": function(parameters) {
		if(!App.Firebase.user)
			window.location = "#/";
	},
	"index": function(parameters) {
		return App.View.render();
	},
	"new": function(parameters) {
		return App.View.render();
	},
	"edit": function(parameters) {
		if(parameters[0] != undefined) {
			var i = new Item();
			i.set(parameters[0], function() {
				App.View.setJson({
					"id": parameters[0],
					"name": i.name,
					"description": i.description,
					"unit": i.unit
				})
				App.View.render();
			});
		} else {
			App.location("inventory", "", []);
		}
	},
	"delete": function(parameters) {
		if(parameters[0] != undefined) {
			var i = new Item();
			i.set(parameters[0], function() {
				App.View.setJson({
					"id": parameters[0],
					"name": i.name,
					"description": i.description,
					"unit": i.unit
				})
				App.View.render();
			});
		} else {
			App.location("inventory", "", []);
		}
	}
}