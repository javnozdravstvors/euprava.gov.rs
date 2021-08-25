jQuery(document).ready(function () {
    const bank_request_page = jQuery('#bank-credit-request').length;
    const bank_link_request_page = jQuery('#bank-link-credit-request').length;
    if(bank_request_page) {
        jQuery('#confirmChoosenBank').on('click', function (e) {
            jQuery('#bankLoadingMessage').dialog(HTMLDialogElement);
        });
    }
    if (bank_link_request_page) {
        jQuery('#confirmChoosenBankBankLink').on('click', function (e) {
            jQuery('#bankLinkLoadingMessage').dialog(HTMLDialogElement);
        });
    }
});

