---
type: recipe
directory: third-party-integrations
title: "Kochava"
page_title: Send Deep Link Install Data to Kochava
description: We’ve partnered with Kochava to provide an easy way to deliver Branch installs and attributions to your Kochava dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Kochava
hide_platform_selector: true
sections:
- overview
- guide
---

{% if page.overview %}

The Kochava integration sends **all clicks on a Branch link** from Branch to Kochava, for the enabled platform. Now you can see your valuable Branch attribution data in your Kochava dashboard.

Kochava offers unique, holistic and unbiased app measurement. From attribution and analytics to optimization, the Kochava platform provides precise, real-time visualization of campaign and app performance from ad impression through user lifetime value. Kochava customers enjoy a suite of optimization tools including Configurable Attribution, Fraud Detection and over 2200 certified network & publisher integrations including super publishers like Facebook, Instagram, Google and Pandora.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted title="Get started with the Kochava integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to be a Kochava customer and have the [Kochava SDK installed](http://support.kochava.com/sdk-integration) in your app.

{% endprerequisite %}

## Create Campaign IDs in Kochava

For each platform (iOS and Android) you should create campaign IDs. You will do this in the Kochava dashboard.

### Create a campaign

1. Log in to Kochava.
1. Select the desired app .
1. Select `App Tools > Campaign Manager`
1. Click `Add a Campaign`
1. Enter a unique Campaign name.

### Create a Segment

1. Select `Campaign Tools>New Segment`
1. Enter a Segment Name.
1. Click submit

### Create a tracker

1. Click `Segment Tools > New Tracker`
1. Enter the Tracker Name.
1. Select `Tracker Type>3rd Party Tracking` (default setting)
1. Select `Select A Network > Branch`
1. Click submit. (If no further trackers need to be created).

Once you've clicked `Submit` you should see a screen with the campaign ID.

{% image src="/img/pages/third-party-integrations/kochava/kochava-dashboard.png" half center alt='Branch Campaign ID in Kochava' %}

## Configure the Branch Dashboard

1. In the Branch dashboard, go to the [Integrations page](https://dashboard.branch.io/integrations) and look for the **Kochava** card.
1. Click **Enable** on the card
1. Enter your Kochava campaign ID for the relevant platform
1. Hit **Save**

{% image src="/img/pages/third-party-integrations/kochava/enable-kochava-integration.png" half center alt='Enable Kochava Integration' %}

{% endif %}