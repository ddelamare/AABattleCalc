var Units = [
    {
        name: "Infantry",
        attack: 1,
        defend: 2,
        supportedBy: ["Artillery"]
    },
    {
        name: "Artillery",
        attack: 2,
        defend: 2
    },
    {
        name: "Mech. Infantry",
        attack: 1,
        defend: 2,
        supportedBy: ["Artillery","Tank"]
    },
    {
        name: "Tank",
        attack: 3,
        defend: 3
    },
    {
        name: "AA Gun",
        attack: 0,
        defend: 1
    },
    {
        name: "Fighter",
        attack: 3,
        defend: 4
    },
    {
        name: "Tac. Bomber",
        attack: 3,
        defend: 3,
        supportedBy: ["Fighter", "Tank"]
    },
    {
        name: "Bomber",
        attack: 4,
        defend: 1
    },
    {
        name: "Submarine",
        attack: 2,
        defend: 1
    },
    {
        name: "Transport",
        attack: 0,
        defend: 0
    },
    {
        name: "Destroyer",
        attack: 2,
        defend: 2
    },
    {
        name: "Cruiser",
        attack: 3,
        defend: 3
    },
    {
        name: "Carrier",
        attack: 0,
        defend: 2
    },
    {
        name: "Battleship",
        attack: 4,
        defend: 4
    }

];