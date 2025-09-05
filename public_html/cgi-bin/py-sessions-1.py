#!/usr/bin/python3

import sys
import html
import os

print("Cache-Control: no-cache")

username = sys.stdin.read()
name = ""

if username.startswith('u'):
    name = username[9:]

if len(name) > 0:
    print("Content-type: text/html")
    print(f"Set-Cookie: {name}")
else:
    print("Content-type: text/html")

print()

print("<html>")
print("<head><title>Python Sessions</title></head>\n")
print("<body>")
print("<h1> Python Sessions Page 1</h1>")
print("<table>")

if len(name) > 0:
    print(f"<tr><td>Cookie:</td><td>{html.escape(name)}</td></tr>")
elif 'HTTP_COOKIE' in os.environ and os.environ['HTTP_COOKIE'] != "destroyed":
    print(f"<tr><td>Cookie:</td><td>{html.escape(os.environ['HTTP_COOKIE'])}</td></tr>")
else:
    print("<tr><td>Cookie:</td><td>None</td></tr>")

print("</table>")
print("<br />")
print("<a href=\"/py-cgiform.html\">Python CGI Form</a>")
print("<br /><br />")
print("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")
print("</body>")
print("</html>")
