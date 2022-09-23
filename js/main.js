function Corpo(name, price, ticker, pricehistory) {
    this.name = name;
    this.price = price;
    this.ticker = ticker;
    this.pricehistory = pricehistory
};

var Corpos = [
    new Corpo("PatentNX", 40, "PTX", [40]), 
    new Corpo("CityAdmin", 10, "CAM", [1]),
    new Corpo("The Syndicate", 5, "SYN", [1]),
    new Corpo("Saphire Real Estate", 2, "SRE", [1])
];

function Position(name, size, entry) {
    this.name = name;
    this.size = size;
    this.entry = entry
};

var Positions = [];

function News(name, text, pricefactor, duration, activeticks) {
    this.name = name 
    this.text = text
    this.pricefactor = pricefactor
    this.duration = duration 
    this.activeticks = activeticks
};
var News = [
    new News(
        Corpos[1].name,
        "BREAKING: CITYADMIN:CAM CEO REZA CALLS FOR INTERNAL PROBE DUE TO SYNDICATE INTERVENTION.",
        1.1,
        50,
        0
    ),
    new News(
        Corpos[2].name,
        "BREAKING: SYNDICATE COUNCIL ACCUSES PATENTNX OF CYBERATTACK INTO CHEMICAL COMPOUNDS DATABASE",
        0.7,
        10,
        0
    ),
];

function Player(funds) {
    this.funds = funds
};        

var  player = new Player(1000)

var globalTicks = 0

//filler data & fundhistory
var fundsHistory = Array(50) 
fundsHistory.fill(1000)
for (var n = 0; n < Corpos.length; n++) {
    let history = Corpos[n].pricehistory
    for (var cycles = 0; cycles <= 200; cycles ++) {
        var rv = history[history.length -1] * MarketRandomness(1)
        history.push(rv)
        Corpos[n].price = rv
    };
};

//funky funcs
function calcNetworth(funds, positions) {
    var rv = 0
    rv += funds
    for (var n = 0; n < positions.length; n++) {
        rv += positions[n].size
    };
    return rv;
};

function countTicks() {
    globalTicks += 1 
    console.log(globalTicks)
};

function newsTrigger(newscycle){
    countTicks()
    if (globalTicks % newscycle === 0) {
        return getRandomInt(News.length)
    } else {
        return null
    }
};

