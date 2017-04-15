---
type: recipe
directory: third-party-integrations
title: "Appboy"
page_title: Send Deep Link Install Data to Appboy
description: We’ve partnered with Appboy to provide an easy way to deliver Branch installs and attributions to your Appboy dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Appboy
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- support
---

{% if page.overview %}

The Branch partnership with [Appboy](https://www.appboy.com) provides a push-button way to deliver Branch installs and attributions to your Appboy dashboard. This allows you to analyze your users coming in from Branch deep linked campaigns.

**At this time, our integration only applies to the iOS platform.**

{% ingredient paid-integration %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

## How it works

We have built a custom integration to automatically send all Branch install data to Appboy without any extra work on your side (besides integrating both SDKs). Simply click a button, and you'll be good to go!

{% protip title="How do we differentiate Appboy and Branch installs?" %}We rely on a Branch link being clicked, which leads to an install. This sets an internal boolean that an install came from Branch.{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [sign up for an Appboy account](https://dashboard.appboy.com/developers/sign_up) and [install the Appboy SDK](https://documentation.appboy.com/).
- Ensure Appboy's SDK is [collecting the IDFA](https://documentation.appboy.com/iOS/#optional-idfa-collection).

{% endprerequisite %}

## Get the Appboy API key

1. On the Appboy dashboard, navigate to the **App Settings** section, and click **3rd Party Integrations**.
1. From there, grab your API key (this will be the same for all attribution partners listed on the page).


## Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Appboy and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Appboy iOS API Key and hit **Save**.

{% image src="/img/pages/third-party-integrations/appboy/enable-appboy-integration.png" half center alt='Enable Integration' %}

{% caution title="Please test your integration!" %}
Branch is not responsible for inaccurate API keys.
{% endcaution %}

{% elsif page.support %}

## Troubleshooting

There are common strategies to take while trouble shooting.

### How to use Branch Links to Deep Link from Appboy's In-App Message Campaigns on iOS

1. Ensure that the type of campaign you are running is an **In-App Message** campaign.
2. From Appboy's Dashboard, **Edit** your campaign.
3. From the **Compose** tab scroll down to **iOS**.
4. Within the **On-click Behavior** section, select **Deep Link Into App**.
5. To understand what to insert into this field, find a Branch Marketing link you would like users to get deep linked to and then follow the instructions [here](https://dev.branch.io/features/facebook-ads/support/ios/#use-a-direct-deep-link).
6. **Update** your campaign.
7. The final step requires a code change. You'll have to modify `application:openURL:options:` so that it makes a call to:

{% highlight objc %}
[[Branch getInstance]
     application:application
     openURL:url
     options:options];
{% endhighlight %}

This will replace the call to:

{% highlight objc %}
[[Branch getInstance] handleDeepLink:url];
{% endhighlight %}

Here is the method correctly implemented:

{% highlight objc %}
- (BOOL) application:(UIApplication *)application
             openURL:(NSURL *)url
             options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    
    [[Branch getInstance]
     application:application
     openURL:url
     options:options];
    
    return YES;
}
{% endhighlight %}

**Note**: This method is available in iOS SDK version `0.14.9` and higher.

Performing these changes will ensure that a tap on an **In-App Message** results in the delivery of deep link data from the link selected in **step 5**.
{% endif %}
