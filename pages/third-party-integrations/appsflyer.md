---
type: recipe
directory: third-party-integrations
title: "Appsflyer"
page_title: Sync Branch data with Appsflyer
description: Learn how to synchronize your Branch data with Appsflyer, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Appsflyer, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Appsflyer, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- support
---

{% if page.overview %}
	
With a push of a button you can send your Branch install data and attributions to your Appsflyer dashboard, helping you understand the power of Branch as an acquisition pathway.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Appsflyer Information will result in Branch automatically forwarding attribution information for your acquisitions. As a result, you can segment and analyze your Branch-led users in your Appsflyer dashboard.

## What events does Branch send?

Branch will send all Branch mobile link clicks to Appsflyer. This includes sending analytics information you've added to your Branch links, such as campaign and channel. 

## What does it look like?

Branch events will appear on the Appsflyer dashboard, in the overview page. Scroll to the `Aggregated Performance Report` section, and you'll notice Branch led attributions fall under the name `branch_int`.

{% image src="/img/pages/third-party-integrations/appsflyer/appsflyer.png" 3-quarters center %}

You can click into `branch_int` in the above screenshot and then see the breakdown of clicks and installs by campaign specified.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be a Appsflyer customer and have the Appsflyer SDK.

{% endprerequisite %}

## Retrieve your Appsflyer Information

In your Appsflyer dashboard, grab your app identifier information. 

For iOS, this will be the ID of your iOS AP, without the `id` portion. If you have `id123`, simply put `123` into the Branch data integration card.

For Android, this will be your package name registered on Appsflyer. If your package is registered as `io.branch.test`, then simply put `io.branch.test` in the Android section of the Appsflyer Data Integration card.

## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Appsflyer and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Appsflyer information and hit **Save**.

{% elsif page.advanced %}

## What Branch Sends to Appsflyer

Branch sends the following values from Branch link data:

- Campaign ("March-2016-Facebook")
- Channel ("Facebook DPA")
- Feature ("Marketing")

If you create a marketing link and specify analytics, the users driven to your app by this link will appear with analytics information in Appsflyer.

{% elsif page.support %}

## Troubleshooting

There are common strategies to take while trouble shooting.

### Data isn't appearing after simulating an event

It's likely that the device being tested on is already attributed. The proper steps to perform an attribution are as follows:

1. Disable setDebug through the Branch SDK
2. Uninstall app from device.
3. Reset iOS IDFA, or Google Advertising ID
4. Click Branch link
5. Deploy app from XCode or Android Studio
6. Confirm a fresh install occurred on Branch / Appsflyer. 

{% endif %}