function MarketRandomness(number) {
    var min = 1.05 * number
    var max = 0.95 * number 
    return  Math.random() * (max - min) + min;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

function setPrices () {
    for (var n = 0; n < Corpos.length; n++) {
        let alchemy = MarketRandomness(1)
        Corpos[n].price *= alchemy 
        Positions[n].size *= alchemy
        if (Corpos[n].pricehistory.length >= 200) {Corpos[n].pricehistory.shift()}
        Corpos[n].pricehistory.push(Corpos[n].price)
    };

    if (fundsHistory.length >= 50) {fundsHistory.shift()};
    fundsHistory.push(Math.round(calcNetworth(player.funds, Positions)));
};
//

// News.activeticks <-- counts ative ticks and then timeouts, reset ticks at timeout
// News.isActive <-- when news is triggered, set to true. So no overlapping events or just not trigger the same news twice.
// if News.activeticks >= duration, News.isActive = false, and set price back to default randomness.

//clock
setInterval(function(){
    let n = newsTrigger(40)
    if (n != null) {
        console.log(News[n].text)
    };
    setPrices()
    renderPlayer()
    renderWindowPosition()
    chartFunds.update()
    chartCorpo0.update()
    chartCorpo1.update()
    chartCorpo2.update()
    chartCorpo3.update()
}, 2000);

//events

//tradewindow
var selectCorpo = document.getElementById("corpos");
var selectSize = document.getElementById("size");
var selectBuy = document.getElementById("buy");
var selectSell = document.getElementById("sell");
var selectMaxBuy = document.getElementById("buymax");
var selectMaxSell = document.getElementById("sellmax")

//init positions
for (var n = 0; n < Corpos.length; n++) {
    //entry 0 will probably bug
    Positions.push(new Position(Corpos[n].name, 0, 0))
}; 

for (var n = 0; n < Corpos.length; n++) {
    var optionSelectCorpo = document.createElement("option")
    optionSelectCorpo.text = Corpos[n].name + ":" + Corpos[n].ticker
    optionSelectCorpo.value = Corpos[n].name
    selectCorpo.add(optionSelectCorpo)
};

selectedCorpo = selectCorpo.value
selectedSize = 0

var windowPositions = document.getElementById("windowpositions");


function renderWindowPosition() {
    if (windowPositions.childElementCount != 0) {
        while (windowPositions.firstChild) {
            windowPositions.firstChild.remove()
        };
    };

    for (var n = 0; n < Positions.length; n ++) {
        if (Positions[n].size != 0) {
            var elementPosition = document.createElement("div");
            var tkr = Corpos[n].ticker
            var pos = Math.round(Positions[n].size)
            var sp = Corpos[n].price
            var entry = Math.round(Positions[n].entry)
            elementPosition.innerHTML = tkr + ">> ENTRY:" + entry + "$ POSITION:" + pos + "$ P/L:" + (pos-entry) + "$";
            windowPositions.appendChild(elementPosition);
        };
    };
};

var windowFunds = document.getElementById("windowfunds")

function renderPlayer() {
    if (windowFunds.childElementCount != 0) {
        while (windowFunds.childElementCount != 0) {
            windowFunds.firstChild.remove()
        }    
    }
    var elementFunds = document.createElement("div")
    elementFunds.innerHTML = "FUNDS:" + Math.round(player.funds) + "$ TOTAL:" + fundsHistory[fundsHistory.length -1] + "$";
    windowFunds.appendChild(elementFunds)
};
renderPlayer()

function tradeValidator (type, size, newSize) {
    if (type == "buy" && newSize <= player.funds) {
        console.log("type buy")
        return true;
    } else if ( type == "sell" && size >= newSize) {
        console.log ("type sell");
        return true;
    } else { 
        return false;
    }
};


//market stuff

/*
var windowMarket = document.getElementById("windowmarket")
for (var n = 0; n < Corpos.length; n++) {
    var chart = document.createElement("canvas")
    chart.id = Corpos[n].name
    windowMarket.appendChild(chart)
};
*/

/*
var windowMarket = document.getElementById("windowmarket")
var chart0 = document.createElement("canvas")
var chart1 = document.createElement("canvas")
chart0.id = Corpos[0].name
chart1.id = Corpos[1].name
windowMarket.appendChild(chart0)
windowMarket.appendChild(chart1)
*/

//interface

selectCorpo.oninput = function() {
    selectedCorpo = selectCorpo.value
};

selectSize.onchange = function() {
    selectedSize = Number(selectSize.value)
};

selectBuy.onclick = function() {
    for (var i = 0; i < Positions.length; i++) {
        if (selectCorpo.value == Positions[i].name && tradeValidator("buy", Positions[i].size, selectedSize)) {
            //need to average price based on entry}
            Positions[i].size += selectedSize;
            player.funds -= selectedSize;
            Positions[i].entry += selectedSize
        }
    }
    renderWindowPosition()
    renderPlayer()
    //console.log("NEW BUY! Corpo:", selectedCorpo, "Size:", sSaphire Real Estate 1200 2electedSize);
};

selectSell.onclick = function() {
    for (var i = 0; i < Positions.length; i++) {
        if (selectCorpo.value == Positions[i].name && tradeValidator("sell", Positions[i].size, selectedSize)) {
            Positions[i].size -= selectedSize; 
            player.funds += selectedSize;
            Positions[i].entry -= selectedSize
        }
    }
    renderWindowPosition()
    renderPlayer()
    //console.log("NEW SELL! Corpo:", selectedCorpo, "Size:", selectedSize);
};

selectMaxSell.onclick = function() {
    for (var n = 0; n < Positions.length; n++) {
        if (selectCorpo.value == Positions[n].name) {
            player.funds += Positions[n].size;
            Positions[n].size -= Positions[n].size
            Positions[n].entry -= Positions[n].entry
        }
    }
    renderWindowPosition()
    renderPlayer()
};

selectMaxBuy.onclick = function() {
    for (var n = 0; n < Positions.length; n++) {
        if (selectCorpo.value == Positions[n].name) {
            Positions[n].size += player.funds 
            Positions[n].entry += player.funds
            player.funds -= player.funds 
        }
    }
    renderWindowPosition()
    renderPlayer()
};