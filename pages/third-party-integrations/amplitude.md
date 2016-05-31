---
type: recipe
directory: third-party-integrations
title: "Amplitude"
page_title: Sync Branch data with Amplitude
description: Learn how to synchronize your Branch data with Amplitude to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Amplitude, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
sections:
- overview
- guide
- advanced

---

{% if page.overview %}

{% protip title="The Amplitude integration is currently in private beta" %}
To request access to the Amplitude integration, please contact [support@branch.io](mailto:support@branch.io) or your Branch account manager. 
{% endprotip %}

With a push of a button you can send your Branch data to your Amplitude dashboard, helping you understand the power of Branch as an acquisition pathway. 

{% getstarted title="Get started with the Amplitude integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and the Amplitude SDK into your app.

{% endprerequisite %}

## Contact Branch to enable the beta

To get started, contact support@branch.io or your Branch account manager with the following information.

1. Whether you'd like to enable iOS or Android, or both
1. Your Amplitude API key

## Capture IDFA/GAID

Ensure that you are capturing both the [Google Advertising Identifier (GAID) on Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id), and the [IDFA on iOS]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#install-the-sdk-manually) (by importing the `AdSupport.framework`).

## Upgrade to the latest SDKs [if necessary]

Ensure you're using the latest integrations. If you implemented Branch after May 28th 2016, you'll likely be using the latest version of the SDK.

If you need to upgrade, make sure you're using the Branch iOS SDK 0.12.2 or greater, and Android SDK v1.12.1 or greater.

{% elsif page.advanced %}

## Custom identity support

You can use the following code to let Branch know what device_id and user_id should be sent to Amplitude. Please make sure you are using SDK version 0.12.2 or later.

iOS:

{% highlight objc %}
[[Branch getInstance] setRequestMetadataKey:@"$amplitude_device_id" value:@"Device A"];
[[Branch getInstance] setRequestMetadataKey:@"$amplitude_user_id" value:@"User A"];
{% endhighlight %}

Android:

{% highlight java %}
Branch.getInstance().setRequestMetadata("$amplitude_device_id", "12345");
Branch.getInstance().setRequestMetadata("$amplitude_user_id", "user-12345");
{% endhighlight %}

{% endif %}



