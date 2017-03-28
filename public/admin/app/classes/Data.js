function Data() {
	this.val = false;
	this.set = function(v) {
		this.val = v;
	};

	this.pull = function(c) {
		var item = this;
		App.Firebase.ref("/").once("value", function(data) {
			item.val = data.val();
			if(c) c(data.val());
		})
	};

	this.get = function(dir) {
		var dir = dir.split("/");
		var current = this.val;
		if(current) {
			for(var i in dir) {
				if(current.hasOwnProperty(dir[i]))
					current = current[dir[i]];
				else
					return false;
			}
			return current;
		}
		return false;
	}
}