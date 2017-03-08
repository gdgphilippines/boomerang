App.Controller["TransactionController"] = {
	"construct": function(parameters) {
		if(!App.Firebase.user)
			window.location = "#/";
	},
	"index": function(parameters) {
		return App.View.render();
	},
	"add": function(parameters) {
		return App.View.render();
	}
}