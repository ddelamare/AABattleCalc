Vue.filter('sumss', function (list, key1) {
    return list.reduce(function (total, item) {
        return 1 * (total + item[key1]);
    }, 0);
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'AA Battle Resolver'
    }
});
