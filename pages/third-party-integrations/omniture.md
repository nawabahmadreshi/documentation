---
type: recipe
directory: third-party-integrations
title: "Adobe Analytics"
page_title: Sync Branch data with Adobe Analytics
description: Learn how to synchronize your Branch data with Adobe Analytics, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Adobe Analytics, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Adobe Analytics, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide

---

{% if page.overview %}
	
With a push of a button you can send your Branch data to your Adobe Analytics dashboard, helping you understand the power of Branch as an acquisition pathway.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Adobe Analytics Information will result in Branch automatically forwarding referred events to Adobe Analytics.

## What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

## What does it look like?

Branch events will appear on the Adobe Analytics dashboard through `Reports > Custom Conversion > Branch eVar`. Note, this will automatically appear once the Branch Data Connector is enabled through the Adobe Analytics dashboard.

You'll have the flexibility to analyze data as needed in the Adobe Analytics platform, as the data Branch sends maps in Adobe Analytics to a top level eVar. This eVar contains campaign, channel, target, event name, and action property, which is your deep link data.

{% image src="/img/pages/third-party-integrations/omniture/omniture.png" 3-quarters center %}

Branch events are similar to Adobe Analytics events in that they can be used to build custom reports and are tracked on the various pages and dashboards. However, unlike normal events, Branch events contain valuable information about how users ended up in your app in the first place.

{% protip title="Adobe Analytics is in private beta" %}
For access to the Adobe Analytics beta please contact your Branch account manager or [w@branch.io](mailto:w@branch.io).
{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be a Adobe Analytics customer and have the Adobe Analytics SDK.

{% endprerequisite %}

## Retrieve your Adobe Analytics Information

In your Adobe Analytics dashboard, navigate to the Mobile Marketing UI and find your app.

Under Manage App Setting -> SDK Analytics Options, find the following data

Branch field | Adobe field value
--- | ---
Protocol | Use HTTPS Check Box (if checked, select HTTPS)
Analytics Server Domain | Tracking Server
Omniture iOS/Android Server Key | Report Suite ID for that app
Timestamp | Offline Tracking

For `Analytics Server Domain`, please do not include `http` or `https`. If your value for this is `http://test.com`, simply put in `test.com`. This means no extra slashes, and no protocol.

## Configure the Branch Dashboard

{% protip title="Adobe Analytics is in private beta" %}
To enable the Adobe Analytics beta please contact your Branch account manager or [w@branch.io](mailto:w@branch.io).
{% endprotip %}

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Adobe Analytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Adobe Analytics information and hit **Save**.

## Pass Adobe Visitor ID

When you're ready to send data through Branch, you'll need to make sure you pass through the configured Adobe Visitor ID through the Branch SDKs. In order to do so, call the property `trackingIdentifier` on the `ADBMobile` class, and pass this value through `setRequestMetadataKey` on the Branch SDKs.

Here's a sample snippet showing this. **NOTE** you must set the $adobe_visitor_id before calling *initSession*.

{% highlight objc %}

Branch *branch = [Branch getInstance];
[[Branch getInstance] setRequestMetadataKey:@"$adobe_visitor_id" value:[ADBMobile trackingIdentifier]];

{% endhighlight %}

## What Branch Sends to Adobe Analytics

Branch sends the following values from Branch link data:

- Campaign ("March-2016-Facebook")
- Channel ("Facebook DPA")
- Feature ("Marketing")
- Name of Branch event ("Install")
- Deep Link Data ("promo_code: "ABCDE")

If you create a marketing link and specify analytics and deep link data, it will send and appear in the Adobe Analytics reporting suite.


## Troubleshooting

There are common strategies to take while trouble shooting.

### Data isn't appearing after simulating an event

With Adobe Analytics' dashboard, it may take up to ~2 hours for data to appear. We'd recommend you simulate 10-15 events in one testing session, and validate that they show up two hours later, so that feedback is transparent and obvious.

Another thing to do is make sure a valid adobe_visitor_id is being passed up through the Branch SDK. Call *setDebug* and inspect the requests to `v1/open`. The key you want to find in this request payload is `$adobe_visitor_id`. 


{% endif %}

