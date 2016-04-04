## GLOBAL VARIABLES ##

# Location name
loc_name = "saikung"
##loc_name = "wanchai"
##loc_name = "tsingyi"
##loc_name = "tuenmun"

## File names ##
# the file names should be modified according to location
# e.g. if the pi is in Sai Kung, then the file name should
# be something like "currentSaiKung.json"
current_status = "current"+loc_name+".json"
#print(current_status)
current_status_all4 = "current4.json"
status_record = "record"+loc_name+".json"
## These two should be discarded now that we use json
#current_level = "current_level.txt"
#level_record = "level_record.txt"

# Location details
location_latitude = 0
location_longitude = 0

if (loc_name == "saikung"):   
    location_latitude = 22.3816
    location_longitude = 114.2733
elif (loc_name == "wanchai"):
    location_latitude = 22.2770
    location_longitude = 114.176937
elif (loc_name == "tsingyi"):
    location_latitude = 22.3584
    location_longitude = 114.1070    
elif (loc_name == "tuenmun"):
    location_latitude = 22.3916
    location_longitude = 113.9709

#test .gitignore
