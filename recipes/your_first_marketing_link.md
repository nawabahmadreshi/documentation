---
type: recipe
title: "Step 1: Your Branch links"
ios_page_title: Creating your first iOS mobile deep link
android_page_title: Creating your first Android mobile deep link
ios_description: How to set up your first iOS deep link on the Branch Dashboard. Select the data to pass through the install of your app and set up the analytics.
android_description: How to set up your first Android deep link on the Branch Dashboard. Select the data to pass through the install of your app and set up the analytics.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link configuration, Analytics, Custom Link, Deep Link Data, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link configuration, Analytics, Custom Link, Deep Link Data, Android
hide_platform_selector: true
---

## Link configuration

First, please visit the [Branch link configuration tool](https://start.branch.io/) to setup all the redirection.

-----

## Creating Your Branch Link

{% ingredient dashboard_links/creating_links %}
	{% override title %}{% endoverride %}
{% endingredient %}

-----

{% ingredient dashboard_links/tags %}{% endingredient %}

-----

{% ingredient dashboard_links/alias %}
	{% override optional %}{% endoverride %}
{% endingredient %}

-----

{% ingredient dashboard_links/og_tags %}
{% override screenshot %}{% endoverride %}
{% endingredient %}

-----

{% ingredient dashboard_links/custom_redirects %}
{% endingredient %}

-----

{% ingredient dashboard_links/custom_data %}
	{% override advanced %}{% endoverride %}
{% endingredient %}
<!--- /Creating your Link -->

-----

## What's next?

### [Head to Step 2: integrating the SDK](/recipes/add_the_sdk/{{page.platform}})

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}

