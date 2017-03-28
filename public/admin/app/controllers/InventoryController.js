App.Controller["InventoryController"] = {
	"construct": function(parameters) {
		if(!App.Firebase.user)
			window.location = "#/";
	},
	"index": function(parameters) {
		return App.View.render();
	},
	"new": function(parameters) {
		return App.View.render(function() {
			$(".focus-here").focus();
		});
	},
	"edit": function(parameters) {
		if(parameters[0] != undefined) {
			var db = new Data();
			db.pull(function(data) {
				var item = db.get("items/"+parameters[0]);
				App.View.setJson({
					"id": parameters[0],
					"name": item.name,
					"description": item.description,
					"unit": item.unit
				})
				App.View.render();
			})
		} else {
			App.location("inventory", "", []);
		}
	},
	"delete": function(parameters) {
		if(parameters[0] != undefined) {
			var db = new Data();
			db.pull(function(data) {
				var item = db.get("items/"+parameters[0]);
				App.View.setJson({
					"id": parameters[0],
					"name": item.name,
					"description": item.description,
					"unit": item.unit
				})
				App.View.render();
			})
		} else {
			App.location("inventory", "", []);
		}
	}
}