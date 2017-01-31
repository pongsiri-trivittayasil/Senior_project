import sched, time, calendar
import threading
import datetime
from pymongo import MongoClient
import requests,json

client = MongoClient()
client = MongoClient('128.199.119.31', 27017)
db = client['my-project']
db_status = db.ifstatuses

url = "https://notify-api.line.me/api/notify"


def then_line(token,message):
	msg = {"message":message}
	LINE_HEADERS = {'Content-Type':'application/x-www-form-urlencoded',"Authorization":"Bearer "+token}
	session = requests.Session()
	a=session.post(url, headers=LINE_HEADERS, data=msg)
	print(a.text)

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
		print document
		db_status.update({'IfID':document['IfDay_id']},{'$set':{'IfDay':'1'}})
		check_status(str(document['IfDay_id']))

def check_minute(time):
	rule = db.iftimes
	clear_status('minute')
	cursor = rule.find({"ifTime_time":time})
	# cursor = rule.find({})
	for document in cursor:
		# print document
		print document['IfTime_id']
		db_status.update({'IfID':document['IfTime_id']},{'$set':{'IfTime':'1'}})
		check_status(str(document['IfTime_id']))

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


def check_status(id):
	document = db_status.find({'IfID':id})
	check = document[0]
	if (check['IfTime'] == '1' or check['IfTime'] == '-'):
		if (check['IfDay'] == '1' or check['IfDay'] == '-'):
			if (check['IfDate'] == '1' or check['IfDate'] == '-'):
				if (check['IfTag'] == '1' or check['IfTag'] == '-'):
					print 'done'
					check_then(id)

# then
def check_then(id):
	db_line = db.thenlines
	db_control = db.thencontrols
	# line
	cursor = db_line.find({'ThenLine_id':id})
	for document in cursor:
		print 'then line'
		print document['ThenLine_token']
		print document['ThenLine_message']
		then_line(document['ThenLine_token'],document['ThenLine_message'])
	# control
	cursor = db_control.find({'ThenControl_id':id})
	for document in cursor:
		print 'then control'
		then_control(document['ThenControl_Control_id'],document['ThenControl_status'])



def check_time_current():
	localtime   = time.localtime()
	date_current = time.strftime("%d/%m/%Y",localtime)
	time_current = time.strftime("%H:%M",localtime)
	day_current = calendar.day_name[datetime.date.today().weekday()]
	print time_current
	# print date_current
	# print day_current
	if(time_current == '0:0'):
		check_date(date_current)
		check_day(day_current)
	check_minute(time_current)

def check_time_rule(): 
    print "Check time rule..."
    check_time_current()
    threading.Timer(60, check_time_rule).start()
    # s.enter(60, 1, do_something, (sc,))



# ------------------------- for tag -----------------
def check_tag(tagid,inroomid):
	db_tag = db.iftags
	cursor = db_tag.find({'IfTag_name':tagid , 'IfTag_room':inroomid})
	for document in cursor:
		print document['IfTag_id']
		db_status.update({'IfID':document['IfTag_id']},{'$set':{'IfTag':'1'}})
		check_status(document['IfTag_id'])

def then_control(id,status):
	print int(id)
	print status
	if(status=='on'):
		print 'onnnnnnn'
		db.controls.update({'Control_id':int(id)},{'$set':{'Status':True}})
	else:
		db.controls.update({'Control_id':id},{'$set':{'Status':False}})
	#  do something .. netpie
# ----------------------------------------------------
		
check_time_rule()
check_tag('-1','1')