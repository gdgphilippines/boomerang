/* OsloJS - v1.0.0 - 2017-02-23
 * https://github.com/juvarabrera/moonjs
 *
 * Copyright (c) 2017 Juvar Abrera;
 * Licensed under the MIT license 
*/

 jQuery(function($) {
	if (!Modernizr.touch) {
		debiki.Utterscroll.enable();
	}
});

 var App = {
	Classes: {},
	"ready": function(page) {
		this["Firebase"] = new Firebase({apiKey: "AIzaSyBAZ55U2pItVVfZcpKdL38IHm3yuNBC7Zc", authDomain: "gdgph-inventory.firebaseapp.com", databaseURL: "https://gdgph-inventory.firebaseio.com", storageBucket: "gdgph-inventory.appspot.com", messagingSenderId: "27394791760"});
		this.Route.call(page);
		$(window).scroll(function() {
			if($(window).scrollTop() > 0) {
				$(".action-bar").addClass("shadow");
			} else {
				$(".action-bar").removeClass("shadow");
			}
		});
	},
	"location": function(controller, action, parameters) {
		App.CONTROLLER = controller.charAt(0).toUpperCase() + controller.slice(1) + "Controller";
		App.ACTION = action;
		if(parameters == undefined)
			parameters = [];
		App.PARAMETERS = parameters;
		window.location = "#/"+controller+"/"+action+"/"+parameters.join("/");
	}, 
	"refresh": function() {
		if(App.Firebase.user) {
			$("[data-show-if-user]").show();
			$("[data-show-if-visitor]").hide();
			$("#userContainer").html('<img src="'+App.Firebase.user.photoURL+'" class="dp" />');
		} else {
			$("[data-show-if-user]").hide();
			$("[data-show-if-visitor]").show();
		}
		$("html").click(function(e) {
			// console.log($(".action-bar i.mdi.mdi-menu").is(":visible"));
			if($(window).outerWidth() <= 700)
				$(".action-bar ul.nav").hide();
			if($(e.target).is("i.mdi.mdi-menu"))
				$(".action-bar ul.nav").show();
		})
		$(".template").css("padding-top", $(".action-bar").outerHeight())
		$(".action-bar i.mdi.mdi-menu").click(function() {
			$(this).find("+ ul.nav").show();
		});
		$("[data-bulaga]").each(function() {
			var val = $(this).attr("data-bulaga").split(" ");
			var options = {};
			var map = {
				"fade-in": ["animation", "FADE_IN"],
				"slide-up": ["animation", "SLIDE_UP"],
				"slide-left": ["animation", "SLIDE_LEFT"],
				"slide-right": ["animation", "SLIDE_RIGHT"],
				"slide-down": ["animation", "SLIDE_DOWN"],
				"bounce": ["bounce", true],
				"repeat": ["repeat", true]
			}
			for(var x in val) {
				if(map.hasOwnProperty(val[x]))
					options[map[val[x]][0]] = map[val[x]][1];
			}
			$(this).bulaga(options);
		});
		$("section.cover").css("height", $(window).outerHeight() - $(".action-bar").outerHeight());
	}
}