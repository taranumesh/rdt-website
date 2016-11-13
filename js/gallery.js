// Fn to allow an event to fire after all images are loaded
$.fn.imagesLoaded = function() {
    // get all the images (excluding those with no src attribute)
    var $imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!$imgs.length) {
        return $.Deferred().resolve().promise();
    }
    // for each image, add a deferred object to the array which resolves when the image is loaded (or if loading fails)
    var dfds = [];
    $imgs.each(function() {
        var dfd = $.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function() {
            dfd.resolve();
        }
        img.onerror = function() {
            dfd.resolve();
        }
        img.src = this.src;
    });
    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return $.when.apply($, dfds);
}
$(function() {
    var numcol = 4;
    var padding = 30;
    var itemHeight = "auto";
    var imgHeight = "auto";
    var imgWidth = "100%";
    var delay = 0;

        //Responsive adjustments
    if ($("#desktopTest").is(":hidden")) {
        $("#brand").text("RDT")
        numcol = 3;
        $(".grid").css("padding", "5px");
        padding = 5;
        var column = ($(window).width() - (padding * 2) - 15) / numcol;
        itemHeight = column;
        imgHeight = "100%";
        imgWidth = "auto";
    }
    var column = ($(window).width() - (padding * 2) - 15) / numcol;

    $.ajax({
        url: "./api/gallery_init.php",
        data: {
            key: 0,
            index: 0
        },
        method: "GET",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                delay = i * 0.05
                $('<div class="grid-item" style = "animation-delay:' + delay + 's;transform:scale(0);height:'+itemHeight+'px;overflow:hidden;"><img src="images/gallery/' + data[i] + '" style="max-height: 100%; height:'+imgHeight+';width:'+imgWidth+';"></div>').appendTo(".grid");
            }
            $('.grid-item').css("width", column + "px");
            $(".grid").imagesLoaded().then(function() {
                $(".grid-item").on("click", function() {
                    $('#imagepreview').attr('src', $(this).find("img").attr('src')); // here asign the image to the modal when the user click the enlarge link
                    $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
                });
                $('.grid').masonry({
                    // options
                    itemSelector: '.grid-item',
                    columnWidth: column,
                    gutter: 5
                });
            });
        },
        dataType: "json"
    });

});
