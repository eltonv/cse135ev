#!/usr/bin/python3

print("Cache-Control: no-cache")
print("Set-Cookie: destroyed")
print("Content-type: text/html")
print()

print("<html>")
print("<head><title>PHP Session Destroyed</title></head>")
print("<body>")
print("<h1>PHP Session Destroyed</h1>")
print("<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a>")
print("<br />")
print("<a href=\"/php-cgiform.html\">PHP CGI Form</a>")
print("</body>")
print("</html>")
