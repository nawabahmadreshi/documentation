---
type: recipe
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
- guide
---

# Sending Branch Data to Google Analytics

If you use a service like Google Analytics to track all mobile application analytics data, you may find this guide helpful to find and send data to Google Analytics through your Branch implementation. In case you're interested in the Branch segment of users coming into your apps and want to measure their events against your other cohorts, this guide can help.

Note, the simplest way to make Branch and Google Analytics work together is by allowing Branch to track events specific to users who come via a Branch link, and letting GA track the other events.

{% protip title="Still need to integrate Branch?" %}This guide assumes that you have already integrated Branch. If you need to integrate Branch still, jump to "[Integrating the SDK](/recipes/add_the_sdk/ios/)".
{% endprotip %}

## How It Works

We use webhooks to set up a relationship where any event data gets sent to Google Analytics [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide). In addition to event data, you can tack on any extra data you choose as appropriate based off the listed parameters found on this [document](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide).

Because you can track events through Branch's SDK, you can specify all event meta data as part of the event you send to Google Analytics in addition to the standard event data you send for a user ID.

## Set Up

Before we can start sending data to Google Analytics, we need **6** properties found on your account. The following properties are:

- v - *refers to version*
- tid - *refers to your tracking or property ID*
- cid - *refers to your anonymous client ID*
- t - *refers to your hit type*
- ec - *refers to your event category*
- ea - *refers to your event action*

With those six parameters in handy, you can begin to track events with the Branch SDK, and have them properly formatted to send to Google Analytics via our Webhook system.

{% protip title="Still need the GA SDK?" %} Yes, it is required that you have a Google Analytics account with a mobile property created. You also need to integrate their SDK.
{% endprotip %}

## Save Event Inside App

Before we can tell Google Analytics of an event, we need to save the event to the Branch system, with a minimum of the six details found in the previous step.

{% if page.ios %}

{% highlight objc %}
NSDictionary *state = @{
    @"v":@"1",
    @"tid":@"12345",
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
data.put("tid", "12345");
data.put("cid", "67890");
data.put("t", "event");
data.put("ec", "commerce");
data.put("ea", "purchase");
data.put("el", "red_shoes"); // event label
data.put("ea", "300"); // event value

Branch.getInstance().userCompletedAction(“purchase”, data);
{% endhighlight %}
{% endif %}

Once you have saved these events inside your application, Branch will track the counts of each time the event `purchase` occurred, with the exact user, and will retain meta data for each user-event. 

{% protip title="Identities" %}Since Branch tracks identity, we recommend you keep the property "cid" the same as what you would use if you were calling setIdentity through the Branch SDK.{% endprotip %}


## Configure Webhook

Now that you're saving events through Branch's SDK, it's time to deliver the data to Google Analytics.

### Endpoint Set Up

Since we cannot set the body of the POST message yet, we require you to use a `GET` when sending data to Google Analytics.

The base endpoint url is:

```
http://www.google-analytics.com/collect
```

```
GET /collect?payload_data
```

You will append payload data as needed as a query string after collect.

### Templates

Because you will not know the values of the specified keys when inputting the url into the webhook box, you will need to use templates.

Our full guide on templates are [here](/recipes/webhooks_and_exporting_data), but provided is a sample url needed to send data to Google Analytics:

```
http://www.google-analytics.com/collect?v=1&tid=12345&cid=/\{\{/ event.metadata.cid /\}\}/&t=event&ec=/\{\{/ event.metadata.ec /\}\}/&ea=/\{\{/ event.metadata.ea /\}\}/&el=/\{\{/ event.metadata.el /\}\}/&z=42
```

You will also need to remove the forward and backward slashes.

{% protip title="Why the Z parameter?" %}Sometimes, `GET` requests can be cached. In order to 'bust' the cache, Google recommends appending a parameter, labeled Z, with a random number, so that every `GET` request is fresh. [More information](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#z){% endprotip %}

## Testing

Finally, when it is all said and done, we recommend you send the requests to postbin first to ensure that every time a Branch event is hit, that the proper values are sent in the `GET` request. When that is taken care of, you can add the webhook with the proper URL and start sending events to Google Analytics!
