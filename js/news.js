function News(name, text, pricefactor, duration, activeticks, isactive) {
    this.name = name 
    this.text = text
    this.pricefactor = pricefactor
    this.duration = duration 
    this.activeticks = activeticks
    this.isactive = isactive
};
var NewsFeed = [
    new News(
        Corpos[0].name,
        "BREAKING: PATENTNTX:PTX IN TALKS WITH SYNDICATE TO REGISTER PATENT FOR OXY-STIM INHALER",
        1.01,    //pricefactor
        20,      //duration
        0,      //activeticks
        false,  //isactive
    ),

    new News(
        Corpos[1].name,
        "BREAKING: CITYADMIN:CAM CEO REZA CALLS FOR INTERNAL PROBE DUE TO SYNDICATE INTERVENTION",
        1.01,    //pricefactor
        20,      //duration
        0,      //activeticks
        false,  //isactive
    ),
    new News(
        Corpos[2].name,
        "BREAKING: SYNDICATE COUNCIL ACCUSES PATENTNX OF CYBERATTACK INTO CHEMICAL COMPOUNDS DATABASE",
        0.99,
        20,
        0,
        false,
    )
];
