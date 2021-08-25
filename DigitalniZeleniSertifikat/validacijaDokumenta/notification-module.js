jQuery(document).ready(function () {

    jQuery('#confirmNotificationsUpdate').on('click', function (e) {
        e.preventDefault();

        var checkboxes = jQuery('.notifications-form .checkboxItem');
        var isSuccessessfullyUpdatedNotification = jQuery("#IsSuccessessfullyUpdatedNotification");

        var ids = [];

        for (var i = 0; i < checkboxes.length; i++) {
            var notificationGroupId = checkboxes[i].value.split(',')[0];
            var deliveryTypeId = checkboxes[i].value.split(',')[1];
            var notificationChecked = document.querySelectorAll('input[type=checkbox]')[i].checked;
            ids.push({ notificationGroupId, deliveryTypeId, notificationChecked });
        }

        function parseNotifcations(array) {
            const groups = [];

            for (let i = 0; i < array.length; i++) {
                const notificationGroupId = array[i].notificationGroupId;
                const deliveryTypeId = array[i].deliveryTypeId;
                const notificationChecked = array[i].notificationChecked;

                const notification = groups.find(g => g.NotificationGroupId === notificationGroupId);
                //const notificationIndex = groups.findIndex(g => g.NotificationGroupId === notificationGroupId);

                if (notification) {
                    notification.DeliveryTypes.push({ "DeliveryTypeId": deliveryTypeId, "Selected": notificationChecked });
                     }    
                else {
                    groups.push({
                        "NotificationGroupId": notificationGroupId,
                        "DeliveryTypes": [
                            { "DeliveryTypeId": deliveryTypeId, "Selected": notificationChecked }
                        ]
                    });
                }
            }

            return groups;
        }

        var notifications = JSON.stringify(parseNotifcations(ids));
        console.log(notifications);

        
        var form = jQuery('#updateNotificationForm');
        var token = jQuery('input[name="__RequestVerificationToken"]', form).val();
        
        jQuery.ajax({
            type: "POST",
            async: false,
            url: "/Notifications/UpdateNotifications",
            beforeSend: function (request) {
                request.setRequestHeader("RequestVerificationToken", token);
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: notifications,
            success: function () {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                toastr.success(isSuccessessfullyUpdatedNotification.data("success"));
            }
        });
    });
});