

(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/platform.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

(function() {
	"use strict";

	var DEFAULT_ROUTE = 'home';

	var template = document.querySelector('#t');
	
	template.addEventListener('template-bound', function(e) {
		// Use URL hash for initial route. Otherwise, use the first page.
		this.route = this.route || DEFAULT_ROUTE;
	});
})();