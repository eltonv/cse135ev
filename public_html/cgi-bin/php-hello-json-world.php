<?php
$current_time = date('D M j G:i:s Y');
$ip_address = $_SERVER['REMOTE_ADDR'];

printf("Cache-Control: no-cache\r\n");
printf("Content-type: application/json\r\n\r\n");
printf("{\n\t\"message\": \"Hello World\",\n");
printf("\t\"date\": \"%s\",\n", $current_time);
printf("\t\"currentIP\": \"%s\"\n}\n", $ip_address);
?>
