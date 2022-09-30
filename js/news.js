function News(name, text, pricefactor, duration, activeticks, isactive, used) {
    this.name = name 
    this.text = text
    this.pricefactor = pricefactor
    this.duration = duration 
    this.activeticks = activeticks
    this.isactive = isactive
    this.used = used
}

const stdup = 1.05
const stddown = 0.95

var NewsFeed = [
    //##### PTX
    new News(
        Corpos[0].name,
        "BREAKING: PATENTNX:PTX IN TALKS WITH SYNDICATE TO REGISTER PATENT FOR OXY-STIM INHALER",
        stdup,    //pricefactor
        40,      //duration
        0,       //activeticks
        false,   //isactive
        0,       // used
    ),
    new News(
        Corpos[0].name,
        "BREAKING: PATENTNX:PTX IN TALKS WITH ANCORP CONSIDERING EASING RESTRICTIONS OF IP RE: TRADE VIOLATIONS",
        stddown,    //pricefactor
        40,      //duration
        0,       //activeticks
        false,   //isactive
        0,
    ),
    //##### CA
    new News(
        Corpos[1].name,
        "BREAKING: CITYADMIN:CAM LEADER AND CEO MARKIST CALLS FOR INTERNAL PROBE DUE TO SYNDICATE INTERVENTION",
        stdup,    //pricefactor
        40,      //duration
        0,       //activeticks
        false,   //isactive
        0,
    ),
    new News(
        Corpos[1].name,
        "BREAKING: CITYADMIN:CAM LEADER AND CEO MARKIST BLAMING FAITH-UNLIMITED FOR RECENT UNRESTS IN SECTOR 7B",
        stddown,    //pricefactor
        40,      //duration
        0,       //activeticks
        false,   //isactive
        0,
    ),

    //##### SYN
    new News(
        Corpos[2].name,
        "BREAKING: SYNDICATE:SYN DISTRIBUTING POPULAR DRUG 'WHITEFLASH' VIA ANCORP TRADING HUB -- CAM REPORTS",
        stdup,
        40,
        0,
        false,
        0,
    ),
    new News(
        Corpos[2].name,
        "BREAKING: SYNDICATE:SYN COUNCIL ACCUSES PATENTNX OF CYBERATTACK INTO CHEMICAL COMPOUNDS DATABASE",
        stddown,
        40,
        0,
        false,
        0,
    ),
    //##### SRE 
    new News(
        Corpos[3].name,
        "BREAKING: SAPHIRE REAL ESTATE:SRE BEGINS DEMOLITION OF SECTOR 7B FOR PROJECT 'NEW HEAVEN'",
        stdup,
        40,
        0,
        false,
        0,
    ),
    new News(
        Corpos[3].name,
        "BREAKING: SAPHIRE REAL ESTATE:SRE FAITH UNLIMITED CALLS FOR PROTESTING OF PROJECT 'NEW HEAVEN'",
        stddown,
        40,
        0,
        false,
        0,
    ),
    //##### ANC
    new News(
        Corpos[4].name,
        "BREAKING: ANCORP-TRADE:ANC FINANCIAL REPORT -- QUARTERLY FREETRADE HUB VOLUME UP BY 10%",
        stdup,
        40,
        0,
        false,
        0,
    ),
    new News(
        Corpos[4].name,
        "BREAKING: ANCORP-TRADE:ANC POTENTIAL COUNTERFEIT 'WHITEFLASH' CARTRIDGES IN CIRCULATION -- CITYADMIN REPORTS",
        stddown,
        40,
        0,
        false,
        0,
    ),
    //##### GOD
    new News(
        Corpos[5].name,
        "BREAKING: FAITH-UNLIMITED:GOD QUARTERLY REPORT -- GOD MEMERSHIP SUBSCRIPTIONS UP BY 4% YOY",
        stdup,
        40,
        0,
        false,
        0,
    ),
    new News(
        Corpos[5].name,
        "BREAKING: FAITH-UNLIMITED:GOD THREATENS TO CANCEL SUBSCRIPTIONS TO 'NEW HEAVEN'(SRE)HOUSING PROJECT INVESTORS",
        stddown,
        40,
        0,
        false,
        0,
    ), 
];

