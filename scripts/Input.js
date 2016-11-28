Input = {
    ready: function() {
        this.readyInput();
        this.readySelect();
        this.readyTextArea();
    },
    readyInput: function() {
        $("label input[type=text], label input[type=password], label input[type=date], label input[type=time], label input[type=email], label input[type=number]").each(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val != "" || $type == "date" || $type == "time")
                $(this).siblings("span:not(.validate-message)").addClass("top");
            $(this).parents("label").append("<border></border>");
        }).focus(function() {
            $(this).siblings("span:not(.validate-message)").addClass("top");
        }).focusout(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val == "" && !($type == "date" || $type == "time"))
                $(this).siblings("span:not(.validate-message)").removeClass("top");
        })
    },
    readySelect: function() {
        $("label select").each(function() {
            $(this).siblings("span:not(.validate-message)").addClass("top");
        })
    },
    readyTextArea: function() {
        autosize(document.querySelectorAll('textarea'));
        $("label textarea").each(function() {
            $val = $(this).val();
            if($val != "")
                $(this).siblings("span:not(.validate-message)").addClass("top");
        }).focus(function() {
            $(this).siblings("span:not(.validate-message)").addClass("top");
        }).focusout(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val == "")
                $(this).siblings("span:not(.validate-message)").removeClass("top");
        })
    },
    showMessage: function($input, $message) {
        if($input.siblings("span.validate-message").length != 0)
            $input.siblings("span.validate-message").html($message)
        else
            $input.parents("label").append('<span class="validate-message">'+$message+'</span>');
        $input.addClass("error");
    },
    removeMessage: function($input) {
        $input.siblings("span.validate-message").remove();
        $input.removeClass("error");
    }
}