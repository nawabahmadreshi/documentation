---
type: recipe
title: "Adjust"
page_title: Adjust / Branch Integration Guide
description:  Learn how to send your Branch data to your Adjust account so you can view Branch events alongside your other acquisiion channels.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Ad Measurement, third party ad measurement, ad network
hide_platform_selector: true
---

# Branch / Adjust Integration Guide

We recommend linking your Branch and Adjust accounts via webhook so you can view your Branch event data alongside your other acquisition channels.  This will allow you to take full advantage of Branch’s app routing and deep linking tech, while also sending data about 100% of the users clicking on your Branch links back to Adjust

The below guide will describe exactly how to use the accompanying URL creator and our webhooks section to send your Branch data to your Adjust account.

## Build your postback URL ##

The below webhook builder will allow you to input some basic information about your Adjust account and create a postback URL templated to link your Adjust and Branch accounts.  Below are the steps for using the webhook builder.

1. Input your Branch tracker token as provided by Adjust

    Please note if you have both an iOS an Android app with Branch, you will need to create 2 webhooks, one using the site_id for your iOS app and one webhook the Adjust site_id for your Android app.  You’ll then have to set up separate webhooks with OS filters for those respective apps (see steps below).

3. Add any optional query params you would like to include (such as query params required by your advertiser)

4. Click the "Create Link" button at the bottom.

## Add Webhook to your Branch dashboard ##

Now that you've created your Adjust Postback URL, you'll want to use it to [create a webhook](https://dashboard.branch.io/#/webhook) in your Branch dashboard. 

1. Click the "Add a new webhook" button
2. Insert the URL created in the previous section and paste it into the empty text box following the words "send a webhook to"
3. Select the "Post" request type
4. Select "every time" as the frequency for the postback
5. Select "click" as your event
6. In the "Filter (Advanced)" section, create an OS filter that corresponds to the OS of the app whose Adjust site_id you used to create the potsback URL.  The Key in this filter will be `OS`, while the value will be either `Android` or `iOS`.  Refer to the screenshot below.

That’s it!  Branch will now send relevant information about your Branch links and the app traffic they are responsible for to Adjust.

For more information on Branch’s webhooks, view our webhooks guide in the dev portal.  

