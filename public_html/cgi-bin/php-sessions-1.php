<?php
header("Cache-Control: no-cache");

$username = file_get_contents('php://input');
$name = "";

if (substr($username, 0, 1) == 'u') {
    $name = substr($username, 9);
}

if (strlen($name) > 0) {
    header("Content-type: text/html");
    setcookie($name);
} else {
    header("Content-type: text/html");
}

echo "<html>";
echo "<head><title>PHP Sessions</title></head>\n";
echo "<body>";
echo "<h1>PHP Sessions Page 1</h1>";
echo "<table>";

if (strlen($name) > 0) {
    printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", htmlspecialchars($name));
} else if (isset($_SERVER['HTTP_COOKIE']) && $_SERVER['HTTP_COOKIE'] != "destroyed") {
    printf("<tr><td>Cookie:</td><td>%s</td></tr>\n", htmlspecialchars($_SERVER['HTTP_COOKIE']));
} else {
    echo "<tr><td>Cookie:</td><td>None</td></tr>\n";
}

echo "</table>";
echo "<br />";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a>";
echo "<br /><br />";
echo "<form action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";
echo "</body>";
echo "</html>";
?>
