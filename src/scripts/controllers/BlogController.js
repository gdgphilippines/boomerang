App.Controller["BlogController"] = {
	"construct": function(parameters) {

	},
	"index": function(parameters) {
		return App.View.render();
	},
	"error": function(parameters) {
		return App.View.render();
	},
	"view": function(parameters) {
		App.getBlogPosts(function(posts) {
			var sp = false;
			$.each(posts.feed.entry, function(index, post) {
				if(post.link[4].href.substring(30) == parameters[0]) {
					sp = {
						"title": post.title.$t,
						"date": dateFormat(post.published.$t.substring(0,19), "dddd, mmmm dS, yyyy, h:MM TT"),
						"content": post.content.$t 
					};
				}
			});
			if(sp == false) {
				App.location("blog", "error", []);
			} else {
				App.View.setJson(sp);
			}
			App.View.render();
		});
		return 
			App.View.render();
	}
}