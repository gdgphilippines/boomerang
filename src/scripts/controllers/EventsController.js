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
	"tensorflow-dev-summit-2017": function(parameters) {
		App.View.setTitle("TensorFlow Dev Summit 2017 Extended Manila");
		return App.View.render();
	},
	"tensorflow-dev-summit-2018": function(parameters) {
		App.View.setTitle("TensorFlow Dev Summit 2018 Extended Manila");
		return App.View.render();
	},
	"codeblaze": function(parameters) {
		App.View.setTitle("CodeBlaze");
		return App.View.render();
	},
	"buildactions": function(parameters) {
		App.View.setTitle("Google Assistant: Build Actions For Your Community");
		return App.View.render();
	},
	"tensorflowlite-mlonmobile": function(parameters) {
		App.View.setTitle("TensorFlow Lite: Machine Learning on Mobile");
		return App.View.render();
	},
	"intro-to-kotlin": function(parameters) {
		App.View.setTitle("Introduction to Kotlin");
		return App.View.render();
	},
	"firebase-summit-extended-manila-2018": function(parameters) {
		App.View.setTitle("Firebase Summit Extended Manila 2018");
		return App.View.render();
	}
}