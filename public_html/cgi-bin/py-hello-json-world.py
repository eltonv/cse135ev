#!/usr/bin/python3

import os
from datetime import datetime

current_time = datetime.now().strftime('%a %b %d %H:%M:%S %Y')
ip_address = os.environ.get('REMOTE_ADDR', 'Unknown')

print("Cache-Control: no-cache\r")
print("Content-type: application/json\r\n")
print("{\n\t\"message\": \"Hello World\",")
print(f"\t\"date\": \"{current_time}\",")
print(f"\t\"currentIP\": \"{ip_address}\"")
print("}")
