#   Adobe Launch Notification Broadcaster

##  Description

A mini solution for customers who want to get Adobe Launch Notifications on their desired notification endpoints. It runs as a web action on **Apache OpenWhisk** / **Adobe IO Runtime**  and supports various extensions like Adobe Campaign (WIP), Postbacks, Slack APIs, file system etc.

##  Features
1.  Runs on Customer's Experience Cloud
    1.  No extra infrastructure needed. Just minimal cost for Runtime.
2.  Can extend its functionality with custom notification receivers.
3.  Fine Control over property mapping with provided notification receivers.
4.  Retrieve Configuration endpoint available.
5.  Supports Slack message and Postbacks OOTB.
6.  Error Reporting Available on healthcheck URLs.
7.  Customizable TimeZone in Notifications.
  


##  Pre-requisites
1.  An Adobe IO project with access to Adobe Launch
    *  To create a callback on Launch Properties  
2.  Access to Adobe IO Runtime / OpenWhisk Instance
    *  To run this web action
3. A notification receiver
    *  To receive notifications

##  How to use?
1. Setup your local environment for Adobe IO Runtime. Follow the guide here for setup. 
2. Once the initial setup is done, make sure you are able to access the below given commands in terminal
   1. wsk action list
   2. wsk activation list
3. Once the access is validated, clone this repo or download as zip and extract.
4. Make changes to configuration.js in the root directory as per the requirement.
   1. Usual changes will include updating the slack URLs, postback URLs and healthcheck URLs.
5. Open a terminal / cmd / powershell in  the root directory (containing package.json)
6. Execute the following commands-
   1. npm install .
   2. npm run add-apis
7. Once done, you will see a URL on the terminal.
   1. This URL will be passed as a callback URL to Adobe Launch
8. Use Adobe Launch APIs to set a callback for required events and pass this URL as the callback URL.
9.  Done! 

P.S. This is an initial version of the readme. The document will get updated with explained steps soon.

##  Contact
  * [Prateek Kejriwal](mailto:kejriwal@adobe.com)
  * [Abhishek Kumar](mailto:abhikum@adobe.com)


