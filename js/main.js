//TODO: count times News is used to stop repetition


function Corpo(name, price, ticker, pricehistory, used) {
    this.name = name;
    this.price = price;
    this.ticker = ticker;
    this.pricehistory = pricehistory
}

var Corpos = [
    new Corpo("PatentNX", 40, "PTX", [40]), 
    new Corpo("CityAdmin", 10, "CAM", [10]),
    new Corpo("The Syndicate", 5, "SYN", [5]),
    new Corpo("Saphire Real Estate", 2, "SRE", [2]),
    new Corpo("Ancorp-Trade", 1, "ANC", [1]),
    new Corpo("Faith Unlimited", 500, "GOD", [400])
]

function Position(name, size, entry) {
    this.name = name;
    this.size = size;
    this.entry = entry
}

var Positions = []

function Player(funds) {
    this.funds = funds
}        

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
    }
}

//funky funcs
function calcNetworth(funds, positions) {
    var rv = 0
    rv += funds
    for (var n = 0; n < positions.length; n++) {
        rv += positions[n].size
    }
    return rv
}

function countTicks() {
    globalTicks += 1 
    //console.log(globalTicks)
}

function MarketRandomness(number) {
    var min = 1.05 * number
    var max = 0.95 * number 
    return  Math.random() * (max - min) + min
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}


function calcPrices(n, i) {
   let alchemy = MarketRandomness(i)
   Corpos[n].price *= alchemy 
   Positions[n].size *= alchemy
   if (Corpos[n].pricehistory.length >= 200) {Corpos[n].pricehistory.shift()}
   Corpos[n].pricehistory.push(Corpos[n].price)
}

function setPrices () {
    let activeNews = findActiveNews()
    for (var n = 0; n < Corpos.length; n++) {
        if (activeNews != null && NewsFeed[activeNews].name === Corpos[n].name) {
            var newsItem = NewsFeed[activeNews]
            calcPrices(n, newsItem.pricefactor)
            newsItem.activeticks += 1
            if (newsItem.activeticks == newsItem.duration) {
                newsItem.activeticks = 0
                newsItem.isactive = false
            };
            //console.log("news0: " + NewsFeed[0].activeticks + " news1: " + NewsFeed[1].activeticks +" news2: " + NewsFeed[2].activeticks)
            } else {
            calcPrices(n, 1)
        }
    }

    if (fundsHistory.length >= 50) {fundsHistory.shift()}
    fundsHistory.push(Math.round(calcNetworth(player.funds, Positions)))
}
  
//clock
setInterval(function(){
    newsTrigger(20)
    setPrices()
    renderPlayer()
    renderWindowPosition()
    renderNews()
    chartFunds.update()
    chartCorpo0.update()
    chartCorpo1.update()
    chartCorpo2.update()
    chartCorpo3.update()
    chartCorpo4.update()
    chartCorpo5.update()
}, 2000)

//news
var windownews = document.getElementById("windownews")

function newsAggregator(newsarray, text, length) {
    if (newsarray.length == length) {newsarray.shift()}
    var today = new Date();
    var time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0");
    newsarray.push(time + " >> " +text)
}

function findActiveNews() {
    var rv = null 
    //limited to one news, in future return array of active news??
    //accumulates news apparently, giving priority to last in found in iteration. newspool might accumulate indef.. 
    for (var n = 0; n < NewsFeed.length; n++) {
        if (NewsFeed[n].isactive === true) {
            rv = n
        }
    }
    //console.log("findActiveNews() returns: " ,rv)
    return rv
}

function findLeastUsedNews() {
    var rv = []
    var temp = []
    for (var n = 0; n < NewsFeed.length; n++) {
        temp.push(Number(NewsFeed[n].used))
    } 
    var least = Math.min(...temp)
    for (var n = 0; n < NewsFeed.length; n++) {
        if (NewsFeed[n].used <= least) {
            rv.push(n)
        }
    }
    return rv
}

function pickNews() {
    var n = findLeastUsedNews()
    var rv = n[getRandomInt(n.length)]
    return rv
}

var latestNews = []
function newsTrigger(cycletime){
    countTicks()
    //if picked event is already triggered it skips. expand to iterate until it finds an inactive one?
    if (globalTicks % cycletime === 0) {
            var n = pickNews()
            if (NewsFeed[n].isactive == false) {
                NewsFeed[n].isactive = true
                NewsFeed[n].used += 1
                console.log(NewsFeed[n].text)
                newsAggregator(latestNews, NewsFeed[n].text, 5)
            } else {
                return null
            }
    } else {
        return null
    }
}

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
} 

for (var n = 0; n < Corpos.length; n++) {
    var optionSelectCorpo = document.createElement("option")
    optionSelectCorpo.text = Corpos[n].name + ":" + Corpos[n].ticker
    optionSelectCorpo.value = Corpos[n].name
    selectCorpo.add(optionSelectCorpo)
}

selectedCorpo = selectCorpo.value
selectedSize = 0

//charts

var windowmarket = document.getElementById("windowmarket")
for (var n = 0; n < Corpos.length; n++) {
    var div = document.createElement("div")
    div.classList.add("stockprice")
    div.innerHTML = Corpos[n].ticker
    windowmarket.appendChild(div)
    var c = document.createElement("canvas")
    c.id = Corpos[n].name
    div.appendChild(c)
}

//
var windowPositions = document.getElementById("windowpositions");

function renderWindowPosition() {
    if (windowPositions.childElementCount != 0) {
        while (windowPositions.firstChild) {
            windowPositions.firstChild.remove()
        }
    }

    for (var n = 0; n < Positions.length; n ++) {
        if (Positions[n].size != 0) {
            var elementPosition = document.createElement("div");
            var tkr = Corpos[n].ticker
            var pos = Math.round(Positions[n].size)
            var sp = Corpos[n].price
            var entry = Math.round(Positions[n].entry)
            elementPosition.innerHTML = tkr + ">> ENTRY:" + entry + "$ POSITION:" + pos + "$ P/L:" + (pos-entry) + "$";
            windowPositions.appendChild(elementPosition);
        }
    }
}

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
        console.log ("type sell")
        return true;
    } else { 
        return false;
    }
}

function renderNews() {
    var feed = document.getElementById("windownews")
    if (feed.childElementCount != 0) {
        while (feed.childElementCount != 0) {
            feed.firstChild.remove()
        }
    } 
    if (latestNews.length == 0) {
            latestNews.push("###### TERMINAL CONNECTION ESTABLISHED ####### NEWSFEED IS ONLINE ####### CITYADMIN WISHES YOU A PRODUCTIVE DAY")
        }
    for (var n = 0; n < latestNews.length; n++) {
                var newsitem = document.createElement("div")
        newsitem.innerHTML = latestNews[n]
        newsitem.className = "news"
        feed.appendChild(newsitem)
        if (feed.firstChild != null) {
            feed.insertBefore(newsitem, feed.firstChild)
        }
    } 
}

//interface

selectCorpo.oninput = function() {
    selectedCorpo = selectCorpo.value
}

selectSize.onchange = function() {
    selectedSize = Number(selectSize.value)
}

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
}

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
}

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
}

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
}
