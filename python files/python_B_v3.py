# Python B

import ftplib
import time
import global_var

# where the data will be displayed online
filename = global_var.current_status

# FTP credentials
ftp = ftplib.FTP (global_var.host)

# update with username and password
ftp.login(global_var.username, global_var.password)

# variable for current state
currentState = ''

# Record file name
recordFileName = global_var.status_record

ftp.cwd ('cgi-bin')

while True:
        # read current.txt data file (contains yes or no)

        # b appending to the mode opens the file in binary mode
        currentFile = open (global_var.current_status,'r', encoding='ascii')

        # print out current state
        for line in currentFile:
                currentState = str(line)
                print (currentState)

        # close my file
        currentFile.close()

        ## THE POP-APPEND FEATURE ##
        # if the data already exceeds 1000 lines, the oldest data
        # will be removed and the newest data will be added in
        states = []
        try:
                # Open the record file for reading
                recordFile = open (recordFileName, 'r')

                # Read the data into a list
                for line in recordFile:
                        # Read each line as a state event
                        event = line

                        # Add the event at the end of states[]
                        states.append(event[0])

                # Check if there are already 1000 data
                if (len(states)>=1000):
                        states.pop(0) # Delete the first (oldest) one
                        
                # Append current state
                states.append(currentState)

                # Close the record file
                recordFile.close()
        except: # SPECIAL CASE WHEN THE PROGRAM RUNS FOR THE FIRST TIME
                # append current state to record file and to states[]
                states.append(currentState)
                recordFile = open (recordFileName,'a', encoding='ascii')
                recordFile.write(currentState + '\n')

                # close record.txt file
                recordFile.close()


        ## RE-WRITE THE WHOLE RECORD.TXT ##
        recordFile1 = open (recordFileName, 'wt') # Open the file for writing

        # Go through each item in states[] and write them into record file
        for item in states:
                recordFile1.write(item + '\n')
        

        recordFile1.close()

        recordFile2 = open (recordFileName,'rb')

        # upload record.txt file to server
        ftp.storlines ('STOR ' + recordFileName, recordFile2)
        print ('SUCCESS')

        recordFile2.close()

        print(states)

        time.sleep(5)

