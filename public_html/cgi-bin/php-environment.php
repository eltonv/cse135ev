
<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

printf("<html><head><title>Environment Variables</title></head>" .
       "<body><h1 align=center>Environment Variables</h1>" .
       "<hr/>\n<ul>\n");

foreach ($_SERVER as $key => $value) {
    printf("<li>%s=%s</li>\n", htmlspecialchars($key), htmlspecialchars($value));
}

printf("</ul>\n");

printf("</body></html>");
?>
