// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaDevice, $cordovaPush, $cordovaDialogs, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    console.log($cordovaDevice.getPlatform());

    switch($cordovaDevice.getPlatform())
    {
      case "Android":
        var androidConfig = {
          "senderID": "132184595434",
        };
        $cordovaPush.register(androidConfig).then(
          
          function(result) {
            // Success
            console.log("android push register success", result);
            $cordovaDialogs.alert(JSON.stringify(result), 'Push Register Success', 'OK')
            .then(function() {
              // callback success
            });
          }, 

          function(err) {
            // Error
            console.log("android push register error", err);
            $cordovaDialogs.alert(JSON.stringify(err), 'Push Register Failed', 'OK')
            .then(function() {
              // callback success
            });
          }
        );

        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
          switch(notification.event) {
            case 'registered':
              if (notification.regid.length > 0 ) {
                // alert('registration ID = ' + notification.regid);
                $cordovaDialogs.alert('Registration ID = '  + notification.regid, 'Android Push Id', 'OK')
                .then(function() {
                  // callback success
                });
              }
              break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              // alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
              $cordovaDialogs.alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt, 'Android Push Message', 'OK')
              .then(function() {
                  // callback success
              });
              break;

            case 'error':
              // alert('GCM error = ' + notification.msg);
              $cordovaDialogs.alert('GCM error = ' + notification.msg, 'GCM Error', 'OK')
              .then(function() {
                  // callback success
              });
              break;

            default:
              // alert('An unknown GCM event has occurred');
              $cordovaDialogs.alert('An unknown GCM event has occurred', 'Unknown GCM', 'OK')
              .then(function() {
                  // callback success
              });
              break;
          }
        });

        // WARNING: dangerous to unregister (results in loss of tokenID)
        // $cordovaPush.unregister(options).then(function(result) {
        //   // Success!
        // }, function(err) {
        //   // Error
        // });


      break;

      case "iOS":
      break;

      default:
      break;
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
