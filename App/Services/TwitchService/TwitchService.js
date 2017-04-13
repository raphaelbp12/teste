angular.module('App').service('TwitchService', ['TwitchRestangular', function (TwitchRestangular) {

    var self = this;

    self.teste = 'teste';

    self.streams = [];

    self.search = function (names) {
        //console.log("twitch called");
        TwitchRestangular.all('users').customGET('', {login: names}).then(function(response) {
            //console.log("response.users", response.users);
        });
    };

    self.searchGame = function (names) {
        //console.log("twitch called");
        TwitchRestangular.all('search').customGET('games', {query: names}).then(function(response) {
            //console.log("search.games", response.games);
        });
    };

    self.getChannels = function () {
        //console.log("twitch called");
        TwitchRestangular.all('streams/').customGET('', {channel: TWITCH_CHANNELS}).then(function(response) {
            //console.log("_total", response._total);
            console.log("response.streams", response.streams);
            self.streams = response.streams;
            // response.streams.forEach(function (stream) {
            //     self.streams.push(stream);
            // });
        });
    };
}]);