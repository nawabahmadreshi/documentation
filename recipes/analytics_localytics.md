---
type: recipe
directory: third-party-integrations
title: "Localytics"
page_title: Send Deep Link Install Data to Localytics
description: We’ve partnered with Localytics to provide an easy way to deliver Branch installs and attributions to your Localytics dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Localytics
hide_platform_selector: true
sections:
- guide
---

# Sending Branch Install Data to Localytics

We've partnered with Localytics to provide an easy way to deliver Branch installs and attributions to your Localytics dashboard. This is great for segmenting your users and providing higher granularity for your organic cohorts vs paid cohorts.

{% protip title="Still need to integrate Branch?" %}This guide assumes that you have already integrated Branch. If you need to integrate Branch still, jump to "[Integrating the SDK](/recipes/add_the_sdk/ios/)".
{% endprotip %}

## How It Works

Through webhooks, we can send all install data that Branch is responsible for. Building on top of Webhooks, we have built a custom integration to automatically send said data without any extra work on your side (besides integrating both SDKs). We just need some configuration information from your Localytics account, and we'll take care of the rest.

{% protip title="How do we differentiate a Localytics install vs Branch?" %}We rely on a Branch link being clicked which leads to an install. This sets an internal boolean that an install came from Branch, which then fires our webhook.{% endprotip %}

Before you can start sending data, we'll walk you through a minimum of what is needed.

## Set Up Localytics

This guide assumes you have an account with Localytics already. First, navigate to your account on Localytics, register your application, and grab the sdk.

After [integrating the SDK](http://docs.localytics.com/), we'll need your Attribution ID to allow us to attribute. Navigate to the `Attribution` section, click the `...` (overflow) button, and select `Settings`:

![overflow](/img/recipes/localytics/localytics-more.png)

Once there, you'll need to add your **Store ID** (iTunes for iOS, Play Store for Android). Under the section `Ad Tracking Setup`, check the box labeled `Third-party Attribution`. This will enable an Attribution ID for you. Copy it, and have it handy for the next steps:

![settings](/img/recipes/localytics/localytics-attr-settings.png)

{% protip title="What does this mean?" %}Once you have selected to allow 3rd party attribution, Localytics will attribute non Localytics installs to your dashboard. This information is delayed by 10 minutes.
{% endprotip %}

Once you can verify the Localytics SDK is integrated, and you have your Attribution ID ready, we can start the Branch portion.


## Configure Dashboard

Now that you have all the required information, you'll need to navigate to our *Webhooks* tab. Click the Localytics button. You'll need to select platform, and paste the Attribution ID from the previous step. This would look like the following:

![branch-localytics-settings](/img/recipes/localytics/localytics-save.png)

It's important that you create a Localytics webhook for each **mobile application** you have, and select the appropriate mobile platform.

That's it! You have configured an integration between Branch and Localytics!

## Configure your Branch Link

When creating a Branch link to drive installs and send the data back to Localytics, be sure to specify the **campaign**. This will appear on the Localytics dashboard.  

## Testing

Now that your Branch account is configured to send data to Localytics, we'll tell you the best strategy to test.

Inside XCode's iOS Simulator, you'll want to simulate fresh installs by clicking `Reset Content and Settings` under `File`. Then, anytime you run your application after, it'll simulate a new install. You'll need to continually do this every time you want to test an attribution.

### To Test Branch Attribution

Grab a Branch link from your dashboard, paste it in mobile safari, and hit go. Once the click is registered, run (Command+R) your application. This will allow Branch's SDK to match the "link-click" from earlier and confirm a Branch install just occurred (instead of another type of install).

Navigate back to the *Webhooks* section of our dashboard, and click your Localytics webhook you're testing. If it worked, you'll notice a successful webhook sent, with a response code of `202`. This is what it would look like:

![success](/img/recipes/localytics/localytics-success.png)

### To Test Regular Localytics Attribution

Since Branch wont be responsible for all installs, you would just need to hit `Reset Content and Settings` again, and re-run your app without any Branch link click. This will **NOT** fire a Localytics webhook, and will **NOT** attribute to Branch in your Localytics dashboard.

## Troubleshooting

We'll address some commonly asked questions here.

**My Localytics webhook returned a 404**

The most common case is that you used the wrong key. You'll need to use the **Attribution Id**, found under the Attribution Settings section of your Localytics dashboard. Navigate to the `Set Up Localytics` section for more information.

**My Localytics webhook returned a 404, but I have the correct ID**

It takes 10 minutes to attribute after you enable the **Attribution ID**. This means your Attribution ID is correct, despite the 404. Localytics just hasn't enabled 3rd party attribution as the 10 minutes haven't passed. Wait 10 minutes, then try again.

**Branch shows a 202 but I don't see it in Localytics**

This is likely because 10 minutes haven't passed yet. Since your Localytics account is configred to accept 3rd party attributions, they have a 10 minute time window to accept, and will only display data after the 10 minute window has passed.
