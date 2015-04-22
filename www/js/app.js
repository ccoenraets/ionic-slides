angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

    .run(function ($ionicPlatform, $cordovaStatusbar) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                 StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
    });
