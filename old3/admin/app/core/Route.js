App["Route"] = {
	"call": function(dir) {
		var directory = dir.substring(1).split("/");
		directory[0] = (directory[0] == "" || directory[0] == undefined) ? App.Constant.DEFAULT_CONTROLLER : directory[0];
		directory[1] = (directory[1] == "" || directory[1] == undefined) ? App.Constant.DEFAULT_ACTION : directory[1];
		App.CONTROLLER = directory[0].charAt(0).toUpperCase() + directory[0].slice(1) + "Controller";
		App.ACTION = directory[1];
		var parameters = directory.splice(2);
		App.Controller.construct(parameters);
		App.View.construct(parameters);
		if(App.Controller.hasOwnProperty(App.CONTROLLER)) {
			if(App.Controller[App.CONTROLLER].hasOwnProperty("construct"))
				App.Controller[App.CONTROLLER].construct(parameters);
			if(App.Controller[App.CONTROLLER].hasOwnProperty(App.ACTION)) {
				App.Controller[App.CONTROLLER][App.ACTION](parameters);
			} else {
				App.location("error", "action-not-found", [App.CONTROLLER, App.ACTION]);
			}
		} else {
			App.location("error", "controller-not-found", [App.CONTROLLER, App.ACTION]);
		}
	}
}