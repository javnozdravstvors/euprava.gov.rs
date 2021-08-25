jQuery(document).ready(function () {
    var isSuccess = jQuery("#IsSuccessfullyRequestData");
    if (isSuccess.val() !== undefined) {
        if (isSuccess.val().toLowerCase() == "true") {
            toastr.success(isSuccess.data("success"));
        }
    }

    var UnSuccess = jQuery("#UnsuccessfullyRequestData");
    if (UnSuccess.val() !== undefined) {
        if (UnSuccess.val().toLowerCase() == "true") {
            toastr.error(UnSuccess.data("error"));
        }
    }   
    
   // var button = jQuery("#sendRequestForChackingData");
    var warningLabel = jQuery('#warningMessage');
    warningLabel.hide();
    //button.prop("disabled", true);
    //jQuery("#ComplainReason").keyup(function () {
    //    var checkedNumber = jQuery(':checkbox:checked').length;
    //    button.prop("disabled", (this.value === "" || checkedNumber === 0) ? true : false);              
    //});
    //jQuery("#sendRequestForChackingData").click(function () {
    //    var checkedNumber = jQuery(':checkbox:checked').length;
    //    var descriptionValue = jQuery("#ComplainReason");
    //    if (checkedNumber === 0 || descriptionValue.value === "") {
    //        warningLabel.show();
    //        return;
    //    }
    //});

    jQuery("#centralRegisterForm").submit(function (event) {
        var checkedNumber = jQuery(':checkbox:checked').length;
        var descriptionValue = jQuery("#ComplainReason").val();
        if (checkedNumber === 0 || descriptionValue === "") {
            warningLabel.show();
            event.preventDefault();
        }
        else {
            return;
        }
    });
});