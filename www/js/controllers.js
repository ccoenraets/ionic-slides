angular.module('starter.controllers', ['starter.services'])

    .controller('MenuCtrl', function ($scope, Slides) {
        $scope.titles = Slides.getTitles();
    })

    .controller('SlidesCtrl', function ($scope, $compile, $cordovaCamera, $cordovaSocialSharing, Slides) {

        Slides.init('#wrapper', 'slides.html', $scope);

        $scope.takePicture = function() {

            document.addEventListener("deviceready", function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 600,
                    targetHeight: 400,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.image = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                    // error
                });

            }, false);
        }

        $scope.shareTwitter = function() {
            $cordovaSocialSharing
                .shareViaTwitter("Live tweeting from #FluentConf stage using @IonicFramework app. Great Audience!", $scope.image)
                .then(function(result) {
                    alert('success');
                }, function(err) {
                    alert('error');
                });
        }



    });
