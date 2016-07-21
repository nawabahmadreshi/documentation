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
8. Import the following frameworks by clicking the `+` button:

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
7. Mouse hover over “Information Property List” until a `+` appears to the right. Click it.
8. A new row will have been added under “Information Property List.” Edit the new row to show:

| Key | Type | Value |
| :--- | --- | --- |
| branch_key | String | [your Branch key] |

### Register a URI Scheme

A URI (Uniform Resource Identifier) Scheme is similar to the typical URL that you enter into your browser on a daily basis. It identifies the content of your app and places it under a single location.

1. In Xcode, select your project file in the navigator 
2. Select the “Info” tab
3. Expand the “URL Types” section at the bottom
4. Click the `+` button
5. Add the iOS URI Scheme you came up with in Step 1 to the “URL Scheme” text field
6. In the “Identifier” text field, input the “Bundle Identifier” from the General tab that is located in your project file
7. Go to Settings in the Branch Dashboard and go to Link Settings in the top navigation bar
8. Make sure that I have an iOS App is checked off 
9. Fill out “iOS URI Scheme”
  {% example %}
   * The URI Scheme must follow the format: `urischemename://`

   If my app name is Cat Facts, my URI Scheme could be: `cat-facts://`
  {% endexample %}
10. Select **Custom URL** and type in your website's URL or `http://branch.io` if you don't have one
11. Scroll to the bottom of the page and click "Save"

### Support Strong Matching

1. Go to [Settings](https://dashboard.branch.io/settings) in the Branch Dashboard
2. Using the top navigation bar, go to [Link Settings](https://dashboard.branch.io/settings/link)
3. Under **Custom Link Domain**, copy your **Default domain name** (if you have a Custom Link Domain then select that instead)
4. In Xcode, open your project’s info.plist file
5. Mouse hover over “Information Property List” until a `+` appears to the right. Click it.
6. A new row will have been added under “Information Property List”
7. Edit the new row to show:

  | Key | Type | Value |
  | :--- | --- | --- |
  | branch_app_domain | String | [your default/custom domain name] |

### Add a Bridging Header

(This allows you to use the Branch framework which is written in Objective-C, with your Swift code)

1. In Xcode, select your project folder
2. Add a new file to your project folder (File -> New -> File..)
3. Choose “Header File” and click “Next”
4. Name the new header file YourAppName-Bridging-Header. For example, if my project name is “Cat Facts” then the file should be saved as “Cat-Facts-Bridging-Header”
5. Before clicking “Create”, make sure that your app is selected in Targets
6. Once the file has been created, open it up
7. Delete all the text in the file and type in (do not copy and paste): `#import "Branch.h"`
8. Open your project file
9. Navigate to Build Settings
10. Like in the screenshot below, search for “bridging header”
11. Edit “Objective-C Bridging Header” so that its Tutorial Helper column reads: YourAppName/Your-Bridging-Header.h 
  {% example %}
   `Cat Facts/Cat-Facts-Bridging-Header.h`
  {% endexample %}

### Start a Branch Session

1. In Xcode, open the **AppDelegate.swift** file
2. Directly underneath the line that reads: `import UIKit`, copy and paste `import Branch`

### Handle incoming links

Copy and paste the following code into **AppDelegate.swift** right before the very last `}` :

{% highlight swift %}
// Respond to URI scheme links
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    // pass the url to the handle deep link call
    Branch.getInstance().handleDeepLink(url);

    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    return true
}

// Respond to Universal Links
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    // pass the url to the handle deep link call

    return Branch.getInstance().continueUserActivity(userActivity)
}
{% endhighlight %}

## Access Apple Developer Account

Get your Team ID

1. Select “Certificates, Identifiers, and Profiles” in the [Apple Developer Portal](http://developer.apple.com/account)
2. In the top right corner of the page, click your name and select “View Account”
3. Copy your “Team ID” from the Membership Information section

## Setup Universal Links

### Enable Universal Links on the Dashboard

1. Navigate to the [Link Settings](https://dashboard.branch.io/#/settings/link) tab under **Settings** in the Dashboard
2. Check the box that says **Enable Universal Links** in the “iOS redirects” section
3. Type in your Apple App Prefix (Team ID that you copied)
4. Scroll to the bottom and Save

### Add the Associated Domains entitlement to your project

1. Go to the “Capabilities” tab of your project file
2. Scroll down and in the “Associated Domains” section flip the switch in the right hand side from “Off” to “On”- enabling Associated Domains
  * A message may pop up asking you to select a “Development Team to use for provisioning”. Choose the name associated with your Apple Developer Account
3. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) tab in the Dashboard Settings
4. Locate the “Default domain name” box from the “Custom Link Domain” area
4. In the “Domains” section of “Associated Domains” click the “+” and add the following entries:
> * applinks:xxxx.app.link (example: if your default domain name is abcd.app.link, then type in “applinks:abcd.app.link”)
> * Applinks:xxxx-alternate.app.link (example: if your default domain name is abcd.app.link, then type in “applinks:abcd-alternate.app.link”)






















