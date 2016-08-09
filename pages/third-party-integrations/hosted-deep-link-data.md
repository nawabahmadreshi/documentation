---
type: recipe
directory: third-party-integrations
title: "Hosted deep link data"
page_title: "Hosted deep link data"
description: By hosting deep link data on your website, Branch can automatically retrieve deep link data from any desktop URL.
ios_keywords: Contextual Deep Linking, Deep links, Tune, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
sections:
- overview
- guide
- advanced

---

{% if page.overview %}

By hosting deep link data on your own website, you can use Branch to automatically convert a web URL into a corresponding Branch link that deep links to relevant content in your mobile app. Today, you can use this functionality for [Deep Linked Email](https://branch.io/email/), and in future releases, the Branch marketing link creator and Chrome extension will also scrape your web URL for deep link data to make link creation even easier.

{% getstarted title="Get started with hosting deep link data" %}{% endgetstarted %}

{% elsif page.guide %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Add a metatag to your website

You can host your deep link data on your website with a metatag that looks like this `<meta name="branch:deeplink:my_key" content="my_value" />` where `my_key` and `my_value` will become a key value pair in deep link data. For each web URL, Branch will look for those tags and embed the deep link data (if found) into the deep link. Note that Branch also accepts App Links tags for deep linking. 

{% endif %}

