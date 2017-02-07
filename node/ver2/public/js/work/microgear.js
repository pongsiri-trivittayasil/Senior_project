  const APPID     = "seniorProject";
  const APPKEY    = "iAeBgu6Vuvl7TKs";
  const APPSECRET = "IfH0R3EnBBUJC27NTIr632TOm";

    var microgear = Microgear.create({
        key: APPKEY,
        secret: APPSECRET,
        alias : "WebServer"         /*  optional  */
    });

    microgear.on('message',function(topic,msg) {
        console.log("from python :" + msg);
        var temp = msg.split(',');
        console.log(temp[0]);
        if(temp[0] == 'init'){
            set_init.push(temp[1]);
        }
        // showpoint(msg);
    });

    microgear.on('connected', function() {
        microgear.setAlias('WebServer');
    });

    microgear.on('present', function(event) {
        console.log(event);
    });

    microgear.on('absent', function(event) {
        console.log(event);
    });

    microgear.connect(APPID);
