import sched, time, calendar
import threading
import datetime
from pymongo import MongoClient
import requests,json
import microgear.client as microgear

# client = MongoClient()
# uri = "mongodb://seniorpj:123456@128.199.119.31/my-project?authSource=admin"
# db = MongoClient(uri)
client = MongoClient('128.199.119.31', 27017)
client.admin.authenticate('seniorpj', '123456', mechanism='SCRAM-SHA-1')
db = client['my-project']

db_status = db.ifstatuses

url = "https://notify-api.line.me/api/notify"

'''---------------------------------
	lib line ** function then line
----------------------------------'''

def then_line(token,message):
	msg = {"message":message}
	LINE_HEADERS = {'Content-Type':'application/x-www-form-urlencoded',"Authorization":"Bearer "+token}
	session = requests.Session()
	a=session.post(url, headers=LINE_HEADERS, data=msg)
	print(a.text)

'''---------------------------------
	Check date day time
----------------------------------'''

def check_date(date):
	rule = db.ifdates
	clear_status('date')
	cursor = rule.find({"ifDate_date":date})
	for document in cursor:
		print document
		db_status.update({'IfID':document['IfDate_id']},{'$set':{'IfDate':'1'}})
		check_status(str(document['IfDate_id']))

def check_day(day):
	rule = db.ifdays
	clear_status('day')
	cursor = rule.find({"ifDay_day":day})
	for document in cursor:
		db_status.update({'IfID':document['IfDay_id']},{'$set':{'IfDay':'1'}})
		check_status(str(document['IfDay_id']))

def check_minute(time):
	rule = db.iftimes
	clear_status('minute')
	# temp = rule.find({''})
	# print temp[0]
	cursor = rule.find({"IfTime_time":time})
	# cursor = rule.find({})
	for document in cursor:
		# print document
		db_status.update({'IfID':document['IfTime_id']},{'$set':{'IfTime':'1'}})
		check_status(str(document['IfTime_id']))
	# find count if tag+time for ++
	cursor = db.iftags.find({"count":{'$ne': -1}})
	for document in cursor:
		# print document
		db.iftags.update({'IfTag_id':document['IfTag_id']},{'$set':{'count':int(document['count']) +1 }})
		# check ( count == for_time)
		# print int(document['For_Time'])
		# print int(document['count']) +1
		if (int(document['count']) +1 == int(document['For_Time'])):
			print 'for time done'
			db_status.update({'IfID':document['IfTag_id']},{'$set':{'IfTagTime':'1'}})
			check_status(str(document['IfTag_id']))



'''---------------------------------
	clear status *** set status to 0
----------------------------------'''
def clear_status(type):
	if (type == 'minute'):
		rule = db.iftimes
		cursor = rule.find({'IfTime':'1'})
		for document in cursor:
			db_status.update({'IfID':document['IfTime_id']},{'$set':{'IfTime':'0'}})
	elif (type == 'day'):
		rule = db.ifdays
		cursor = rule.find({'IfDay':'1'})
		for document in cursor:
			db_status.update({'IfID':document['IfDay_id']},{'$set':{'IfDay':'0'}})
	elif (type == 'date'):
		rule = db.ifdates
		cursor = rule.find({'IfDate':'1'})
		for document in cursor:
			db_status.update({'IfID':document['IfDate_id']},{'$set':{'IfDate':'0'}})

'''---------------------------------
	check status all = 1
	then check db then
----------------------------------'''

def check_status(id):
	document = db_status.find({'IfID':id})
	check = document[0]
	if (check['IfTime'] == '1' or check['IfTime'] == '-'):
		if (check['IfDay'] == '1' or check['IfDay'] == '-'):
			if (check['IfDate'] == '1' or check['IfDate'] == '-'):
				if (check['IfTag'] == '1' or check['IfTag'] == '-'):
					if (check['IfTagTime'] == '1' or check['IfTagTime'] == '-'):
						if (check['IfOut'] == '1' or check['IfOut'] == '-'):
							print 'check then'
							check_then(id)

'''---------------------------------
	function then
	find rule in db thenline , thencontrol
----------------------------------'''

def check_then(id):
	db_line = db.thenlines
	db_control = db.thencontrols
	# line
	cursor = db_line.find({'ThenLine_id':id})
	for document in cursor:
		print 'then line'
		print 'token :' + document['ThenLine_token'] + '   message : ' + document['ThenLine_message']
		then_line(document['ThenLine_token'],document['ThenLine_message'])
	# control
	cursor = db_control.find({'ThenControl_id':id})
	for document in cursor:
		print 'then control'
		then_control(document['ThenControl_Control_id'],document['ThenControl_status'])


'''---------------------------------
	check time every minute
	if 0:0 then check day and date
----------------------------------'''

def check_time_current():
	localtime   = time.localtime()
	date_current = time.strftime("%d/%m/%Y",localtime)
	time_current = time.strftime("%H:%M",localtime)
	day_current = calendar.day_name[datetime.date.today().weekday()]
	print time_current
	if(time_current == '0:0'):
		check_date(date_current)
		check_day(day_current)
	check_minute(time_current)

