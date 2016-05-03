---
type: recipe
directory: third-party-integrations
title: "Tune"
page_title: Sync Branch data with Tune
description: Learn how to synchronize your Branch data with Tune to segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Tune, HasOffers, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support

---

{% if page.overview %}

{% protip title="The Tune integration is currently in private beta" %}
To request access to the Tune integration, please contact [support@branch.io](mailto:support@branch.io) or your Branch account manager. 
{% endprotip %}

With a push of a button you can send your Branch data to your Tune dashboard, helping you segment users and calculate LTV. 

{% getstarted title="Get started with the Tune integration" %}{% endgetstarted %}

{% elsif page.guide %}

## Contact Branch to enable the beta

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and the Tune SDK into your app

{% endprerequisite %}

To get started, contact support@branch.io or your Branch account manager with the following information.

1. Whether you'd like to enable iOS or Android, or both
1. Your Tune Site IDs per platform

## Capture IDFA/GAID

Ensure that you are capturing both the [Google Advertising Identifier (GAID) on Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id), and the [IDFA on iOS]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#install-the-sdk-manually) (by importing the `AdSupport.framework`).

{% elsif page.advanced %}

## Ensure Google Play Install Referrer is added

When you integrate the Tune SDK, ensure you add the install referrer snippet provided Tune [here](https://help.tune.com/marketing-console/how-google-play-install-referrer-works/).

{% elsif page.support %}

## FAQ

##### How do my Branch analytics tags map to Tune's?

Branch Analytics Tag | Tune Tag
--- | ---
Campaign | sub_campaign
Channel | sub_placement 
Tags | sub_keyword 
Branch Click ID | tracking_id 

##### What are the methods Branch uses to let TUNE know an install came from Branch?

We rely on 3 methods to match attributions into TUNE’s dashboard. 

The first is fingerprinting, which is the most basic. This is when we send a click event to Tune with IP address and User Agent and Tune completes the attribution. 

The next method is passing the Google Advertising Id or IDFA on iOS. This occurs when a Universal or App link drove open the app session via Branch (meaning a click never touched the browser). In this case, we can attribute Branch correctly in TUNE’s dashboard 100% of the time, because TUNE receives the IDFA / GAID from Branch while also keeping reference to it through their own SDK.

The third method is passing along Branch’s click ID through the install referrer on Android, and the URI scheme on iOS. The TUNE SDK consumes the click ID through these mechanisms and then Branch sends that same click id back to TUNE. This also results in a 100% match.

By following all the steps listed in this guide, you’ll automatically have all 3 available. 

##### How can I test this integration?

On Android, the easiest way to test is by building a Branch link, and simply clicking open the app from a browser. On iOS, the easiest way to test is by setting up Universal Links and clicking open the app on your device.

{% endif %}