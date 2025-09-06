Team Members:
Elton Villalta

IP: 209.38.73.106

my ssh config:
Host cse135
  HostName 209.38.73.106
  User eltonv
  PasswordAuthentication yes

The password for user "grader" on your Apache server AND TEAMS SITE:
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

This allowed me to get rid of the exposing information about my server by allowing me to overide the default signature.





Checkpoint 3 Part 5

DASHBOARD

Charts may be static or dynamic, server or client rendered, choose what works for you. We will not give strict requirements on what the charts should look like because we want to see what YOU took away from the course:
What data do you think is important?
How should that data be displayed?
Does it make sense to use a line chart or a bar chart?


I wanted to focus more on user interaction in my analytics, to achieve this I was collecting various timing reports as well as event tracking. 
For my first chart, I decided to go with a static bar chart to display the average scroll amount  that the client would perform. 
The activity entries would be filtered to only consist of mouse scrolling. I wanted to see the average amount that people scroll on a page  across different html pages on my website to see which 
ones were getting the most interaction, therefore it made sense to go with a bar chart, where each bar repesented a different
html page.
 
For my second chart I wanted to get some insight as to the times people were landing on my main page. I thought it was ample to collect timestamps as well as collecting how many entries there were for a specific time. With this 
information I decided to go with a heatmap becuase it provided a nice representation of when users would visit the page the most while also giving users a wider picture of its traffic. The different intensities in the cells would allow one to see clearly when the site is most active.
 
Lastly for my chart, I tried to gather insights as to how much people spent time on my page and tried to see what were the referring websites. I do not have enough data for this but it is populating. 
I thought a chart that listed the time on page as well as the referring url and current url would be suffecient data to make this insight.

REPORT:
I went with a bar chart to represent the average time that users spent on different pages of my website
in addition to that, I also distinguished between those that visited the site directly (typed in the link) and those that visited following a link. I made sure they were different shades to be able to distinguish. For my second graphic, the grid, I decided to go with a few column highlighting what I considered the most important features that were collected. I put the page URLs on the first column so it is easy to parse what site we are referencing to, as well as the site that referred it.

