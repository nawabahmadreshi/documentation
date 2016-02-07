---
type: recipe
directory: getting-started
title: "Universal & App Links"
page_title: "Set up Universal & App Links with Branch"
description: "Learn how to enable iOS 9 Universal Links and Android App Links with Branch deep links for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- android
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

iOS Universal Links and Android App Links both route directly to your app when opened, bypassing the web browser and URI scheme combination typically used for the redirection process. App Links were introduced with Android M, and enabling them results in a more seamless experience for your users. Universal Links were introduced with iOS 9, and became the only fully-functional deep linking option on iOS after [Apple stopped supporting URI schemes for deep linking in iOS 9.2](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links). 

{% caution title="Universal Links are critical on iOS!" %}
You must enable Universal Links before Branch can function correctly on iOS 9.2+{% endcaution %}

Branch makes it simple to enable Universal Links and App Links, and even improves on them since you also get all the other benefits of Branch links when the visitor does not yet have your app installed:

{% image src='/img/pages/getting-started/universal-app-links/how_branch_improves.png' 2-thirds center alt='branch improves universal links' %}

{% elsif page.guide %}

{% if page.android %}{% else %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Add the Associated Domains entitlement

### Enable Associated Domains on Apple Developer Portal

1. Log in to the [Apple Developer Portal](https://developer.apple.com/membercenter/).
1. Click on `Certificates, Identifiers & Profiles`.
1. Click on `Identifiers`.

#### If your app already has an App Identifier
1. Select your app and press the `Edit` button.
1. Check the box to enable `Associated Domains`. {% image src='/img/pages/getting-started/universal-app-links/background_ass_domains_existing.png' half center alt='enable associated domains' %}
1. Scroll down and click `Save`.

#### If your app does not yet have an App Identifier

1. Click the `+` button to begin the Register an App ID process.
1. Enter whatever you wish in the `Name` field.
1. Enter your app's Bundle Identifier in the `Bundle ID` field. {% image src='/img/pages/getting-started/universal-app-links/background_bundle.png' half center alt='bundle identifier' %}
1. In the App Services section, check the box to enable `Associated Domains`. {% image src='/img/pages/getting-started/universal-app-links/background_ass_domains_new.png' half center alt='enable associated domains' %}
1. Scroll down and click `Save`.

{% protip title="Finding your Bundle Identifier" %}
You can retrieve your app's Bundle Identifier under the `General` tab of your Xcode project.

{% image src='/img/pages/getting-started/universal-app-links/background_bundle_xcode.png' 3-quarters center alt='bundle identifier xcode' %}
{% endprotip %}

## Add the entitlement to your project

{% if page.ios or page.cordova or page.xamarin or page.unity or page.adobe %}
### Enable Associated Domains in Xcode

1. Go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains`. {% image src='/img/pages/getting-started/universal-app-links/enable_ass_domains.png' half center alt='enable xcode associated domains' %}

{% protip title="If you see an error after this step" %}

{% image src='/img/pages/getting-started/universal-app-links/enable_ass_domains_error.png' half center alt='xcode associated domains errors' %}

Please ensure...

- The right team selected for your Xcode project.
- The Bundle Identifier of your Xcode project matches the one used to register the App Identifier with Apple.
{% endprotip %}

### Add your Branch link domains

1. In the `Domains` section, click the `+` icon and add the following entry: `applinks:bnc.lt` {% image src='/img/pages/getting-started/universal-app-links/add_domain.png' half center alt='xcode add domain' %}

{% protip title="Using a custom domain or subdomain?" %}
If you use a custom domain or subdomain for your Branch links, you should also add an entry for `applinks:[mycustomdomainorsubdomain]` and then [see this section]({{base.url}}/getting-started/universal-app-links/advanced/#using-a-custom-domain-or-subdomain) on the Advanced page.
{% endprotip %}

### Add entitlements file to the build target

1. Select your `[projectname].entitlements` file in the Xcode navigator (left sidebar).
1. Ensure that the correct build target is checked in the right sidebar. {% image src='/img/pages/getting-started/universal-app-links/entitlements-build-target.png' quarter center alt='add entitlements to build target' %}

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
If you use a custom domain or subdomain for your Branch links, you should also add a key for `<string>[mycustomdomainorsubdomain]</string>` and then [see this section]({{base.url}}/getting-started/universal-app-links/advanced/#using-a-custom-domain-or-subdomain) on the Advanced page.
{% endprotip %}

{% endif %}

## Make your app aware of incoming Universal Links

{% if page.ios %}

{% tabs %}
{% tab objective-c %}

Open your **AppDelegate.m** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];
    
    return handledByBranch;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}

Open your **AppDelegate.swift** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

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
// Support Universal Links
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

{% image src='/img/pages/getting-started/universal-app-links/dashboard_enable_universal_links.png' 3-quarters center alt='enable Universal Links on Branch dashboard' %}

## Test your Universal Links implementation

After completing this guide and installing a new build of your app on your testing device, you can verify Universal Links are working correctly by following these steps:

1. [Create a new Marketing Link](https://dashboard.branch.io/#/marketing/new) on the Branch dashboard. Leave all configuration items at their default options.
1. Open this link on your testing device via Messages, Mail, Notes, or one of the other apps listed as **works** on [this page]({{base.url}}/getting-started/universal-app-links/support/#appsbrowsers-that-support-universal-links).
1. If successful, your app should launch immediately without routing through Safari. If not, please check the [Troubleshooting section]({{base.url}}/getting-started/universal-app-links/support/#troubleshooting-universal-links).

{% endif %}

{% if page.ios %}{% else %}

## Generate signing certificate fingerprint

{% if page.android %}
{% ingredient quickstart-prerequisite %}{% endingredient %}
{% else %}
{% protip %}
The following steps are only required if you wish you enable Android App Links, 
{% endprotip %}
{% endif %}

Start by generating a SHA256 fingerprint of your app's signing certificate. This is the file that you use to build the debug and production version of your APK file before deploying it.

1. Navigate to your keystore file.
1. Run this command on it to generate the fingerprint: `keytool -list -v -keystore my-release-key.keystore`
1. You'll see a value like `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5` come out the other end. Copy this.

## Enable App Links on the Branch dashboard

1. Head to the [Link Settings page](https://dashboard.branch.io/#/settings/link) on the Branch dashboard.
1. Toggle the **Enable App Links** checkbox in the Android section.
1. Paste the copied fingerprint value into the **SHA256 Cert Fingerprints** field that appears. {% image src='/img/pages/getting-started/universal-app-links/enable_app_links.png' 3-quarters center alt='enable app links' %}
1. Scroll down and click `Save`.
 
{% protip title="Using multiple fingerprints" %}
You can insert both your debug and production fingerprints for testing. Simply separate them with a comma.
{% endprotip %}

## Add Intent Filter to Manifest

1. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from (and likely the same one you selected in the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide)).
1. Inside your `AndroidManifest.xml`, locate where the selected `Activity` is defined.
1. Within the `Activity` definition, insert the intent filter provided below.
   - Replace `READ_FROM_DASHBOARD` with the value provided underneath the **SHA256 Cert Fingerprints** field on the Branch dashboard. It will look something like this: `android:pathPrefix="/WSuf`

{% highlight xml %}
<!-- AppLink example -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="/your_app_id_obtained form Branch dash board " /> -->
    <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="READ_FROM_DASHBOARD" /> <!-- Live App link-->
</intent-filter>
{% endhighlight %}

## Test your App Links implementation

After completing this guide and installing a new build of your app on your testing device, you can verify App Links are working correctly by following these steps:

1. [Create a new Marketing Link](https://dashboard.branch.io/#/marketing/new) on the Branch dashboard. Leave all configuration items at their default options.
1. Open this link on your testing device.
1. If successful, your app should launch immediately without routing through the web browser or showing an **Open With...** dialog.

{% endif %}

{% elsif page.advanced %}

{% if page.android %}
No advanced information available for this platform.
{% else %}

## Using a custom domain or subdomain

### Custom SUBDOMAIN (go.branch.com)
1. Create a CNAME for the subdomain and point it to `custom.bnc.lt`
1. Go to [Link Settings](https://dashboard.branch.io/#/settings/link) on the Branch dashboard, and find the **Custom Link Domain** section.
1. You should see a message telling you the status of your domain under the `Domain name` field. If you don't, please type your domain in again.
1. Click the `Save` button.

{% image src='/img/pages/getting-started/universal-app-links/custom-domain-success.png' 3-quarters center alt='successful custom subdomain configuration' %}

### Custom ROOT domain (branch.com)

1. Follow [CloudFlare's instructions](https://support.cloudflare.com/hc/en-us/articles/200169046-How-do-I-add-a-CNAME-record-) to set up your root domain with a CNAME to `custom.bnc.lt`
1. Using the CloudFlare control panel, proxy your traffic to the domain `custom.bnc.lt` by clicking the cloud with the arrow to make it _orange_. {% image src='/img/pages/getting-started/universal-app-links/orange_cloud.png' 3-quarters center alt='cloudflare TLS configuration' %}
1. Make your Crypto settings match this screenshot. This is done by enabling SSL. {% image src='/img/pages/getting-started/universal-app-links/ssl.png' half center alt='cloudflare TLS' %}

## How to handle old URI paths with Universal Links

When you make the move to Universal Links, you might be wondering how to best harness your old URI paths for iOS 9.X users while keeping the experience the same for iOS 8.X and lower. The easiest way is to handle each link type separately via a conditional flag (such as **self.ignoreDeeplinkPath**) in `application:didFinishLaunchingWithOptions:launchOptions:`.

### Non-Universal Links

The entry point for this link type is `application:openURL:sourceApplication:annotation:`

1. In `application:didFinishLaunchingWithOptions:launchOptions:`, set the **self.ignoreDeeplinkPath** to `YES` (to ensure that users do not get deep linked twice).
1. Route users to the correct place in your app by harnessing the URL passed in as a parameter.

### Universal Links

The entry point for this link type is `application:continueUserActivity:restorationHandler:`

1. The default value of **self.ignoreDeeplinkPath** in `application:didFinishLaunchingWithOptions:launchOptions:` defaults to `NO`.
1. Harness the **$deeplink_path** key (set at the time of Branch link creation) to route users to the correct place in your App after Branch has finished initialization.

{% example title="Sample AppDelegate" %}

{% tabs %}
{% tab objective-c %}

Here is a generic **AppDeledate.m** snippet with these methods implemented:

{% highlight objc %}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

Branch *branch = [Branch getInstance];

   [branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
      if (!error) {
         if (params[@"$deeplink_path"] && !self.ignoreDeeplinkPath) {
            NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"your-uri-scheme://%@", params[@"$deeplink_path"]]];
            // handle the URL!
            [self routeUrl:url];
         }
      }
      self.ignoreDeeplinkPath = NO;
   }];
   return YES;
}

//Entry point for iOS 8.X users and lower 

-(BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
   [[Branch getInstance] handleDeepLink:url];
   self.ignoreDeeplinkPath = YES;

   // ... your other logic here, such as ...
   [self routeUrl:url];

   return YES;
}

//Entry point for iOS 9.X users

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
   [[Branch getInstance] continueUserActivity:userActivity];
   // ... your other logic here, such as ...
   [self continueUserActivity:userActivity];

	return YES;
}
{% endhighlight %}

