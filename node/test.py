from pymongo import MongoClient
client = MongoClient()
client = MongoClient('128.199.119.31', 27017)
db = client['my-project'].rule


cursor = db.find()
for document in cursor:
	print document.keys()
print cursor