angular.module('App').service('RedditService', ['RedditRestangular', '$q', function (RedditRestangular, $q) {

    var self = this;


    self.loading = false;

    self.data = [];

    self.getSubredditObjectWithIndex = function(subreddit){
        var ret = {}
        self.data.forEach(function (data, indexData) {
            if (data.subreddit && data.subreddit === subreddit) {
                ret = {data: data, index: indexData};
            }
        });

        return ret;
    };

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

    self.changeTopic = function (subreddit, topic) {
        self.data.forEach(function (data, indexData) {
            if (data.subreddit && data.subreddit === subreddit) {
                self.data[indexData].topic = topic;
                self.data[indexData].children = [];
                self.data[indexData].newPosts = [];
                self.data[indexData].after = [''];

                self.getSubreddit(self.data[indexData].subreddit, self.data[indexData].topic, self.data[indexData].after[self.data[indexData].after.length - 1], true);
            }
        });
    };

    self.pagination = function(subreddit){

        var deferred = $q.defer();
        //console.log('pagination called');

        var subredditWithIndex = self.getSubredditObjectWithIndex(subreddit);
        //console.log('subredditWithIndex', subredditWithIndex);

        deferred.resolve(
            //console.log('pagination');
            self.getSubreddit(subredditWithIndex.data.subreddit, subredditWithIndex.data.topic, subredditWithIndex.data.after[subredditWithIndex.data.after.length - 1], true).then(function(data){
                //console.log('pagination', data);
                return data;
            })
        );

        return deferred.promise;
    };

    self.showNotification = function (subreddit) {
        console.log('showNotfication');
        self.data.forEach(function (data, indexData) {
            if (data.subreddit && data.subreddit === subreddit) {
                self.data[indexData].newPosts.forEach(function (newPost) {
                    self.data[indexData].children.unshift(newPost);
                });
                self.data[indexData].newPosts = [];
            }
        });
    };

    self.getSubreddit = function (subreddit, topic, after, pagination) {
        //console.log("reddit called");

        var deferred = $q.defer();

        var predata = {};

        deferred.resolve(
            RedditRestangular.all(subreddit).customGET(topic+'.json', {'after': after}).then(function(response) {
                //console.log('response.data', response.data);
                var found = false;
                predata.children = response.data.children;
                predata.before = response.data.before;
                predata.after = ['', response.data.after];
                predata.subreddit = subreddit;
                predata.topic = topic;
                predata.newPosts = [];

                self.addPosts(predata, pagination);
                //console.log('getSubreddit', predata);
                return predata;
            })
        );

        return deferred.promise;
    };

    self.addPosts = function (posts, pagination){
        /*  Recebe um object de resposta do Reddit, pesquisa na variavel $scope.data pelo subreddit desejado.
            Caso ache, adiciona o after dessa consulta no array de after e tenta atualizar cada post.
            Para isso, itera-se sobre cada post existente e compara o id com cada post recebido.
            Caso ache, atualiza o post. Caso contrário, adiciona-se na lista 'newPosts'.
            No final, verifica se a função foi chamada pela paginação ou não. Se tiver sido, os novos
            posts tem q ser adicionados na lista de posts normal. Caso contrário, se a função for chamada
            apenas para dar update, os novos posts tem q ser adicionados na notificação. Ao fazer isso,
            verifica-se se o post já existe na lista de 'newPosts' para não ocorrer duplicação.
        */
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
                        foundID = false;
                    }
                });

                if(pagination){
                    self.data[indexData].children = self.data[indexData].children.concat(newPosts);
                } else {
                    newPosts.forEach(function (newPostToAdd) {
                        foundID = false;
                        //console.log('newPostToAdd', newPostToAdd.data.id, data.subreddit);
                        self.data[indexData].newPosts.forEach(function (existPost, indexExtPost) {
                            if(existPost.data.id == newPostToAdd.data.id){
                                foundID = true;
                                self.data[indexData].newPosts[indexExtPost] = newPostToAdd;
                            }
                        });
                        if(!foundID){
                            console.log('notification added');
                            self.data[indexData].newPosts = self.data[indexData].newPosts.concat(newPostToAdd);
                            foundID = false;
                        }
                    });
                }
                self.data[indexData].topic = posts.topic;
            }
        });

        if (!found){
            self.data.push(posts);
        }
    };
}]);