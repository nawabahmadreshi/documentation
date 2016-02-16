---
type: recipe
title: "1 - Add the SDK"
page_title: Add the Branch SDK to your app
description: This page will tell you how to quickly add the Branch SDK to your Android, iOS, Cordova, Phonegap, Xamarin, Unity, Air or Titanium app.
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
---

## Register for Branch

In order to use Branch you must first sign up for an acount. You can sign up for your own app id at [https://dashboard.branch.io](https://dashboard.branch.io)

{% ingredient sdk_setup/installing_the_sdk %}{% endingredient %}

-----

{% ingredient sdk_setup/plist_manifest %}{% endingredient %}

-----

{% ingredient sdk_setup/init_session %}{% endingredient %}

-----

{% ingredient sdk_setup/handle_deep_link %}{% endingredient %}

{% if page.ios %}

-----

{% endif %}

## Advanced functionality


{% ingredient sdk_setup/push_notifications %}{% endingredient %}


{% ingredient sdk_setup/callback_params %}{% endingredient %}

-----

{% ingredient sdk_setup/get_referring_params %}{% endingredient %}

-----

{% ingredient sdk_setup/pre_14_android %}{% endingredient %}

{% if page.android %}

-----

{% endif %}

{% ingredient sdk_setup/install_referrer %}{% endingredient %}

{% ingredient sdk_setup/xamarin_without_forms %}{% endingredient %}

{% if page.android or page.xamarin %}

-----

{% endif %}

## What's next?

### [Head to Step 2: Setup deep linking](/recipes/setup_deep_linking/{{page.platform}}/)

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}