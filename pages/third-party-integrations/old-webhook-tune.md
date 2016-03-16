---
type: recipe
directory: third-party-integrations
title: "Tune Integration Guide"
description: Learn how to send your Branch data to your Tune account so you can view Branch events alongside your other acquisiion channels.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Ad Measurement, third party ad measurement, ad network
hide_platform_selector: true
exclude_from_google_search: true
---

# Branch / Tune Integration Guide

Branch has partnered with Tune to allow users to send Branch event data to their Tune dashboards. 

The below guide will describe exactly how to use the accompanying URL creator and our webhooks section to send your Branch data to your Tune account.

## Build your postback URL ##

The below webhook builder will allow you to input some basic information about your TUNE account and create a postback URL templated to link your Tune and Branch accounts.  Below are the steps for using the webhook builder.

1. Input your advertiser_id as provided by Tune

2. Input the site_id of your app as defined by Tune in row 6

    Please note if you have both an iOS an Android app with Branch, you will need to create 2 webhooks, one using the site_id for your iOS app and one webhook the Tune site_id for your Android app.  You’ll then have to set up separate webhooks with OS filters for those respective apps (see steps below).

3. Add any optional query params you would like to include (such as query params required by your advertiser)

4. Click the "Create Link" button at the bottom.

{% include webhook-builder-assets/webhook_builder_TUNE.html %}

## Add Webhook to your Branch dashboard ##

Now that you've created your Tune Postback URL, you'll want to use it to [create a webhook](https://dashboard.branch.io/#/webhook) in your Branch dashboard. 

1. Click the "Add a new webhook" button
2. Insert the URL created in the previous section and paste it into the empty text box following the words "send a webhook to"
3. Select the "Post" request type
4. Select "every time" as the frequency for the postback
5. Select "click" as your event
6. In the "Filter (Advanced)" section, create an OS filter that corresponds to the OS of the app whose Tune site_id you used to create the potsback URL.  The Key in this filter will be `OS`, while the value will be either `Android` or `iOS`.  Refer to the screenshot below.

<br>
{% image src='/img/recipes/tune/tune_webhook_creation.png' %}
<br>
That’s it!  Branch will now send relevant information about your Branch links to Tune every time they are clicked.

For more information on Branch’s webhooks, view our webhooks guide in the dev portal.  
