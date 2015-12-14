---
type: recipe
title: "2 - Setup deep linking"
page_title: Setup deep linking in your Android or iOS app
description: This page will tell you how to setup your Android, iOS, Cordova, Phonegap, Xamarin, Unity, Air or Titanium app for deep linking.
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
---

Deep linking is an incredibly important part of building your app, and essential for delivering a high quality user experience. When a user clicks a link, you should take them to the exact thing they clicked on. Here's how to do it.

## Create your deep link

{% ingredient sdk_links/creating_links %}{% override header %}{% endoverride %}{% endingredient %}

-----

## Alternate 1: Easy deep link routing

{% ingredient sdk_routing/auto_routing %}{% endingredient %}

-----

### Where to define your deep link keys

{% ingredient sdk_links/buo_links %}{% endingredient %}

## Alternate 2: Handle routing yourself in the Branch callback

{% ingredient sdk_routing/routing %}{% endingredient %}

-----

## Supporting existing routes

{% ingredient sdk_routing/support_existing_routes %}{% endingredient %}

-----

## What's next?

### [Head to Step 3: Attribution and analytics](/recipes/measuring_installs/)

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}