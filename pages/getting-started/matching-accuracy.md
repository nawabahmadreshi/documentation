---
type: recipe
directory: getting-started
title: Matching Platform
page_title: How to get the most out of Branch deep linking
description: How does Branch matching work? Learn about mechanisms we use to pass data through to the app and attribute app sessions back to the source.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, matching, fingerprint, accuracy, direct deep linking
hide_platform_selector: true
hide_section_selector: true
sections:
- overview
- guide
---

{% if page.overview %}

There are several mechanisms Branch uses to pass data through to the app and attribute app sessions back to the source. We always use the method with the highest match confidence rate.

## Methods with 100% match accuracy

### Direct deeplinking

If the app is currently installed on the phone, and you've configured your Branch links with your app's URI scheme (`myapp://`) or to use Universal or App Links, we will open the app immediately and pass a click identifier through to our native library. This click identifier is then sent to the Branch servers to retrieve the dictionary of data associated with the link.

For example, we'd call `myapp://open?link_click_id=123456` to open the app immediately. The Branch native library parses out `link_click_id: 123456` and passes it back to the Branch API to retrieve the data dictionary associated with that link click.

### IDFA token matching across the Branch Network

When a user clicks a Branch link for your app, and we've seen them click a link for another app on our partner network, we've already matched them up to a corresponding device identifier. This means that when they install the app, we know with 100% certainty that they just came from that link click.

The fact that we have such a global network of apps with hundreds of millions of users clicking links, means that when you join the platform, you can benefit from the crowd-sourced accuracy gained through all our apps contributing the browser-app profiles. Read more about how important this is on [our blog](https://blog.branch.io/the-importance-of-matching-accuracy-in-deep-linking).

### Leveraging other match techniques

We've built out custom deep linking mechanisms that are specific to each platform to ensure that deep linking is accurate. Here are some of those techniques we use:

| Match Method | Implementation Details
| :--- | ---
| **Facebook deferred deep linking API** | We've built a custom integration with Facebook where if a user originates from an app invite or advertisement, we connect with Facebook's API to know with 100% certainty if the install originated from this source. You'll need to authenticate with Facebook on the Branch dash if you want to support this.
| **Android Google Play referrer** | Google Play supports passing a referrer through the install process that we listen for. It's notoriously unreliable and currently unsupported when redirecting from Chrome. However, we'll use it when available. Enabling this method is covered in the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide/guide/android/#configure-manifest).
| **iOS 9/10 Safari cookie passthrough** | We built a custom technique into our iOS SDK that will guarantee 100% accuracy on iOS 9/10 when a user clicks from the Safari browser. This only applies if you include SafariServices.framework in your app. Note that this method has some risks due to a recent (9/1/16) policy change on iOS. Please see our new recommended [path to use this feature]({{base.url}}/getting-started/matching-accuracy/guide/#configuring-your-ios-app-for-100-match-from-safari).
| **Android Chrome Tabs cookie passthrough** | We built a custom technique into our Android SDK that will guarantee 100% accurancy when a user originates from the Chrome browser. We're automatically cookie match based on app.link, but you can configure the domain depending on your use case. Please see [the guide here]({{base.url}}/getting-started/matching-accuracy/guide/#configuring-your-android-app-for-100-match-from-chrome).

## Methods without 100% match accuracy

### Browser to app fingerprint match

Branch collects information about devices both when a user is in the browser -- via a click on a Branch link -- and then after they open the app. This information includes **IP Address**, **OS**, **OS version**, **device model** and other parameters. This is the user's **_digital fingerprint_** and can be obtained in the browser and in the app.

When no 100% match method is available, we connect the unique fingerprint collected in the app to the unique fingerprint collected in the browser to determine where user originated.

{% protip title="Customize the fingerprint matching criteria" %}

If you are concerned that users may potentially have the same fingerprint, you can choose to have us not match users if two identical fingerprints are outstanding. On the Dashboard's [Link Settings](https://dashboard.branch.io/#/settings/link) page, under advanced options, you should set **Match Type** to `Unique`. You can also modify the 7200 second (2 hour) default expiration for all links, or [configure it for individual links]({{base.url}}/getting-started/configuring-links) by using the `$match_duration` control parameter.

{% image src="/img/pages/getting-started/matching-accuracy/match_type.png" center full alt="match_type" %}

This means that if two users with the same fingerprint, on the same wifi, were to click a Branch link for your app, we would blacklist those digital fingerprints for the expiration duration. Therefore, when either user opens up your app, no match would be made.

{% endprotip %}

{% elsif page.guide %}

## Configuring your iOS app for 100% match from Safari

### Include SafariServices.framework

### Set the domain for cookie matching

### *Recommended:* Display the SFSafariViewController to your user

## Configuring your Android app for 100% match from Chrome

### Set the domain for cookie matching

## Handling personally identifiable information

{% caution %}
Deep link usecases that include sensitive or personally identifiable information are discouraged. This is because there is always a slight possibility of mismatches occurring, which could lead to users seeing incorrect content.
{% endcaution %}

Our advice is to ensure that users are not able to abuse your system if they are deep linked incorrectly to your app. Examples of use cases to avoid are:

1. Automatically logging users into your app by including usernames and passwords in Branch links.
1. Deep linking users to items they have purchased, or allowing them to change the state of their order without having them log into your app first.
1. Deep linking to explicit content.

In the event that you choose to move forward with a usecase that does include sensitive information in your Branch links, you should check for the `+match_guaranteed: true` key-value pair in your initial Branch session callback, prior to routing to the deep linked content. Matching methods that provide `+match_guaranteed: true` are discussed in the [Methods with 100% match accuracy]({{base.url}}/getting-started/matching-accuracy/overview/#methods-with-100-match-accuracy) section above. Methods that return `+match_guaranteed: false` is discussed in [Methods without 100% match accuracy]({{base.url}}/getting-started/matching-accuracy/overview/#methods-without-100-match-accuracy).

{% endif %}
