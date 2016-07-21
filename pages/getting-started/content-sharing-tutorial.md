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

	> * The URI Scheme must follow the format: `urischemename://`
	>  
	> If my app name is Cat Facts, my URI Scheme could be: `cat-facts://`

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

### Get your Team ID

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
5. In the “Domains” section of “Associated Domains” click the `+` and add the following entries:

	> * `applinks:xxxx.app.link` (ex. if your default domain name is `abcd.app.link`, then type in `applinks:abcd.app.link`)
	> * `applinks:xxxx-alternate.app.link` (ex. if your default domain name is `abcd.app.link`, then type in `applinks:abcd-alternate.app.link`)

6. Select your [projectname].entitlements file in the Xcode navigator
7. Open the right hand sidebar
8. Ensure that the correct build target (your project name) is checked off in the right hand sidebar


## Creating Links

### Create a Share Button

1. Select the **Main.storyboard** file
2. In Xcode, create a UIButton by searching for “button” in the right hand sidebar and dragging and dropping the Button into the view controller that you wish to share links from  
3. Select the Button you just created and in the bottom right hand corner of the storyboard window select the “Pin” icon
4. If your button is placed in the bottom, left quadrant of the view controller- set the leading space constraint, bottom space constraint, height and width
	> * The leading space constraint is set by clicking the left-most dashed, red line
	> * The bottom space constraint is set by clicking the bottom-most dashed, red line
5. Open the assistant editor by clicking the the two rings in the top right corner of Xcode
6. Ctrl-click and hold the UIButton you created
7. While still holding down the mouse, drag and drop the button (a connecting line will appear) into the associated view controller file
8. A characteristics box will pop up for the UIButton that you just added to the class file
9. Make sure that the Connection type of the button is “Action” when adding it to the class file and name the button whatever you like

### Import the Branch Framework

Copy and paste the following code at the top of the view controller file where you plan to create and share links from (the same view controller where the button was added): `import Branch`

### Create a Branch Universal Object

1. Look for the line of code that starts with: `@IBAction func [yourbuttonname] (sender: AnyObject) {`
2. In the function body (after the first `{` ) of the button, insert the following code in order to create a universal object once the button is clicked:
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.title = "Cat Facts"
branchUniversalObject.contentDescription = "Here is a cat fact"
branchUniversalObject.addMetadataKey("factWords", value: factWords)
branchUniversalObject.addMetadataKey("imageLink", value: imageLink)
{% endhighlight %}

{% protip title="Key Value Pairs" %}
The `addMetadataKey` method allows you to create key value pairs which can then be accessed upon opening the app from a Branch link
{% endprotip %}

### Assemble Parameters and Setup Share Sheet

Also in the function body of the share button, add the following code which creates and opens a share sheet upon clicking the button that it is associated with: 
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
branchUniversalObject.showShareSheetWithLinkProperties(linkProperties, 
                                        andShareText: "Super amazing thing I want to share!",
                                        fromViewController: self,
                                        completion: { (String, Bool) -> Void in
    print("done showing share sheet!")
})
{% endhighlight %}

## Allow for Deep Link Routing

Now that the links have been created, you must configure your app to let the SDK know where it should redirect the user to.

### Configure View Controller to accept deep links

1. In the view controller that you wish to deep link to, import the Branch framework by inserting the following code at the top of the associated file: 
`import Branch`
2. Setup you view controller so that it will be recognized as a view controller that is accessible from a deep link:
   `class ExampleDeepLinkingController: UIViewController, BranchDeepLinkingController {`
3. The following method will be called when the view controller is loaded from a link click. Copy and paste the following code into the view controller that you want your link to route to. The data keys “factWords” and “imageLink”  are the same keys that were created in the universal object:
{% highlight swift %}
func configureControlWithData(data: [NSObject : AnyObject]!){
	factWords = data["factWords"] as! String
        imageLink = data["imageLink"] as! String
        if(alreadyLoaded){
            factText.text = factWords
            let url = NSURL(string: imageLink)
            let data = NSData(contentsOfURL: url!)
            catImage.image = UIImage(data: data!)
            imageLink = String()
            factWords = String()
        }
    }
{% endhighlight %}
4. Since the view controller is displayed modally, you must add a close button. Insert the following code underneath the previous function:
{% highlight swift %}
var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
func closePressed() {
    self.deepLinkingCompletionDelegate!.deepLinkingControllerCompleted()
}
{% endhighlight %}































