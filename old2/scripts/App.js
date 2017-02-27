var App = {
	xhr: null,
	fl: true,
	CURRENT_CONTROLLER: "",
	CURRENT_ACTION: "",
	Constant: {
		DEFAULT_CONTROLLER: "about",
		DEFAULT_ACTION: "index",
		BYPASS_CONTROLLER: []
	},
	Controller: {
		"about": {
			construct: function(parameters) {

			},
			index: function(parameters) {

				return App.View.render();
			}
		}, 
		"be": {
			construct: function(parameters) {

			}, 
			"a-sponsor": function(parameters) {

				return App.View.render();
			}, 
			"a-volunteer": function(parameters) {

				return App.View.render();
			}
		}, 
		"community": {
			construct: function(parameters) {

			}, 
			"guidelines": function(parameters) {

				return App.View.render();
			}
		}, 
		"events": {
			construct: function(parameters) {

			}, 
			index: function(parameters) {

				return App.View.render();
			}, 
			"firebase-live-viewing": function(parameters) {

				return App.View.render();
			},
			"tensorflow-dev-summit": function(parameters) {
				return App.View.render(function() {
					if(parameters[0] == "register")
						$(".view .columns[name=event-info]").hide();
					else
						$(".view .columns[name=register]").hide();
				})
			},
			"next17": function(parameters) {
				return App.View.render(function() {
					if(parameters[0] == "register")
						$(".view .columns[name=event-info]").hide();
					else
						$(".view .columns[name=register]").hide();
				})
			}
		}, 
		"team": {
			construct: function(parameters) {

			},
			index: function(parameters) {

				return App.View.render();
			}
		}
	},
	View: {
		render: function(callback) {
			$("ul.nav a").removeClass("selected");
			$("ul.nav a[data-page='"+App.CURRENT_CONTROLLER+"']").addClass("selected");
			$(".loading").animate({
				"top": "120px"
			}, 400);
			$(".view").html("").attr("controller", App.CURRENT_CONTROLLER);
			if(App.fl)
				App.fl = false;
			else
				App.xhr.abort();
			$("body").scrollTop(0);
			App.xhr = $.ajax({
				url: "views/"+App.CURRENT_CONTROLLER+"/"+App.CURRENT_ACTION+".html",
				cache: true,
				success: function(html) {
					$(".view").html(html).css("padding-top", "48px");
					$(".loading").animate({
						"top": "-70px"
					}, 400);
					Input.ready();
					Form.ready();
					if(callback)
						callback();
				},
				error: function(xhrtemp, ajaxOptions, thrownError) {
					if(xhrtemp.status == 404) {
						$(".view").html("").load("views/error.html", function() {
							$(".loading").animate({
								"top": "-70px"
							}, 400);
						}).css("padding", "120px 0px")
					}
				}
			})
		}
	},
	Route: {
		call: function(dir) {
		var directory = dir.substring(1).split("/");
		directory[0] = (directory[0] == "" || directory[0] == undefined) ? App.Constant.DEFAULT_CONTROLLER : directory[0];
		directory[1] = (directory[1] == "" || directory[1] == undefined) ? App.Constant.DEFAULT_ACTION : directory[1];

		App.CURRENT_CONTROLLER = directory[0];
		App.CURRENT_ACTION = directory[1];
		if(App.Controller.hasOwnProperty(App.CURRENT_CONTROLLER)) {
			if(App.Controller[App.CURRENT_CONTROLLER].hasOwnProperty(App.CURRENT_ACTION)) {
				App.Controller[App.CURRENT_CONTROLLER][App.CURRENT_ACTION](directory.splice(2));
				if(App.Controller[App.CURRENT_CONTROLLER].hasOwnProperty("construct"))
					App.Controller[App.CURRENT_CONTROLLER].construct(directory.splice(2));
			} else {
				if(App.Constant.BYPASS_CONTROLLER.indexOf(App.CURRENT_CONTROLLER) == -1) {
					App.CURRENT_CONTROLLER = "error"; App.CURRENT_ACTION = "index";
				}
				App.View.render();
			}
		} else {
			App.CURRENT_CONTROLLER = "error"; App.CURRENT_ACTION = "index";
			App.View.render();
		}
	}
	},
	start: function(page) {
		this.Route.call(page);
		this.static();
		$(document).on("click", ".slider a", function() {
			App.slider("hide");
		});
	},
	static: function() {
		App.responsive();
		$(window).resize(function() {
			App.responsive();
		});
		$("[data-page]").click(function() {
			if(!$(this).is(".selected")) {
				App.loadController($(this).attr("data-page"));
				App.slider("hide");
			}
		});
		$(".black-trans, .back").click(function() {
			App.slider("hide");
		})
		$(".menu").click(function() {
			App.slider("show");
		})
		$(document).on("change", "[data-show-if-checked]", function() {
			$(this).parent().next().hide();
			if($(this).is(":checked"))
				$(this).parent().next().show();
		})
		Input.ready();
		Form.ready();
	},
	slider: function(action) {
		if(action == "show") {
			$(".slider").animate({
				"left": "0px"
			}, 500);
			$(".black-trans").show();
			$("body").css("overflow", "hidden");
		} else {
			$(".slider").animate({
				"left": "-310px"
			}, 500);
			$(".black-trans").hide();
			$("body").css("overflow", "auto");
		}
	},
	responsive: function() {
		$(".action-bar .nav").show();
		$(".action-bar .menu").hide();
		if($(window).width() < 600) {
			$(".action-bar .nav").hide();
			$(".action-bar .menu").show();
		}
	}
}
