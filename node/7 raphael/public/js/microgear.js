  const APPID     = "seniorProject";
  const APPKEY    = "iAeBgu6Vuvl7TKs";
  const APPSECRET = "IfH0R3EnBBUJC27NTIr632TOm";

    var microgear = Microgear.create({
        key: APPKEY,
        secret: APPSECRET,
        alias : "htmlgear"         /*  optional  */
    });

    microgear.on('message',function(topic,msg) {
        console.log(msg);
        showpoint(msg);
    });

    microgear.on('connected', function() {
        microgear.setAlias('htmlgear');
    });

    microgear.on('present', function(event) {
        console.log(event);
    });

    microgear.on('absent', function(event) {
        console.log(event);
    });

    microgear.connect(APPID);
    microgear.subscribe("/web");
