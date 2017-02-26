App["View"] = {
	"construct": function(parameters) {
		this.setTemplate(App.Constant.DEFAULT_TEMPLATE);
		$(".template").html("");
	},
	"setTemplate": function(template) {
		this["TEMPLATE"] = template;
		return this;
	},
	setTitle: function(title) {
		document.title = title;
	},
	"render": function() {
		var template = this.TEMPLATE;
		if(template == false) {
			this.loadPage(false);
		} else {
			$.ajax({
				"url": "app/views/"+template+".html",
				"cache": true,
				"success": function(html) {
					App.View.loadPage(html);
				},
				"error": function(e) {
					App.location("error", "template-not-found", [template, App.Utility.getControllerCode(App.CONTROLLER), App.ACTION])
				}
			});
		}
	},
	loadPage: function(html) {
		$.ajax({
			"cache": true,
			"url": "app/views/"+App.Utility.getControllerCode(App.CONTROLLER)+"/"+App.ACTION+".html",
			"success": function(html2) {
				if(html == false) {
					$(".template").html(html2);
				} else {
					$(".template").html(html);
					$("<div></div>").html(html2).children().each(function() {
						$(".template").html($(".template").html().replace(new RegExp("{{"+$(this).attr("id")+"}}", "g"), $(this).html()));
					});
				}
				$(".template").attr("controller", App.Utility.getControllerCode(App.CONTROLLER))
							  .attr("action", App.ACTION);
				App.refresh();
			},
			"error": function(e) {
				App.location("error", "page-not-found", [App.Utility.getControllerCode(App.CONTROLLER), App.ACTION])
			}
		})
	}
}