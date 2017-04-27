# -*- coding: utf-8 -*-
"""
Created on Tue Sep 06 09:48:17 2016

@author: puttisan
"""
import math
import random
import numpy as np
import time
import httplib, urllib  
import requests,json
import check_rule as rule
# import urllib.parse
try:
    from urllib.parse import urlparse
except ImportError:
     from urlparse import urlparse

import db_mongo as db
import microgear.client as microgear

temp_room = []
AP =[]
tagRoom =[]
tagRoomData = []
beforeAP = []
set_beforeAP = []
count_resetAP = []

set_initial = False
set_dest_int_tagid = 999
set_dest_int_mac_roomid = 999
data = []
count_reset = []
set_before = []
set_ESP =[]
before = []



def initial_Val(message):
    global set_initial,set_dest_int_tagid,set_dest_int_mac_roomid
    print message
    a = message.split(",")
    # print a
    # print a[0] ,"a0"
    # print a[1] ,"a1"
    if str(a[1]) == "startinitValue":
        # print "Do"
        # microgear.chat("WebServer","init,-53")
        # microgear.chat("WebServer","-53")
        # microgear.chat("WebServer","ready")
        set_dest_int_tagid = a[0]
        set_dest_int_mac_roomid = a[2]
        set_initial = True
        print set_dest_int_tagid,set_dest_int_mac_roomid
        # print("Do")s
        # print "start",a[0] , a[1]
        # rule.returnChat("-53")
    elif str(a[1]) == "stopinitValue":
        # microgear.chat("WebServer","ok done")
        set_initial = False
        set_dest_int_tagid = 999
        set_dest_int_mac_roomid = 999
        # print "stop",a[0] , a[1]
        # rule.returnChat("ok Done")

def findAP():
    global AP,tagRoomData
    del AP[:]
    AP = db.APsList()
    print AP

def findTagRoom():
    global tagRoom,tagRoomData,beforeAP,set_beforeAP,count_resetAP
    del tagRoom[:]
    del tagRoomData[:]
    del beforeAP[:]
    del set_beforeAP[:]
    del count_resetAP[:]
    tagRoom = db.tagRoomList()
    print tagRoom
    a = len(tagRoom)
    for i in range (0,a):
        tagRoomData.append(0)
        beforeAP.append(-45)
        set_beforeAP.append(True)
        count_resetAP.append(0)
    # print tagRoomData 


def findMoTag():
    global data,count_reset,set_before,set_ESP
    del data[:]
    del count_reset[:]
    del set_before[:]
    del set_ESP[:]
    motag = db.MotagList()
    # print motag
    for i in range(0,len(motag)):
        data.append([])
        count_reset.append([])
        set_before.append([])
        before.append([])
        set_ESP.append([])
        for j in range(0,len(tagRoom)):
            data[i].append(0)
            count_reset[i].append(True)
            set_before[i].append(True)
            before[i].append(-45)
            set_ESP[i].append(False)
            temp_room.append(9999)
    # print   data,count_reset,set_ESP,set_before







def resetALL():
    global set_AP,set_ESP
    # reset_listAP()
    # reset_list()
    set_AP = False
    set_ESP = [False,False]



def checkAP():
    if not data[0] :
        return 1
    if not data[1] :
        return 1
    if not data[2] :
        return 1
    return 0 
def reset_list():
    del data[:]
    data.append([])
    data.append([])
    data.append([])

def reset_listAP():
    del dataAP[:]
    dataAP.append([])
    dataAP.append([])
    dataAP.append([])


def searchAP(dic,number):
    global beforeAP,count_resetAP,set_beforeAP,AP,tagRoomData
    number = number -1
    for i,j in dic.items():
        for a in range(0,len(AP)):
            if i == AP[a]:
                intitial_ewmaAP(j,number)
                if int(ewma_backward(beforeAP[number],j) - ewma_forward(beforeAP[number],j)) in range(-5,5):
                    temp = ewma_forward(beforeAP[number],j)
                    tagRoomData[number] = temp
                    beforeAP[number] =  temp
                else:
                    if count_resetAP[number] >= 3:
                        set_beforeAP[number] = True
                        count_resetAP[number] = 0
                    count_resetAP[number] = count_resetAP[number] + 1
