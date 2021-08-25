jQuery(document).ready(function () {
    jQuery('input[type=radio][name=MedicalExaminationSelection]').change(function () {
        if (this.value == 'no') {
            //jQuery("#submitButton").prop("disabled", true);
            jQuery("#yes-confirm-message.form-popup").addClass("visible");
        }
        else {
            jQuery("#yes-confirm-message.form-popup").addClass("visible");
        }

    });



    jQuery('#UILanguage').on('change', function () {
        this.form.submit();
    });

    var $selects = jQuery("select[name^='ForeignLanguage']");
    $selects.on('change', function () {
        jQuery("option", $selects).prop("disabled", false);
        $selects.each(function () {
            var $select = jQuery(this),
                $options = $selects.not($select).find('option'),
                selectedText = $select.children('option:selected').text();
            $options.each(function () {
                if (jQuery(this).text() == selectedText && selectedText != '') jQuery(this).prop("disabled", true);
            });
        });
    });

    var $selectsProgram = jQuery("select[name^='ElectiveProgram']");
    $selectsProgram.on('change', function () {
        jQuery("option", $selectsProgram).prop("disabled", false);
        $selectsProgram.each(function () {
            var $select = jQuery(this),
                $options = $selectsProgram.not($select).find('option'),
                selectedText = $select.children('option:selected').text();
            $options.each(function () {
                if (jQuery(this).text() == selectedText && selectedText != '') jQuery(this).prop("disabled", true);
            });
        });
    });

    $selects.eq(0).trigger('change');
    $selectsProgram.eq(0).trigger('change');




});


jQuery(document).ready(function () {
    var isSuccessPopup = jQuery("#IsSuccessPopup");

    if (isSuccessPopup.val() !== undefined) {
        if (isSuccessPopup.val().toLowerCase() == "true") {
            jQuery("#sucessMessage").html(isSuccessPopup.data("success"));
            jQuery("#success-message").addClass("visible");
        }
    };
});

function CloseAndRedirect() {
    location.href = "/moje-aktivnosti"
}

function CloseAndRefresh() {
    location.reload();
}

function ConfirmRequestExecute() {
    jQuery("#yes-confirm-message.form-popup").removeClass("visible");
    jQuery("#submitButton").prop("disabled", false);
    jQuery("#submitButton").click();

    return false;
}

function CancelRequestExecute() {
    jQuery("#yes-confirm-message.form-popup").removeClass("visible");
    jQuery("#submitButton").prop("disabled", true);
    jQuery('input[type=radio][name=MedicalExaminationSelection]').prop("checked", false);
    return false;
}
