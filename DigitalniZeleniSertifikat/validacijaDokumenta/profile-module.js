function showButton() {
    jQuery('#verificationNumberButton').removeAttr('disabled');    
}
jQuery(document).ready(function () {
    
    jQuery('#verificationCode').css({ "width": "60%", "float": "left" });
    jQuery('#verificationCodeButton').css({ "width": "39%", "margin-left": "1%", "float": "left" });

    var isSuccessessfullyUpdatedUser = jQuery("#IsSuccessessfullyUpdatedUser");

    if (isSuccessessfullyUpdatedUser.val() !== undefined) {
        if (isSuccessessfullyUpdatedUser.val().toLowerCase() == "true") {
            toastr.success(isSuccessessfullyUpdatedUser.data("success"));
        }
    }

    

    jQuery('#CellPhone').mask('(+381) 699999999');

    jQuery('#verificationNumberButton').on('click', function (e) {
        e.preventDefault();
        var phoneNumber = jQuery('#CellPhone').val();
        if (phoneNumber == "") return;
        jQuery.ajax({
            url: "/мој-профил/нотификација-за-активациони-код",
            method: 'GET',
            data: jQuery.param({ cellPhone: phoneNumber }),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                if (data.isSuccess) {
                    jQuery('#verify-number').addClass('visible');                    
                } else {
                    toastr.error(data.error);
                }
            }
        });
    });

    jQuery('#verificationCodeButton').on('click', function (e) {
        e.preventDefault();
        var phoneNumber = jQuery('#CellPhone').val();
        var code = jQuery('#verificationCode').val();
        if (code == "") return;
        jQuery.ajax({
            url: "/мој-профил/измена-броја-телефона",
            method: 'GET',
            data: jQuery.param({ code: code ,cellPhone: phoneNumber }),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                if (data.isSuccess) {
                    jQuery('#verify-number').removeClass('visible');  
                    toastr.success("Успешно сте променили број телефона.");                   
                } else {
                   
                    toastr.error(data.error);
                   
                }
            }
        });
    });

});