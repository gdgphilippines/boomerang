var App = {
	xhr: null,
	fl: true,
	start: function(page) {
		if(page == "")
			page = Config.DEFAULT_CONTROLLER;
		this.loadController(page);
		this.static();
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
		// Input.ready();
		// Form.ready();
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
	},
	loadController: function(controller) {
		$("ul.nav a").removeClass("selected");
		$("ul.nav a[data-page='"+controller+"']").addClass("selected");
		$(".loading").animate({
			"top": "120px"
		}, 400);
		$(".view").html("").attr("controller", controller);
		if(App.fl)
			App.fl = false;
		else
			App.xhr.abort();
		$("body").scrollTop(0);
		App.xhr = $.ajax({
			url: "views/"+controller+".html",
			cache: true,
			success: function(html) {
				$(".view").html(html).css("padding-top", "48px");
				$(".loading").animate({
					"top": "-70px"
				}, 400);
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
}
