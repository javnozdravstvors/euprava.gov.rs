jQuery(document).ready(function () {
    var isSuccess = jQuery("#IsSuccess");

    if (isSuccess.val() !== undefined) {
        if (isSuccess.val().toLowerCase() == "true") {
            toastr.success(isSuccess.data("success"));
        }
    }

});