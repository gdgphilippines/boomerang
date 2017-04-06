App.Controller["EventsController"] = {
	"construct": function(parameters) {

	},
	"index": function(parameters) {
		return App.View.render();
	},
	"next17": function(parameters) {
		App.View.setTitle("Google Cloud Next 17 Extended Manila");
		return App.View.render();
	},
	"tensorflow-dev-summit": function(parameters) {
		return App.View.render();
	},
	"codeblaze": function(parameters) {
		return App.View.render();
	}
}