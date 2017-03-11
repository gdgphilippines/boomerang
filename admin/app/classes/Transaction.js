function Transaction() {
	this.id = 0;
	this.direction = "";
	this.item = false;
	this.quantity = 0;
	this.remarks = "";
	this.storage = false;
	this.user = false;
}

Transaction.prototype = {
	"add": function(data) {
		this.id = App.Firebase.ref("transactions/").push(data).getKey();
		this.direction = data.direction;
		this.item = data.item;
		this.quantity = data.quantity;
		this.remarks = data.remarks;
		this.storage = data.storage;
		this.user = data.user
	},
	"getAll": function(c) {
		App.Firebase.ref("transactions/").once("value", function(data) {
			if(c) c(data.val());
		});
	}
}