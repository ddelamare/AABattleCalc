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
        },
        nextPhase: function () {
            var nextPhase = this.phase + 1;
            if (nextPhase >= this.phases.length)
            {
                this.nextFaction();
            }
            else
            {
                this.setPhase(nextPhase);
            }
        },
        setPhase: function (phase) {
            this.phase = phase % (this.phases.length);
        },
        nextFaction: function () {
            this.setPhase(0);
            var nextFaction = this.faction + 1;
            if (nextFaction >= this.countries.length) {
                this.turnCount = this.turnCount + 1;
            }
            this.setFaction(nextFaction);
        },
        setFaction: function (faction) {
            this.faction = faction % (this.countries.length);
        }
    }
});
  
function buildStorageKey(id) {
    return "IPC_" + id;
}



function createTurnState() {
    var data = {};
    data.countries = $.extend([], Factions.Countries);// Clone units data
    data.phases = $.extend([], TurnPhases);
    data.phase = 0;
    data.faction = 0;
    data.turnCount = 1;
    for (var i = 0; i < data.countries.length; i++){
        var ipcVal = localStorage.getItem(buildStorageKey(data.countries[i].Name));
        if (ipcVal) data.countries[i].IPC = parseInt(ipcVal);
    }
    return data;
}