def compare(number,dic,data,temp):
    global temp_room,temp_b
    for i,j in dic.items():
        for a in range(0,len(AP)):
            if i == AP[a]:
                print "StaToAP",tagRoomData[temp],"EspToAP",j,"EspToSta",data
                # print tagRoomData[temp],tagRoom[temp],AP[a]
                if int(tagRoomData[temp]) != 0:

                    temp_b = db.findid(tagRoom[temp][0])
                    # print temp_room[number]
                    # if abs(int(int(j)-int(tagRoomData[temp]))) in range(0,7) and int(data) >= int(tagRoom[temp][1]):
                    # print j ,tagRoomData[temp],tagRoom[temp][2],data,tagRoom[temp][1]
                    if abs(int(int(j)-int(tagRoomData[temp]))) in range(0,abs(int(tagRoom[temp][2]))) and int(data) >= int(tagRoom[temp][1]):
                        # print "find case 1"
                        # print "Do1"
                        print "TemppppppppppppppppppppBBB",temp_b,temp_room[number]
                        if temp_room[number] is not temp_b:
                            temp_room[number] = temp_b
                            rule.put_history(number+1,temp_b)
                            rule.check_tag(number+1,temp_b)
                            break;
                            # print "Do1.1"
                            # print "ok1"
                            # print temp_room[number]
                        # controlTag(1,True)
                    elif int(data) >= -37:
                        # print "find case 2"
                        # print "Do2"
                        if temp_room[number] is not temp_b:
                            temp_room[number] = temp_b
                            rule.put_history(number+1,temp_b)
                            rule.check_tag(number+1,temp_b)
                            break;
                            # print "Do2.1"
                            # print "ok2"
                            # print temp_room[number]
                        # rule.check_tag(number+1,db.findid(tagRoom[temp][0]))
                        # controlTag(1,True)
                    else:
                        # print "not in room"
                        # print "Do3"
                        if temp_room[number] is not 9999:
                            rule.put_history(number+1,"outside of rooms")
                            temp_room[number] = 9999
                            rule.check_tag(number+1,"outside of rooms")
                            break;
                    # print temp_room[number]
                            # print "Do3.1"
                            # print "ok3"
                            # print temp_room[number]
                        # rule.check_tag(number+1,"out of rooms")
                        # controlTag(1,False)
                # microgear.loop() 


def searchALL(dic,number):
    global before,count_reset,set_before,set_ESP
    # print dic
    number = number - 1
    for i,j in dic.items():
        for a in range(0,len(tagRoom)):
            # if tagRoom[a][0] is not None :
            try:
                # print i 
                if i == tagRoom[a][0]:
                    # print tagRoom[a][0]
                    # print "go4"
                    intitial_ewma(j,a,number)
                    if int(ewma_backward(before[number][a],j) - ewma_forward(before[number][a],j)) in range(-5,5):
                        temp = ewma_forward(before[number][a],j)
                        data[number][a] = temp
                        before[number][a] =  temp
                        # print set_initial
                        # SendDataToThingSpeak(temp,1)
                        if set_initial == True:
                            # print "do 1"
                            # print set_dest_int_tagid , number
                            if str(set_dest_int_tagid) == str(number + 1):
                                # print "do 2"
                                if str(set_dest_int_mac_roomid) == str(tagRoom[a][0]):
                                    microgear.chat("WebServer","init,"+str(temp))
                        # print "find1"
                        compare(number,dic,data[number][a],a)
                    else:
                        if count_reset[number][a] >= 3:
                            set_before[number][a] = True
                            count_reset[number][a] = 0
                        count_reset[number][a] = count_reset[number][a] + 1
            except:
                # print "go5"
                # microgear.loop()
                time.sleep(1)
                

def checkTrue(number):       
    for i in range(0,len(set_ESP[number])):
        if set_ESP[number][i] == False:
            return False
    return True

def getData():
    return tagRoomData

def intitial_ewma(be,temp,number):
    global before,set_before
    if set_before[number][temp] == True:
        before[number][temp] = be
        set_before[number][temp] = False
def intitial_ewmaAP(be,temp):
    global beforeAP,set_beforeAP
    if set_beforeAP[temp] == True:
        beforeAP[temp] = be
        set_beforeAP[temp] = False
def ewma_forward(before,current):
    lamda = 0.75
    before = int(before)
    current = int(current)
    # print before,current,lamda
    return float((lamda*current)+(1-lamda)*before)
def ewma_backward(before,current):
    lamda = 0.25
    before = int(before)
    current = int(current)
    return float((lamda*current)+(1-lamda)*before)


def SendDataToThingSpeak(temp,field):
    filed_txt = 'field'+str(field)
    params = urllib.urlencode({filed_txt:temp,'key':'YJQGHUF4LJD7L307'}) 
    # use your API key generated in the thingspeak channels for the value of 'key'
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
    conn = httplib.HTTPConnection("api.thingspeak.com:80")  
    try:
        conn.request("POST", "/update", params, headers)
        response = conn.getresponse()
        print response.status, response.reason
        data = response.read()
        conn.close()
    except:
        print "connection failed"
    # time.sleep(60)              #Delay 1 minute
def Notify_Line():
    # print "Do"
    LINE_ACCESS_TOKEN="9vUpN5JOYrSNlPRPLgxTYC1fKLYyjO9LWRukUvtujQU"
    url = "https://notify-api.line.me/api/notify"
     
     
    message ="บุคคลเออยู่ในห้องนอนนานเกินไป" # ข้อความที่ต้องการส่ง
    # msg = urllib.parse.urlencode({"message":message})
    msg = urllib.urlencode({"message":message})
    LINE_HEADERS = {'Content-Type':'application/x-www-form-urlencoded',"Authorization":"Bearer "+LINE_ACCESS_TOKEN}
    session = requests.Session()
    a=session.post(url, headers=LINE_HEADERS, data=msg)
    # print(a.text)
def getMAC():
    str_temp = ""
    for a in tagRoom:
        try: 
            if a[0] != None:
                str_temp += str(a[0])
        except:
            time.sleep(1)
        # if a[][0] != None:
            # str_temp += str(a[][0])
    for b in AP:
        if b != None:
            str_temp += str(b)
    return str_temp
def update_data():
    findAP()
    findTagRoom()
    findMoTag()


def debug():
    rule.put_history(555,999)