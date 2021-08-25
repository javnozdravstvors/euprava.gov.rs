
jQuery(document).ready(function () {
    const defaultName = jQuery('#bank-name').text();
    //jQuery('.checkboxForBank').removeAttr('checked');

    jQuery('.checkboxForBank').click(function () {
        jQuery('.checkboxForBank').not(this).prop('checked', false);
        var testChackBox = jQuery('.checkboxForBank').is(":checked");
        if (testChackBox) {
            jQuery('#confirmChoosenBank').show();
            var nazivBanke = jQuery('.checkboxForBank:checked').attr('bank-name');
            jQuery('#bank-name').text(nazivBanke);
        } else {
            jQuery('#bank-name').text(defaultName);
            jQuery('#confirmChoosenBank').hide();
        }
        var vrednostSelektovanog = jQuery('.checkboxForBank:checked').val();
        jQuery('#preuzimaVrednost').val(vrednostSelektovanog);
        var nazivBanke = jQuery('.checkboxForBank:checked').attr('bank-name');

        jQuery('#bank-name').text(nazivBanke);
    });
    var error = jQuery('#error-message').text();
    if (error) {
        setTimeout(function () {
            jQuery('#error-message').hide('blind', {}, 500)
        }, 4000);
    }
});
