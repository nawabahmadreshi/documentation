---
type: recipe
directory: third-party-integrations
title: "Tune Webhook Builder"
description: Use this simple tool to help construct a Branch webhook to postback data to the Tune platform.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Ad Measurement, third party ad measurement, ad network
hide_platform_selector: true
exclude_from_google_search: false
sections:
- overview
- guide
---
{% if page.overview %}
## Configuring your Branch & Tune Webhooks ##

Use this webhook creation tool to create a postback URL, which you can then use to [create a new webhook in your Branch dashboard](https://dashboard.branch.io/#/webhook) to link your Branch and Tune accounts.

Want more information on Pre-defined Events? Visit <a href="http://developers.mobileapptracking.com/measure-pre-defined-events/" target="_blank">Tune's Docs on the topic.

Want more information on setting up Custom Events with Tune? Visit <a href="developers.mobileapptracking.com/measuring-custom-events/" target="_blank">Tune's Docs on the topic.

{% prerequisite %}
- For this feature to work as expected, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

{% elsif page.guide %}

{% include webhook-builder-assets/webhook_builder_TUNE.html %}

{% endif %}