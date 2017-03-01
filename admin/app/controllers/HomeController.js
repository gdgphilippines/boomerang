App.Controller["HomeController"] = {
	"construct": function(parameters) {

	},
	"index": function(parameters) {
		return App.View.render(function() {
			if(App.Firebase.user) 
				App.location("inventory", "index", []);
		});
	}
}