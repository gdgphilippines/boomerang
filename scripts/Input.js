Input = {
    ready: function() {
        this.readyInput();
        this.readySelect();
        this.readyTextArea();
    },
    readyInput: function() {
        $(document).find("label input[type=text], label input[type=password], label input[type=date], label input[type=time], label input[type=email], label input[type=number]").each(function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val != "" || $type == "date" || $type == "time")
                $(this).siblings("span:not(.validate-message)").addClass("top");
            $(this).parents("label").append("<border><border>");
        });
        $(document).on("focus", "label input[type=text], label input[type=password], label input[type=date], label input[type=time], label input[type=email], label input[type=number]", function() {
            $(this).siblings("span:not(.validate-message)").addClass("top");
        });
        $(document).on("focusout", "label input[type=text], label input[type=password], label input[type=date], label input[type=time], label input[type=email], label input[type=number]", function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val == "" && !($type == "date" || $type == "time"))
                $(this).siblings("span:not(.validate-message)").removeClass("top");
        });
    },
    readySelect: function() {
        $(document).find("label select").each(function() {
            $(this).siblings("span:not(.validate-message)").addClass("top");
        });
    },
    readyTextArea: function() {
        autosize(document.querySelectorAll('textarea'));
        $(document).find("label textarea").each(function() {
            $val = $(this).val();
            if($val != "")
                $(this).siblings("span:not(.validate-message)").addClass("top");
            $(this).parents("label").append("<border><border>");
        });
        $(document).on("focus", "label textarea", function() {
            $(this).siblings("span:not(.validate-message)").addClass("top");
        });
        $(document).on("focusout", "label textarea", function() {
            $val = $(this).val();
            $type = $(this).attr("type");
            if($val == "")
                $(this).siblings("span:not(.validate-message)").removeClass("top");
        });
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