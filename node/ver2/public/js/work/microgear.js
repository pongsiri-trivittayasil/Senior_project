  const APPID     = "seniorProject";
  const APPKEY    = "iAeBgu6Vuvl7TKs";
  const APPSECRET = "IfH0R3EnBBUJC27NTIr632TOm";
    var microgear = Microgear.create({
        key: APPKEY,
        secret: APPSECRET,
        alias : "WebServer"         /*  optional  */
    });

    microgear.on('message',function(topic,msg) {
        console.log("message :" + msg);
        var temp = msg.split(',');
        if(temp[0] == 'init'){
            set_init.push(parseInt(temp[1]));
            // console.log(set_init);
            var sum = set_init.reduce(function(pv, cv) { return pv + cv; }, 0);
            var avg = Math.round(sum/set_init.length);
            $('#avg-init').text(avg);
            var insert = "<div class='init'>" + temp[1] + "</div>"
            $(insert).appendTo($('#set-init')).slideDown("slow");
            // $('.set-init').append(insert).slideDown("slow");;
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
