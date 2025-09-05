#!/usr/bin/python3

import os
from datetime import datetime
import html

current_time = datetime.now().strftime('%a %b %d %H:%M:%S %Y')

ip_address = os.environ.get('REMOTE_ADDR', 'Unknown')

print("Content-Type: text/html")
print("Cache-Control: no-cache")
print()

print("<html><head><title>Hello CGI World</title></head>")
print("<body><h1 align=center>Hello HTML World</h1>")
print("<hr/>")
print("Hello World<br/>")
print("This program was generated with Python<br/> ")
print("This program was run at: " + current_time + "<br/>")
print("Your current IP address is: " + html.escape(ip_address) + "<br/>")
print("</body></html>")
