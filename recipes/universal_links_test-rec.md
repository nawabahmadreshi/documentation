---
type: recipe
directory: features
title: "iOS9/6.0 Universal/App Links TEST"
page_title: How To Setup iOS9 or Android Universal App Links With Branch
description: "Learn how to enable iOS9 Universal Links on your Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- android
---

# In This Guide

Universal Links were introduced with iOS 9, and became the only fully-functional deeplinking option on iOS after [Apple stopped supporting URL schemes for deeplinking in iOS 9.2](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links). Universal Links route to your app if it is installed, but Safari will no longer open as part of the redirection process.

![](https://dev.branch.io/img/recipes/universal_links/how_branch_improves.png)

Fortunately Branch makes enabling Universal Links is a very simple process (you can [read more about what is going on behind the scenes here](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)).

### Implementation Steps
1. Configure developer.apple.com
2. Add the Entitlement in Xcode
3. Integrate Code Snippet with AppDelegate
4. Enable Universal Links on the Branch Dashboard

### Reference Material
* What Happens to Existing Links 
* Troubleshooting Universal Links
* Understanding the Changes in iOS 9 and 9.2
* ADVANCED: Using A Custom Domain for Universal Links
* ADVANCED: Supporting Custom Deeplink Routing with Universal Links
* Which Apps/Browsers Support Universal Links

> ### Prerequisites for enabling Universal Links
> * Set up your Branch account and link routing for your app at start.branch.io.


# Implementation Steps

## 1. Configure developer.apple.com

> If you have already configured an App ID with the Associated Domains entitlement, please **skip to section 2**.

### Enable `Associated Domains` on developer.apple.com

![](https://dev.branch.io/img/recipes/universal_links/background_certificates.png)

1. Log in to [**developer.apple.com/membercenter**](https://developer.apple.com/membercenter/).
2. Click on `Certificates, Identifiers & Profiles`
3. Click on `Identifiers`

> ### If your app already has an App Identifier
> 1. Select your app and press the `Edit` button
> 2. Check the box to enable `Associated Domains`
> 3. Scroll down and click `Save`
> 
> ---
> 
> ### If your app does not yet have an App Identifier
> 
> 1. Click the `+` button to begin the Register an App ID process
> 2. Enter whatever you wish in the `Name` field
> 3. Enter your app's bundle identifier in the `Bundle ID` field ![](https://dev.branch.io/img/recipes/universal_links/background_bundle.png) You can retrieve this by looking at the General tab of your Xcode project for the proper build target ![](https://dev.branch.io/img/recipes/universal_links/background_bundle_xcode.png)
> 4. In the App Services section, check the box to enable `Associated Domains`
> 5. Scroll down and click `Save`

## 2. Add the Entitlement in Xcode

### Enable `Associated Domains` in Xcode

> Make sure the provisioning profiles in your app belong to the same team that you are going to use throughout the Universal Link configuration process with Branch. Using provisioning profiles from a different team will cause Universal Links to fail and fall back to normal Branch links

1. Go to the `Capabilities` tab of your project file
2. Scroll down and enable `Associated Domains` so that the accordion expands ![](https://dev.branch.io/img/recipes/universal_links/enable_ass_domains.png)

> If you see an error after this step, make sure:
> 
> * You have the right team selected
> * The Bundle Identifier of your Xcode project matches the one used to register the App Identifier
> * Your app is listed as a Target for the Entitlements to your project. See [this Stackoverflow answer](http://stackoverflow.com/a/33304998) for more information.

### Add your Branch link domains

1. Click the `+` icon and add the following entries:
    * `applinks:bnc.lt`
    * `applinks:[your-whitelabeled-domain-or-subdomain]` *(omit this entry if you do not use a whitelabelled domain for your Branch links)*
![](https://dev.branch.io/img/recipes/universal_links/add_domains.png)

> ### Make sure entitlements file is included in the build target
> Xcode 7 occasionally omits new entitlements files from the build. Verify that your entitlements file is selected for membership to the right targets


## 3. Integrate Code Snippet with AppDelegate

> If your app does not use Branch's Easy Deeplink Routing, **click here for advanced instructions**


1. Add the following code snippet to AppDelegate.m or AppDelegate.swift

```
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    // pass the url to the handle deep link call

    return Branch.getInstance().continueUserActivity(userActivity)
}
```

## 4. Enable Universal Links on the Branch Dashboard

1. Navigate to [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch Dashboard.
2. Check the box to `Enable Universal Links` from iOS redirects.
3. Type in your Appâ€™s Bundle Identifier.
4. Type in your Apple Team ID (found from Organization Profile > Account Summary on Appleâ€™s Developer Portal).
5. Scroll down and click on the `Save` button.

## 5. Test a Universal Link in Your App

[gotta write steps for this]

# Reference Material

## What Happens to Existing Links 

### If you use bnc.lt as your domain
Universal Links are of the form `https://bnc.lt/Â«four-letter-identifierÂ»/Â«link-hashÂ»`. Existing links created prior to enabling Universal Links are of the form `https://bnc.lt/m/Â«link-hashÂ»` or `https://bnc.lt/l/Â«link-hashÂ»` and will continue to function as non-Universal Links.

Aliased links on the bnc.li domain (e.g., `bnc.lt/download`) are not compatible with Universal Links.

### If you use a custom domain
Branch links with custom domains are always enabled for Universal Links, even if generated prior to when you enable the feature

## Troubleshooting Universal Links

1. **Is it definitely a Universal Link?** Universal Links are in the form https://bnc.lt/Â«four-letter-identifierÂ»/Â«link-hashÂ». If there is a four letter code between two slashes, then itâ€™s a Universal Link. If it isnâ€™t a Universal Link, follow the above instructions to enable Universal Links, and double check that your Branch Dashboard Settings > Link Settings for iOS have â€œEnable Universal Linksâ€ checked. Note that aliased links such as bnc.lt/link don't work unless you're using a white labeled domain.
2. **Are you testing by manually entering into Safari?** Universal Links donâ€™t work properly when entered into Safari. Use Notes or iMessage for testing.
3. **Are your applinks entitlements correct?** Check Xcode for the correct setup.
4. **Is the entitlements file included for your build target?** It seems that Xcode, by default, will not include the entitlements file in your build. You have to check the box in the right sidebar against the correct target to ensure itâ€™s included in your app.
5. **Do your Team ID & Bundle ID match those on your dashboard?** You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to â€œEnable Universal Links.â€ They should match your Team ID and Bundle ID. Team ID can be found here https://developer.apple.com/membercenter/index.action#accountSummary. Your Bundle ID is found in Xcode, in the General tab for the correct build target.
6. **Have you deleted the app and reinstalled it?** iOS does not re-scrape the apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the applinks entitlement, Universal Links will start working for them.)
7 **Universal Links can be disabled, unfortunately.** If you are successfully taken into your app via a Universal Link, youâ€™ll see â€œbnc.ltâ€ (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages or Notes and choose â€˜Open in Â«AppÂ»â€™.
8. **Using a custom domain?** You may need to update your whitelabeled domain. If youâ€™re using a custom subdomain: update your CNAME to point to custom.bnc.lt and check your Link Settings in the Dashboard. If youâ€™re using a custom root domain: youâ€™ll need to **use CloudFlare to proxy the traffic to Branch.**

## Understanding Changes in iOS 9 and 9.2

Apple launched Universal Links in iOS 9.0, which moves the app routing into the OS so that developers donâ€™t need to worry about doing the routing in Javascript. With iOS 9.2 Apple made it impossible to launch URI schemes in the conventional fashion. This guide in its entirity can help you migrate to Universal Links and solve these issues.

We have published a number of resources that can help you understand the changes and how it impacts your app:

* How to Setup Universal Links to Deep Link on Apple iOS 9 - [Original Blog Release](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
* iOS 9.2 Update: [The Fall of URI Schemes](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links)
* iOS 9.2 Transition Guide - [Original Blog](https://blog.branch.io/ios-9.2-deep-linking-guide-transitioning-to-universal-links)
* Why You Should Use Branch for [Universal Links](https://blog.branch.io/why-you-should-use-branch-for-universal-links)

## ADVANCED: Using your custom domain for Universal Links

### If you use a custom SUBDOMAIN (e.g. go.branch.com)
1. Create a CNAME for the subdomain and point it to `custom.bnc.lt`
2. Enter your subdomain under Settings > Link Settings > Custom Link Domain. You should see a message telling you the status of your domain under the custom domain field. If you donâ€™t, please type your domain in again and save. Thatâ€™s it!

### If you use a ROOT domain (e.g. branch.com)
> To use a root domain with Branch's Universal Links implementation, you must use a service providing [CNAME flattening](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/) *and* a full reverse proxy. We recommend CloudFlare.

1. Setup your root domain to CNAME to bnc.lt ([hereâ€™s how to set up a CNAME with CloudFlare](https://support.cloudflare.com/hc/en-us/articles/200169046-How-do-I-add-a-CNAME-record-) if youâ€™re new to it)
2. Make sure your traffic is proxied to the domain `bnc.lt`. With CloudFlare, this is done by clicking the cloud with the arrow to make it orange ![](https://dev.branch.io/img/recipes/universal_links/orange_cloud.png)
3. Make your Crypto settings match this screenshot. This is done by enabling SSL on the domain/subdomain ![](https://dev.branch.io/img/recipes/universal_links/ssl.png)

> ### Troubleshooting SSL and custom domains
> The following error message will appear in your OS-level logs if your domain doesnâ€™t have SSL set up properly:
> 
> ```
> Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
> ```
> 
> These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the â€œupâ€ arrow in the bottom left corner of the main view.

## ADVANCED: Supporting Custom Deeplink Routing with Universal Links

[gotta write something for this]

## Which Apps/Browsers Support Universal Links
Unfortunately, Universal Links donâ€™t work quite everywhere yet. Weâ€™ll maintain this list and keep it up to date. *Last updated 12/12/15.*

| App/Browser | Status |
| --- | --- |
| Messages | works |
| Slack | works |
| Mail | works |
| Safari | works conditionally * |
| Chrome | works conditionally * |
| Google | not working |
| Facebook | not working |
| Twitter | not working |
| Gmail | not working |
| Pinterest | not working |
| FB Messenger | not working |
| Inbox | not working |

*Note: Conditionally working means that it works (i.e., opens the app) some of the time:*

* Universal Links will not work if you paste the link into the browser URL field.
* Universal Links work with a user driven `<a href="...">` element click *across domains*. Example: if there is a Universal Link on google.com pointing to bnc.lt, it will open the app.
* Universal Links will not work with a user driven `<a href="...">` element click on the *same domain*. Example: if there is a Universal Link on google.com pointing to a different Universal Link on google.com, it will not open the app.
* Universal Links cannot be triggered via Javascript (in `window.onload` or via a `.click()` call on an `<a>` element), unless it is part of a user action.