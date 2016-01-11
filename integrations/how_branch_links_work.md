---
type: integrations
title:  How links work
page_title: How Branch Metrics Deep Links Work
description: How Branch Metrics deep links handle all deep linking standards and app portals automatically – whether it's Facebook, Apple, Twitter or Pinterest.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to, Standards, Web SDK, SDK
---

## Routing on mobile

On mobile, Branch routes the user based on whether or not they have the app:

- If the app **is** installed, we open it and deep link directly to right app page. 
- If the app **is not** installed, you can choose to:
  - Route to the right app store (based on automatic detection of the device)
  - Route to a fallback url that you set (try our [smart app banner](/recipes/app_download_banner/#the-smart-banner))
  - Show a deepview, a web preview of the app content with a link to the app store

Lastly, if the user installs, deep link to the right app page as soon as they open.

{% image src='/img/overview/smart_redirects.png' 3-quarters center alt='2' %}

-----

## Routing on desktop

On desktop, Branch lets you choose to:

- Route users to a Branch-hosted page where users can text themselves the app
  - Use our template or [customize/build your own SMS page](/recipes/text_me_the_app_page/)
  - The texted link routes on mobile as described above
- Route users to the value of the key $desktop_url (say, the relevant page on your website) in the link’s data dictionary ([add SMS to it](/recipes/text_me_the_app_page/))

{% image src='/img/overview/how-links-work-3.jpg' half center alt='4' %}

-----

## Passing data to your app (deep linking)

To create a deep link, you just need to:

1. Assemble a dictionary of keys and values (NSDictionary, JSONObject, json, etc)
2. Pass it to Branch (SDK, Web SDK, API or dashboard can receive these)
3. Branch creates and returns deep link
  - https://bnc.lt/m/12345 or your white labeled http://your.domain.com/m/12345

After a link is clicked, the Branch deep link handler in your app (native SDKs) or on your website (web SDK) will return the dictionary of keys and values that was mapped to the link. We can even **pass this data through app install** in addition to when the app is already installed. Read about the fingerprinting system we use to do it [here](/recipes/matching_accuracy/).

{% image src='/img/overview/easy_deeplinking.png' half center alt='3' %}