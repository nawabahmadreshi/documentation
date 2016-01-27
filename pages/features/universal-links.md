---
type: recipe
directory: features
title: "Universal Links"
page_title: "Set up iOS 9 Universal Links with Branch"
description: "Learn how to enable iOS 9 Universal Links on with Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- overview
- guide
- advanced
- support
---

{% if page.overview %}

Universal Links route directly to your app when opened, instead of using Safari and a URL scheme for the redirection process. They were introduced with iOS 9, and became the only fully-functional deeplinking option on iOS after [Apple stopped supporting URL schemes for deeplinking in iOS 9.2](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links). **You must enable Universal Links before Branch can function correctly on iOS 9.2+!**

{% protip title="Looking for Android support?" %}
Universal Links are an iOS-only feature, but [App Links]({{base.url}}/features/app-links) are the Android equivalent.
{% endprotip %}

Branch makes it simple to enable Universal Links, and even improves on them since you still get all the other benefits of Branch links:

{% image src='/img/pages/features/universal-links/how_branch_improves.png' 2-thirds center alt='branch improves universal links' %}

{% endif %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Enable the Associated Domains entitlement

### Add Associated Domains on Apple Developer Portal

1. Log in to the [Apple Developer Portal](https://developer.apple.com/membercenter/)
1. Click on `Certificates, Identifiers & Profiles`
1. Click on `Identifiers`

#### If your app already has an App Identifier
1. Select your app and press the `Edit` button
1. Check the box to enable `Associated Domains` {% image src='/img/pages/features/universal-links/background_ass_domains_existing.png' half center alt='enable associated domains' %}
1. Scroll down and click `Save` 

#### If your app does not yet have an App Identifier

1. Click the `+` button to begin the Register an App ID process
1. Enter whatever you wish in the `Name` field
1. Enter your app's Bundle Identifier in the `Bundle ID` field {% image src='/img/pages/features/universal-links/background_bundle.png' half center alt='bundle identifier' %}
1. In the App Services section, check the box to enable `Associated Domains` {% image src='/img/pages/features/universal-links/background_ass_domains_new.png' half center alt='enable associated domains' %}
1. Scroll down and click `Save`

{% protip title="Finding your Bundle Identifier" %}
You can retrieve your app's Bundle Identifier under the `General` tab of your Xcode project.

{% image src='/img/pages/features/universal-links/background_bundle_xcode.png' 3-quarters center alt='bundle identifier xcode' %}
{% endprotip %}

## Add the entitlement to your project

{% if page.ios or page.cordova or page.xamarin or page.unity or page.adobe %}
### Enable Associated Domains in Xcode

1. Go to the `Capabilities` tab of your project file
1. Scroll down and enable `Associated Domains` {% image src='/img/pages/features/universal-links/enable_ass_domains.png' half center alt='enable xcode associated domains' %}

{% protip title="If you see an error after this step" %}

{% image src='/img/pages/features/universal-links/enable_ass_domains_error.png' half center alt='xcode associated domains errors' %}

Please ensure...

- The right team selected for your Xcode project
- The Bundle Identifier of your Xcode project matches the one used to register the App Identifier with Apple
{% endprotip %}

### Add your Branch link domains

1. In the `Domains` section, click the `+` icon and add the following Domains entry: `applinks:bnc.lt` {% image src='/img/pages/features/universal-links/add_domain.png' half center alt='xcode add domain' %}

{% protip title="Using a custom domain or subdomain?" %}
If you use a custom domain or subdomain for your Branch links, you should also add a Domains entry for `applinks:[mycustomdomainorsubdomain]` and then [see this section](../advanced/#using-a-custom-domain-or-subdomain) on the Advanced page
{% endprotip %}

### Add entitlements file to the build target

1. Select your `[projectname].entitlements` file in the Xcode navigator (left sidebar)
1. Ensure that the correct build target is checked in the right sidebar {% image src='/img/pages/features/universal-links/entitlements-build-target.png' quarter center alt='add entitlements to build target' %}

{% endif %}
{% if page.titanium %}

1. Create a new file named `Entitlements.plist` in the same directory as your Titanium app's `tiapp.xml`
1. Insert the following snippet:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.developer.associated-domains</key>
    <array>
        <string>applinks:bnc.lt</string>
    </array>
</dict>
</plist>
{% endhighlight %}

{% protip title="Using a custom domain or subdomain?" %}
If you use a custom domain or subdomain for your Branch links, you should also add a key for `<string>[mycustomdomainorsubdomain]</string>` and then [see this section](../advanced/#using-a-custom-domain-or-subdomain) on the Advanced page
{% endprotip %}

{% endif %}

## Make your app aware of incoming Universal Links

{% if page.ios %}

{% tabs %}
{% tab objective-c %}

Open your **AppDelegate.m** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present)

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];
    
    return handledByBranch;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}

Open your **AppDelegate.swift** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present)

