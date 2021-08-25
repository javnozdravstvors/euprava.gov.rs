(function () {
    registerEvents();
})();

function registerEvents() {
    if (document.querySelector(".reader a")) {
        document.querySelector(".reader a").addEventListener("click", sendText);
    }
}

function sendText(e) {
    e.preventDefault();

    let content = document.querySelector(".page-content");
    let contentClon = content.cloneNode(true);
    contentClon.querySelector(".reader").remove();
    let contentText = contentClon.innerText.replace(/(\r\n|\n|\r|\t)/gm, "")

    postAjax('/tts', contentText,
        function (response) { play(response); },
        function (response) { handleError(response); });
}

function play(response) {
    console.log(response.responseText);
    var player = document.querySelector("audio");
    player.src = "/tts/" + response.responseText;
    player.classList.remove("hidden");
}

function handleError(response) {
    console.log(response.responseText);
}

function postAjax(url, data, callback, error) {
    let isFormData = data instanceof FormData;
    let isStringData = typeof data === 'string';

    var params = isFormData ? data :
        isStringData ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); }).join('&');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    if (isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        params = JSON.stringify(params);
    }

    if (document.getElementsByName("__RequestVerificationToken").length > 0) {
        xhr.setRequestHeader('RequestVerificationToken', document.getElementsByName("__RequestVerificationToken")[0].value);
    }
    

    xhr.onload = function () {
        if (xhr.readyState === 4 & xhr.status === 200) {
            console.log(xhr.responseText);
            if (xhr.responseText !== '') {
                if (typeof data === 'string') {
                    callback(xhr);
                }
                else callback(JSON.parse(xhr.responseText));
            }
            else {
                callback();
            }
        }
        else {
            error(xhr);
        }
    };
    xhr.send(params);
}
jQuery(document).ready(function () {
    jQuery('.checkboxLangType').click(function () {
        jQuery('.checkboxLangType').not(this).prop('checked', false);        
    });
    jQuery('.checkboxDocType').click(function () {
        jQuery('.checkboxDocType').not(this).prop('checked', false);
    });


    jQuery('#requestForCovidPassportButton').on('click', function (e) {
        e.preventDefault();
        //var umcn = jQuery('#UmcnOrEbs').val();
        var passportIssuingCountry = jQuery('#Country').val();
        var passportNumber = jQuery('#PassportNumber').val();
        var confirmationNumber = jQuery('#ConfirmationNumber').val();
        var email = jQuery('#UserEmail').val();
        var docLang = jQuery('.checkboxLangType:checked').val();
        var docType = jQuery('.checkboxDocType:checked').val();
        var isCheckedLangType = jQuery('.checkboxLangType:checked').is(':checked'); 
        var isCheckedDocType = jQuery('.checkboxDocType:checked').is(':checked'); 
        var isCheckedConsent = jQuery('.checkBoxSendDataForDGC:checked').is(':checked');
        if (passportNumber != null && passportNumber != ' ' && passportNumber.length > 1 && (passportIssuingCountry === null || passportIssuingCountry === "")) {
            toastr.error("Потребно је да одаберете земљу издавања пасоша! / You need to select the country of issue of the passport!", { timeOut: 5000, preventDuplicates: true });
            return;
        }
        if (!isCheckedLangType) {
            toastr.error("Потребно је да одаберете комбинацију језика на документу! / You need to select the language combination on the document!", { timeOut: 5000, preventDuplicates: true });
            return;
        }
        if (!isCheckedDocType) {
            toastr.error("Потребно је да одаберете тип уређаја! / You need to select the device type!", { timeOut: 4000, preventDuplicates: true });
            return;
        }
        if (!isCheckedConsent) {
            toastr.error("Потребно је да дате сагласност! / You need to give consent!", { timeOut: 4000, preventDuplicates: true });
            return;
        }
        var emailValidFormat = validateEmail();
        if (!emailValidFormat) {
            return;
        }
        var isCheckedResultOftheDisease = jQuery('#noDisplayResultsOfTheDisease').is(':checked');
        var noResultOftheDisease = "0";
        if (isCheckedResultOftheDisease) {
            noResultOftheDisease = "1";  
        }


        var isCheckedVaccinationData = jQuery('#noDisplayVaccinationData').is(':checked');
        var noDisplayVaccinationData = "0";
        if (isCheckedVaccinationData) {
            noDisplayVaccinationData = "1";
        }

        var isCheckedIGGTestResults = jQuery('#noDisplayIGGTestResults').is(':checked');
        var noDisplayIGGTestResults = "0";
        if (isCheckedIGGTestResults) {
            noDisplayIGGTestResults = "1";
        }

        window.showLoadingBar();
        jQuery.ajax({
            async: true,
            cache: false,
            type: 'POST',
            url: '/DigitalniZeleniSertifikat/SlanjeZahteva',
            data: JSON.stringify({ PassportNumber: passportNumber, Email: email, DocType: docType, DocLang: docLang, NoDisplayResultsOfTheDisease: noResultOftheDisease, NoDisplayVaccinationData: noDisplayVaccinationData, NoDisplayIGGTestResults: noDisplayIGGTestResults, PassportIssuingCountry: passportIssuingCountry, ConfirmationNumber: confirmationNumber  }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess) {
                    toastr.success(data.message, { timeOut: 3500, preventDuplicates: true });
                    setTimeout(function () {
                        location.href = "/";
                    }, 3800);
                    return false;
                }
                else {
                    toastr.error(data.error, { timeOut: 3000, preventDuplicates: true });
                    setTimeout(function () {
                        location.href = "/DigitalniZeleniSertifikat";
                    }, 4000);
                    return false;
                }
            },
            error: function (err) {
                toastr.error(err, { timeOut: 3000, preventDuplicates: true });
                setTimeout(function () {
                    location.href = "/";
                }, 4000);
                return false;
            }
        });
    });

    jQuery('#requestForCovidPassportAnonymousButton').on('click', function (e) {
        e.preventDefault();
       
        var passportIssuingCountry = jQuery('#Country').val();
        var confirmationNumber = jQuery('#ConfirmationNumber').val();
        var passportNumber = jQuery('#PassportNumber').val();
        var email = jQuery('#UserEmail').val();
        var docLang = jQuery('.checkboxLangType:checked').val();
        var docType = jQuery('.checkboxDocType:checked').val();
        var isCheckedLangType = jQuery('.checkboxLangType:checked').is(':checked');
        var isCheckedDocType = jQuery('.checkboxDocType:checked').is(':checked');
        var isCheckedConsent = jQuery('.checkBoxSendDataForDGC:checked').is(':checked');
        if (!isCheckedLangType) {
            toastr.error("Потребно је да одаберете комбинацију језика на документу! / You need to select the language combination on the document!", { timeOut: 5000, preventDuplicates: true });
            return;
        }
        if (!isCheckedDocType) {
            toastr.error("Потребно је да одаберете тип уређаја! / You need to select the device type!", { timeOut: 4000, preventDuplicates: true });
            return;
        }
        if (!isCheckedConsent) {
            toastr.error("Потребно је да дате сагласност! / You need to give consent!", { timeOut: 4000, preventDuplicates: true });
            return;
        }
        if ((passportNumber === null || passportNumber === "") && (confirmationNumber === null || confirmationNumber === "")) {
            toastr.error("Потребно је да унесте или број пасоша и земљу издавања пасоша или шифру потврде вакцинације! / You need to enter either the passport number and the country of issue of the passport or the vaccination confirmation number!", { timeOut: 6000, preventDuplicates: true });
            return;
        }
        if ((passportIssuingCountry === null || passportIssuingCountry === "") && passportNumber != null && passportNumber != ' ' && passportNumber.length > 1 ) {
            toastr.error("Потребно је да одаберете земљу издавања пасоша! / You need to select the country of issue of the passport!", { timeOut: 5000, preventDuplicates: true });
            return;
        }              
        var emailValidFormat = validateEmail();
        if (!emailValidFormat) {
            return;
        }
       
        window.showLoadingBar();
        jQuery.ajax({
            async: true,
            cache: false,
            type: 'POST',
            url: '/DigitalniZeleniSertifikatStranci/SlanjeZahteva',
            data: JSON.stringify({ PassportNumber: passportNumber, Email: email, DocType: docType, DocLang: docLang, PassportIssuingCountry: passportIssuingCountry, ConfirmationNumber: confirmationNumber }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess) {
                    toastr.success(data.message, { timeOut: 3500, preventDuplicates: true });
                    setTimeout(function () {
                        location.href = "/";
                    }, 3800);
                    return false;
                }
                else {
                    toastr.error(data.error, { timeOut: 3000, preventDuplicates: true });
                    setTimeout(function () {
                        location.href = "/DigitalniZeleniSertifikatStranci";
                    }, 4000);
                    return false;
                }
            },
            error: function (err) {
                toastr.error(err, { timeOut: 3000, preventDuplicates: true });
                setTimeout(function () {
                    location.href = "/DigitalniZeleniSertifikatStranci";
                }, 4000);
                return false;
            }
        });
    });
});
jQuery(document).ready(function () {
    jQuery('#closeCovidPassportResponse').click(function () {
        location.href = "/";
        return false;
    });

});
function validateEmail() {
    //var filter = /^([\w-\.]+)@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = jQuery("#UserEmail").val();
    if (email.length > 0 && !filter.test(email)) {
        toastr.error("Емаил није у добром формату!/Email is invalid.", { timeOut: 3000, preventDuplicates: true });
        jQuery("#UserEmail").focus();
        return false;
    }
    else if (email.length == 0) {
        toastr.error("Емаил је обавезно поље!/Email is required.", { timeOut: 3000, preventDuplicates: true });
        jQuery("#UserEmail").focus();
        return false;
    }
    else {
        return true;
    }
}