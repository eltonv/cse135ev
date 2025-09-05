#!/usr/bin/python3

import sys
import html

print("Cache-Control: no-cache")
print("Content-type: text/html")
print()

print("<html><head><title>POST Request Echo</title></head>")
print("<body><h1 align=\"center\">POST Request Echo</h1>")
print("<hr/>\n")

input_data = sys.stdin.read()
print(f"Message Body: {html.escape(input_data)}\n<br/>")

print("</body>")
print("</html>")
