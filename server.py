import microgear.client as microgear
import time
import os

import db_mongo as db

import trilaterlation as cal

appid = "seniorProject"
gearkey = "mS2SW6zylEzbpKg"
gearsecret =  "3gSQjYWs5nFBS3WxyEqaQTwOO"

""" function send data to mongo database """
#set grobal "dic" is data for send to database
dic = {}
#count_ap = 0
def senddatatodb(message):
	if message == "<":
		print "start"
		#count_ap = 0
		dic.clear()
	elif message == ">":
		#send data to db_mongo.py function
		print dic
		print "end"
		#print "found ap : " + str(count_ap)
		cal.findap(dic)
		#db.insert(dic)
	else:
		#split
		data = message.split(",")
		#count_ap = count_ap + 1
		#add to dic
		dic[data[1]] = data[2]


microgear.create(gearkey,gearsecret,appid,{'debugmode': True})

def connection():
  print "Now I am connected with netpie"

def subscription(topic,message):
	#print message
	#print topic
	if topic == "/seniorProject/data":
		senddatatodb(message)

def disconnect():
  print "disconnect is work"

def callback_present(gearkey) :
    print gearkey+" become online."

def callback_absent(gearkey) :
    print gearkey+" become offline."

microgear.setalias("Server")
microgear.on_present = callback_present
microgear.on_absent = callback_absent
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/data")
os.system('rm microgear.cache')
#client.connect()
microgear.connect()


while(True):
	#microgear.publish("/data","test")
	send = input("what word to send esp8266:")
	microgear.chat("myhtml",send)