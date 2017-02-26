App.Controller["CommunityController"] = {
	"construct": function(parameters) {

	},
	"index": function(parameters) {
		App.View.setTitle("Community Guidelines");
		App.location("community", "guidelines", []);
	},
	"guidelines": function(parameters) {
		return App.View.render();
	}
}