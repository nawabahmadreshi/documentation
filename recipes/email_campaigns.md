---
type: recipe
directory: features
title: Email campaigns
ios_page_title: Email campaigns with deep links for iOS
android_page_title: Email campaigns with Android deep links
ios_description: How to create marketing links for email campaigns featuring your iOS app. Branch Links enable deep linking, install attribution, and in-depth analytics.
android_description: How to create deep links for email campaigns featuring your Android app. Branch Links enable deep linking, install attribution, and in-depth analytics.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, email campaigns, marketing links
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,email campaigns, marketing links, Android
hide_platform_selector: true
sections:
- guide
---

This guide will get you started so that you can create links for emails that will properly redirect into the app or fallback to the appstore.

## One time redirection setup

First, please visit the [Branch link configuration tool](https://start.branch.io/) to setup all the link redirection logic.

## Creating a single link

{% ingredient dashboard_links/creating_links %}
	{% override screenshot_description %}One example description if you want to treat this guide is: "Launch Email".{% endoverride %}
	{% override screenshot %}{% image src='/img/ingredients/dashboard_links/add_email.png' half center alt='Description' %}
	{% endoverride %}

{% endingredient %}

{% ingredient dashboard_links/tags %}
	{% override deep_link_data_url %}For information of the form *[key]*: *[value]* such as "product": "shoes", we recommend adding them below--see [Deep Link Data (Optional)](/recipes/your_first_marketing_link/#deep-link-data).
    {% endoverride %}
    {% override screenshot %}{% image src="/img/ingredients/dashboard_links/tags_email.png" half center alt="Link Tags" %}
	{% endoverride %}

{% endingredient %}

{% ingredient dashboard_links/custom_data %}
	{% override advanced %}(Optional){% endoverride %}
	{% override description %}This custom data can be anything you want and is part of Branch's secret sauce. For now you don't need to put anything here. In case you're interested, you add data at the bottom of the link creation process.{% endoverride %}
{% override picture %}{% image src="/img/ingredients/dashboard_links/custom_data_email.png" half right alt="Custom Data" %}{% endoverride %}
{% endingredient %}

This powerful link will now track clicks across platforms. Users who have the app (perhaps you beta testers if you're just launching!) will be linked straight to the app. Users who don't have the app will be taken to the App/Play Store to download your app. And any users who click this link on Desktop will be given the option to text themselves the app!

-----

## Creating many links

{% ingredient http_api/structuring_dynamic_deeplink %}{% endingredient %}

-----

## Conclusion

It's that simple! You now have a link that will track clicks based on the channel, campaign and any other tags you create. The Dashboard's [Summary](https://dashboard.branch.io/#) page, specifically the "Click Flow" chart, now can show you meaningful results!

To start collecting statistics regarding installs, opens, referred installs -- and to add powerful, deferred deep links -- You should [integrate the SDK](/recipes/add_the_sdk/{{page.platform}}/)

## What's next

{% ingredient recipe_preview/app_download_banner %}{% endingredient %}
{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}
{% ingredient recipe_preview/influencers %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{% endingredient %}
