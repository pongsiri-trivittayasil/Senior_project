str2 = "123,456"
str3 = str2.split(",")
#print str3
#print str3[0]

dic = {}

dic[str3[0]] = str3[1]

#print dic

#dic[str3[0]] = str3[1]
#dic["test"] = str3[1]

#print dic
#"test,123"

while(True):
	test = input("enter:")
	if test == "<":
		print "start"
		dic = {}
	elif test == ">":
		#send data to db_mongo.py function
		print "end"
		#db.insert(dic)
	else:
		#split
		data = test.split(",")
		dic[data[0]] = data[1]
		print dic