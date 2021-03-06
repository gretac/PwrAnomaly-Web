# PwrAnomaly-Web
Web interface for power consumption based anomaly detection

To set up the node environment run `npm install`

To run the application (on MacOS or Linux), run `./bin/www`
and go to **http://localhost:3002/** in your browser.

For more information on node express applications, refer to *http://expressjs.com/*

## Uploading Power Trace Files

A trace file and an alarm can be uploaded using 

`curl: curl --form traceFile=@../files/trace.dat --form alarm="false"  localhost:3002/api/upload`

File upload can be done through scripts found in bin/ as well. The HOST, PORT, and endpoint
are hardcoded in the scripts and have to be modified there.


* For Node.js script run:

  `npm install fs`

  `npm install http`

  `node update.js path/to/file "true" "Msg"`



* For Python script (no external libraries) run:

  `python update.py path/to/file "false"`


* For Python script (using external libraries) run:

  `pip install requests`

  `python update_extlib.py path/to/file "false"`
