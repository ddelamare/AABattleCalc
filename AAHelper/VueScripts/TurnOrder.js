Vue.component('turn-order', {
    data() {
        return createTurnState();
    }
});


function createTurnState() {
    var data = {};
    data.countries = $.extend([], Factions.Countries);// Clone units data
    return data;
}