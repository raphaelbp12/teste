angular.module('App').directive('widgetGenerator', function($compile) {
    return {
        scope: {
            widget: '='
        },
        link: function(scope, element) {
            element.append($compile('<div class="widget-awe" '+scope.widget.type+' content="widget.data"></div>')(scope));
        }
    };
});