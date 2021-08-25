jQuery(document).ready(function () {
    var button = jQuery("#sendDataToBank");
    button.prop("disabled", true);
    jQuery('.checkBoxSendDataToBank').click(function () {
        jQuery('.checkBoxSendDataToBank').not(this).prop('checked', false);
        var acceptedSending = jQuery('#acceptedSendingDataToBank').is(":checked");
        if (acceptedSending) {
            button.prop("disabled", false);
        } else {
            button.prop("disabled", true);
        }
        var denySending = jQuery('#denySendingDataToBank').is(":checked");
        if (denySending) {
            jQuery('#denySendingDataToBankMessage').show();
        } else {
            jQuery('#denySendingDataToBankMessage').hide();
        }
    });

    jQuery('#sendDataToBank').on('click', function (e) {
        e.preventDefault();
        var bankId = jQuery('#bankIdValue').val();
        var transactionId = jQuery('#uniqueTransactionId').val();
        var push = jQuery('#push').val();

        window.showLoadingBar();
        jQuery('#sendDataToBankLoadingMessage').dialog(HTMLDialogElement);
        jQuery.ajax({
            async: true,
            cache: false,
            type: 'POST',
            url: '/mpmb/pošalji-podatke',
            data: JSON.stringify({ BankId: bankId, UniqueTransactionId: transactionId, Push: push }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess) {
                    jQuery('#sendDataToBankLoadingMessage').hide();
                    jQuery('#finalPopUp').dialog(HTMLDialogElement);
                    
                }
                else {
                    jQuery('#sendDataToBankLoadingMessage').hide();
                    jQuery('#wholeWebsite').prop("disabled", true);
                    toastr.error(data.error, { timeOut: 3000, preventDuplicates: true });
                    setTimeout(function () {
                        location.href = "/mpmb";
                    }, 4000);
                    
                    return false;
                }


            },
            error: function (err) {
                jQuery('#sendDataToBankLoadingMessage').hide();
                jQuery('#wholeWebsite').prop("disabled", true);
                toastr.error(err, { timeOut: 3000, preventDuplicates: true });
                setTimeout(function () {
                    location.href = "/mpmb";
                }, 4000);
                return false;
            }
        });
    });

    jQuery('#cancelSendingData').click(function () {
        location.href = "/";
        return false;
    });
    jQuery('#allActionsFinished').click(function () {
        location.href = "/";
        return false;
    });

});