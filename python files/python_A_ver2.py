'''
Python A
1. This program will take values from the GPIO pin every 0.1 seconds.
2. After every 100 results, the program will take an average and decide if
the place is dangerous or not.
3. The "y" or "n" result will be written into a .txt file called current.txt
4. Then the array storing the 100 values will be reset to empty, then
the program repeats the same process.
'''

import RPi.GPIO as GPIO
import random #generate random numbers
import time
import os
import subprocess
import smtplib
import string
import global_var
from time import gmtime, strftime

GPIO.setmode(GPIO.BCM)

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

########## Program variables you might want to tweak ###########################
# voltage divider connected to channel 0 of mcp3002
adcs = [0] # 0 battery voltage divider
reps = 30 # how many times to take each measurement for averaging
# cutoff = 7.5 # cutoff voltage for the battery
# previous_voltage = cutoff + 1 # initial value
time_between_readings = 5 # seconds between clusters of readings

# Define Pins/Ports
SPICLK = 8             # FOUR SPI ports on the ADC 
SPIMISO = 23
SPIMOSI = 24
SPICS = 25

# read SPI data from MCP3002 chip, 2 possible adc's (0 & 1)
# this uses a bitbang method rather than Pi hardware spi
# modified code based on an adafruit example for mcp3008
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
    if ((adcnum > 1) or (adcnum < 0)):
        return -1
    if (adcnum == 0):
        commandout = 0x6
    else:
        commandout = 0x7

    GPIO.output(cspin, True)

    GPIO.output(clockpin, False)  # start clock low
    GPIO.output(cspin, False)     # bring CS low

    commandout <<= 5    # we only need to send 3 bits here
    for i in range(3):
        if (commandout & 0x80):
            GPIO.output(mosipin, True)
        else:   
            GPIO.output(mosipin, False)
        commandout <<= 1
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)

    adcout = 0
    # read in one empty bit, one null bit and 10 ADC bits
    for i in range(12):
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)
        adcout <<= 1
        if (GPIO.input(misopin)):
            adcout |= 0x1

    GPIO.output(cspin, True)

    adcout /= 2       # first bit is 'null' so drop it
    return adcout


GPIO_readings=[]
reading_sum = 0
mq2_sensor=8
#digital = 10
#average_reading = 0

### use P1 header pin numbering convention
##GPIO.setmode(GPIO.BOARD)
## 
### Set up the GPIO channels - one input and one output
##GPIO.setup(mq2_sensor, GPIO.IN)
###GPIO.setup(digital, GPIO.IN)

#Set up ports
GPIO.setup(SPIMOSI, GPIO.OUT)       # set up the SPI interface pins
GPIO.setup(SPIMISO, GPIO.IN)
GPIO.setup(SPICLK, GPIO.OUT)
GPIO.setup(SPICS, GPIO.OUT)

mq2_status = ""
rad_status = "radiation status"

try:
    while True:
        for adcnum in adcs:
            # read the analog pin
            adctot = 0
            ## TEMPORARY RADIATION LEVEL
            rad_level = 0
            for i in range(reps):
                read_adc = readadc(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS)
                adctot += read_adc
                time.sleep(0.05)
            read_adc = adctot / reps / 1.0
            print (read_adc)
##        if (len(GPIO_readings)<100):       
##            ## Take values from GPIO pin, put in array
##            ## INSERT CODE FOR GETTING GPIO READING HERE ##
##            input_value = GPIO.input(mq2_sensor)
##            # (for now, i'm using random numbers)
##            #GPIOreading = random.randint(0,1)
##            GPIOreading = input_value
##            print ("GPIOreading: " + str(GPIOreading))
##            GPIO_readings.append(GPIOreading)
##            reading_sum += GPIOreading
##            
##        else : # if we already have 100 readings
##            # get the average
##            print ("The length of the GPIO_readings list is:")
##            print (len(GPIO_readings))
##            #average_reading = reading_sum / 100
##            print ("Sum: " + str(reading_sum))
##            # reset the list
##            GPIO_readings=[]
            if (read_adc > 100):
                mq2_status = "DANGEROUS"
                print (mq2_status)
                # TODO: write "y" in current.txt file
                # Store into .txt file
                filename = global_var.current_status
                myfile = open(filename, 'wt') # Open the file for writing
                ## WRITE THE FILE IN JSON FORMAT ##
                myfile.write("[\n")
                myfile.write("{\n")
                one_item = 'time: ' + time.ctime() + ',\n' + \
                           'MQ2_level: ' + str(read_adc) + ',\n' + \
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

                ## WRITE THE FILE IN JSON FORMAT ##
                myfile.write("[\n")
                myfile.write("{\n")
                one_item = 'time: ' + time.ctime() + ',\n' + \
                           'MQ2_level: ' + str(read_adc) + ',\n' + \
                           'MQ2_status: ' + mq2_status + ',\n' + \
                           'radiation_level: ' + str(rad_level) + ',\n' + \
                           'radiation_status: ' + rad_status + '}\n]'
                myfile.write(one_item)
                myfile.close()

##            # write the current level to .txt file anyway
##            myfile = open(global_var.current_level, 'wt')
##            one_line = str(read_adc)
##            myfile.write(one_line)
##            myfile.close()
            
            #reading_sum = 0 #reset the sum
            time.sleep(time_between_readings)
except KeyboardInterrupt:             # trap a CTRL+C keyboard interrupt
    GPIO.cleanup()
    time.sleep(1)
GPIO.cleanup()
            



