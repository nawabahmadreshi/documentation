---
type: recipe
directory: getting-started
title: Content Sharing Tutorial
page_title: Content Sharing Tutorial
description: Learn how to create Branch Links and share content with your friends directly from your app!
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
hide_section_selector: true
platforms:
- ios
sections:
- guide
content: list
---

Welcome to the Branch Content Sharing Tutorial! Today you will be learning how to share deep linked content with your friends by simply pressing a button inside your app and generating a link with the Branch SDK.

This tutorial assumes that you have created your own project in Xcode or are using the Branch sample project. Before you start, please make sure that you have [signed up](https://dashboard.branch.io/login) for a Branch user account, are logged in, and are in [dashboard.branch.io](https://dashboard.branch.io) in your browser. 

The tutorial is broken up into six parts: integrating the Branch SDK, setting up your app in the Apple Developer Portal, setting up Universal Links, creating deep links, allowing for deep link routing, and testing your app. Let’s get started!

## Integrating Branch SDK

1. Click [here](https://s3-us-west-1.amazonaws.com/branchhost/Branch-iOS-SDK.zip) to download the latest version of the SDK
2. Unzip the SDK
3. Drag and drop the unzipped “Branch-iOS-SDK” folder into your project folder inside the Xcode navigator (on the left side)
4. A window will pop up once the folder has been placed inside the project. Be sure that  “Copy items if needed” and “Create groups” are selected and continue
5. Select the project file in your project navigator
6. Go to the Build Phases tab
7. Go to Link Binary with Libraries
8. Import the following frameworks by clicking the “+” button:

> * AdSupport.framework  
* CoreTelephony.framework  
* CoreSpotlight.framework  
* MobileCoreServices.framework  
* SafariServices.framework

### Add your Branch Key

1. In the Branch Dashboard create a new app by selecting “Create new app” from the drop down menu in the top right corner
2. Next to the drop down menu, make sure that “Live” button is highlighted blue- meaning that it is selected
3. Go to the Settings page from the left hand navigator in the Branch dashboard
4. Make sure the “General” tab is selected
5. Copy your Branch Key
6. In Xcode, open your project’s info.plist file from the project navigator
7. Mouse hover over “Information Property List” until a “+” appears to the right. Click it.
8. A new row will have been added under “Information Property List.” Edit the new row to show:

| Key | Type | Value |
| :--- | --- | --- |
| branch_key | String | [your Branch key] |

### Register a URI Scheme

A URI (Uniform Resource Identifier) Scheme is similar to the typical URL that you enter into your browser on a daily basis. It identifies the content of your app and places it under a single location.

1. In Xcode, select your project file in the navigator 
2. Select the “Info” tab
3. Expand the “URL Types” section at the bottom
4. Click the “+” button
5. Add the iOS URI Scheme you came up with in Step 1 to the “URL Scheme” text field
6. In the “Identifier” text field, input the “Bundle Identifier” from the General tab that is located in your project file
7. Go to Settings in the Branch Dashboard and go to Link Settings in the top navigation bar
8. Make sure that I have an iOS App is checked off 
9. Fill out “iOS URI Scheme”
 * The URI Scheme can be whatever you like but must follow the format: `urischemename://` -for example, if my app name is Cat Facts, my URI Scheme could be: `cat-facts://`

