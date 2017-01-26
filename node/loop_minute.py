import sched, time
import threading
from pymongo import MongoClient
import requests,json

client = MongoClient()
client = MongoClient('128.199.119.31', 27017)
db = client['my-project'].rule

url = "https://notify-api.line.me/api/notify"

# s = sched.scheduler(time.time, time.sleep)

def line(token,message):
	msg = {"message":message}
	LINE_HEADERS = {'Content-Type':'application/x-www-form-urlencoded',"Authorization":"Bearer "+token}
	session = requests.Session()
	a=session.post(url, headers=LINE_HEADERS, data=msg)
	print(a.text)


def check_time_current():
	localtime   = time.localtime()
	# timeString  = time.strftime("%d/%m/%Y 20-30", localtime)
	timeString  = time.strftime("%d/%m/%Y %H-%M", localtime)
	print timeString
	# print alll
	cursor = db.find({"time":timeString})
	# print document
	for document in cursor:
		print document['noti']
		if(document['noti'] == 'line'):
			line(document['linetoken'],document['message'])

def check_time_rule(): 
    print "Check time rule..."
    check_time_current()
    threading.Timer(60, check_time_rule).start()
    # s.enter(60, 1, do_something, (sc,))

def check_rule():
	# s.enter(60, 1, do_something, (s,))
	# s.run()
	check_time_rule()

check_rule()
