---
type: recipe
title: "White Label Branch"
page_title: Branch Preferred Partner (Whitelabel) Guide
description: Learn how to create white-labeled Branch accounts for your customers.  Give your clients best-in-class deep linking while keeping your branding intact! 
keywords: white-label, Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
hide_platform_selector: true
sections:
- guide
---

This guide is for companies that want to include the Branch deep linking and attribution into their broader product offering, in a white label format. Here are a couple examples:

- You build apps for other people and want to include Branch as a default
- You manage marketing campaigns for other apps and want to report attribution data

## High level preferred partner guide

We have APIs to do everything from create and configure Branch apps, to create links automatically, to collect and report on the clicks and install data. You can build as complex or as simple integration as you need. Here's a list of what's possible:

1. [Create a Branch key and configure the link redirection](#create-a-branch-key-and-configure-redirection)
2. [Add the SDK to your apps](#add-the-sdk)
3. [Create Branch links as needed](#share-branch-links-from-the-app)
4. [Create a webhook to receive data on your server](#create-a-webhook-for-clicks-and-installs)
5. [Monitor your app's Branch dashboard](#monitoring-the-branch-dashboard)

## Create a Branch key and configure redirection.

### Retrieve your Branch Preferred Partner user_id

First, you will need a Branch partner token that gives you the ability to create Branch apps via the API. You can, of course, create apps via the normal signup form and dashboard manually without this. It's required for the API access though.

Send a note to `support@branch.io` to request the user_id token. The token will be in the form of a long series of numbers like this: ‘19190933253783894’.

### Create and update the Branch app config

The Branch configuration is where you define all of the default link routing behavior and more. Most of these settings are configured in the [settings page on the dashboard](https://dashboard.branch.io/#/settings), but you can control all of them via an API with these endpoints:

1. **[Create an app](https://dev.branch.io/references/http_api/#creating-a-new-branch-app-config)**
2. **[Update a pre-existing app](https://dev.branch.io/references/http_api/#updating-a-branch-app-config)**
3. **[View an app](https://dev.branch.io/references/http_api/#creating-a-new-branch-app-config)**

## Integrate the SDK and create links

First, you'll need to decide what you're going to build and implement in all of the apps you create. 

### Add the SDK

We support all major developement platorms. The SDK can be integrated in about 5 minutes for each. Please find the **[details in this guide](/recipes/add_the_sdk/)**.

### Share Branch links from the app

One of the most common uses of Branch is to dynamically create Branch links for your users to share. You can configure these links to contain all of the metadata that you need for deep linking and reference later. Please find the details on building a sharing or invite feature **[in this guide](/recipes/content_sharing/)**.

### Create Branch links

If you want to create links manually or via the API, there many mechanisms to do so. Here are links to describe the most common ways for doing so:

1. **[Via the API](/link_creation_guide/#http-api)**
2. **[Create via query params](/link_creation_guide/#appending-query-parameters)**
3. **[On the dashboard](/link_creation_guide/#dashboard)**

### Use the Web SDK (Smart banner or SMS-to-download)

If you want to configure the web SDK on your site, it's a few lines of code depending on the feature you're interested in. Here is a list of the most commonly used features:

1. **[Smart app banner](/recipes/app_download_banner/)**
2. **[Desktop SMS to download](/recipes/text_me_the_app_page/)**

## Receive or monitor Branch data for your apps

Branch is constantly collecting install, open and custom events via the SDKs. We attribute these events back to the referring link and make all of this data available via our dashboard or webhook system.

### Create a webhook for clicks and installs

If you have some central server that you'd like to receive data for, you can create a webhook directly on the dashboard. If you want to just receive all data, we recommend you create a webhook for the event name `*`, which is our wildcard. This means we'll send everything. Here's a list of ways to create webhooks per apps:

1. **[Create webhook via API](/references/http_api/#creating-a-dynamic-reward-rule)**
1. **[Create on dashboard](/recipes/webhooks_and_exporting_data/#register-webhook-on-dashboard)**

The spec for what we send can be seen [here](/recipes/webhooks_and_exporting_data/#webhook-syntax-specification).

### Monitoring the Branch dashboard

The user_id that you use to create Branch apps with, will automatically be given access to the dashboard of any app you create. If you visit **[dashboard.branch.io](https://dashboard.branch.io)**, you can use the pulldown in the top right corner of the screen. You can search by app name or Branch key or really any value associated with the app.
