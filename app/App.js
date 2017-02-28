/* MoonJS - v1.0.0 - 2017-02-23
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
	},
	getNextEvent: function() {
		$.ajax({
			type: "get",
			crossOrigin: true,
			cache: true,
			url: "https://hub.gdgx.io/api/v1/chapters/105750470224587854845/events/upcoming?callback=?",
			dataType: 'jsonp',
			data: { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 },
			success: function(events) {
				// var count = 0, max = 1;
				// $.each(events.items, function(index, event) {
				// 	if(count < max) {
				// 		count++;
				// 		var datex = new Date(event.start.substring(0,19));
				// 		var tmp = document.createElement("DIV");
				// 		tmp.innerHTML = event.about;
				// 		$("#upcoming").append('<div class="card"></div>');
				// 	}
				// })
				if(events.items.length == 0)
					$("#upcoming").html('<h3>Message</h3><p>No incoming events for now. Add, like, and follow our social media pages to get the latest updates for our upcoming events!</p>');
				else {
					var nextEvent = events.items[0];
					var datex = new Date(nextEvent.start.substring(0,19));
					var tmp = document.createElement("DIV");
					tmp.innerHTML = nextEvent.about;
					console.log(nextEvent);
					$("#upcoming").html('<h3>'+nextEvent.title+'</h3><small>'+dateFormat(datex, "dddd, mmmm dS, yyyy, h:MM TT")+'</small><p>'+tmp.textContent.split(/\s+/).slice(0,20).join(" ")+"..."+'</p> <p class="right"><a class="button" href="'+nextEvent.eventUrl+'" target="_blank">Go to website</a></p>');
				}
			}
		});
	},
	getBlogPosts: function() {
		$.ajax({
			type: "get",
			crossOrigin: true,
			cache: true,
			url: "http://blog.gdgph.org/feeds/posts/default?alt=json-in-script&callback=?",
			dataType: 'jsonp',
			data: { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 },
			success: function(posts) {
				$("#blog-list").find("[data-post-id]").remove();
				$("#blog-list .load_container").remove();
				var count = 0, max = 5;
				$.each(posts.feed.entry, function(index, post) {
					if(count < max) {
						count++;
						var title = post.title.$t;
						var link = post.link[4].href;
						var date = post.published.$t.substring(0,19);
						var content = post.content.$t;
						var tmp = document.createElement("DIV");
						tmp.innerHTML = content;
						content = tmp.textContent.split(/\s+/).slice(0,20).join(" ")+"...";				
						$("#blog-list").append('<div class="col-4 t-col-6 m-col-12 pad-bottom" data-post-id="'+post.id.$t+'">' +
							'<div class="wrapper">' +
								'<div class="card">' +
									'<div class="wrapper">' +
										'<h3>'+title+'</h3>' +
										'<small>'+dateFormat(date, "dddd, mmmm dS, yyyy, h:MM TT")+'</small>' +
										'<p>'+content+'</p>' +
									'</div>' +
									'<a href="'+link+'" class="action_button red table middle center">' +
										'<div class="cell">' +
											'<i class="mdi mdi-eye"></i>' +
										'</div>' +
									'</a>' +
								'</div>' +
							'</div>' +
						'</div>');
					}
				});
				var rm = $("#blog_read_more").clone();
				$("#blog_read_more").remove();
				$("#blog-list").append(rm);
				resizeCards();
			}
		});
	},
	displaySpeakers: function() {
		var speakers = [
			"johnny-benitez",
			"gail-tan",
			"jonathan-joson",
			"sami-kizilbash",
			"mete-atamel",
			"takuo-suzuki",
			"kazunori-sato",
			"albert-padin",
			"yohan-totting",
			"josan-dometita",
			"cristopher-david",
			"elymar-apao",
			"reymart-canuel",
			"toni-jan-keith-monserrat",
			"benj-tupas",
			"claudine-rodriguez",
			"anne-michelle-santos",
			"ambe-tierro",
			"charibeth-cheng",
			"duephil-kaufmann",
			"dexter-santos",
			"allan-tan",
			"brian-tan-seng",
			"karen-matias",
			"kristine-mae-adlaon",
			"jordan-deja",
			"ellaine-de-guzman",
			"goldy-yancha",
			"joem-petilla",
			"luna-cruz",
			"julie-ann-alonzo",
			"mara-ang",
			"stephanie-sy",
			"derrick-alain-mapagu",
			"grace-sojor",
			"valenice-balace",
			"joyce-guiao",
			"tal-de-guzman",
			"micaela-reyes",
			"raymund-vidar",
			"merlin-suarez",
			"warangkana-fajardo",
			"mark-anthony-panizales",
			"ben-adrian-sarmiento",
			"wayne-manuel",
			"gino-tria",
			"jasmin-caronan",
			"mac-valmores",
			"mika-aldaba",
			"vin-lim",
			"vicky-sy",
			"nadine-jamila",
			"patricia-faustino",
			"paul-gadi",
			"adrian-vincent-tayag",
			"howard-go",
			"pamela-cajilig",
			"neil-patrick-del-gallego",
			"alex-alabiso"
		];
		for(var s in speakers) {
			if(Data.speakers.hasOwnProperty(speakers[s])) {
				var x = Data.speakers[speakers[s]];
				$("section[name=speakers] .vertical-scroll .content").append('<div class="item">' + 
					'<img src="assets/images/speakers/'+x.name+'.jpg">' + 
					'<span>'+x.name+'</span>' + 
					'<small>'+x.title+'</small>' + 
				'</div>');
			}
		}
	}
}