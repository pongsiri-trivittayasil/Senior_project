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

microgear.setalias("test")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/WebServer")
microgear.connect()


# microgear.chat("htmlgear",send)
while(True):
	try:
		send = input("what word to send web:")
		microgear.chat("client_Tag_control",send)
		# microgear.chat("WebServer",send)
		# microgear.publish('/WebServer',send)
	except:
		# microgear.chat("WebServer","init,10")
		microgear.chat("client_Tag_control","1,OFF")