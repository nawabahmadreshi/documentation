---
type: recipe
directory: third-party-integrations
title: "Amplitude"
page_title: Sync Branch data with Amplitude
description: Learn how to synchronize your Branch data with Amplitude to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Amplitude, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Amplitude, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Amplitude, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

With a push of a button you can send your Branch data to your Amplitude dashboard, helping you understand the power of Branch as an acquisition pathway.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted title="Get started with the Amplitude integration" %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Amplitude API Key will result in Branch automatically forwarding referred events to Amplitude, in the exact format Amplitude expects.

## What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Amplitude [here](/third-party-integrations/amplitude/advanced/#what-branch-sends-to-amplitude).

## What does it look like?

Branch events will appear alongside your other tracked events in Amplitude. These events will automatically have `[Branch]` prepended. Here is an example of a Branch event in the Real Time Activity view:

{% image src="/img/pages/third-party-integrations/amplitude/amplitude-live-view.png" 3-quarters center %}

Additionally, individual events, such as those seen in Live View or visible when looking at individual users, will have Branch link data included. Here's an example:

{% image src="/img/pages/third-party-integrations/amplitude/branch-amplitude.png" half center %}

Branch events are similar to Amplitude events in that they can be used in your existing funnels and tracked on the various pages and dashboards. However, unlike normal events, Branch events contain invaluable information about how users ended up in your app in the first place.

{% getstarted title="Get started with the Amplitude integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be an Amplitude customer and have the [Amplitude SDK installed](https://amplitude.zendesk.com/hc/en-us/articles/205406607-SDKs) in your app.

{% endprerequisite %}


## Retrieve your Amplitude API Key

For the basic, codeless integration: find your Amplitude API Key and enter it into the Branch Dashboard.

1. Navigate to [https://amplitude.com/settings](https://amplitude.com/settings) and log in.
1. On the Settings page you should see your app(s), with accompanying API Key.
1. Copy the API Key of whichever app you’re going to use with Branch. Here’s an example: {% image src="/img/pages/third-party-integrations/amplitude/amplitude-api-key.png" half center alt='Example Ad' %}


## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Amplitude and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Amplitude API Key and hit **Save**

{% image src="/img/pages/third-party-integrations/amplitude/amplitude-marketplace.png" half center alt='Example Ad' %}

{% caution title="Please test your integration!" %}
Branch is not responsible for inaccurate API keys.
{% endcaution %}


## Capture IDFA/GAID

Ensure that you are capturing both the [Google Advertising Identifier (GAID) on Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id), and the [IDFA on iOS]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#install-the-sdk-manually) (by importing the `AdSupport.framework`).

{% caution title="Google Advertising ID is required" %}
Amplitude now requires the Google Advertising ID to be sent. Android ID (the hardware ID) alone is not enough.
{% endcaution %}


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
