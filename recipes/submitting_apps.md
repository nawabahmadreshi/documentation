---
type: recipe
directory: getting-started
title: Submitting apps
ios_page_title: How to submit apps to the iOS App Store
android_page_title: Submitting Android apps to the Play Store
ios_description: How to submit your new iOS app to the App Store and how to inform Apple about the Advertising Identifier (IDFA) if you use AdSupport.framework.
android_description: How to submit your new Android app to the Google Play Store and how to collect the Google Advertising ID for advertising or tracking purposes.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, submit app, app submission, App Store, iOS App Store, IDFA, Advertising Identifier
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,submit app, app submission, App Store, Play Store, Android, Google Advertising ID
platforms:
- ios
- android
sections:
- overview
- guide
- support
---


{% if page.ios %}{% ingredient sdk_setup/ios_app_submission %}{% endingredient %}{% endif %}
{% if page.android %}{% ingredient sdk_setup/android_app_submission %}{% endingredient %}{% endif %}

