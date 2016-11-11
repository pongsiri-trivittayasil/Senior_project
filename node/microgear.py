import microgear.client as microgear

appid = "seniorProject"
gearkey = "XqUHLlu0jVLlfzY"
gearsecret =  "wDnkuU5WAkashQek9wXx4NIU9"

microgear.create(gearkey,gearsecret,appid,{'debugmode': True})

def connection():
  print "Now I am connected with netpie"

def subscription(topic,message):
  print topic+" "+message

def disconnect():
  print "disconnect is work"

microgear.setalias("test_sent")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/web")
microgear.connect(True)