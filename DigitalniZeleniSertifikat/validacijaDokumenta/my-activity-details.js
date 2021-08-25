jQuery(document).ready(function () {
    jQuery('.ActivityDetails').on('click', function (e) {
        e.preventDefault();
        var anchor = this;
        jQuery.ajax({
            url: "/detalji-aktivnosti",
            dataType: "html",
            data: { "serviceId": jQuery(this).attr('data-id'), "serviceTypeId": jQuery(this).attr('data-type') },
            type: "GET",
            contentType: "application/json",
            success: function (response) {
                var currentActiveLi = document.querySelector("ul.acm-log li.active");
                currentActiveLi.classList.remove("active");
                anchor.parentElement.classList.add("active");
                jQuery('#activitieDetails').html(response);
                jQuery(".act-finance>li.open>.content").css("display", "block"), jQuery(".act-finance>li>.acl-head").click((function (a) {
                    jQuery(this).parent().find(">.content").slideToggle(300), jQuery(this).parent().toggleClass("open")
                }));
                var button = jQuery("#sendMsg");
                button.prop("disabled", true);
                jQuery("#msg").keyup(function () {
                    button.prop("disabled", (this.value === "") ? true : false);
                });

            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    });
});
jQuery(document).ready(function () {
    var IsSentUserPortalMessage = jQuery("#IsSentUserPortalMessage");

    if (IsSentUserPortalMessage.val() !== undefined) {
        if (IsSentUserPortalMessage.val().toLowerCase() == "true") {
            toastr.success(IsSentUserPortalMessage.data("success"));
        }
    }

});
jQuery(document).ready(function () {
    var button = jQuery("#sendMsg");
    button.prop("disabled", true);


    jQuery("#msg").keyup(function () {
        button.prop("disabled", (this.value === "") ? true : false);

    });

});
