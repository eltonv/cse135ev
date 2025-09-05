<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

$current_time = date('D M j G:i:s Y');

$ip_address = $_SERVER['REMOTE_ADDR'];

echo "<html><head><title>Hello CGI World</title></head>" .
     "<body><h1 align=center>Hello HTML World</h1>" .
     "<hr/>\n";

echo "Hello World<br/>\n";
echo "This program was generated at: " . $current_time . "\n<br/>";
echo "Your current IP address is: " . htmlspecialchars($ip_address) . "<br/>";

echo "</body></html>";
?>
