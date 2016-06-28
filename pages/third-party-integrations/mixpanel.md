---
type: recipe
directory: third-party-integrations
title: "Mixpanel"
page_title: Sync Branch data with Mixpanel
description: Learn how to synchronize your Branch data with Mixpanel, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

{% protip title="The Mixpanel integration is currently in private beta" %}
To request access to the Mixpanel integration, please contact [integrations@branch.io](mailto:integrations@branch.io) or your Branch account manager. 
{% endprotip %}

With a push of a button you can send your Branch data to your Mixpanel dashboard, helping you understand the power of Branch as an acquisition pathway. 

{% getstarted title="Get started with the Mixpanel integration" %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Mixpanel Token will result in Branch automatically forwarding referred events to Mixpanel, in the exact format Mixpanel expects.

## What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Mixpanel [here](/third-party-integrations/mixpanel/advanced/#what-branch-sends-to-mixpanel).

## What does it look like?

Branch events will appear alongside your other tracked events in Mixpanel. These events will automatically have `[Branch]` prepended.  

{% image src="/img/pages/third-party-integrations/mixpanel/branch-mixpanel.png" 3-quarters center %}

Additionally, individual events, such as those seen in Live View or visible when looking at People, will have Branch link data included. Here's an example:

{% image src="/img/pages/third-party-integrations/mixpanel/mixpanel-live-view.png" center %}

Branch events are similar to Mixpanel events in that they can be used in your existing funnels and tracked on the various pages and dashboards. However, unlike normal events, Branch events contain invaluable information about how users ended up in your app in the first place.

{% getstarted title="Get started with the Mixpanel integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and the Mixpanel SDK into your app.

{% endprerequisite %}

## Contact Branch to enable the beta

To get started, contact integrations@branch.io or your Branch account manager with the following information.

1. Whether you'd like to enable iOS or Android, or both
1. Your Mixpanel Token

To locate your Mixpanel Token, navigate to mixpanel.com and login to the Dashboard. Click on "Account" in the navigation bar at the top of the page. Choose "Projects" in the modal that appears, then copy your app’s Token:

{% image src="/img/pages/third-party-integrations/mixpanel/mixpanel-token.png" half center alt='Example Ad' %}


## Pass Mixpanel Distinct Id (recommended)

Please ensure you're using the Branch iOS SDK 0.12.2 or greater, and Android SDK v1.12.1 or greater. If you implemented Branch after May 28th 2016, you are likely already on this version or later.

In addition to the basic integration, you should add a tiny amount of code to your app. This will allow the Branch SDK to pass the user's Mixpanel Distinct Id to our servers. Branch will then pass that Distinct Id to Mixpanel when logging any event.

**iOS:**

Please add the following before initializing the Branch session:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$mixpanel_distinct_id" value:[Mixpanel sharedInstance].distinctId];
{% endhighlight %}

**Android:**

Please call the following line right after you initialize Branch in your Application’s #onCreate or Activity’s #onCreate:

{% highlight java %}
MixpanelAPI mp = MixpanelAPI.getInstance(this, "<your project token>");
Branch.getInstance().setRequestMetadata("$mixpanel_distinct_id", mp.getDistinctId());
{% endhighlight %}


{% elsif page.advanced %}


## What Branch Sends to Mixpanel


| Property Name | Value | Sourced from | Example | Req 
| --- | --- | --- | --- | --- | ---
| event | Branch event | event name | [Branch] install | Y
| properties.distinct_id | Unique ID for device/user | [see section below](#why-we-recommend-passing-mixpanel-distinct-id) | AEBE52E7-03EE-455A-B3C4-E57283966239 | N 
| properties.token | Mixpanel Token | Branch Dashboard | eed14a8aaa8c8ef777b8e9cb30826399 | Y 
| properties.time | Event creation date | event | 1461878903 | N 
| properties.ANY-KEY (many) | The value associated with the key | event metadata or referring link data | ~channel: facebook | N


## Why We Recommend Passing Mixpanel Distinct Id

Branch will automatically specify the Distinct Id requested by Mixpanel, if any of the identifiers that Mixpanel uses are available. On iOS, Branch will send the IDFA if present, or the identifierForVendor (IDFV) if present, otherwise it will omit Distinct Id. On Android Branch will send the Google Advertising ID if present, or the Android ID (hardware ID) if present, otherwise it will omit Distinct Id.

On iOS, the Mixpanel SDK by default will use the IDFA if present, otherwise it will use the identifierForVendor (IDFV) (also known as the vendor ID or identifierForVendor). In rare cases where the identifierForVendor (IDFV) is not available, it will generate a random UUID. In order for IDFA to be available, please be sure you have included AdSupport.framework.

On Android, the Mixpanel SDK by default does not use the Google Advertising ID or the Android ID (hardware ID). Instead, it generates a random UUID. This means that on Android, if you do not pass Branch the Mixpanel Distinct Id, we cannot properly associate Branch-generated events with users as identified by Mixpanel.


## Nuances with Multiple Devices and Mixpanel Identities/Aliases

If you at any point change the Mixpanel distinct id for a user as she’s using your app, you should invoke the same one line of code as above. This way, future calls from Branch to Mixpanel use the updated distinct id.

Additionally, there is one scenario in which the event will be logged to Mixpanel but not associated with the correct user. This is due to limitations with identities on Mixpanel’s end.

**Here is an example scenario:**

The User has an iPhone and an iPad

iPhone has IDFA 1234XXXX-XXXX-XXXX-XXXXXXXXXXXX -- 1234 for short

iPad has IDFA 5678XXXX-XXXX-XXXX-XXXXXXXXXXXX -- 5678 for short

The User opens the app organically (not from a Branch link), and is automatically assigned the distinctId 1234 (this is the IDFA). Then the user finishes signing up, and alias() is called with value "User A", linking 1234 <> "User A". All is well so far.

The User then gets placed into a drip email campaign, targeted for re-engagement. She's checking her email on her iPad and clicks on a Branch link to the app. The app is opened. We send Mixpanel a referred event with an automatically assigned distinctId 5678 (this is the IDFA). Then the user logs in, and identify() is called with value "User A". Identify() is called because we want the user to match across both devices with the same identity = User A. If we called alias() in this second case, then there would be two distinctIds (and in Mixpanel’s logic, two different people) - one with distinctId 1234 and another with distinctId 5678. In order to merge them, we have to identify() the user on the second device. An unfortunate side effect of this logic is that actions before identify() are not associated with the same user, as there are briefly two distinctIds..

The referred event associated with 5678 is not associated with 1234 / "User A".

In order for any additional events on this device to be associated with "User A", the app should invoke the one line of code as recommended in the section [Pass Mixpanel Distinct Id](/third-party-integrations/mixpanel/guide/#pass-mixpanel-distinct-id-recommended). Example:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$mixpanel_distinct_id" value:@"User A"];
{% endhighlight %}

If there are ever workarounds for this, we will update this guide and notify our partners accordingly. [Here is more information](https://mixpanel.com/help/questions/articles/how-do-i-use-alias-and-identify) on how Mixpanel manages identities.


{% endif %}

