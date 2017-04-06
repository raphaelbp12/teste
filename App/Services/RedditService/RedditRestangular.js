angular.module('App').factory('RedditRestangular', ['$q', 'Restangular', function ($q, Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('https://www.reddit.com/r/');
    });
}]);