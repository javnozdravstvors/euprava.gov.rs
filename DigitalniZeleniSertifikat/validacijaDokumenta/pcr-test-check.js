jQuery(document).ready(function () {
    var isSuccessPopup = jQuery("#IsSuccessPopup");

    if (isSuccessPopup.val() !== undefined) {
        if (isSuccessPopup.val().toLowerCase() == "true") {
            jQuery("#sucessMessage").html(isSuccessPopup.data("success"));
            jQuery("#pcr-success-message").addClass("visible");
        }
    };
});

function CloseAndRefresh() {
    location.href = "/proverapcrtestova"
}

function CloseAndRedirectToHome() {
    location.href = "/"
}

