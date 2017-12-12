Vue.component('turn-order', {
    data() {
        return createTurnState();
    },
    methods: {
        updateVal: function (id, ipcs) {
            console.log(id, ipcs);
            localStorage.setItem(buildStorageKey(id), ipcs);
        },
        reset: function () {
            if (confirm("Do you want to wipe out IPC data?"));
            {
                for (var i = 0; i < this.countries.length; i++) {
                    localStorage.removeItem(buildStorageKey(this.countries[i].Name));
                }
                location.reload();
            }
        }
    }
});
  
function buildStorageKey(id) {
    return "IPC_" + id;
}



function createTurnState() {
    var data = {};
    data.countries = $.extend([], Factions.Countries);// Clone units data
    for (var i = 0; i < data.countries.length; i++){
        var ipcVal = localStorage.getItem(buildStorageKey(data.countries[i].Name));
        if (ipcVal) data.countries[i].IPC = parseInt(ipcVal);
    }
    return data;
}