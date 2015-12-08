---
type: recipe
title: "Analytics: Appboy"
page_title: Send Deep Link Install Data to Appboy
description: We’ve partnered with AppBoy to provide an easy way to deliver Branch installs and attributions to your Appboy dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Appboy
hide_platform_selector: true
---

# Sending Branch Install Data to Appboy

We've partnered with Appboy to provide a push button way to deliver Branch installs and attributions to your Appboy dashboard. This allows you to analyze your users coming in from Branch deeplinked campaigns

{% protip title="Still need to integrate Branch?" %}This guide assumes that you have already integrated Branch. If you need to integrate Branch still, jump to "[Integrating the SDK](/recipes/quickstart_guide/ios/)".
{% endprotip %}

## How It Works

Through webhooks, we can send all install data that Branch is responsible for. Building on top of Webhooks, we have built a custom integration to automatically send said data without any extra work on your side (besides integrating both SDKs). Simply click a button, and you'll be good to go!

{% protip title="How do we differentiate a Appboy install vs Branch?" %}We rely on a Branch link being clicked which leads to an install. This sets an internal boolean that an install came from Branch, which then fires our webhook.{% endprotip %}

Before you can start sending data, we'll walk you through a minimum of what is needed.

## Set Up Appboy

This guide assumes you have an account with Appboy already. Our integration only applies to the iOS platform, so you must configure an iOS app on the Appboy dashboard.

After [integrating the SDK](https://documentation.appboy.com/), you'll have everything set up client-side.

Be sure to navigate to the **App Settings** section, and click **3rd Party Integrations**. From there, grab your API key (this'll be the same for all attribution partners listed on the page).

Finally, ensure Appboy's SDK is collecting the IDGA, by following the instructions [here](https://documentation.appboy.com/iOS/#optional-idfa-collection).


## Configure Dashboard

Now that you have all the required information, you'll need to navigate to our *Webhooks* tab. Click the Appboy button. Input your 3rd party API key from the previous step.

![branch-appboy-settings](/img/recipes/appboy/appboy-add.png)

That's it! You have configured an integration between Branch and Appboy!

## Configure your Branch Link

When creating a Branch link, be sure to specify a **campaign** and **channel**.

## Testing

Now that your Branch account is configured to send data to Appboy, we'll tell you the best strategy to test.

Inside XCode's iOS Simulator, you'll want to simulate fresh installs by clicking `Reset Content and Settings` under `File`. Then, anytime you run your application after, it'll simulate a new install. You'll need to continually do this every time you want to test an attribution.

### To Test Branch Attribution

Grab a Branch link from your dashboard, paste it in mobile safari, and hit go. Once the click is registered, run (Command+R) your application. This will allow Branch's SDK to match the "link-click" from earlier and confirm a Branch install just occurred (instead of another type of install).

Navigate back to the *Webhooks* section of our dashboard, and click your Appboy webhook you're testing. If it worked, you'll notice a successful webhook sent, with a response code of `200`.

Appboy's dashboard will indicate a Branch install hit their servers with a green button and a timestamp of the last successful install.