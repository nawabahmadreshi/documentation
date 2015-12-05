---
type: recipe
title: "Step 2: SDK Integration"
page_title: How to configure the Branch Metrics SDK
ios_page_title: How to configure the Branch Metrics iOS SDK for Deep Links
android_page_title: How to configure the Branch Metrics Android SDK for Deep Links
ios_description: How to install the Branch SDK and configure your iOS app for deep links. Add a few lines of code and you can begin deep linking and tracking installs.
android_description: How to install the Branch SDK and configure your Android app for deep links. Add a few lines of code and you can begin deep linking and tracking installs.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, SDK, SDK Integration, iOS Configuration, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, SDK, SDK Integration, Android Configuration, Android
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
---
# SDK Integration Guide

## Register for Branch

In order to use Branch you must first sign up for an acount. You can sign up for your own app id at [https://dashboard.branch.io](https://dashboard.branch.io)

{% protip title="When to use Branch links?" %}

Ideally, you want to use our links any time you have an external link pointing to your app (share, invite, referral, etc) because:

1. Our dashboard can tell you where your installs are coming from
2. Our links are the highest possible converting channel to new downloads and users
3. You can pass that shared data across install to give new users a custom welcome or show them the content they expect to see

Our linking infrastructure will support anything you want to build. If it doesn't, we'll fix it so that it does: just reach out to alex@branch.io with requests.
{% endprotip %}

## Core functionality

### Configuring your {{ page.platform_formatted }} app
{% ingredient sdk_setup/installing_the_sdk %}{% endingredient %}

-----

{% ingredient sdk_setup/plist_manifest %}{% endingredient %}

-----

{% ingredient sdk_setup/init_session %}{% endingredient %}

-----

{% ingredient sdk_setup/handle_deep_link %}{% endingredient %}

-----

{% if page.web %}
{% ingredient sdk_setup/web_sdk_features %}{% endingredient %}
{% endif %}


### Creating links

{% ingredient sdk_links/creating_links %}{% override header %}{% endoverride %}{% endingredient %}

{% protip title="Metadata is for Deeplinking" %}
You can also use the data to link directly to content! Instead of "property1": "red", you could pass in "picture_id": "1234", then when a user clicks on a link you can open the app straight to picture with ID 1234.
{% endprotip %}

{% if page.ios or page.android %}
{% ingredient sdk_links/tracking_views %}{% endingredient %}
{% endif %}

-----

## What's next?

### [Head to Step 3: Your intro to the dashboard](/recipes/measuring_installs/)

-----

## Advanced functionality

{% ingredient sdk_setup/callback_params %}{% endingredient %}

-----

{% ingredient sdk_setup/identify_and_logout %}{% endingredient %}

-----

{% ingredient sdk_setup/pre_14_android %}{% endingredient %}

{% ingredient sdk_setup/install_referrer %}{% endingredient %}

{% ingredient sdk_setup/xamarin_without_forms %}{% endingredient %}

