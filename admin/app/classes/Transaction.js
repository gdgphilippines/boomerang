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
		this.item = new Item();
		this.item.set(data.itemid);
		this.quantity = data.quantity;
		this.remarks = data.remarks;
		this.storage = new Storage();
		this.storage.set(data.storageid);
		this.user = new User();
		this.user.set(data.userid);
	},
	"getAll": function(c) {
		App.Firebase.ref("transactions/").once("value", function(data) {
			if(c) c(data.val());
		});
	}
}