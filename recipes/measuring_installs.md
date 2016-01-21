---
type: recipe
directory: getting-started
title: "3. Attribution and analytics"
page_title: App attribution and analytics for iOS and Android
description: The Branch Metrics dashboard shows you all the analytics for your iOS deep links. Track install attribution, measure marketing channels and ad campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Attribution, Analytics, Dashboard, App Install, App Open, Conversion, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Attribution, Analytics, Dashboard, App Install, App Open, Conversion, Android
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- overview
- guide
- support
---

It's time to dive into your data with the [Branch Dashboard](https://dashboard.branch.io). It's the perfect tool for measing growth and engagement.

{% image src='/img/ingredients/analytics_and_custom_events/dashboard_summary.png' 3-quarters center alt='the goal' %}

-----

## Organize your links with proper labels

As you most likely saw on the [link creation documentation page](/link_creation_guide/), there are hundreds of ways to create links. If you have many people in the organization and you're creating links in many different ways, it's important to label them appropriately.

* **channel**: Use channel to tag the _route_ that your link reaches users. For example, tag links with ‘Facebook’ or ‘LinkedIn’ to help track clicks and installs through those paths separately.
* **feature**: This is the feature of the customer’s product that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’.
* **campaign** :Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that.
* **stage**: Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
* **tags**: This is more a free form entry with unlimited values. Use it to organize your link data with labels that don't fit within the bounds of the above.

Here's an example from the click flows on the summary page, where you can filter by these tags.

{% image src='/img/ingredients/analytics_and_custom_events/analytics_labels.png' 3-quarters center alt='the goal' %}

-----

## Install and open attribution

{% ingredient dashboard_analytics/install_versus_open %}{% endingredient %}

-----

## Custom events and tracking

{% ingredient events/custom_events %}{% override header %}{% endoverride %}{% endingredient %}

-----

## Influencer tracking

{% ingredient sdk_setup/identify_and_logout %}{% override header %}{% endoverride %}{% endingredient %}

-----

## What's next?

You've got the basics, but let's take your integration to the next level:

{% ingredient recipe_preview/deepviews %}{% endingredient %}
{% ingredient recipe_preview/content_sharing %}{% endingredient %}
{% ingredient recipe_preview/web_to_app %}{% endingredient %}
{% ingredient recipe_preview/text_me_the_app_page %}{% endingredient %}
{% ingredient recipe_preview/google_app_index %}{% endingredient %}
{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}
