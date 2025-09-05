#!/usr/bin/python3

import os
import html
import urllib.parse
import sys

print("Cache-Control: no-cache")
print("Content-type: text/html")
print()

print("<html><head><title>GET query string</title></head>")
print("<body><h1 align=\"center\">GET Request Echo</h1>")
print("<hr/>\n")

query_string = os.environ.get('QUERY_STRING', '')
print("Raw query string: " + html.escape(query_string) + "<br/><br/>\n")
print("<table> Formatted Query String:\n")

if query_string:
    pairs = query_string.split('&')
    
    for pair in pairs:
        parts = pair.split('=', 1)
        
        if len(parts) == 2:
            var = parts[0]
            val = parts[1]
            print(f"<tr><td>{html.escape(var):<8}:</td><td>{html.escape(urllib.parse.unquote(val))}</td></tr>")
        else:
            print("<empty field>", file=sys.stderr)

print("</table>")
print("</body>")
print("</html>")
