var App = {
	start: function(page) {
		if(page == "")
			page = DEFAULT_CONTROLLER;
		this.loadController(page);
		App.responsive();
		$(window).resize(function() {
			App.responsive();
		});
		$("ul.nav a").click(function() {
			if(!$(this).is(".selected")) {
				App.loadController($(this).attr("href").substr(3));
				App.slider("hide");
			}
		});
		$(".black-trans, .back").click(function() {
			App.slider("hide");
		})
		$(".menu").click(function() {
			App.slider("show");
		})
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
		$("ul.nav a[href='#!/"+controller+"']").addClass("selected");
		$(".loading").animate({
			"top": "150px"
		}, 400);
		$(".view").html("").attr("controller", controller).load("views/"+controller+".html", function(response, status, xhr) {
			if(status == "error") {
				$(this).html("").load("views/error.html", function() {
					$(".loading").animate({
						"top": "-70px"
					}, 400);
				}).css("padding", "150px 0px")
			} else {
				$(".loading").animate({
					"top": "-70px"
				}, 400);
				$(this).css("padding-top", "48px");
			}
		})
	}
}