{% endtab %}
{% tab swift %}

{% endtab %}
{% endtabs %}

{% endexample %}

{% endif %}

{% elsif page.support %}

{% if page.android %}
No support information available for this platform.
{% else %}

## What happens to existing links? 

### If you use bnc.lt as your domain
Universal Links are of the form `https://bnc.lt/«four-letter-identifier»/«link-hash»`. Existing links created prior to enabling Universal Links are of the form `https://bnc.lt/m/«link-hash»` or `https://bnc.lt/l/«link-hash»` and will continue to function as non-Universal Links.

Aliased links on the bnc.lt domain (e.g., `bnc.lt/download`) are not compatible with Universal Links.

### If you use a custom domain or subdomain
Branch links with custom domains are always enabled for Universal Links, even if generated prior to when you enable the feature.

## Apps/browsers that support Universal Links

Unfortunately, Universal Links don't work quite everywhere yet. We'll maintain this list and keep it up to date. *Last updated 1/25/15*.

| **App/Browser** | **Status**
| --- | ---
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

##### Is it definitely a Universal Link?
Universal Links are in the form https://bnc.lt/<<four-letter-identifier>>/<<link-hash>>. If there is a four letter code between two slashes, then it's a Universal Link. If it isn't a Universal Link, follow the above instructions to enable Universal Links, and double check that your Branch Dashboard Settings > Link Settings for iOS have "Enable Universal Links" checked. Note that aliased links bnc.lt/<custom label> don't work unless you're using a white labeled domain. 

