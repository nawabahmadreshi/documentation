---
type: recipe
directory: basic-setup
title: 3. Mobile SDK Integration
page_title: Set up the Mobile SDK
description: Integrate the Branch SDK into your app to get full install attribution.
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
- react
- mparticle_ios
- mparticle_android
- ios_imessage
hide_section_selector: true
sections:
- guide
---
**Estimated Time to Complete**

30 Minutes - 2 Hours

**Required Personnel**

Mobile Developer (with access to the dashboard)

**Requires An App Update**

Yes

The Mobile SDK is a key component in empowering Branch to do everything that it does. The SDK setup process is relatively straight-forward, and if you are developing a native Android or iOS app, we strongly suggest using our onboarding flow to complete this step, which gives you code snippets for easy copy-paste setup. For greater context about each step of the process, or to use a different SDK, please select your desired platform in the tabs above and continue.

Before going through this guide, you should spend some time thinking about how you’re planning on using the data in your Branch links to route users to the appropriate content.

{% if page.ios %}

## Enable Universal Links on the Branch dashboard

Universal Links are a critical component for deep linking on iOS. Read more about them here.

1. Navigate to [Link Settings](https://dashboard.branch.io/#/settings/link) in the Branch Dashboard.
1. Check the box to `Enable Universal Links` from iOS redirects.
1. Type in your App’s Bundle Identifier.
1. Type in your Apple App Prefix (found by clicking your app on [this page](https://developer.apple.com/account/ios/identifier/bundle) in Apple's Developer Portal).
1. Scroll down and click on the `Save` button.

{% image src='/img/pages/getting-started/universal-app-links/dashboard_enable_universal_links.png' 3-quarters center alt='Enable Universal Links on the Branch dashboard' %}

## Get the SDK files

With extensive use, the iOS SDK footprint is **180 kb**.

### Install with CocoaPods

The recommended way to install the SDK is via CocoaPods:

1. Add `pod "Branch"` to your podfile.
1. Run `pod install` from the command line.

### Install with Carthage

Alternatively, you could install the SDK via Carthage:

1. Add `github "BranchMetrics/iOS-Deferred-Deep-Linking-SDK"` to your Cartfile.
1. Run `carthage update` from the command line.

{% protip title="If you do not use CocoaPods or Carthage" %}

You can [install the SDK manually]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios#install-the-sdk-manually){:target="_blank"}.

{% endprotip %}

## Configure your XCode Project

### Add your Branch key

1. Retrieve your Branch Key on the [Settings](https://dashboard.branch.io/#/settings){:target="_blank"} page of the Branch dashboard.
1. Add new rows to your info.plist file with the following values, with the `String` entry inside the `Dictionary`:

| Key | Type | Value |
| :--- | --- | --- |
| branch_key | Dictionary | |
| live | String | [key_live_xxxxxxxxxxxxxxx] |
| test | String | [key_test_xxxxxxxxxxxxxxx] |

{% image src="/img/pages/getting-started/sdk-integration-guide/ios_add_branchKey.gif" actual center alt="Add the Branch Key" %}

### Register a URI scheme

Branch opens your app by using its URI scheme (`yourapp://`), which should be unique to your app.

1. On the [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard, ensure that **I have an iOS App** is checked and **iOS URI Scheme** is filled.
1. In Xcode: Click your project file, navigate to **Targets > Info > URL Types**, and add a new entry with your URI scheme.

{% image src='/img/pages/getting-started/sdk-integration-guide/ios_get_uriScheme.gif' full center alt='URL Scheme Demo' %}

### Support Strong Matching (only needed for &nbsp; **app.link** &nbsp; domains)

1. Retrieve your app default domain name from [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} page of the Branch dashboard under **Link Domain**
1. In Xcode, open your project's Info.plist file in the Navigator (on the left side).
1. Mouse hover "Information Property List" (the root item under the Key column).
1. After about half a second, you will see a `+` sign appear. Click it.
1. Add a new row with the following values:

| Key | Type | Value |
| :--- | --- | --- |
| branch_app_domain | String | [your default domain name] |

{% caution %}
This only applies to apps which have the `app.link` domain such as `h4vy.app.link`. If your app's domain is `bnc.lt` or a custom one, you don't need this step.
{% endcaution %}

## Start a Branch Session

## Implement your Routing Logic

{% endif %}
{% if page.android %}

{% endif %}

<h3 style="margin-top:0;"><a href="{{base.url}}/basic-setup/setup-web-sdk" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;">Next: &nbsp; <br class="visible-md"><strong>Set Up the Web SDK</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>