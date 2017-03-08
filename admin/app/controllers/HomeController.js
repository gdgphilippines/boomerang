App.Controller["HomeController"] = {
	"construct": function(parameters) {
	},
	"index": function(parameters) {
		console.log("A");
		return App.View.render(function() {
			console.log("B");
			$("#sectionMenu").hide();
		});
	}
}