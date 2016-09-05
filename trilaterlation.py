import math
import numpy

ap1 = "003AA99403EF0"
ap1_x = 21.00
ap1_y = 11.00
ap2 = "0CF5A4419610"
ap2_x = 19.50
ap2_y = 7.00
ap3 = "E0D1731A9983"
ap3_x = 9.00
ap3_y = 7.50
ap4 = "84802DAB4ECF"
ap4_x = 16.00
ap4_y = 15.00

listap = {ap1:{"x":ap1_x,"y":ap1_y},
		ap2:{"x":ap2_x,"y":ap2_y},
		ap3:{"x":ap3_x,"y":ap3_y},
		ap4:{"x":ap4_x,"y":ap4_y}
		}

dic = {"003AA99403EF0":"20","E0D1731A998x":"10","0CF5A441961x":"30","84802DAB4ECx":"40"}

#find minimum 3 range into dic and we have
def findap(dic):
	data_ap = []
	count = 0
	for i,j in listap.items():
		for m,n in dic.items():
			if i == m:
				data_ap.append((listap[i]["x"],listap[i]["y"],findDistanceformFSPL(n)))
				count = count + 1
	print "ap have " + str(count)
	if count == 2:
		x = [i[0] for i in data_ap]
		y = [i[1] for i in data_ap]
		d = [i[2] for i in data_ap]
		trilaterlation(x,y,d)
	elif count >= 3:
		data_ap = sorted(data_ap,key=lambda tup: tup[2])
		print data_ap
		x = [i[0] for i in data_ap]
		y = [i[1] for i in data_ap]
		d = [i[2] for i in data_ap]
		trilaterlation(x,y,d)
	else:
		print "ap less than three !!!"

#function free space pass lost
def findDistanceformFSPL(RSSI):
	# [2.4,5.1,5.7]
    f = 2.4
    distance = math.pow(10,((float(RSSI)-(20*math.log10(f*math.pow(10,3)))+27.55)/20))
    return distance

def trilaterlation(x,y,d):
	#print x[1]
	#find det A
	# A = [2(x2-x1),2(y2-y1)],[2(x3-x1),2(y3-y1)]
	A = [[2*(x[1]-x[0]),2*(y[1]-y[0])],[2*(x[2]-x[0]),2*(y[2]-y[0])]]
	detA = numpy.linalg.det(A)
	#find x
	dx = [[(pow(d[0],2)-pow(d[1],2)),2*(y[1]-y[0])],[(pow(d[0],2)-pow(d[2],2)),2*(y[2]-y[0])]]
	x1 = numpy.linalg.det(dx)/detA	
	dy = [[2*(x[1]-x[0]),(pow(d[0],2)-pow(d[1],2))],[2*(x[2]-x[0]),(pow(d[0],2)-pow(d[2],2))]]
	y1 = numpy.linalg.det(dy)/detA
	print "x:" + str(x1)
	print "y:" + str(y1)


if __name__ == "__main__":
    findap(dic)