{% highlight swift %}
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    // pass the url to the handle deep link call

    return Branch.getInstance().continueUserActivity(userActivity)
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
{% if page.cordova %}

Does this step occur on Cordova?

{% endif %}
{% if page.xamarin %}

Open your **AppDelegate.cs** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present). Note that there are different versions depending on whether you are using Xamarin Forms or not. 

{% tabs %}
{% tab forms %}

{% highlight c# %}
// For Universal Links
public override bool ContinueUserActivity (UIApplication application,
    NSUserActivity userActivity,
    UIApplicationRestorationHandler completionHandler)
{
    bool handledByBranch = BranchIOS.getInstance ().ContinueUserActivity (userActivity, app);
    return handledByBranch;
}
{% endhighlight %}
{% endtab %}
{% tab non-forms %}

{% highlight c# %}
// Support Universal Links
public override bool ContinueUserActivity (UIApplication application,
    NSUserActivity userActivity,
    UIApplicationRestorationHandler completionHandler)
{
    bool handledByBranch = BranchIOS.getInstance ().ContinueUserActivity (userActivity, this);
    return handledByBranch;
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
{% if page.unity %}

Does this step occur on Unity?

{% endif %}
{% if page.adobe %}

Does this step occur on Air ANE?

{% endif %}
{% if page.titanium %}

Does this step occur on Titanium?

{% endif %}

## Enable Universal Links on the Branch dashboard

1. Navigate to [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch Dashboard.
1. Check the box to `Enable Universal Links` from iOS redirects.
1. Type in your App’s Bundle Identifier.
1. Type in your Apple App Prefix (found by clicking your app on [this page](https://developer.apple.com/account/ios/identifiers/bundle/bundleList.action) in Apple's Developer Portal).
1. Scroll down and click on the `Save` button.

{% image src='/img/pages/features/universal-links/dashboard_enable_universal_links.png' 3-quarters center alt='enable Universal Links on Branch dashboard' %}

## Test your Universal Links implementation

After completing this guide and installing a new build of your app on your testing device, you can verify Universal Links are working correctly by following these steps:

1. [Create a new Marketing Link](https://dashboard.branch.io/#/marketing/new) on the Branch dashboard. Leave all configuration items at their default options
1. Open this link on your testing device via Messages, Mail, Notes, or one of the other apps listed as **works** on [this page](../support/#appsbrowsers-that-support-universal-links)
1. If successful, your app should immediately open. If not, please check our [Troubleshooting section](../support/#troubleshooting-universal-links)

{% if page.advanced %}

## Using a custom domain or subdomain

#### Custom SUBDOMAIN (go.branch.com)
1. Create a CNAME for the subdomain and point it to `custom.bnc.lt`
1. Go to [Link Settings](https://dashboard.branch.io/#/settings/link) on the Branch dashboard, and find the **Custom Link Domain** section
1. You should see a message telling you the status of your domain under the `Domain name` field. If you don't, please type your domain in again
1. Click the `Save` button

{% image src='/img/pages/features/universal-links/custom-domain-success.png' 3-quarters center alt='successful custom subdomain configuration' %}

#### Custom ROOT domain (branch.com)

1. Follow [CloudFlare's instructions](https://support.cloudflare.com/hc/en-us/articles/200169046-How-do-I-add-a-CNAME-record-) to set up your root domain with a CNAME to `custom.bnc.lt`.
1. Using the CloudFlare control panel, proxy your traffic to the domain `custom.bnc.lt` by clicking the cloud with the arrow to make it _orange_. {% image src='/img/pages/features/universal-links/orange_cloud.png' 3-quarters center alt='cloudflare TLS configuration' %}
1. Make your Crypto settings match this screenshot. This is done by enabling SSL. {% image src='/img/pages/features/universal-links/ssl.png' half center alt='cloudflare TLS' %}

#### Troubleshooting SSL

The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

{% highlight javascript %}
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
{% endhighlight %}

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.

## Retrieving a Universal Link URL inside the app

Universal Links receive their data via `continueUserActivity`in the App Delegate. This is a break from traditional URL scheme links, which pass a deeplink URL (`yourapp://path/to/content`) directly through `openUrl`. The new delegate method is used for a number of app transitions including Spotlight to Universal Links, and will likely see a couple more use cases introduced in future OS versions.

The following snippet will allow you to retrieve the full Universal Link URL that opened the app:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSString *myUrl = [userActivity.webpageURL absoluteString];
        // parse URL string or access query params
    }
    return YES;
}

{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
    	let linkUrl = userActivity.webpageUrl?.absoluteString
    	// parse URL string or access query params
	}

    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% example title="Deeplink routing using URL Paths" %}
Let’s say that you already use URL paths for all of your deeplink routing, contained in a method in the App Delegate named `handleRouting`. You can tie Universal Links into this method by grabbing `webpageUrl` and feeding it to `handleRouting`.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [self handleRouting:url];
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        [self handleRouting:userActivity.webpageURL];
    }
    return YES;
}

- (void)handleRouting:(NSURL *)url {
....
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    handleRouting(url)

    return true
}

func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
    	handleRouting(userActivity.webpageUrl)
	}

    return true
}

func handleRouting(url: NSURL) {
....

{% endhighlight %}
{% endtab %}
{% endtabs %}

The resulting URLs might not perfectly match your existing in-app URL scheme, so you just need to have logic in the `handleRouting` call to split out any differences.

{% endexample %}

{% elsif page.support %}

## What happens to existing links? 

#### If you use bnc.lt as your domain
Universal Links are of the form `https://bnc.lt/«four-letter-identifier»/«link-hash»`. Existing links created prior to enabling Universal Links are of the form `https://bnc.lt/m/«link-hash»` or `https://bnc.lt/l/«link-hash»` and will continue to function as non-Universal Links.

Aliased links on the bnc.lt domain (e.g., `bnc.lt/download`) are not compatible with Universal Links.

#### If you use a custom domain
Branch links with custom domains are always enabled for Universal Links, even if generated prior to when you enable the feature.

## Apps/browsers that support Universal Links

Unfortunately, Universal Links don't work quite everywhere yet. We'll maintain this list and keep it up to date. *Last updated 1/25/15*.

| **App/Browser** | **Status**
| Messages | works
| Mail | works
| Whatsapp | works
| Slack | works, if it's set to open Safari, not in-app browser (uses SFSafariViewController)
| Safari | works conditionally *
| Chrome | works conditionally *
| Google | works conditionally *
| Gmail | if Chrome installed, opens link in Chrome (not Universal Link). Else, works conditionally *
| Inbox | if Chrome installed, opens link in Chrome (not Universal Link). Else, works.
| Twitter | works conditionally *
| Facebook | works conditionally *
| FB Messenger | works conditionally *
| WeChat | works conditionally *
| Pinterest | not working
| Telegram | not working (uses SFSafariViewController)

*Note: Conditionally working means that it works (i.e., opens the app) some of the time:*

- Universal Links will not work if you paste the link into the browser URL field.
- Universal Links work with a user driven `<a href="...">` element click *across domains*. Example: if there is a Universal Link on google.com pointing to bnc.lt, it will open the app.
- Universal Links will not work with a user driven `<a href="...">` element click on the *same domain*. Example: if there is a Universal Link on google.com pointing to a different Universal Link on google.com, it will not open the app.
- Universal Links cannot be triggered via Javascript (in `window.onload` or via a `.click()` call on an `<a>` element), unless it is part of a user action.
- Google, Gmail, Inbox, Twitter, Facebook, FB Messenger, WeChat -- Universal Links only work when you have a webview already open. In other words, they do not work in-app from the feed / main views. Again, they also *must* be cross-domain, aka if your user is on yourapp.com and clicks a Universal Link also for yourapp.com, it will not work. However, clicking from yourapp.com to bnc.lt will trigger the link to function as a Universal Link and open your app directly.

## Troubleshooting Universal Links

#### Is it definitely a Universal Link?
Universal Links are in the form https://bnc.lt/<<four-letter-identifier>>/<<link-hash>>. If there is a four letter code between two slashes, then it's a Universal Link. If it isn't a Universal Link, follow the above instructions to enable Universal Links, and double check that your Branch Dashboard Settings > Link Settings for iOS have "Enable Universal Links" checked. Note that aliased links bnc.lt/<custom label> don't work unless you're using a white labeled domain. 

#### Are you testing by manually entering into Safari?
Universal Links don't work properly when entered into Safari. Use Notes or iMessage for testing.

#### Are your applinks entitlements correct?
Confirm the domains you configured in Xcode are correct

#### Is the entitlements file included for your build target?
It seems that Xcode, by default, will not include the `.entitlements` file in your build. You have to check the box in the right sidebar against the correct target to ensure it's included in your app.

#### Do your Team ID & Bundle ID match those on your dashboard?
You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to "Enable Universal Links." They should match your Team ID and Bundle ID. Team ID can be found here [https://developer.apple.com/membercenter/index.action#accountSummary](https://developer.apple.com/membercenter/index.action#accountSummary). Your Bundle ID is found in Xcode, in the `General` tab for the correct build target.

#### Have you deleted the app and reinstalled it?
iOS does not re-scrape the apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the applinks entitlement, Universal Links will start working for them.)

#### Universal Links can be disabled, unfortunately.
If you are successfully taken into your app via a Universal Link, you'll see "bnc.lt" (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages or Notes and choose 'Open in <<App>>'.

#### Using a custom domain?
Make sure it's configured correctly If you're using a custom subdomain,  your CNAME should point to `custom.bnc.lt` under [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch dashboard. If you're using a custom root domain, you need to use CloudFlare to proxy the traffic to Branch.

## What changed in iOS 9 and 9.2?

Apple introduced Universal Links in iOS 9.0, as an alternative to the conventional method of JavaScript/URL-scheme link routing. Apple made it impossible to use JavaScript/URL-scheme routing beginning with iOS 9.2, leaving Universal Links as the only supported method. 

We have published a number of resources that can help you understand the changes and how it impacts your app:

* How to Setup Universal Links to Deep Link on Apple iOS 9 - [Original Blog Release](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
* iOS 9.2 Update: [The Fall of URI Schemes](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links)
* iOS 9.2 Transition Guide - [Original Blog](https://blog.branch.io/ios-9.2-deep-linking-guide-transitioning-to-universal-links)
* Why You Should Use Branch for [Universal Links](https://blog.branch.io/why-you-should-use-branch-for-universal-links)

{% endif %}