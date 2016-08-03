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

---

{% if page.overview %}

With a push of a button you can send your Branch data to your Tune dashboard, helping you segment users and calculate LTV.

{% ingredient paid-integration %}{% endingredient %}

{% getstarted title="Get started with the Tune integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).
- You also need to be a Tune customer and have the Tune SDK ([iOS](http://developers.mobileapptracking.com/ios-sdk/), [Android](http://developers.mobileapptracking.com/android-sdk/)) installed in your app.

{% endprerequisite %}


## Capture IDFA/GAID

Ensure that you are capturing both the [Google Advertising Identifier (GAID) on Android]({{base.url}}/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id), and the [IDFA on iOS]({{base.url}}/getting-started/sdk-integration-guide/advanced/ios/#install-the-sdk-manually) (by importing the `AdSupport.framework`).

## Enable Branch on TUNE Dashboard

When you are ready to have Branch send data to TUNE, you must make sure Branch is an enabled provider under your **Partners** in your TUNE dashboard. In order to do so, click into the **Integrated Partners** section on your TUNE dashboard. From there, enter in Branch inside the search box, and click enable.


## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Tune and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Tune Advertiser ID and platform-specific Tune Site ID
1. Hit **Save**.

{% image src="/img/pages/third-party-integrations/tune/enable-tune-integration.png" half center alt='Enable Integration' %}

## Grab Advertiser ID and Site ID(s)

After enabling Branch, for each mobile property you have, be sure to grab the **Site ID**. Start by clicking **Mobile Apps** on the left hand pane of your TUNE dashboard. From there, select the app you're interested in, and select **Edit App Details** under the app settings. You will see an **App ID** (which is an un-editable field). This is your Site ID.

In order to grab advertiser ID, go to **Testing** on the left hand pane of your TUNE dashboard. Select **Test Mobile App**, and select your app. Under the **Measurement Info** box, you will see Advertiser ID. Grab this value.

{% elsif page.advanced %}

## Add Google Play Install Referrer (Android)

When you integrate the Tune SDK, ensure you add the install referrer snippet provided Tune [here](https://help.tune.com/marketing-console/how-google-play-install-referrer-works/).


## What Branch sends to Tune

Branch Analytics Tag | Tune Data Placeholder Tag
--- | ---
Campaign | sub_campaign
Channel | sub_placement
Tags | sub_keyword
Branch Click ID | tracking_id

## What are the methods Branch uses to let TUNE know an install came from Branch?

We rely on 3 methods to match attributions into TUNE’s dashboard.

1. The first is fingerprinting, which is the most basic. This is when we send a click event to Tune with IP address and User Agent and Tune completes the attribution.
1. The next method is passing the Google Advertising Id or IDFA on iOS. This occurs when a Universal or App link drove open the app session via Branch (meaning a click never touched the browser). In this case, we can attribute Branch correctly in TUNE’s dashboard 100% of the time, because TUNE receives the IDFA / GAID from Branch while also keeping reference to it through their own SDK.
1. The third method is passing along Branch’s click ID through the install referrer on Android, and the URI scheme on iOS. The TUNE SDK consumes the click ID through these mechanisms and then Branch sends that same click id back to TUNE. This also results in a 100% match.

By following all the steps listed in this guide, you’ll automatically have all 3 available.

##### How can I test this integration?

On Android, the easiest way to test is by building a Branch link, and simply clicking open the app from a browser. On iOS, the easiest way to test is by setting up Universal Links and clicking open the app on your device.

## Using Tune data for network segmentation

If you are interested in using data from your Branch links for network segmentation in Tune, you can use the same attribution parameters you'd append to a Tune Measurement URL with your Branch link. 

1. Start with an existing [Branch marketing link](https://dev.branch.io/features/google-search-ads/guide/#create-a-marketing-link-on-the-branch-dashboard){:target="_blank"}, or your Branch link domain: **http://[branchsubdomain]**.
1. Append `?` to start the query params string: **http://[branchsubdomain]?**
   - If you're creating a new link and and you're using the legacy `bnc.lt` domain or a custom domain/subdomain as the base for your links, instead append `/a/your_Branch_key?`: **http://bnc.lt/a/your_branch_key?**
   - If you're using a marketing link, simply append `?` to the end of your marketing link
1. Next, [create a measurement URL](https://help.tune.com/marketing-console/creating-a-measurement-url/){:target="_blank"} in Tune's Attribution Analytics Dashboard.
	- After creating the measurement URL, copy everything after **action=click&** and append the parameters to the end of your Branch link. 
1. Your new URL will now pass useful paremeters to Tune. 

{% example %}
Here's an example of a finalized link with the ValueTrack Parameters for use in a Google App Install Campaign (line breaks added for legibility):

{% highlight sh %}
https://[branchsubdomain]?
	publisher_id=123&
	site_id=12345&
	sub_publisher={network}&
	sub_placement={placement}&
	sub_ad={creative}&
	sub_campaign={campaignid}&
	attr_core=1&
	sub_keyword={keyword}&
	gdevice={device}&
	gmodel={devicemodel}&
	is_mobile={ifmobile:[value]}
{% endhighlight %}
{% endexample %}
{% caution %}
If there is a conflict between the custom parameters you append to your Branch link and the default parameters Branch automatically sends to Tune, the custom parameters will override the default data.
{% endcaution %}

## Sending Google ValueTrack Parameters to Tune

For AdWords App Install Campaigns, you can append ValueTrack parameters to your Branch link by following the [instructions]({{base.url}}/third-party-integrations/tune/advanced/#using-tune-data-for-network-segmentation) highlighted above. 

When you create a Measurement URL in the Tune dashboard, the following URL parameters will automatically be generated and should be appended to the end of your Branch link (line breaks added for legibility): 
{% highlight sh %}
https://[branchsubdomain]?
	&sub_publisher={network}&
	sub_placement={placement}&
	sub_ad={creative}&
	sub_campaign={campaignid}&
	attr_core=1&
	sub_keyword={keyword}&
	gdevice={device}&
	gmodel={devicemodel}&
	is_mobile={ifmobile:[value]}
{% endhighlight %}
{% protip %}
With the macros **{}**, Tune's Attribution Analytics will automatically map the Google AdWords ValueTrack parameters to Tune's  Attribution Analytics parameters.
{% endprotip %}

For a full list of supported value parameters for AdWords, check out Tune's [Google AdWords Integration](https://help.tune.com/marketing-console/google-adwords-integration/){:target="_blank"} documentation.

{% endif %}