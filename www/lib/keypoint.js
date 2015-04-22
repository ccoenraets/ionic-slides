var keypoint = (function () {

    var slides,
        gallery,
        i,
        page;

    function init() {

        slides = $(".slide");

        var baseURL = "";
        var index = baseURL.indexOf('?');
        if (index>0) {
            baseURL = baseURL.substring(0, index);
        }
        console.log('base url: ' + baseURL);
        var images = $('img');
        for (var i=0;i<images.length;i++) {
            var src = $(images[i]).attr('data-src');
            if (src) {
                $(images[i]).attr('src', baseURL + src);
            }
        }

        $("#slides").remove();

        var liStr = "";
        for (var i=0; i<slides.length; i++) {
            var h1 = $("h1", slides[i]);
            liStr += '<li class="item"><a href="#' + i + '">' + (h1[0] ? h1[0].innerText : 'No title') + "</a></li>";
        }
        $("#list").html(liStr);

        $("#build-btn-right").on('click', function() {
            var builds = $('.build', slides[gallery.pageIndex]);
            if (builds[0]) {
                $(builds[0]).attr('class', 'built');
            } else {
                return gallery.next();
            }
        });

        $("#build-btn-left").on('click', function() {
            var builds = $('.built', slides[gallery.pageIndex]);
            if (builds.length>0) {
                $(builds[builds.length - 1]).attr('class', 'build');
            } else {
                return gallery.prev();
            }
        });

        gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

        for (i = 0; i < 3; i++) {
            page = i == 0 ? slides.length - 1 : i - 1;
            gallery.masterPages[i].appendChild(slides[page]);
        }

        setTimeout(function () {
            //var p = parseInt(window.location.hash.substr(1)) || 0;
            //gallery.goToPage(p);
            gallery.goToPage(0);
        });

        gallery.onTouchStart(function (event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        });

        gallery.onFlip(function () {

            var el,
                upcoming,
                i;

            window.location.hash = "/app/slides/" + gallery.pageIndex;

            for (i = 0; i < 3; i++) {
                upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
                if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
                    el = gallery.masterPages[i].querySelector('.slide');
                    if (el) gallery.masterPages[i].removeChild(el);
                    el = gallery.masterPages[i].appendChild(slides[upcoming]);
                    el.className += " loading";
                }
            }

        });

        window.onkeyup = function (event) {
            if (event.keyCode === 39) {
                var builds = $('.build', slides[gallery.pageIndex]);
                if (builds[0]) {
                    $(builds[0]).attr('class', 'built');
                } else {
                    return gallery.next();
                }
            }
            if (event.keyCode === 37) {
                var builds = $('.built', slides[gallery.pageIndex]);
                if (builds.length>0) {
                    $(builds[builds.length - 1]).attr('class', 'build');
                } else {
                    return gallery.prev();
                }
            }
        }

        //window.onhashchange = function () {
        //    var p = parseInt(window.location.hash.substr(1)) || 0;
        //    gallery.goToPage(p);
        //}

    }


    //prettyPrint();

    //var baseURL = $('#slides').attr('data-base-url');

    return {
        init: init
    }

}());