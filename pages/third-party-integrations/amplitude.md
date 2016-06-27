---
type: recipe
directory: third-party-integrations
title: "Amplitude"
page_title: Sync Branch data with Amplitude
description: Learn how to synchronize your Branch data with Amplitude to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Amplitude, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

{% protip title="The Amplitude integration is currently in private beta" %}
To request access to the Amplitude integration, please contact [support@branch.io](mailto:support@branch.io) or your Branch account manager. 
{% endprotip %}

With a push of a button you can send your Branch data to your Amplitude dashboard, helping you understand the power of Branch as an acquisition pathway. 

{% getstarted title="Get started with the Amplitude integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and the Amplitude SDK into your app.

{% endprerequisite %}

## Contact Branch to enable the beta

To get started, contact support@branch.io or your Branch account manager with the following information.

1. Whether you'd like to enable iOS or Android, or both
1. Your Amplitude API key

To locate your Amplitude API Key, navigate to https://amplitude.com/settings and log in. On the Settings page you should see your app(s), with accompanying API Key. Copy the API Key of whichever app you’re going to use with Branch. Here’s an example:

{% image src="/img/pages/third-party-integrations/amplitude/amplitude-api-key.png" half center alt='Example Ad' %}

## Capture IDFA/GAID

Ensure that you are capturing both the [Google Advertising Identifier (GAID) on Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id), and the [IDFA on iOS]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#install-the-sdk-manually) (by importing the `AdSupport.framework`).

## Upgrade to the latest SDKs [if necessary]

Please ensure you're using the Branch iOS SDK 0.12.2 or greater, and Android SDK v1.12.1 or greater. If you implemented Branch after May 28th 2016, you are likely already on this version or later.


{% elsif page.advanced %}


## What Branch Sends to Amplitude


| Property Name | Value | Sourced from | Example | Req 
| --- | --- | --- | --- | --- | ---
| api_key | API Key | Branch Dashboard | 70d1db75922b0b4be56b819c42bxxxxx | Y 
| event_type | Branch event | event name | [Branch] install | Y 
| platform | `ios` or `android` | collected by Branch SDK | ios | Y 
| idfa | IDFA | collected by Branch SDK | AEBE52E7-03EE-455A-B3C4-E57283966239 | * 
| idfv | IDFV | collected by Branch SDK | AEBE52E7-03EE-455A-B3C4-E57283966239 | * 
| android_id | Android ID | collected by Branch SDK | f07a13984f6d116a | N 
| adid | GAID | collected by Branch SDK | AEBE52E7-03EE-455A-B3C4-E57283966239 | * 
| device_id | Unique ID for device | $amplitude_device_id | AEBE52E7-03EE-455A-B3C4-E57283966239 | N 
| user_id | Unique ID for user | $amplitude_user_id | User A | N 
| ip | User’s IP Address | collected by Branch SDK | 111.111.111.111 | N 
| event_properties.ANY-KEY (many) | The value associated with the key | event metadata or referring link data | ~channel: facebook | N

* On iOS, `idfa` or `idfv` is required. On Android, `adid` is required.


## Custom identity support

You can use the following code to let Branch know what device_id and user_id should be sent to Amplitude. Please make sure you are using SDK version 0.12.2 or later.

**iOS:**

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$amplitude_device_id" value:@"Device A"];
[[Branch getInstance] setRequestMetadataKey:@"$amplitude_user_id" value:@"User A"];
{% endhighlight %}

**Android:**

{% highlight java %}
Branch.getInstance().setRequestMetadata("$amplitude_device_id", "12345");
Branch.getInstance().setRequestMetadata("$amplitude_user_id", "user-12345");
{% endhighlight %}

{% endif %}
