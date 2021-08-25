jQuery(document).ready(function () {
    if (document.getElementById("criteria") !== null) {
        document.getElementById("criteria").onkeyup = function () { getTopNByCriteria() };
    }

    function getTopNByCriteria() {
        var $this = jQuery('#criteria');
        if ($this.val() !== null && $this.val() !== undefined && $this.val().length > 2) {
            jQuery.ajax({
                url: "/SearchResult/GetTopNByCriteria",
                data: { "criteria": $this.val(), "top": 5 },
                type: 'GET',
                dataType: 'json', // added data type
                success: function (data) {
                    jQuery("#top-search-result").empty();

                    if (data !== undefined && data !== null && data.length > 0) {
                        jQuery.each(data, function (index, value) {
                            jQuery("#top-search-result").append("<li><a href=usluge/" + value.id + ">" + value.name + "</a></li>");
                        });
                    }
                }
            });
        }
    }

    jQuery('[name=searchForm]').on('submit', function (e) {
        e.preventDefault();
        window.location.href = "/pretraga/" + document.getElementById("criteria").value;        
    })

});