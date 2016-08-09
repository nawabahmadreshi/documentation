---
type: recipe
directory: third-party-integrations
title: "Adjust"
page_title: Sync Branch data with Adjust
description: Learn how to synchronize your Branch data with Adjust to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Adjust, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
sections:
- overview
- guide
- support
---

{% if page.overview %}

Send data to Adjust to maximize you understanding of your mobile acquisition efforts, while deep linking your users through Branch.

{% ingredient paid-integration %}{% endingredient %}

## What events does Branch send to Adjust?

The integration automatically sends **Branch link clicks** to Adjust. Unfortunately, we can only send a subset of all clicks from your links. The subset is:

* All Android clicks
* iOS Universal Link clicks

This means that for iOS install campaigns (where universal links wont work), you must use Adjust as your fallback URL.

## What data can I expect?

Once you enable an integration with Adjust, we'll automatically send all eligible clicks to Adjust's servers. From there, you'll see how many users came from Branch. This will give you automatic segmentation and the ability to do follow up analysis with your Branch cohort.

We'll pass along all of the Branch link's analytics data, which will map to labels inside Adjust. Check the support section to see all of the labels.

{% getstarted title="Get started with the Adjust integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need an account with Adjust and have the Adjust SDK (
	[iOS](https://github.com/adjust/ios_sdk),
	[Android](https://github.com/adjust/android_sdk)) installed in your app.

{% endprerequisite %}

## Get credentials from your Adjust account

To set up the integration, you will need to navigate to your Adjust dashboard, and create a new tracking link for your mobile app. Start by selecting 'Settings' of your mobile app.

{% image src="/img/pages/third-party-integrations/adjust/adjust-tracker-setting.png" 3-quarters center %}


From there, you will need to create a new tracker, which is found under Data Management > Trackers. Click Trackers, and create a new tracker below. Once created, grab the 6 digit value after the `app.adjust.com` portion. This is your tracker.

{% image src="/img/pages/third-party-integrations/adjust/adjust-tracker.png" 3-quarters center %}


## Enable the Adjust card in your Branch dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Adjust and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your tracker for iOS and Android.
1. Hit **Save**.

{% image src="/img/pages/third-party-integrations/adjust/enable-adjust-integration.png" half center alt='Enable Integration' %}

{% elsif page.advanced %}

## What Branch sends to Adjust

Branch will send your analytics parameters to Adjust, along with identifying information that lets Adjust give Branch the credit for an install. In case you want to override your default tracker placed in the Adjust Data Integration card, simply put a key value pair with key `tracker_id` in your deep link data.

{% image src="/img/pages/third-party-integrations/adjust/override-adjust.png" half center alt='Overriden Tracker' %}

Branch Analytics Tag | Adjust Data Tag
--- | ---
Campaign | campaign
Channel | adgroup
Feature | creative
network | network
Branch Click ID | external_click_id

{% elsif page.support %}

## How do I enable iOS install campaigns with Adjust?

In order to account for install campaigns, you must create a Branch link, and set the $ios_url OR $fallback_url to your Adjust tracking link.

{% endif %}
