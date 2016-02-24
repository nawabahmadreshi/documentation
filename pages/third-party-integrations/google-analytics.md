---
type: recipe
directory: third-party-integrations
title: "Google Analytics"
ios_page_title: Send iOS Deep Link Data to Google Analytics
android_page_title: Use Android Link Data in Google Analytics
ios_description: This guide teaches you how to find and send iOS deep link data to Google Analytics through your Branch Metrics implementation.
android_description: This guide teaches you how to find and send Android deep link data to Google Analytics through your Branch Metrics implementation.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Google Analytics, iOS, Webhook
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Google Analytics, Android, Webhook
platforms:
- ios
- android
sections:
- overview
- guide
---

{% if page.overview %}

If you use Google Analytics to track all mobile application analytics data, you can send data to Google Analytics through your Branch implementation. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

The simplest way to make Branch and Google Analytics work together is by allowing Branch to track events specific to users who come via a Branch link, and letting GA track the other events.

{% getstarted title="Get started with Google Analytics integration!" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need a Google Analytics account with a [mobile property created](https://support.google.com/analytics/answer/2614741?hl=en) and [install the Google Analytics SDK]({% if page.ios %}https://developers.google.com/analytics/devguides/collection/ios{% elsif page.android %}https://developers.google.com/analytics/devguides/collection/android{% endif %}).

{% endprerequisite %}

## How it works

We use webhooks to set up a connection where Branch event data gets sent to Google Analytics [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide). In addition to event data, you can tack on any extra data you choose as appropriate based off the listed parameters found on [this Google reference document](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide).

When you [track events through Branch's SDK]({{base.url}}/getting-started/tracking-events), you can specify meta data as part of the event you send to Google Analytics in addition to the standard event data you send for a user ID.

## Collect Google Analytics properties

Before we can start sending data, we need to collect [some properties](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters) from your Google Analytics account:

| Name | Parameter | Description
| --- | --- | ---
| Protocol Version | `v` | The protocol version. The value should be 1.
| Tracking ID | `tid` | Your Google Analytics property ID (e.g. `UA-XXXXXX-X`)
| Client ID | `cid` | The anonymous client ID you collect for the Google Analytics SDK
| Hit Type | `t` | The type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
| Event Category | `ec` | The event category. Must not be empty.
| Event Action | `ea` | The event action. Must not be empty.

## Save Branch event inside app

Next, we need to create the event in your app and record it to the Branch system, with a minimum of the six properties from the previous step:

{% if page.ios %}

{% highlight objc %}
NSDictionary *state = @{
    @"v":@"1",
    @"tid":@"UA-XXXXXX-X",
    @"cid":@"67890",
    @"t":@"event",
    @"ec":@"commerce",
    @"ea": @"purchase",
    @"el": @"red_shoes", /* event label */
    @"ea": 300 /* event value */ };

// event tracking via our SDK
[[Branch getInstance] userCompletedAction:@"purchase" withState:state];
{% endhighlight %}
{% endif %}

{% if page.android %}
{% highlight java %}
JSONObject data = new JSONObject();
data.put("v", "1");
data.put("tid", "UA-XXXXXX-X");
data.put("cid", "67890");
data.put("t", "event");
data.put("ec", "commerce");
data.put("ea", "purchase");
data.put("el", "red_shoes"); // event label
data.put("ea", "300"); // event value

Branch.getInstance().userCompletedAction("purchase", data);
{% endhighlight %}
{% endif %}

Once you have saved these events inside your app, Branch will track each time the event `purchase` occurred, with the exact user, and will retain meta data for each user-event. 

{% protip title="Identities" %}Since Branch [tracks identity]({{base.url}}/getting-started/setting-identities), we recommend you keep the property `cid` the same as what you would use if you were calling `setIdentity` through the Branch SDK.{% endprotip %}

## Build a template URL

Because you will not know the values for some of the specified keys until the event is actually recorded, we will need to build a dynamic URL with [Branch's webhook templating system]({{base.url}}/getting-started/webhooks/advanced/#templating) to went the data back to Google Analytics.

The Google Analytics base endpoint is `http://www.google-analytics.com/collect`, to which you append your keys as query parameters. Here is a sample URL containing the templated parameters from the earlier example (line breaks added for legibility — **remove before using**):

{% highlight sh %}
{% raw %}
http://www.google-analytics.com/collect?
	v=1&
	tid=UA-XXXXXX-X&
	cid={{ event.metadata.cid }}&
	t=event&
	ec={{ event.metadata.ec }}&
	ea={{ event.metadata.ea }}&
	el={{ event.metadata.el }}&
	z=42
{% endraw %}
{% endhighlight %}

{% protip title="Why the Z parameter?" %}Sometimes, `GET` requests can be cached. In order to 'bust' the cache, Google recommends appending a parameter, labeled Z, with a random number, so that every `GET` request is fresh. [More information](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#z){% endprotip %}

## Configure a Branch webhook

Now that you're saving events through Branch's SDK, it's time to deliver the data to Google Analytics.

1. Open the [Webhooks](https://dashboard.branch.io/#/webhook) page.
1. Click **Add a new webhook**.
1. Enter the following data into the webhook configuration screen:

| Property | Value
| --- | ---
| Webhook URL | Your templated URL from the previous step.
| Postback method | Choose `GET`.
| Event frequency | Select `every time`.
| Event trigger | Select `-- other --` and enter the name of the event you created in your app (e.g., `purchase`)

## Testing

We recommend you [use RequestBin]({{base.url}}/getting-started/webhooks/guide/#testing) first to ensure that every time your Branch event is hit, that the proper values are sent in the `GET` request. When that is taken care of, you can add the webhook with the proper URL and start sending events to Google Analytics!

{% endif %}