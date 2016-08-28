from pymongo import MongoClient

con=MongoClient("localhost",27017)

stay=con.get_database("Stay")

myroom=stay.inmyroom

#myroom.insert({"name":"pae","phone":"083"})

#a = "fuck"
#b = "123"

#test = {"fuck":"1234","fucking":"342"}

#myroom.insert(test)

def insert(data):
	#data = {'test':'123','test2':'234'}
	myroom.insert(data)
	print "success add to mongo database"