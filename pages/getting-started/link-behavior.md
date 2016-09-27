---
type: recipe
directory: getting-started
title: Expected Link Behavior
page_title: What you should expect from Branch links
description: Learn about how Branch links work across all different browsers and platforms.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
---

Branch links currently handle hundreds of thousands of edge cases across different browser, operating system and link configuration combinations. We could never summarize them all, but we wanted to cover some of the common use cases with default settings, so that you know what comes out of the box.

## iOS mobile link behavior

The following assumes that you've correctly configured your [Branch link settings](https://dashboard.branch.io/settings/link){:target="_blank"} with the following:

- Your app's [URI schemes]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios#register-a-uri-scheme){:target="_blank"}
- [Universal Links]({{base.url}}/getting-started/universal-app-links/guide/ios/){:target="_blank"}

### App installed

Note that the behavior I describe below is when the links are configured to fallback to the App Store. It's possible the override this with a fallback website, and the behavior will be very similar just replacing the App Store with a website. Also note that behavior on iOS 8 and below is different due to the fact that URI schemes still work there.

| App/Browser | Link Behavior
| --- | ---
| iMessage | Opens app via Universal Link
| Notes | Opens app via Universal Link
| Mail | Opens app via Universal Link
| Gmail | Opens app via a URI scheme
| Safari click | Opens app via Universal Link
| Safari paste-in | Will redirect to the App Store *
| Facebook | Will redirect to the App Store ** 
| Facebook Messenger | Will redirect to the App Store **
| Twitter | Opens app via a URI scheme
| Pinterest | Opens app via a URI scheme

(*) Two notes about Safari paste-in functionality: 

1. Apple blocks all deep linking attempts and prohibits Universal Link functionality on paste in, so you have to redirect to App Store.
2. Typing in a Branch link and manually adding query paramters in Safari will result in weird behavior due to [Safari pre-fetching](http://stackoverflow.com/a/37358674/5394680).

(**) We recommend that if you're planning to have Facebook be your primary channel for Branch links, and most of the clicking users already have the app, that you configure [iOS Deepviews]({{base.url}}/features/deepviews/guide/ios/) or use a [Journeys app banner]({{base.url}}/features/journeys/overview/) on your own site. The 'Open App' call to action button will trigger the app to open via a Universal Link. We don't show a Deepview by default because if you configure them to always open the app, Facebook will pop open a modal 100% of the time asking if the user wants to Leave Facebook. If the app is not installed, the modal doesn't do anything and it's a poor user experience. Thanks Facebook.

### App - not - installed

This covers the case where you're using the default settings and redirecting to the App Store when the app is not installed. The case where you use a website fallback is very similar, just replacing the App Store with your website.

| App/Browser | Link Behavior
| --- | ---
| Pinterest | Shows a Branch deepview *
| All other apps/browsers | Redirects to App Store

(*) We show a deepview on Twitter and Pinterest because it's possible to open the app when installed using this mechanism, and the only other alternative would be to redirect to the App Store 100% of the time from these browsers. We don't do this on Facebook.

## Android mobile link behavior

The following assumes that you've correctly configured your [Branch link settings](https://dashboard.branch.io/settings/link){:target="_blank"} with the following:

- Your app's [URI schemes]({{base.url}}/getting-started/sdk-integration-guide/advanced/android#register-a-uri-scheme){:target="_blank"}
- Your app's package name

### App installed

| App/Browser | Link Behavior
| --- | ---
| Gmail | Opens app via Chrome intent
| Chrome click | Opens the app via Chrome intent
| Chrome paste-in | Will show a Chrome error *
| Facebook | Opens app via URI scheme intent
| Facebook Messenger | Opens app via URI scheme intent
| Twitter | Opens app via URI scheme intent
| Pinterest | Opens app via URI scheme intent
| Hangouts | Opens app via Chrome intent
| Google+ | Opens app via Chrome intent

(*) Chrome currently has a bug where they don't support Chrome intents when a link is pasted into the omnibar. Please upvote the following [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=638672){:target="_blank"} on their support forums. 

### App - not - installed

| App/Browser | Link Behavior
| --- | ---
| All apps/browsers | Redirects to Play Store

## Desktop (non-mobile) link behavior

Branch's default desktop behavior is to load a fully hosted text-me-the-app page as shown below. We wrapped Twilio for you, so your users can text themselves the app.

{% image src='/img/pages/getting-started/link-behavior/default-desktop.png' half center alt='Desktop SMS to download' %}

You have a few options for customization here:

- Customize the hosted page using [desktop deepviews]({{base.url}}/features/deepviews/guide/)
- Replace it with your own website by overriding the desktop redirect (global in link settings or per link using `$desktop_url`)