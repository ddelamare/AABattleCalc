var battleStats = {
    rolls: [1, 1, 1, 1, 1, 1],
    rollChart: null
};
var dieRoller = new Random(Random.engines.browserCrypto);
$(function () {
    var ctx = document.getElementById("diceRolls").getContext('2d');
    battleStats.rollChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["1", "2", "3", "4", "5", "6"],
            datasets: [{
                label: '# of hits',
                data: battleStats.rolls,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ]
            }],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    });
});
Vue.component('battle-resolver', {
    //template: `
    //<div>
    //    <h1>Battle Resolver</h1>
    //    <p>{{ testString }}</p>
    //</div>`,
    data() {
        return createBattleState();
    },
    beforeCreate() {
        console.log("Battle Resolver Init Started");
    },
    created() {
        console.log("Battle Resolver Init Finished");
    },
    methods: {
        simulateBattle: function (event) {
            this.logs.push("-----------------Battle Start-----------------");


            this.clearHits();
            //TODO: Battleships?
            // Roll each unit's die
            for (var i = 0; i < this.units.length; i++)
            {
                var supportedQty = 0;
                if (this.units[i].attackerQty)
                    this.logs.push("*****Attackers*****");
                for (var atk = 0; atk < this.units[i].attackerQty; atk++)
                {
                    var roll = this.rollDie();
                    var attackStrength = this.units[i].attack;
                    var isSupported = false;
                    var isHit = false;
                    if (this.isSupported(this.units[i], supportedQty))
                    {
                        attackStrength = attackStrength + 1;
                        supportedQty++;
                        isSupported = true;
                    }
                    if (roll <= attackStrength)
                    {
                        isHit = true;
                        this.units[i].attackerHits++;
                    }
                    var logString = this.units[i].name;
                    if (isSupported)
                    {
                        logString += "(Supported)";
                    }

                    logString += " #" + (atk + 1) + " rolled " + roll + "/" + attackStrength + " and ";
                    if (isHit) {
                        logString += "hit.";
                    }
                    else {
                        logString += "missed.";
                    }

                    this.logs.push(logString);
                }
                if (this.units[i].defenderQty)
                    this.logs.push("*****Defenders*****");
                for (var def = 0; def < this.units[i].defenderQty; def++) {
                    var isHit = false
                    roll = this.rollDie();
                    var defenderStrength = this.units[i].defend;
                    if (roll <= this.units[i].defend) {
                        this.units[i].defenderHits++;
                        isHit = true;
                    }
                    var logString = this.units[i].name;
                    logString += " #" + (def + 1) + " rolled " + roll + "/" + defenderStrength + " and ";
                    if (isHit) {
                        logString += "hit.";
                    }
                    else {
                        logString += "missed.";
                    }

                    this.logs.push(logString);
                }

            }
            battleStats.rollChart.options.scales.yAxes[0].ticks.beginAtZero = true;
            battleStats.rollChart.update();
            this.logs.push("-----------------Battle End-----------------");

        },
        rollDie: function () {
            var result = 0;
            if (this.useCryptoRand) {
                result = dieRoller.die(6);
            }
            else {
                result = Math.floor(Math.random() * 6) + 1; 
            }
            this.pushRoll(result);
            return result;
        },
        pushRoll: function (result) {
            console.log("res: " + result);
            battleStats.rolls[result-1]++;
        },
        clearGrid: function () {
            for (var i = 0; i < this.units.length; i++)
            {
                this.units[i].attackerQty  = 0;
                this.units[i].attackerHits = 0;
                this.units[i].defenderQty  = 0;
                this.units[i].defenderHits = 0;
            }
        },
        clearHits: function () {
            for (var i = 0; i < this.units.length; i++) {
                this.units[i].attackerHits = 0;
                this.units[i].defenderHits = 0;
            }
        },
        isSupported: function (unitClass, supportedSoFar) {
            // Checks if there are support units in the battle and if the support limit has been reached.
            // That is, in the case where there are more supportable units than supporting units.
            if (!unitClass.supportedBy || unitClass.supportedBy.length == 0)
            {
                // If unit is not supportable, return false
                return false;
            }

            var totalSupportUnits = 0;
            // Count total units that are available to support
            var supportingUnitsCount = _.filter(this.units, function (u) { return unitClass.supportedBy.includes(u.name); })
                .reduce(function (left, right) { return left + parseInt(right.attackerQty) }, 0);
            console.log("Units found to support: " + supportingUnitsCount);
            return supportedSoFar < supportingUnitsCount;
        }

    },
    filters: {
        sum: function (list, key) {
            return list.reduce(function (total, item) {
                return 1 * (total + item[key]);
            }, 0);
        }
    }
});
function createBattleState() {
    var data = {
        testString: 'This is actually a battle resolver. Peacefully.',
        techs: [
            {
                name:"1111111"
            },
            {
                name:"22222222"
            },
            {
                name: "1111111"
            },
            {
                name: "22222222"
            }
        ],
        useCryptoRand: false,
        logs: []
    };
    data.units = $.extend([], Units);// Clone units data
    console.log(data.units);
    // Do per row inits
    for (var i = 0; i < data.units.length; i++)
    {
        data.units[i].attackerQty  = 0;
        data.units[i].attackerHits = 0;
        data.units[i].defenderQty  = 0;
        data.units[i].defenderHits = 0;
    }
    return data;
}
