---
type: recipe
directory: getting-started
title: Configuring Links
page_title: Configuration options for Branch links
description: Learn about the properties and customizations that are available when creating Branch links for iOS and Android apps.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to, Standards, Web SDK, SDK
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
---

{% protip title="Link Configuration vs. Link Creation" %}
This page describes how to use the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters Branch offers. You can read about how to actually create Branch links on the [Creating Links]({{base.url}}/getting-started/creating-links) page.
{% endprotip %}

Every Branch link that you create is completely customizable from a functionality perspective. Here are the key variables for customization.

## Link data dictionary

Every Branch link includes a dictionary for `key : value` pairs specified by you at the time the link is created. This data is then returned and available for use the next time your app is launched through that link. The data dictionary is optional and can be left empty.

## Analytics labels

Use analytics labels to help _organize your data_. Track updates, run A/B tests and measure the effectiveness of different channels using these labels.

| **Label** | **Usage**
| ---: | ---
| **channel** | Use channel to tag the _route_ that your link reaches users. For example, tag links with ‘Facebook’ or ‘LinkedIn’ to help track clicks and installs through those paths separately
| **feature** | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’
| **campaign** | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that
| **stage** | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
| **tags** | This is a free form entry with unlimited values. Use it to organize your link data with labels that don't fit within the bounds of the above

## Link control parameters

These parameters are used to customize the functionality of each individual Branch link, either by specifying a property or overriding a global default.

### Redirect customization

Every link that you create is completely customizable from a functionality perspective. Here are the key variables for customization.

#### App/Play Store fallback customization

| **Key** | **Usage** | **Default**
| ---: | --- | ---
| **$fallback_url** | Change the redirect endpoint for _all_ platforms - so you don't have to enable it by platform | System-wide Default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$desktop_url** | Change the redirect endpoint on desktops. | Text-Me-The-App page (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$ios_url** | Change the redirect endpoint for iOS | App Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$android_url** | Change the redirect endpoint for Android. | Play Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$windows_phone_url** | Change the redirect endpoint for Windows OS | System-wide Default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$blackberry_url** | Change the redirect endpoint for Blackberry OS | System-wide Default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$fire_url** | Change the redirect endpoint for Amazon Fire OS | System-wide Default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))

#### After click redirect

This lets you customize where Branch will redirect a user's web view after opening up the app or app store. The alternative is that in some configs, we leave a white screen.

{% caution %}
This parameter is currently supported only on iOS.
{% endcaution %}

| **Key** | **Usage** | **Default**
| ---: | --- | ---
| **$after_click_url** | URL redirect to after the main click redirect has completed | *null*

### Deep link customization

Use these keys to set the value of the deep link path that you'd like us to append to your URI when opening your app from this link. For example, you could specify `$deeplink_path : radio/station/456` and we'll open the app with the URI "yourapp://radio/station/456?link_click_id=branch-identifier".

| **Key** | **Usage** | **Default**
| ---: | --- | ---
| **$deeplink_path** | Set the deeplink path for _all_ platforms - so you don't have to enable it by platform | `open?link_click_id=1234`
| **$android_deeplink_path** | Set the deeplink path for Android apps | *null*
| **$ios_deeplink_path** | Set the deeplink path for iOS apps | *null*
| **duration** | Lets you control the fingerprinting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds | `7200` (2 hours) 
| **$always_deeplink** | If set to 'false' Branch will only try to open your app if we are certain the user has it | `true` (set using **Always try to open app** in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$ios_redirect_timeout** | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds | `750`
| **$android_redirect_timeout** | Control the timeout that the clientside JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds | `750`

### Advanced query params for control

| **Key** | **Usage** | **Default**
| ---: | --- | ---
| **iframe_src** | Set to true when you are going to set an iFrame src to a Branch link. We need to issue 300s in order to properly redirect in this case | `false`
| **has_app** | Set to 'true' or 'false' in order to tell us whether you want us to try to open up the app for this particular link or not | `true`
| **debug** | Set to 'true' to route to a link debug page that shows the labels and configuration of a link | `false`
| **type** | Set to 1 to make it a one-time use link (Marketing dashboard links are set to 2) | `0`

## Display customization

If you do not specify a primary OG tag when creating a link, Branch will perform a one-time scrape of your **$desktop_url** (if set) and attempt to retrieve it. 

### Open Graph tags

| **Key** | **Usage** | **Scraped?**
| ---: | --- | ---
| **$og_title** | Set the title of the link as it will be seen in social media displays | yes
| **$og_description** | Set the description of the link as it will be seen in social media displays | yes
| **$og_image_url** | Set the image of the link as it will be seen in social media displays | yes
| **$og_video** | Set a video as it will be seen in social media displays
| **$og_url** | Set the base URL of the link as it will be seen in social media displays
| **$og_type** | Set the type of custom card format link as it will be seen in social media displays
| **$og_redirect** | *(Advanced, not recommended)* Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags

### Twitter specific

| **Key** | **Usage**
| ---: | ---
| **$twitter_card** | Set the Twitter card type of the link
| **$twitter_title** | Set the title of the Twitter card
| **$twitter_description** | Set the description of the Twitter card
| **$twitter_site** | Set the site for Twitter
| **$twitter_app_country** | Set the app country for the app card