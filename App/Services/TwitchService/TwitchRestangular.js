angular.module('App').factory('TwitchRestangular', ['$q', 'Restangular', function ($q, Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('https://api.twitch.tv/kraken/');
        RestangularConfigurer.setDefaultHeaders({
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID": "1nngnb16bjbyco9e5ow1albf3huq3v"
        });
    });
}]);