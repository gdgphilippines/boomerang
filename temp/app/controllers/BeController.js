App.Controller["BeController"] = {
	"construct": function(parameters) {

	},
	"index": function(parameters) {
		App.location("home", "index", []);
	},
	"a-sponsor": function(parameters) {
		App.View.setTitle("Become a Sponsor");
		return App.View.render();
	},
	"a-volunteer": function(parameters) {
		App.View.setTitle("Become a Volunteer");
		return App.View.render();
	}
}