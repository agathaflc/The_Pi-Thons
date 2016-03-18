'''
Python A
1. This program will take values from the GPIO pin every 0.1 seconds.
2. After every 100 results, the program will take an average and decide if
the place is dangerous or not.
3. The "y" or "n" result will be written into a .txt file called current.txt
4. Then the array storing the 100 values will be reset to empty, then
the program repeats the same process.
'''

#import RPi.GPIO as GPIO
import random #generate random numbers
import time
import global_var

#print (global_var.current_level)

##with open('E:/Mika/University/Spring 2016/PCup/abc.txt') as fh:
##    sum = 0 # initialize here, outside the loop
##    count = 0 # and a line counter
##    
##    for line in fh:
##            
##        count += 1 # increment the counter
##        sum += float(line.split()[1]) # add here, not in a nested loop
##    average = sum / count
##        
##    if average < 20 and average > 0:
##        print("y")
##    else:
##        print("n")

GPIO_readings=[]
reading_sum = 0
mq2_sensor=8
#digital = 10
#average_reading = 0

# use P1 header pin numbering convention
#GPIO.setmode(GPIO.BOARD)
 
# Set up the GPIO channels - one input and one output
#GPIO.setup(mq2_sensor, GPIO.IN)
#GPIO.setup(digital, GPIO.IN)

mq2_status = ""
rad_status = "radiation_status"
rad_level = 0

while True:
    
    if (len(GPIO_readings)<100):       
        ## Take values from GPIO pin, put in array
        ## INSERT CODE FOR GETTING GPIO READING HERE ##
        #input_value = GPIO.input(mq2_sensor)
        # (for now, i'm using random numbers)
        GPIOreading = random.randint(0,1)
        #GPIOreading = input_value
        print ("GPIOreading: " + str(GPIOreading))
        GPIO_readings.append(GPIOreading)
        reading_sum += GPIOreading
        
    else : # if we already have 100 readings
        # get the average
        print ("The length of the GPIO_readings list is:")
        print (len(GPIO_readings))
        #average_reading = reading_sum / 100
        print ("Sum: " + str(reading_sum))
        # reset the list
        GPIO_readings=[]
        if (reading_sum > 52):
            mq2_status = "DANGEROUS"
            print (mq2_status)
            # TODO: write "y" in current.txt file
            # Store into .txt file
            filename = global_var.current_status
            myfile = open(filename, 'wt') # Open the file for writing
##            one_line = "y"
##            myfile.write(one_line)
            ## WRITE THE FILE IN JSON FORMAT ##
            myfile.write("[\n")
            myfile.write("{\n")
            one_item = 'time: ' + time.ctime() + ',\n' + \
                       'MQ2_level: ' + str(reading_sum) + ',\n' + \
                       'MQ2_status: ' + mq2_status + ',\n' + \
                       'radiation_level: ' + str(rad_level) + ',\n' + \
                       'radiation_status: ' + rad_status + '}\n]'
            myfile.write(one_item)
            myfile.close()
        else :
            mq2_status = "Safe";
            print (mq2_status)
            # TODO: write "n" in current.txt file
            # Store into .txt file
            filename = global_var.current_status
            myfile = open(filename, 'wt') # Open the file for writing
            one_line = "n"
##            myfile.write(one_line)
##            myfile.close()

            ## WRITE THE FILE IN JSON FORMAT ##
            myfile.write("[\n")
            myfile.write("{\n")
            one_item = '"time": "' + time.ctime() + '",\n' + \
                       '"MQ2_level": ' + str(reading_sum) + ',\n' + \
                       '"MQ2_status": "' + mq2_status + '",\n' + \
                       '"radiation_level": ' + str(rad_level) + ',\n' + \
                       '"radiation_status": "' + rad_status + '"\n}\n]'
            myfile.write(one_item)
            myfile.close()
            
        reading_sum = 0 #reset the sum
        # wait for 30 secs
        time.sleep(5)

    # wait for 0.1 sec
    time.sleep (0.04)
            



