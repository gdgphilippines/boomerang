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
$.fn.disableScroll = function() {
	window.oldScrollPos = $(window).scrollTop();
	$(window).on("scroll.scrolldisabler",function (event) {
		$(window).scrollTop( window.oldScrollPos );
		event.preventDefault();
	});
};
$.fn.enableScroll = function() {
	$(window).off('scroll.scrolldisabler');
};
 var App = {
	Classes: {},
	Utility: {},
	Constant: {},
	KeyboardListener: {},
	Route: {},
	Size: {},
	Controller: {},
	"ready": function(page) {
		this.Route.call(page);
		$(window).scroll(function() {
			if($(window).scrollTop() > 0) {
				$(".action-bar").addClass("shadow");
			} else {
				$(".action-bar").removeClass("shadow");
			}
		});
		// if ('serviceWorker' in navigator) {
		// 	navigator.serviceWorker.register('./service-worker.js');
		// }
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
		// $("section.transparent").css("height", $(".cover").outerHeight());
		setTimeout(function() {
			$(".progress").animate({"opacity": "0"})
		}, 1000)
		$("body").enableScroll();
		$("body > .blur").hide();
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
	},
	getNextEvent: function() {
		// $.ajax({
		// 	type: "get",
		// 	crossOrigin: true,
		// 	cache: true,
		// 	url: "https://hub.gdgx.io/api/v1/chapters/105750470224587854845/events/upcoming?callback=?",
		// 	dataType: 'jsonp',
		// 	data: { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 },
		// 	success: function(events) {
		// 		console.log(events);
		// 		var sort = function (prop, arr) {
		// 		    prop = prop.split('.');
		// 		    var len = prop.length;

		// 		    arr.sort(function (a, b) {
		// 		        var i = 0;
		// 		        var key;

		// 		        while( i < len ) {
		// 		            key = prop[i];

		// 		            if(!a.hasOwnProperty(key)) return 1;
		// 		            if(!b.hasOwnProperty(key)) return -1;

		// 		            a = a[key];
		// 		            b = b[key];
		// 		            i++;
		// 		        }
		// 		        if (a < b) {
		// 		            return -1;
		// 		        } else if (a > b) {
		// 		            return 1;
		// 		        } else {
		// 		            return 0;
		// 		        }
		// 		    });
		// 		    return arr;
		// 		}
		// 		events.items = sort("start", events.items);
		// 		console.log(events);
		// 		if(events.items.length == 0)
		// 			$("#upcoming").html('<h3>Message</h3><p>No incoming events for now. Add, like, and follow our social media pages to get the latest updates for our upcoming events!</p>');
		// 		else {
		// 			var nextEvent = events.items[0];
		// 			var datex = new Date(nextEvent.start.substring(0,19));
		// 			var tmp = document.createElement("DIV");
		// 			tmp.innerHTML = nextEvent.about;
		// 			$("#upcoming").html('<h3>'+nextEvent.title+'</h3>'+
		// 				'<p>'+((nextEvent.hasOwnProperty("about") ? tmp.textContent.split(/\s+/).slice(0,20).join(" ")+"..." : ''))+'</p>'+
		// 								'<p><i class="mdi mdi-map-marker" style="margin-right: 12px"></i>'+nextEvent.location+'</p>'+
		// 								'<p><i class="mdi mdi-calendar" style="margin-right: 12px"></i>'+dateFormat(datex, "dddd, mmmm dS, yyyy, h:MM TT")+'</p>'+
		// 				'<p class="right"><a class="button" href="'+nextEvent.eventUrl+'" target="_blank"><i class="mdi mdi-ticket" style="margin-right: 12px"></i>Apply for a Ticket</a></p>');
		// 			if(events.items.length > 1) {
		// 				$("#other_events").show().append('<div class="columns"><div class="col-12"></div></div>');
		// 				var first = true;
		// 				for(var i = 1; i < events.items.length; i++) {
		// 					console.log(event);
		// 					var event = events.items[i];
		// 					datex = new Date(event.start.substring(0,19));
		// 					tmp = event.about;
		// 					var nomargin = "";
		// 					if(first) {
		// 						nomargin = ' style="margin-top: 0px;"';
		// 						first = false;
		// 					}
		// 					$("#other_events").find(".col-12").append('<div class="card"'+nomargin+'>'+
		// 							'<div class="wrapper">'+
		// 								'<h3>'+event.title+'</h3>'+ 
		// 								'<p><i class="mdi mdi-map-marker" style="margin-right: 12px"></i>'+event.location+'</p>' +
		// 								'<p><i class="mdi mdi-calendar" style="margin-right: 12px"></i>'+dateFormat(datex, "dddd, mmmm dS, yyyy, h:MM TT")+'</p>'+
		// 								'<p class="right"><a class="button" href="'+event.eventUrl+'" target="_blank"><i class="mdi mdi-ticket" style="margin-right: 12px"></i>Apply for a Ticket</a></p>'+
		// 							'</div>'+
		// 						'</div>');
		// 				}
		// 			}
		// 		}
		// 	}
		// });
		$.ajax({
			type: "get",
			crossOrigin: true,
			cache: true,
			url: "https://api.meetup.com/gdgphilippines/events?callback=?",
			dataType: 'jsonp',
			data: { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 },
			success: function(events) {
				console.log(events);
				if(events.data.length > 0) {
					var ne = events.data[0];
					var datex = new Date(ne.time);
					$("#upcoming").html('<h3>'+ne.name+'</h3>'+ne.description+
						((ne.hasOwnProperty("venue")) ? '<p><i class="mdi mdi-map-marker" style="margin-right: 12px"></i>'+ne.venue.city+', '+ne.venue.localized_country_name+'</p>' : '') +
						'<p><i class="mdi mdi-calendar" style="margin-right: 12px"></i>'+datex.toDateString()+', '+datex.toLocaleTimeString()+'</p>'+
						'<p><i class="mdi mdi-account-multiple" style="margin-right: 12px"></i>'+ne.yes_rsvp_count+' attending members</p>'+
						'<p class="right"><a class="button" href="'+ne.link+'" target="_blank"><i class="mdi mdi-ticket" style="margin-right: 12px"></i>Apply for a Ticket</a></p>');
					if(events.data.length > 1) {
						$("#other_events").show().append('<div class="columns"><div class="col-12"></div></div>');
						var first = true;
						for(var i = 1; i < events.data.length; i++) {
							datex = new Date(events.data[i].time);
							var nomargin = "";
							if(first) {
								nomargin = ' style="margin-top: 0px;"';
								first = false;
							}
							$("#other_events").find(".col-12").append('<div class="card"'+nomargin+'>'+
									'<div class="wrapper">'+
										'<h3>'+events.data[i].name+'</h3>'+ ((events.data[i].hasOwnProperty("venue")) ? 
										'<p><i class="mdi mdi-map-marker" style="margin-right: 12px"></i>'+events.data[i].venue.city+', '+events.data[i].venue.localized_country_name+'</p>' : '')+
										'<p><i class="mdi mdi-calendar" style="margin-right: 12px"></i>'+datex.toDateString()+', '+datex.toLocaleTimeString()+'</p>'+
										'<p><i class="mdi mdi-account-multiple" style="margin-right: 12px"></i>'+events.data[i].yes_rsvp_count+' attending members</p>'+
										'<p class="right"><a class="button" href="'+events.data[i].link+'" target="_blank"><i class="mdi mdi-ticket" style="margin-right: 12px"></i>Apply for a Ticket</a></p>'+
									'</div>'+
								'</div>');
						}
					}
				} else {
					$("#upcoming").html('<h3>Message</h3><p>No incoming events for now. Add, like, and follow our social media pages to get the latest updates for our upcoming events!</p>');	
				}
			}
		});
	},
	getBlogPosts: function(c) {
		$.ajax({
			type: "get",
			crossOrigin: true,
			cache: true,
			url: "https://www.blogger.com/feeds/1542160289050145778/posts/default/?alt=json-in-script&callback=?",
			dataType: 'jsonp',
			data: { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 },
			success: function(posts) {
				if(c) c(posts);
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