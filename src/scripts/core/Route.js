App["Route"] = {
	"call": function(dir) {
		if(dir.substring(0,1) == "/") {
			var directory = dir.substring(1).split("/");
			directory[0] = (directory[0] == "" || directory[0] == undefined) ? App.Constant.DEFAULT_CONTROLLER : directory[0];
			directory[1] = (directory[1] == "" || directory[1] == undefined) ? App.Constant.DEFAULT_ACTION : directory[1];
			App.CONTROLLER = directory[0].charAt(0).toUpperCase() + directory[0].slice(1) + "Controller";
			App.ACTION = directory[1];
			var parameters = directory.splice(2);
			App.Controller.construct(parameters);
			App.View.construct(parameters);
			$("body").disableScroll();
			$("body > .blur").fadeIn(250);
			$(".progress").css({"opacity": "1"})
			if(App.Controller.hasOwnProperty(App.CONTROLLER)) {
				if(App.Controller[App.CONTROLLER].hasOwnProperty("construct"))
					App.Controller[App.CONTROLLER].construct(parameters);
				if(App.Controller[App.CONTROLLER].hasOwnProperty(App.ACTION)) {
					App.Controller[App.CONTROLLER][App.ACTION](parameters);
				} else {
					if(App.Constant.DEVELOPMENT)
						App.location("error", "action-not-found", [App.CONTROLLER, App.ACTION]);
					else
						App.refresh();
				}
			} else {
				if(App.Constant.DEVELOPMENT)
					App.location("error", "controller-not-found", [App.CONTROLLER, App.ACTION]);
				else
					App.refresh();
			}
		} else {
			this.shortcut(dir);
		}
	},
	"shortcut": function(dir) {
		for(var hashtag in App.Constant.ROUTE_SHORTCUT) {
			var url = App.Constant.ROUTE_SHORTCUT[hashtag];
			if(hashtag == dir.toLowerCase()) {
				if(url.substring(0,1) == "/")
					window.location = "#" + url;
				else
					window.location = url;
				return;
			}
		}
		window.location = "#/";
	}
}