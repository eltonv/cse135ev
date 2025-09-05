<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

echo "<html><head><title>GET query string</title></head>";
echo "<body><h1 align=\"center\">GET Request Echo</h1>";
echo "<hr/>\n";

$query_string = $_SERVER['QUERY_STRING'] ?? '';

echo "Raw query string: " . htmlspecialchars($query_string) . "<br/><br/>\n";

echo "<table> Formatted Query String:\n";

if (!empty($query_string)) {
    $pairs = explode('&', $query_string);
    
    foreach ($pairs as $pair) {
        $parts = explode('=', $pair, 2);
        
        if (count($parts) == 2) {
            $var = $parts[0];
            $val = $parts[1];
            printf("<tr><td>%-8s:</td><td>%s</td></tr>\n", 
                   htmlspecialchars($var), 
                   htmlspecialchars(urldecode($val)));
        } else {
            error_log("<empty field>");
        }
    }
}

echo "</table>";
echo "</body>";
echo "</html>";
?>
