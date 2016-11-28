Form = {
	ready: function() {
		this.init();
	},
	init: function() {
		$("form.validate").each(function() {
			$(this).find("input, textarea").focusout(function() {
				var message = "";
				if($(this).attr("type") == "email") {
					if (!($(this).val().indexOf('@') !== -1 && 
							$(this).val().substring($(this).val().indexOf('@')+1).indexOf('.') !== -1 &&
							$(this).val().substring($(this).val().indexOf('@') + $(this).val().substring($(this).val().indexOf('@')+1).indexOf('.') + 2) != ""))
						message = "Email format is invalid.";
				} else if($(this).attr("type") == "password") {
					if($(this).is("[min]") && $(this).val().length < $(this).attr("min"))
						message = "Minimum length is " + $(this).attr("min");
					else if($(this).is("[max]") && $(this).val().length > $(this).attr("max"))
						message = "Maximum length is " + $(this).attr("max");
				} else if($(this).attr("type") == "number") {
					if($(this).is("[min]") && parseInt($(this).val()) < $(this).attr("min"))
						message = "Minimum is " + $(this).attr("min");
					else if($(this).is("[max]") && parseInt($(this).val()) > $(this).attr("max"))
						message = "Maximum is " + $(this).attr("max");
				} else if($(this).attr("type") == "date") {
					$min = new Date($(this).attr("min"));
					$max = new Date($(this).attr("max"));
					$val = new Date($(this).val());
					if($(this).is("[min]") && $val.getTime() < $min.getTime())
						message = "Date should be on or before " + $min.getMonthName() + " " + $min.getDate() + ", " + $min.getFullYear();
					else if($(this).is("[max]") && $val.getTime() > $min.getTime())
						message = "Date should be on or after " + $min.getMonthName() + " " + $min.getDate() + ", " + $min.getFullYear();
				}
				if($(this).is("[required]") && $(this).val() == "")
					message = "This field is required";
				if(message == "")
					Input.removeMessage($(this));
				else
					Input.showMessage($(this), message);
				Form.checkForm($(this).parents("form"));
			})
		})
	},
	checkForm: function($form) {
		$ok = true;
		$form.find("input[type=text], input[type=password], input[type=email], input[type=number], input[type=date], input[type=time], textarea").each(function() {
			if($(this).is("[required]") && $(this).val() == "") 
				$ok = false;
		})
		if(!$ok) {
			$form.find("input[type=submit]").attr("disabled", "disabled");
			return;
		}
		$form.find("input[type=submit]").removeAttr("disabled");
	}
}