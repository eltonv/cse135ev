<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

echo "<html><head><title>General Request Echo</title></head>";
echo "<body><h1 align=\"center\">General Request Echo</h1>";
echo "<hr/>\n";

printf("<strong>HTTP Protocol:</strong> %s<br/>\n", htmlspecialchars($_SERVER['SERVER_PROTOCOL']));
printf("<strong>HTTP Method:</strong> %s<br/>\n", htmlspecialchars($_SERVER['REQUEST_METHOD']));
printf("<strong>Query String:</strong> %s<br/>\n", htmlspecialchars($_SERVER['QUERY_STRING'] ?? ''));

$input = file_get_contents('php://input');
$input = empty($input) ? '(null)' : $input;
printf("<strong>Message Body:</strong> %s<br/>\n", htmlspecialchars($input));

echo "</body>";
echo "</html>";
?>
