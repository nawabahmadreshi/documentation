---
type: recipe
directory: features
title: Personalized welcome
ios_page_title: Personalized Onboarding Flow for iOS Apps
android_page_title: Personalized Onboarding for Android Apps
ios_description: How to set up a personalized invite system and onboarding flow for iOS Apps using Branch deep links. With objective-c and swift code snippets.
android_description: How to set up a personalized invite system and onboarding flow for Android Apps using Branch deep links. With code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Personalized onboarding, onboarding, welcome screen, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Personalized onboarding, onboarding, welcome screen, Android
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

{% ingredient quickstart_preview/quickstart_preview %}{% endingredient %}

Right now, when users open your app for the first time, chances are you have no idea where they came from or who they are. You have no idea if they were invited by a friend on Facebook, found your app randomly browsing through the App Store, saw an ad, or simply discovered it through word of mouth and decided to give it a shot.

**With Branch you can finally tailor the onboarding flow for new users.** Let's get started!


## Generating Links

{% ingredient sdk_links/creating_links %}
  {% override explanation %}
  In the case of a personalized referral system, you can attach information about the user who is sharing the link. Then this information about this user--here "John" with id "1234"--is present anytime John's friends install the app after clicking his link.
  {% endoverride %}

  {% override params %}@{@"referringUsername":@"John", @"referringUserId":@"1234"}{% endoverride %}{% endingredient %}
{% ingredient sdk_links/sharing_teaser %}{% endingredient %}

-----

## The Personal Touch: A Welcome Screen
{% ingredient sdk_routing/routing %}
  {% override ios_key %}userId{% endoverride %}
  {% override ios_key_U %}UserId{% endoverride %}
  {% override vc_name %}userId{% endoverride %}
{% endingredient %}

-----

## What's next?

Now that you've got the personalized welcome finalized, here are some other things you might be interested in:

{% ingredient recipe_preview/facebook_appinvites %}{% endingredient %}
{% ingredient recipe_preview/referral_links_with_incentives %}{% endingredient %}
{% ingredient recipe_preview/app_download_banner %}{% endingredient %}
{% ingredient recipe_preview/influencers %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{% endingredient %}
