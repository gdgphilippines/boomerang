App["Function"] = {
	"login": function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		App.Firebase.auth.signInWithPopup(provider);
	},
	"logout": function() {
		App.Firebase.auth.signOut();
	}
}