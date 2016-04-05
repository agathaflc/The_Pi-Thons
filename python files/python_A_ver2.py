'''
Python A
1. This program will take values from the GPIO pin every 0.1 seconds.
2. After every 100 results, the program will take an average and decide if
the place is dangerous or not.
3. If it is dangerous, the program will play a sound as an alarm to warn
nearby users.
4. The details (time, smoke/radiation status, smoke/radiation level) will
be recorded into a .json file (currentLocationName.json)

Disclaimer: some functions are taken from http://sandboxelectronics.com/?p=165
http://raspi.tv/2013/controlled-shutdown-duration-test-of-pi-model-a-with-2-cell-lipo
'''

import RPi.GPIO as GPIO
import random #generate random numbers
import time
import os
import subprocess
import smtplib
import string
import global_var
import stuff
import math
from time import gmtime, strftime

GPIO.setmode(GPIO.BCM)

## Set up alarm sound ##
import pygame.mixer
from pygame.mixer import Sound
import time

pygame.mixer.init()

mySound = Sound ("/home/pi/musicbox/samples/elec_beep.wav")


########## Program variables you might want to tweak ###########################
# voltage divider connected to channel 0 of mcp3002
adcs = [0] # 0 battery voltage divider
reps = 100 # how many times to take each measurement for averaging
# cutoff = 7.5 # cutoff voltage for the battery
# previous_voltage = cutoff + 1 # initial value
time_between_readings = 2 # seconds between clusters of readings

# Define Pins/Ports
SPICLK = 8             # FOUR SPI ports on the ADC 
SPIMISO = 23
SPIMOSI = 24
SPICS = 25

# RO_CLEAR_AIR_FACTOR=(Sensor resistance in clean air)/RO,
# which is derived from the chart in datasheet
RO_CLEAN_FACTOR = 9.83

SmokeCurve =[2.3,0.53,-0.44]

threshold_ppm = 450

Ro = 10.0 # Ro is initialized to 10 kilo ohms
RL_VALUE = 5 # in kilo ohms

# Latitude and longitude
latitude = global_var.location_latitude
longitude = global_var.location_longitude

loc_name = global_var.loc_name #location name

# intervals
calibration_sample_interval = 0.05
read_sample_interval = 0.02

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

'''
/****************** MQResistanceCalculation ****************************************
Input:   raw_adc - raw value read from adc, which represents the voltage
Output:  the calculated sensor resistance
Remarks: The sensor and the load resistor forms a voltage divider. Given the voltage
         across the load resistor and its resistance, the resistance of the sensor
         could be derived.
************************************************************************************/
'''
def MQResistanceCalculation(raw_adc):
    #print("MQResistanceCalculation", (float(RL_VALUE)*(1023-raw_adc)/raw_adc))
    result = 0
    if (raw_adc<=0):
        result = 9999999999
    else:
        result = (float(RL_VALUE)*(1023-raw_adc)/raw_adc)
    return result

'''
/***************************** MQCalibration ****************************************
Input:   mq_pin - analog channel
Output:  Ro of the sensor
Remarks: This function assumes that the sensor is in clean air. It use  
         MQResistanceCalculation to calculates the sensor resistance in clean air 
         and then divides it with RO_CLEAN_AIR_FACTOR. RO_CLEAN_AIR_FACTOR is about 
         10, which differs slightly between different sensors.
************************************************************************************/ 
'''
def MQCalibration(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS):
    val = 0.0

    for i in range(reps): # take multiple samples
        val += MQResistanceCalculation(readadc(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS))
        time.sleep(calibration_sample_interval)

    val = val/reps # calculate the average value
    val = val/RO_CLEAN_FACTOR # divided by RO_CLEAN_FACTOR yields the Ro according to the chart in the datasheet

    print("MQcalibration", val)
    return val

'''
/*****************************  MQRead *********************************************
Input:   mq_pin - analog channel
Output:  Rs of the sensor
Remarks: This function use MQResistanceCalculation to caculate the sensor resistenc (Rs).
         The Rs changes as the sensor is in the different consentration of the target
         gas. The sample times and the time interval between samples could be configured
         by changing the definition of the macros.
************************************************************************************/
'''
def MQRead(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS):
    rs = 0.0

    for i in range(reps): # take multiple samples
        rs += MQResistanceCalculation(readadc(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS))
        time.sleep(read_sample_interval)

    rs = rs/reps # calculate the average value

    print("MQRead", rs)
    return rs

