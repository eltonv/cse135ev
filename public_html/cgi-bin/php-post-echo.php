
<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

echo "<html><head><title>POST Request Echo</title></head>";
echo "<body><h1 align=\"center\">POST Request Echo</h1>";
echo "<hr/>\n";

$input = file_get_contents('php://input');
printf("Message Body: %s\n<br/>", htmlspecialchars($input));

echo "</body>";
echo "</html>";
?>
