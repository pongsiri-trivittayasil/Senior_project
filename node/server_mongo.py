import time
localtime   = time.localtime()
timeString  = time.strftime("%H-%M", localtime)
dayString  = time.strftime("%d/%m/%Y", localtime)
# timeString  = time.strftime("%d/%m/%Y %H-%M", localtime)
print localtime
print timeString


from pymongo import MongoClient
client = MongoClient()
client = MongoClient('128.199.119.31', 27017)
db = client['my-project'].rule


rule_all = {"test":"test","time":timeString,"noti":"line","message":"fuck test",'linetoken':"hM9TuadH9DQ86fOoriOiWsU6T20FCB5YCn0eD8AVvpy"}




result = db.insert_one(post).inserted_id
