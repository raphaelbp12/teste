angular.module('App').service('RedditService', ['RedditRestangular', function (RedditRestangular) {

    var self = this;

    self.teste = 'teste';

    self.data = [];

    self.pagination = function(){
      console.log('pagination');
    };

    self.hot = function (subreddit, limit) {
        console.log("twitch called");
        RedditRestangular.all(subreddit).customGET('hot.json', {'limit': limit}).then(function(response) {
            console.log('response.data', response.data);
            var found = false;

            var predata = {};
            predata.children = response.data.children;
            predata.before = response.data.before;
            predata.after = response.data.after;
            predata.subreddit = subreddit;

            self.data.forEach(function (data, index) {
                if(data.subreddit && data.subreddit == subreddit){
                    found = true;
                    self.data[index] = predata;
                }
            });
            if (!found){
                self.data.push(predata);
            }
        });
    };

    self.searchGame = function (names) {
        console.log("twitch called");
        RedditRestangular.all('search').customGET('games', {query: names}).then(function(response) {
            console.log("search.games", response.games);
        });
    };

    self.getChannels = function () {
        console.log("twitch called");
        RedditRestangular.all('streams/').customGET('', {channel: TWITCH_CHANNELS}).then(function(response) {
            console.log("_total", response._total);
            console.log("response.streams", response.streams);
            self.streams = response.streams;
        });
    };
}]);