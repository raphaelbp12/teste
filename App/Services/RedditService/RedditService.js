angular.module('App').service('RedditService', ['RedditRestangular', function (RedditRestangular) {

    var self = this;

    self.loading = false;

    self.data = [];

    self.getUpdate = function(subreddit){
        self.data.forEach(function (data) {
            if (data.subreddit && data.subreddit === subreddit) {
                for(var i = 0; i < data.after.length - 1; i++){
                    //console.log('getUpdate', subreddit, after);
                    self.getSubreddit(data.subreddit, data.topic, data.after[i], false);
                }
            }
        });
    };

    self.pagination = function(subreddit){

        self.data.forEach(function (data) {
            if (data.subreddit && data.subreddit === subreddit) {
                if(!self.loading){
                    console.log('pagination');
                    self.getSubreddit(data.subreddit, data.topic, data.after[data.after.length - 1], true);
                }
            }
        });
    };

    self.getSubreddit = function (subreddit, topic, after, pagination) {
        //console.log("reddit called");
        var predata = {};
        self.loading = true;

        RedditRestangular.all(subreddit).customGET(topic+'.json', {'after': after}).then(function(response) {
            console.log('response.data', response.data);
            var found = false;
            predata.children = response.data.children;
            predata.before = response.data.before;
            predata.after = ['', response.data.after];
            predata.subreddit = subreddit;
            predata.topic = topic;
            predata.newPosts = [];

            self.loading = false;

            self.addPosts(predata, pagination);
        });
    };

    self.addPosts = function (posts, pagination){
        var found = false;
        var newPosts = [];

        self.data.forEach(function (data, indexData) {
            if(data.subreddit && data.subreddit === posts.subreddit){
                found = true;
                var foundID = false;

                if(!self.data[indexData].after.includes(posts.after[1]) && pagination){
                    self.data[indexData].after.push(posts.after[1]);
                }


                posts.children.forEach(function (postToAdd) {
                    data.children.forEach(function (child, indexChild) {
                        if(child.data.id == postToAdd.data.id){
                            foundID = true;
                            self.data[indexData].children[indexChild] = postToAdd;
                        }
                    });
                    if(!foundID){
                        newPosts.push(postToAdd);
                    }
                });

                if(pagination){
                    self.data[indexData].children = self.data[indexData].children.concat(newPosts);
                } else {
                    self.data[indexData].newPosts = self.data[indexData].newPosts.concat(newPosts);
                }
                self.data[indexData].topic = posts.topic;
            }
        });

        if (!found){
            self.data.push(posts);
        }
    };
}]);