jQuery(document).ready(function () {
    jQuery('.ed').on('click', function (e) {
        e.preventDefault();
        var $this = jQuery(this)
        jQuery.ajax({
            url: "GetEditView",
            dataType: "html",
            data: { "documentId": $this.data('id') },
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                jQuery('#edit-popup').empty();
                jQuery('#edit-popup').html(response);

                setExpiredDateInput();

                submitEditDocumentForm();

            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    });
});
jQuery(document).ready(function () {
    var IsSuccessEventOnDocument = jQuery("#IsSuccessEventOnDocument");

    if (IsSuccessEventOnDocument.val() !== undefined) {
        if (IsSuccessEventOnDocument.val().toLowerCase() == "true") {
            toastr.success(IsSuccessEventOnDocument.data("success"));
        }
    }

});
jQuery(document).ready(function () {
    var openAddNewDocumentPopUp = jQuery("#OpenAddNewDocumentPopup");

    if (openAddNewDocumentPopUp.val() !== undefined) {
        if (openAddNewDocumentPopUp.val().toLowerCase() == "true") {
            jQuery("#add-popup.form-popup").addClass("visible");
            
        }
    }

});
jQuery(document).ready(function () {
    

});


function setExpiredDateInput() {
    var expiredDateInput = jQuery('#edit-popup').find("#ExpiredDate");
    jQuery('#edit-popup').find(".datepicker-ui").datepicker({
        dateFormat: "dd.mm.yy.",
        dayNames: window.dayNames,
        dayNamesMin: window.dayNames.map((function (e) {
            return e.substring(0, 2)
        })),
        dayNamesShort: window.dayNames.map((function (e) {
            return e.substring(0, 3)
        })),
        monthNames: window.monthNames,
        monthNamesShort: window.monthNames.map((function (e) {
            return e.substring(0, 3)
        })),
        onSelect: function (e) {
            expiredDateInput.val(e)
        }
    }).datepicker("setDate", expiredDateInput.val());
}

function submitEditDocumentForm() {
    jQuery('#updateDocumentFormId').submit(function (e) {
        e.preventDefault();

        var form = jQuery('#updateDocumentFormId');
        jQuery.ajax({
            cache: false,
            async: true,
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {
                if (data.isSuccessUpdate === undefined) {
                    jQuery('#edit-popup').empty();
                    jQuery('#edit-popup').html(data);

                    setExpiredDateInput();
                    submitEditDocumentForm();
                }
                else {
                    location.reload();
                }
            }
        });
    });
}