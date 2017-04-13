angular.module('App').service('RedditService', ['RedditRestangular', function (RedditRestangular) {

    var self = this;

    self.teste = 'teste';

    self.data = [];

    self.pagination = function(){
      console.log('pagination');
    };

    self.getSubreddit = function (subreddit, topic, after) {
        //console.log("reddit called");
        RedditRestangular.all(subreddit).customGET(topic+'.json', {'after': after}).then(function(response) {
            console.log('response.data', response.data);
            var found = false;

            var predata = {};
            predata.children = response.data.children;
            predata.before = response.data.before;
            predata.after = response.data.after;
            predata.subreddit = subreddit;

            self.addPosts(predata);
        });
    };

    self.addPosts = function (posts){
        var found = false;
        var newPosts = [];

        self.data.forEach(function (data, indexData) {
            if(data.subreddit && data.subreddit == posts.subreddit){
                //console.log('found', true);
                found = true;
                var foundID = false;
                self.data[indexData].after = posts.after;


                //console.log('self.data[indexData]', self.data[indexData]);

                posts.children.forEach(function (postToAdd) {
                    data.children.forEach(function (child, indexChild) {
                        if(child.data.id == postToAdd.data.id){
                            //console.log('foundID', true);
                            //console.log('child.data.subreddit_id', child.data.id);
                            //console.log('postToAdd.data.subreddit_id', postToAdd.data.id);

                            foundID = true;
                            self.data[indexData].children[indexChild] = postToAdd;
                        }
                    });
                    if(!foundID){
                        //console.log('foundID', false);
                        newPosts.push(postToAdd);
                    }
                });

                self.data[indexData].newPosts = newPosts;
            }
        });

        if (!found){
            self.data.push(posts);
        }
    };

    self.searchGame = function (names) {
        //console.log("reddit called");
        RedditRestangular.all('search').customGET('games', {query: names}).then(function(response) {
            //console.log("search.games", response.games);
        });
    };
}]);