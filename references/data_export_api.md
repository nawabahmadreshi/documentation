---
type: reference
title: Export API
repo: Deferred-Deep-Linking-Public-API
page_title: Export API Reference
description: This Branch Metrics HExport API reference lists the specifications for pulling data from Branch via API.
keywords:  
hide_platform_selector: true
---
# Data Export API

#### Configuration
In order to use this API you must have an App ID and a Branch Public Key. You must also be whitelisted to use the API. If you'd like to be whitelisted for the Export API, please contact [support@branch.io](mailto:support@branch.io).

You can find your keys at: https://dashboard.branch.io/#/settings

#### Base URL:
https://api.branch.io/v2/export/

#### Endpoint
	GET https://api.branch.io/v2/export
	Content-Type: application/json

#### Parameters

**branch_key** _required_
: The Branch key of the originating app

**branch_secret** _required_
: The Branch secret key of the originating app

**export_date** _required_
: The UTC date of the requested data export

Format the URL as follows: 
https://api.branch.io/v2/export/XXXXX?branch_secret=XXXXX&export_date=2015-11-15

> **Example:**
https://api.branch.io/v2/export/key_live_gcASshuadd7l39m36NhdsDPWRjmkdcgh12jsg1?branch_secret=secret_live_ztPsdKIjUtcjkUYF732nsl81HJ75BJqiv24J86&export_date=2015-11-15

#### Response

The response payload will be in JSON format and for each export it will have an array of paths to files on s3 to download. Note that there may be multiple files (depending on the size of the day's export) and that each csv file will be gzipped.


	{
	 "links_export_url": ["https://branch-exports.s3.amazonaws.com/YOUR_APP_ID-2015-10-23-links[-OPTIONAL_FILE_NUMBER]-HASH.csv.gz"],
	 "events_export_url": ["https://branch-exports.s3.amazonaws.com/YOUR_APP_ID-2015-10-23-events[-OPTIONAL_FILE_NUMBER]-HASH.csv.gz"],
	 "clicks_export_url": ["https://branch-exports.s3.amazonaws.com/YOUR_APP_ID-2015-10-23-link_clicks[-OPTIONAL_FILE_NUMBER]-HASH.csv.gz"]
	}


{% protip title='Note:' %}
A full day's files will be available on our S3 bucket at that location to download around 8:00am UTC. It will return an HTTP 400 from s3 until the UTC day is over and the data has been transfered to s3, therefore it is recommended you schedule any ETLs to fetch the data for the previous day around 8:00am UTC.
{% endprotip %}

####Time Limits
Data will be available through the API for 7 days after the date it's posted. It will be also available for 90 days after that upon request. After 90 days, we may delete the data to reduce unnecessary storage. If you need a record of your data for longer than 90 days, please set up a recurring export and store data in your systems. 

{% ingredient webhooks/export_types %}{% endingredient %}
