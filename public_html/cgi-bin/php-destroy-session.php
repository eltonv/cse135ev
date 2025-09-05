<?php
header("Cache-Control: no-cache");
setcookie("destroyed");
header("Content-type: text/html");

echo "<html>";
echo "<head><title>PHP Session Destroyed</title></head>";
echo "<body>";
echo "<h1>PHP Session Destroyed</h1>";
echo "<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a>";
echo "<br />";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a>";
echo "</body>";
echo "</html>";
?>
