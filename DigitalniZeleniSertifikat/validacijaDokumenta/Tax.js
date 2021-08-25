jQuery(document).ready(function () {
    var CallFromCreateReport = jQuery("#CallFromCreateReport");

    if (CallFromCreateReport.val() !== undefined) {
        if (CallFromCreateReport.val().toLowerCase() == "true") {
            toastr.success(CallFromCreateReport.data("success"));
        }
    }

});