##### Are you testing by manually entering into Safari?
Universal Links don't work properly when entered into Safari. Use Notes or iMessage for testing.

##### Are your applinks entitlements correct?
Confirm the domains you configured in Xcode are correct

##### Is the entitlements file included for your build target?
It seems that Xcode, by default, will not include the `.entitlements` file in your build. You have to check the box in the right sidebar against the correct target to ensure it's included in your app.

##### Do your Team ID & Bundle ID match those on your dashboard?
You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to "Enable Universal Links." They should match your Team ID and Bundle ID. Team ID can be found here [https://developer.apple.com/membercenter/index.action#accountSummary](https://developer.apple.com/membercenter/index.action#accountSummary). Your Bundle ID is found in Xcode, in the `General` tab for the correct build target.

##### Have you deleted the app and reinstalled it?
iOS does not re-scrape the apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the applinks entitlement, Universal Links will start working for them.)

##### Universal Links can be disabled, unfortunately.
If you are successfully taken into your app via a Universal Link, you'll see "bnc.lt" (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages or Notes and choose 'Open in <<App>>'.

##### Using a custom domain?
Make sure it's configured correctly If you're using a custom subdomain, your CNAME should point to `custom.bnc.lt` under [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch dashboard. If you're using a custom root domain, you need to use CloudFlare to proxy the traffic to Branch.

The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

{% highlight js %}
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
{% endhighlight %}

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.

## What changed in iOS 9 and 9.2?

Apple introduced Universal Links in iOS 9.0, as an alternative to the conventional method of JavaScript/URL-scheme link routing. Apple made it impossible to use JavaScript/URL-scheme routing beginning with iOS 9.2, leaving Universal Links as the only supported method. 

We have published a number of resources that can help you understand the changes and how it impacts your app:

* How to Setup Universal Links to Deep Link on Apple iOS 9 - [Original Blog Release](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
* iOS 9.2 Update: [The Fall of URI Schemes](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links)
* iOS 9.2 Transition Guide - [Original Blog](https://blog.branch.io/ios-9.2-deep-linking-guide-transitioning-to-universal-links)
* Why You Should Use Branch for [Universal Links](https://blog.branch.io/why-you-should-use-branch-for-universal-links)

{% endif %}

{% endif %}