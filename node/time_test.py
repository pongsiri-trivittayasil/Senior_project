import datetime
print datetime.datetime.now()
print datetime.date.today().weekday()
import calendar
my_date = datetime.date.today()
print calendar.day_name[my_date.weekday()]

import time
localtime   = time.localtime()
timeString  = time.strftime("%Y-%m-%d,%H-%M", localtime)
# timeString  = time.strftime("%Y-%m-%d,%H-%M", localtime)
print localtime
print timeString