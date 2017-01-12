---
type: recipe
directory: third-party-integrations
title: "mParticle"
page_title: Send mParticle Data to Branch!
description: Learn how to forward your mParticle events to Branch, allowing you to analyze commerce data and customize Journeys based on mParticle data.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, mParticle, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, mParticle, user segmentation, life time value, LTV
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

With a push of a button you can send your mParticle data to Branch, helping you understand the power of Branch as an acquisition pathway.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Separately, mParticle allows you to track user actions, such as signup, add to cart and purchase. By forwarding the latter to Branch, you can:

* see actions driven by Branch links (including Branch links in ad campaigns) 
* customize Journeys based on mParticle-tracked events completed by that user
* determine which campaigns, channels and features are driving the most revenue

## What can I send to Branch?

You can send two types of data from mParticle to Branch -- normal events and e-commerce events. These will be processed slightly differently, as e-commerce events have revenue data that we can display in unique visualizations.

## What does it look like?

mParticle events will appear in three places:

* Journeys - Audience selection ([Documentation]({{base.url}}/features/journeys/guide/#select-audience))
* Source Analytics - Event ([Dashboard Page](https://dashboard.branch.io/analytics/source))
* Marketing Links - Event ([Dashboard Page](https://dashboard.branch.io/marketing))

mParticle events will appear alongside events tracked via the Branch SDKs.

TODO: Screenshots


{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be an [mParticle](https://www.mparticle.com/) customer with their SDK(s) integrated and tracking events.

{% endprerequisite %}

## Enable Branch on the mParticle Dashboard

TODO

## Configure the Branch Dashboard

TODO

## Ensure user identifiers are available

TODO

* app (advertising/hardware id)
* web (developer identity)

{% elsif page.advanced %}

## Debugging

TODO

* user identifiers
* must be realtime
* Live View (when available)

{% endif %}