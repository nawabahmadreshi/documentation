---
type: recipe
directory: third-party-integrations
title: "Google Analytics"
page_title: Send Deep Link Data to Google Analytics
description: This guide teaches you how to find and send deep link data to Google Analytics through your Branch Metrics implementation.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Google Analytics, iOS, Webhook
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Google Analytics, Android, Webhook
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

{% protip title="The Google Analytics integration is currently in private beta" %}
To request access to the Google Analytics integration, please contact [integrations@branch.io](mailto:integrations@branch.io) or your Branch account manager. 
{% endprotip %}

With a push of a button you can send your Branch data to your Google Analytics dashboard, helping you understand the power of Branch as an acquisition pathway. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

{% getstarted title="Get started with the Google Analytics integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and the Google Analytics SDK into your app.

{% endprerequisite %}

## Contact Branch to enable the beta

To get started, contact integrations@branch.io or your Branch account manager with the following information.

1. Whether you'd like to enable iOS or Android, or both
1. Your Google Analytics Tracking ID (tid), also known as the Property ID

To locate your Google Analytics Tracking ID, navigate to [https://analytics.google.com](https://analytics.google.com) and log in. Click on "Home" in the navigation bar at the top of the page. You should see your app(s), with accompanying Tracking ID. Copy the Tracking ID of whichever app you’re going to use with Branch. Here’s an example:

{% image src="/img/pages/third-party-integrations/google-analytics/tid.png" half center alt='Example Ad' %}

## Set up Google Analytics to use standard hardware or advertising identifiers (recommended)

Please ensure you're using the Branch iOS SDK 0.12.2 or greater, and Android SDK v1.12.1 or greater. If you implemented Branch after May 28th 2016, you are likely already on this version or later.


In addition to the basic integration, you should add a tiny amount of code to your app. This will ensure that Google Analytics uses the correct device-specific identifier for client ID (cid) with the logic Branch uses. As a result, the cid’s for SDK and webhook should match up and result in unified user data on the GA Dashboard.

**iOS:**

On iOS, please add the following when tracking events, screen views, etc. It will ensure that the GA SDK uses the IDFA when available, and uses the IDFV if not.

Please add the following to your Google Analytics code when the app first starts

{% highlight objc %}
#import <AdSupport/AdSupport.h>

// before tracking screen, event, etc.
Class ASIdentifierManagerClass = NSClassFromString(@"ASIdentifierManager");
if (ASIdentifierManagerClass && [[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]) {
	NSUUID *idfa = [[ASIdentifierManager sharedManager] advertisingIdentifier];
    [tracker set:kGAIClientId value:[idfa UUIDString]];
}
else if (NSClassFromString(@"UIDevice")) {
    [tracker set:kGAIClientId value:[[UIDevice currentDevice].identifierForVendor UUIDString]];
}
{% endhighlight %}

In order for IDFA to be available, please be sure you have included `AdSupport.framework`. 

{% protip title="iOS 10 and Ad Tracking Limited" %}
If ad tracking is limited, the IDFA will be set to "00000000-0000-0000-0000-000000000000" [documentation](https://developer.apple.com/reference/adsupport/asidentifiermanager). The alternative approach below allows you to specify a `cid` manually, which avoids this issue.
{% endprotip %}

**Android:**

On Android, please add the following when tracking events, screen views, etc. It will ensure that the GA SDK uses the GAID when available, and uses the Android ID (hardware ID) if not.

{% highlight java %}
// Enable Advertising Features.
mTracker.enableAdvertisingIdCollection(true);
{% endhighlight %}

### Alternative approach to Client ID - pass to Branch directly

If you specify `$google_analytics_client_id`, we can pass that to Google (as *cid*). 

**iOS:**

Please add the following before initializing the Branch session:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$google_analytics_client_id" value:@"CLIENT-ID-HERE"];
{% endhighlight %}

**Android:**

Please call the following line right after you initialize Branch in your Application’s #onCreate or Activity’s #onCreate:

{% highlight java %}
Branch.getInstance().setRequestMetadata("$google_analytics_client_id", "CLIENT-ID-HERE");
{% endhighlight %}


{% elsif page.advanced %}

## Optional Parameter - User ID

If you specify `$google_analytics_user_id`, we can pass that to Google (as `uid`).

**iOS:**

You can add the following before initializing the Branch session:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$google_analytics_user_id" value:@"USER-ID-HERE"];
{% endhighlight %}

**Android:**

You can call the following line right after you initialize Branch in your Application’s #onCreate or Activity’s #onCreate:

{% highlight java %}
Branch.getInstance().setRequestMetadata("$google_analytics_user_id", "USER-ID-HERE");
{% endhighlight %}

## What Branch Sends to Google Analytics

| Property Name | Value | Sourced from | Example | Req 
| --- | --- | --- | --- | --- | ---
| v | API version | [fixed] | 1 | Y
| tid | Tracking ID | Branch Dashboard | UA-XXXXXX-Y | Y
| ds | Source (mobile SDK) | [fixed] | app | Y
| an | Application Name | [fixed] | BRANCH-APP | Y
| t | Type | [fixed] | event | Y
| ec | Event Category | [fixed] | BranchEvent | Y
| cid | Client ID | (discussed above, includes $google_analytics_client_id) | AEBE52E7-03EE-455A-B3C4-E57283966239 | Y
| uid | User Id | $google_analytics_user_id | User A | N
| cn | Campaign Name | utm_campaign -or- Branch campaign  | "Beaches and breezes" | N
| cs | Campaign Source | utm_source -or- Branch channel | "Twitter" | N
| cm | Campaign Medium | utm_medium -or- Branch feature  | "480banner" | N
| ck | Campaign Keywords | utm_term -or- Branch $keywords | ["Keyword1", "keyword3"] | N
| cc | Campaign Content | utm_content -or- Branch tags | "Some content" | N
| ea | Event Action (Name) | event name | install | Y
| sc | Session Control (set to true for install and open only) | [fixed] | start | N
| uip | User’s IP Address | collected by Branch SDK | 111.111.111.111 | N
| z | Cache buster | [unix time + random number] | 1461878903666 | N

{% protip title=""anonymous" Client ID" %}
If for some reason Branch does not receive an advertising identifier or hardware identifier, and you do not explicitly specify a `$google_analytics_client_id`, then Branch will send `anonymous` as the Client ID (`cid`). This is a required field by Google Analytics.
{% endprotip %}

{% endif %}
