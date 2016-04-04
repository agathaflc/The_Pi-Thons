# Python B

import ftplib
import time
import global_var
import stuff
import json

# where the data will be displayed online
filename = global_var.current_status

# FTP credentials
ftp = ftplib.FTP (stuff.host)

# update with username and password
ftp.login(stuff.username, stuff.password)

# variable for current state
currentState = ''

# Record file name
recordFileName = global_var.status_record

# Current file name
currentFileName = global_var.current_status

ftp.cwd ('cgi-bin')

while True:
        # read current.json data file 
        with open(currentFileName) as data_file:
                data = json.load(data_file)

        firstSensorData = data[0]

        dataNames = ['name', 'latitude', 'longitude', 'time', 'MQ2_level',
                     'MQ2_status', 'radiation_level', 'radiation_status']

        # print all data values
        for name in dataNames:
                print(name + ":", firstSensorData[name])

        ## THE POP-APPEND FEATURE ##
        # if the data already exceeds 1000 lines, the oldest data
        # will be removed and the newest data will be added in
        try:
                # new data we want to add to file
                new_data = {'name': firstSensorData['name'],
                            'latitude': firstSensorData['latitude'],
                            'longitude': firstSensorData['longitude'],
                            'time': firstSensorData['time'],
                            'MQ2_level': firstSensorData['MQ2_level'],
                           'MQ2_status': firstSensorData['MQ2_status'], 
                           'radiation_level': firstSensorData['radiation_level'],
                           'radiation_status': firstSensorData['radiation_status']}

                # read record.json 
                with open(recordFileName) as recordFile:
                        getData = json.load(recordFile)

                # get the old time
                for item in getData:
                        oldTime = item.get("time")

                newTime = new_data[3]

                if (oldTime != newTime):
                    # append new data to data from record.json
                    getData.append(new_data)

                # check if there are 1000 or more data entries
                if (len(getData)>=1000):
                        getData.pop(0) # delete first one


                # write new changes into record.json
                with open(recordFileName, 'w') as writeRecordFile:
                        json.dump(getData, writeRecordFile)

                # check latest time and compare with current time
                # if times are the same, do not need to write
                # else write to the file


        except: # SPECIAL CASE WHEN THE PROGRAM RUNS FOR THE FIRST TIME
                print("exception")

                # open recordFile to write
                recordFile = open(recordFileName, 'wt') # Open the file for writing

                ## WRITE THE FILE IN JSON FORMAT ##
                recordFile.write("[\n")
                recordFile.write("{\n")

                # write data values
                one_item = '"name": "' + firstSensorData['name'] + '",\n' + \
                           '"latitude": ' + str(firstSensorData['latitude']) + ',\n' + \
                           '"longitude": ' + str(+ firstSensorData['longitude']) + ',\n' + \
                           '"time": "' + firstSensorData['time'] + '",\n' + \
                           '"MQ2_level": ' + str(firstSensorData['MQ2_level']) + ',\n' + \
                           '"MQ2_status": "' + firstSensorData['MQ2_status'] + '",\n' + \
                           '"radiation_level": ' + str(firstSensorData['radiation_level']) + ',\n' + \
                           '"radiation_status": "' + firstSensorData['radiation_status'] + '"}\n]'

                # close record.json file
                recordFile.write(one_item)
                recordFile.close()

        recordFile2 = open (recordFileName,'rb')

        # upload record.json file to server
        ftp.storlines ('STOR ' + recordFileName, recordFile2)
        print ('SUCCESS')

        recordFile2.close()

        #print(states)

        time.sleep(5)
