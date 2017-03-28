function Firebase(config) {
	this.config = config;
	this.user = false;
	this.initialize = function() {
		firebase.initializeApp(this.config);
		this.auth = firebase.auth();
		this.database = firebase.database();
		this.storage = firebase.storage();
		this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
	}

	this.ref = function(dir) {
		return this.database.ref(dir);
	}

	this.onAuthStateChanged = function(user) {
		if(user) {
			this.user = user;
			$("[data-show-if-user]").show();
			$("[data-show-if-visitor]").hide();
			$("#userContainer").html('<img src="'+user.photoURL+'" class="dp" />');
			App.Firebase.ref("users/"+user.uid).once("value", function(data) {
				if(!data.child("displayName").exists())
					App.Firebase.ref("users/"+user.uid).set({
						displayName: user.displayName,
						photoURL: user.photoURL,
						email: user.email,
						list: {}
					});	
				App.Firebase.ref("users/"+user.uid).update({
					photoURL: user.photoURL
				});
			});
			App.location("inventory", "index", []);
		} else {
			this.user = false;
			App.location("home", "index", []);
			$("[data-show-if-user]").hide();
			$("[data-show-if-visitor]").show();
		}
	}

	this.initialize();
}