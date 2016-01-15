---
type: recipe
directory: features
title: "Guide"
page_title: How To Setup iOS9 or Android Universal App Links With Branch
description: "Learn how to enable iOS9 Universal Links on your Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- android
sections:
- overview
- guide
- support
---

| [Overview](overview.md) | Implementation Guide | [Reference Material](reference-material.md) | [Support](support.md) | 
| --- | --- | --- | --- |

# Implementation Guide

### Steps
1. Configure developer.apple.com
2. Add the Entitlement in Xcode
3. Integrate Code Snippet with AppDelegate
4. Enable Universal Links on the Branch Dashboard

> ### Prerequisites for enabling Universal Links
> * Set up your Branch account and link routing for your app at start.branch.io.

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

> If your app does not use Branch's Easy Deeplink Routing, **click here for alternatives**


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
3. Type in your App’s Bundle Identifier.
4. Type in your Apple Team ID (found from Organization Profile > Account Summary on Apple’s Developer Portal).
5. Scroll down and click on the `Save` button.

## 5. Test a Universal Link in Your App

[gotta write steps for this]