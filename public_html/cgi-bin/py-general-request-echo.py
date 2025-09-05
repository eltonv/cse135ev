#!/usr/bin/python3

import sys
import html
import os

print("Cache-Control: no-cache")
print("Content-type: text/html")
print()

print("<html><head><title>General Request Echo</title></head>")
print("<body><h1 align=\"center\">General Request Echo</h1>")
print("<hr/>\n")

print(f"<strong>HTTP Protocol:</strong> {html.escape(os.environ.get('SERVER_PROTOCOL', ''))}<br/>")
print(f"<strong>HTTP Method:</strong> {html.escape(os.environ.get('REQUEST_METHOD', ''))}<br/>")
print(f"<strong>Query String:</strong> {html.escape(os.environ.get('QUERY_STRING', ''))}<br/>")

input_data = sys.stdin.read()
input_data = '(null)' if not input_data else input_data
print(f"<strong>Message Body:</strong> {html.escape(input_data)}<br/>")

print("</body>")
print("</html>")
