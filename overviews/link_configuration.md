---
type: overview
title:  Link configuration
page_title: Deep Linking Standards Supported By Branch
description: How Branch Metrics deep links handle all deep linking standards and app portals automatically – whether it's Facebook, Apple, Twitter or Pinterest.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to, Standards, Web SDK, SDK
---

Every link that you create is completely customizable from a functionality perspective. Here are the key variables for customization.

## Analytics labels for data organization

Use our analytics tags to help _organize your data_. Track updates, run A/B tests and measure the effectiveness of different channels using these labels.

- **channel**: Use channel to tag the _route_ that your link reaches users. For example, tag links with ‘Facebook’ or ‘LinkedIn’ to help track clicks and installs through those paths separately.

- **feature**: This is the feature of the customer’s product that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’.

- **campaign** :Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that.

- **stage**: Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter

- **tags**: This is more a free form entry with unlimited values. Use it to organize your link data with labels that don't fit within the bounds of the above.


## Redirect customization

Every link that you create is completely customizable from a functionality perspective. Here are the key variables for customization.

### App/Play Store fallback customization

- **$fallback_url**: Change the redirect endpoint _all_ platforms - so you don't have to enable it by platform.

- **$desktop_url**: Change the redirect endpoint on desktops. Default is set to a Branch hosted SMS to download page.

- **$ios_url**: Change the redirect endpoint for iOS. Default is set to the App Store page for your app.

- **$android_url**: Change the redirect endpoint for Android. Default is set to the Play Store page for your app.

- **$windows_phone_url**, **$blackberry_url**, **$fire_url**: Change the redirect endpoint for Windows OS, Blackberry OS, Amazon Fire OS. Default is set to the default URL set [on the dashboard](https://dashboard.branch.io/#/settings/link).

### After click redirect

Currently only supported on iOS, this lets you customize where Branch will redirect a user after opening up the app or app store. The alternative is that in some configs, we leave a white screen.

- **$after_click_url**: Where to redirect to after the main click redirect has completed, so as to not leave a white screen.

### Deep link customization

- **$deeplink_path**:  With this key, use value of the deep link path that you'd like us to append to your URI. For example, you could specify "$deeplink_path": "radio/station/456" and we'll open the app with the URI "yourapp://radio/station/456?link_click_id=branch-identifier". Default is 'open?link_click_id=1234'.

- **duration**: Lets you control the fingerprinting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Default is 2 hours.

### Advanced control parameters

- **$always_deeplink**: A value to indicate if we should try to open up the app on mobile link click. Default is set to 'true'.

- **$android_deeplink_path**, **&ios_deeplink_path**: Same as normal deeplink path but only for Android and iOS clicks

- **$ios_redirect_timeout**, **$android_redirect_timeout**: Control the timeout in ms that the client side JS waits after trying to open up the app before redirecting to the App Store or Play Store. Default is 750 ms.

### Advanced query params for control

- **iframe_src**: Set equal to true when you are going to set an iFrame src to a Branch link. We need to issue 300s in order to properly redirect in this case.

- **has_app**: Set to 'true' or 'false in order to tell us whether you want us to try to open up the app for this particular link or not. 

- **debug**: Set to true to route to a link debug page that shows the labels and configuration of a link

- **type**: Set to 1 to make it a one-time use link. Default is set to 0.

## Display customization

If no open graph tags are specified in the links, we will redirect to the desktop URL to retrieve them. 

### Most all platforms

- **$og_title**: Set the title of the link as it will be seen in social media displays.

- **$og_description**: Set the description of the link as it will be seen in social media displays.

- **$og_image_url**: Set the image of the link as it will be seen in social media displays.

- **$og_video**: Set a video as it will be seen in social media displays.

- **$og_url**: Set the base URL of the link as it will be seen in social media displays.

- **$og_type**: Set the type of custom card format link as it will be seen in social media displays.

- **$og_redirect**: Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags.

### Twitter specific

- **$twitter_card**: Set the Twitter card type of the link

- **$twitter_title**: Set the title of the Twitter card

- **$twitter_description**: Set the description of the Twitter card

- **$twitter_site**: Set the site for Twitter

- **$twitter_app_country**: Set the app country for the app card