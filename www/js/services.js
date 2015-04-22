angular.module('starter.services', [])

    .factory('Slides', function ($compile, $http) {

        var titles = [];

        function init(wrapper, template, scope) {

            $http.get(template, null).then(function(result) {

                var gallery,
                    i,
                    page,
                    slides = [],
                    slideStr = result.data,
                    startIndex = 0,
                    endIndex = 0,
                    section,
                    counter = 0;

                startIndex = slideStr.indexOf('<section', endIndex);

                while (startIndex > -1) {
                    endIndex = slideStr.indexOf('</section>', startIndex);
                    if (endIndex < 0) break;
                    section = slideStr.substr(startIndex, endIndex + 10);
                    counter++;
                    titles.push('Slide ' + counter);
                    slides.push($compile(section)(scope)[0]);
                    startIndex = slideStr.indexOf('<section', endIndex);
                }

                gallery = new SwipeView(wrapper, { numberOfPages: slides.length });

                for (i = 0; i < 3; i++) {
                    page = i == 0 ? slides.length - 1 : i - 1;
                    gallery.masterPages[i].appendChild(slides[page]);
                }

                setTimeout(function () {
                    var p = parseInt(window.location.hash.substr(2)) || 0;
                    gallery.goToPage(p);
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

                    window.location.hash = "#/" + gallery.pageIndex;

                    for (i = 0; i < 3; i++) {
                        upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
                        if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
                            el = gallery.masterPages[i].querySelector('section');
                            if (el) gallery.masterPages[i].removeChild(el);
                            el = gallery.masterPages[i].appendChild(slides[upcoming]);
                            el.className += " loading";
                        }
                    }

                });

                window.onkeyup = function (event) {
                    if (event.keyCode === 39) {
                        return gallery.next();
                    }
                    if (event.keyCode === 37) {
                        return gallery.prev();
                    }
                }

                window.onhashchange = function () {
                    var p = parseInt(window.location.hash.substr(2)) || 0;
                    gallery.goToPage(p);
                }

            });

        }

        return {
            init: init,
            getTitles: function() {
                return titles;
            }
        };

    });
