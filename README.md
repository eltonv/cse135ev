Team Members:
Elton Villalta


The password for user "grader" on your Apache server:
grader@209.38.73.106
Password4TA

https://cse135ev.site/


Details of Github auto deploy setup:
From my server I created a post-recieve executable hook in my 
hooks directory for where a bare repo was created. This post-receive hook links my bare repo to the
github repo and checks out the main branch to the live site.
On my localhost machine I cloned my repo and added my server as a remote for deployment, then i created a pre-commit executable hook in my hooks folder for the 
local repo which just logged the commits to git-log.

Now I am able to see when something is committed and when something is deployed.

Username/password info for logging into the site:
root@209.38.73.106
CSE153summer



Summary of changes to HTML file in DevTools after compression
After I compressed my files with gzip I noticed the file size of my html shrink from 402 to 301 bytes.

Summary of removing 'server' header
For this I installed mod_security onto my server and added these two lines to my apache2.conf file

ServerTokens Full
SecServerSignature "CSE135 Server"
This allowed me to get rid of the exposing information about my server.

Extra credit: Analytics configuration
