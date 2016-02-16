---
type: recipe
directory: third-party-integrations
title: "Appboy"
page_title: Send Deep Link Install Data to Appboy
description: We’ve partnered with Appboy to provide an easy way to deliver Branch installs and attributions to your Appboy dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Appboy
hide_platform_selector: true
sections:
- overview
- guide
---

{% if page.overview %}

The Branch partnership with [Appboy](https://www.appboy.com) provides a push-button way to deliver Branch installs and attributions to your Appboy dashboard. This allows you to analyze your users coming in from Branch deep linked campaigns.

{% caution title="iOS only" %}
At this time, our integration only applies to the iOS platform.
{% endcaution %}

### [Get started with Appboy!]({{base.url}}/third-party-integrations/appboy/guide)

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [sign up for an Appboy account](https://dashboard.appboy.com/developers/sign_up) and [install the Appboy SDK](https://documentation.appboy.com/).
- Ensure Appboy's SDK is [collecting the IDGA](https://documentation.appboy.com/iOS/#optional-idfa-collection).

{% endprerequisite %}

## How it works

Through automatically configured webhooks, we have built a custom integration to automatically send all Branch install data to Appboy without any extra work on your side (besides integrating both SDKs). Simply click a button, and you'll be good to go!

{% protip title="How do we differentiate Appboy and Branch installs?" %}We rely on a Branch link being clicked, which leads to an install. This sets an internal boolean that an install came from Branch, which then fires the webhook.{% endprotip %}

## Get the Appboy API key

On the Appboy dashboard, navigate to the **App Settings** section, and click **3rd Party Integrations**. From there, grab your API key (this'll be the same for all attribution partners listed on the page).

## Configure Branch dashboard

1. Navigate to the [Webhooks](https://dashboard.branch.io/#/webhook) tab on the Branch dashboard.
1. Click the Appboy button.
1. Input your 3rd party API key from the previous step.

{% image src='/img/pages/third-party-integrations/appboy/appboy-add.png' 2-thirds center alt='branch-appboy-settings' %}

{% caution %}
When [creating a Branch]({{base.url}}/getting-started/creating-links-other-ways) link to use with Appboy, be sure to specify a **campaign** and **channel**.
{% endcaution %}

## Testing

Now that your Branch account is configured to send data to Appboy, we'll tell you the best strategy to test.

1. Grab a Branch link from your dashboard, paste it in mobile Safari, and hit go.
1. Once the click is registered, run (Command+R) your application. This will allow Branch's SDK to match the "link-click" from earlier and confirm a Branch install just occurred (instead of another type of install).
1. Navigate back to the Webhooks section of the Branch dashboard and click the Appboy webhook you're testing. If it worked, you'll notice a successful webhook sent, with a response code of `200`. Appboy's dashboard will indicate a Branch install hit their servers with a green button and a timestamp of the last successful install.

{% protip title="Simulating a fresh install" %}
Inside XCode's iOS Simulator, select `Reset Content and Settings` under `File`. The next time you run your app, it will simulate a new install. You need to continually do this every time you want to test an attribution.
{% endprotip %}

{% endif %}