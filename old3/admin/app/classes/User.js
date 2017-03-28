function User(id) {

}

User.prototype = {
	"set": function(id, c) {
		var user = this;
		App.Firebase.ref("users/"+id).once("value", function(data) {
			user.id = id;
			user.name = data.val().displayName;
			user.email = data.val().email;
			user.dp = data.val().photoURL;
			if(c) c();
		});
	}
}