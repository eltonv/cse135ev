#!/usr/bin/python3

import os
import html

print("Cache-Control: no-cache")
print("Content-type: text/html")
print()

print("<html><head><title>Environment Variables</title></head>" +
      "<body><h1 align=center>Environment Variables</h1>" +
      "<hr/>\n<ul>\n")

for key, value in os.environ.items():
    print(f"<li>{html.escape(key)}={html.escape(value)}</li>")

print("</ul>")
print("</body></html>")