'''
/*****************************  MQGetGasPercentage **********************************
Input:   rs_ro_ratio - Rs divided by Ro
Output:  ppm of the target gas
Remarks: This function passes different curves to the MQGetPercentage function which 
         calculates the ppm (parts per million) of the target gas.
************************************************************************************/ 
'''
def MQGetGasPercentage(rs_ro_ratio):
    x = MQGetPercentage(rs_ro_ratio,SmokeCurve)
    print("MQGetGasPercentage", x)
    return x

'''
/*****************************  MQGetPercentage **********************************
Input:   rs_ro_ratio - Rs divided by Ro
         pcurve      - pointer to the curve of the target gas
Output:  ppm of the target gas
Remarks: By using the slope and a point of the line. The x(logarithmic value of ppm) 
         of the line could be derived if y(rs_ro_ratio) is provided. As it is a 
         logarithmic coordinate, power of 10 is used to convert the result to non-logarithmic 
         value.
************************************************************************************/ 
'''
def MQGetPercentage (rs_ro_ratio, pcurve = []):
    result = (pow(10,( ((math.log(rs_ro_ratio)-pcurve[1])/pcurve[2]) + pcurve[0])))
    print("MQGetPercentage", result)
    return result


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
rad_status = "safe"

try:
    while True:
        for adcnum in adcs:
            # read the analog pin
            adctot = 0

            ## the following block will be removed when it comes to the final product
            rad_level = 0 ## TEMPORARY RADIATION LEVEL
##            for i in range(reps):
##                read_adc = readadc(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS)
##                adctot += read_adc
##                time.sleep(0.05)
##            read_adc = adctot / reps / 1.0
##            print (read_adc)

            mq2_lev = (MQGetGasPercentage(MQRead(adcnum, SPICLK, SPIMOSI, SPIMISO, SPICS)/Ro) )
            print(mq2_lev)

            if (mq2_lev > threshold_ppm):
                mq2_status = "DANGEROUS"
                print (mq2_status)

                # Play alarm sound
                current_time = time.time()
                while True:
                    #print("try")
                    mySound.play()
                    if(time.time()-current_time > 2):
                        break
                    
                filename = global_var.current_status
                myfile = open(filename, 'wt') # Open the file for writing
                ## WRITE THE FILE IN JSON FORMAT ##
                myfile.write("[\n")
                myfile.write("{\n")
                one_item = '"name": "' + loc_name + '",\n' + \
                           '"latitude": ' + str(latitude) + ',\n' + \
                           '"longitude": ' + str(longitude) + ',\n' + \
                           '"time": "' + time.ctime() + '",\n' + \
                           '"MQ2_level": ' + str(mq2_lev) + ',\n' + \
                           '"MQ2_status": "' + mq2_status + '",\n' + \
                           '"radiation_level": ' + str(rad_level) + ',\n' + \
                           '"radiation_status": "' + rad_status + '"}\n]'
                myfile.write(one_item)
                myfile.close()
            else :
                mq2_status = "safe";
                print (mq2_status)
                filename = global_var.current_status
                myfile = open(filename, 'wt') # Open the file for writing

                ## WRITE THE FILE IN JSON FORMAT ##
                myfile.write("[\n")
                myfile.write("{\n")
                one_item = '"name": "' + loc_name + '",\n' + \
                           '"latitude": ' + str(latitude) + ',\n' + \
                           '"longitude": ' + str(longitude) + ',\n' + \
                           '"time": "' + time.ctime() + '",\n' + \
                           '"MQ2_level": ' + str(mq2_lev) + ',\n' + \
                           '"MQ2_status": "' + mq2_status + '",\n' + \
                           '"radiation_level": ' + str(rad_level) + ',\n' + \
                           '"radiation_status": "' + rad_status + '"}\n]'
                myfile.write(one_item)
                myfile.close()
            
            #reading_sum = 0 #reset the sum
            time.sleep(time_between_readings)
except KeyboardInterrupt:             # trap a CTRL+C keyboard interrupt
    GPIO.cleanup()
    time.sleep(1)
GPIO.cleanup()
            