#  use thread
def check_time_rule(): 
    print "Check time rule..."
    check_time_current()
    threading.Timer(60, check_time_rule).start()


'''---------------------------------
	clear status for tag
	with old room
	set count = 0 for if tag time
	set status ifout = 1 when if out
----------------------------------'''

def clear_status_tag(tagid,inroomid):
	print 'clear status tag ...'
	temp = db.tags.find_one({'Tag_id':int(tagid)})
	if(temp != None):
		cursor = db.iftags.find({'IfTag_name':tagid , 'IfTag_room':temp['room']})
		for document in cursor:
			if(document['For_Time'] == '0'):
				# set status = 0
				db_status.update({'IfID':document['IfTag_id']},{'$set':{'IfTag':'0'}})
			else:
				# set count = 0 out of room if tag time 
				db.iftags.update({'IfTag_name':tagid , 'IfTag_room':temp['room']},{'$set':{'count':-1}})
		# check if out room
		if(inroomid != temp['room']):
			cursor = db.ifouts.find({'IfOut_name':tagid , 'IfOut_room':temp['room']})
			for document in cursor:
				db_status.update({'IfID':document['IfOut_id']},{'$set':{'IfOut':'1'}})
				check_status(document['IfOut_id'])


def clear_if_out(tagid,inroomid):
	print 'clear if out'
	cursor = db.ifouts.find({'IfOut_name':tagid , 'IfOut_room':inroomid})
	for document in cursor:
		db_status.update({'IfID':document['IfOut_id']},{'$set':{'IfOut':'0'}})

'''---------------------------------
	check tag rule and set room in db_tag
	call from server
----------------------------------'''

def check_tag(tagid,inroomid):
	print tagid,inroomid,"-------------------------------- check tag"
	tagid = str(tagid)
	inroomid = str(inroomid)
	db_tag = db.iftags
	clear_status_tag(tagid,inroomid)
	clear_if_out(tagid,inroomid)
	db.tags.update({'Tag_id':int(tagid)},{'$set':{'room':inroomid}})
	cursor = db_tag.find({'IfTag_name':tagid , 'IfTag_room':inroomid})
	for document in cursor:
		print document,'-------------in'
		if (document['For_Time'] == '0'):
			print 'found in'
			db_status.update({'IfID':document['IfTag_id']},{'$set':{'IfTag':'1'}})
			check_status(document['IfTag_id'])
		else:
			# print "count = 0"
			db.iftags.update({'IfTag_name':tagid , 'IfTag_room':inroomid},{'$set':{'count':'0'}})

'''---------------------------------
	check tag immediately
----------------------------------'''
def chek_tag_immediately(tagid,inroomid,IfId):
	print 'test'
	tagid = int(tagid)
	inroomid = str(inroomid)
	cursor = db.tags.find({'Tag_id':tagid,'room':inroomid})
	for document in cursor:
		db_status.update({'IfID':IfId},{'$set':{'IfTag':'1'}})
		check_status(IfId)

'''---------------------------------
	then Control 
	update db_control
----------------------------------'''

def then_control(id,status):
	# print int(id)
	# print status
	if(status=='on'):
		db.controls.update({'Control_id':int(id)},{'$set':{'Status':True}})
		print 'control id :' + str(id) + ' Status : True'
		#  do something .. netpie
		controlTag(int(id),True)
	else:
		db.controls.update({'Control_id':int(id)},{'$set':{'Status':False}})
		print 'control id :' + str(id) + ' Status : False'
		#  do something .. netpie
		controlTag(int(id),False)


def controlTag(number,Order_bool):
    send = ""
    print Order_bool
    if Order_bool is True:
        send = str(number) + "," + "ON"
        print send
    	microgear.chat("client_Tag_control",send)
    	# microgear.chat("test",send)
    	# microgear.publish('/ct',send)
    elif Order_bool is False:
        send = str(number) + "," + "OFF"
        print send
        microgear.chat("client_Tag_control",send)
        # microgear.chat("test",send)
    	# microgear.publish('/ct',send)

# def initial_value(RoomId,RSSI):
# 	db.rooms.update({'Room_id':int(RoomId)},{'$set':{'rssi':int(RSSI)}})
	
def returnChat(message):
	microgear.chat("WebServer",message)

# ----------------------   example    ------------------------------------------

def put_history(tag,room):
	localtime   = time.localtime()
	date_current = time.strftime("%d/%m/%Y",localtime)
	time_current = time.strftime("%H:%M",localtime)
	print "H: "+str(time_current)+" Day "+str(date_current)

	his = db.histories
	his.insert_one({"time": str(time_current),"tagid":str(tag),"roomid":str(room),"day":str(date_current)})


# ----------------------   example    ------------------------------------------
		
check_time_rule()
# check_tag('1','1')