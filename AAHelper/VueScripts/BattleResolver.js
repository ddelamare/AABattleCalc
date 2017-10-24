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

            this.clearHits();
            //TODO: Battleships?

            // Roll each unit's die
            for (var i = 0; i < this.units.length; i++)
            {
                for (var atk = 0; atk < this.units[i].attackerQty; atk++)
                {
                    var roll = this.rollDie();
                    if (roll <= this.units[i].attack)
                    {
                        this.units[i].attackerHits++;
                    }
                }
                for (var def = 0; def < this.units[i].defenderQty; def++) {
                    roll = this.rollDie();
                    if (roll <= this.units[i].defend) {
                        this.units[i].defenderHits++;
                    }
                }
            }
            battleStats.rollChart.options.scales.yAxes[0].ticks.beginAtZero = true;
            battleStats.rollChart.update();

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
        useCryptoRand: false
    };
    data.units = $.extend([], Units);// Clone units data
    console.log(data.units);
    // Do per row inits
    for (var i = 0; i < data.units.length; i++)
    {
        data.units[i].attackerQty  = '0';
        data.units[i].attackerHits = 0;
        data.units[i].defenderQty  = '0';
        data.units[i].defenderHits = 0;
    }
    return data;
}
