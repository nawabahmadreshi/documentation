---
type: recipe
directory: third-party-integrations
title: "Kochava"
page_title: Send Deep Link Install Data to Kochava
description: We’ve partnered with Kochava to provide an easy way to deliver Branch installs and attributions to your Kochava dashboard. Learn how to set it up.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Analytics, Install Data, Kochava
hide_platform_selector: true
sections:
- overview
- guide
- support
---

{% if page.overview %}

{% protip title="The Localytics V2 integration is currently in private beta" %}
To request access to the Localytics V2 integration, please contact [integrations@branch.io](mailto:integrations@branch.io) or your Branch account manager. 
{% endprotip %}

We've partnered with Localytics to provide an easy way to deliver Branch installs and attributions to your Localytics dashboard. This is great for segmenting your users and providing higher granularity for your organic cohorts vs paid cohorts.

{% getstarted title="Get started with Localytics integration" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [sign up for a Localytics account](https://www.localytics.com/free-trial-signup/) and [install the Localytics SDK](http://docs.localytics.com/).

{% endprerequisite %}

## Contact your Branch Account Manager

To get started, contact integrations@branch.io or your Branch account manager and give them your Localytics iOS and Android API keys.

## How it works

Through automatically configured webhooks, we have built a custom integration to automatically send all Branch install data to Localytics without any extra work on your side (besides integrating both SDKs). We just need some configuration information from your Localytics account, and we'll take care of the rest.

{% protip title="How do we differentiate Localytics and Branch installs?" %}We rely on a Branch link being clicked which leads to an install. This sets an internal boolean that an install came from Branch, which then fires our webhook.{% endprotip %}

## Set up Localytics

1. On the Localytics dashboard, navigate to the **Attribution** section, click the **•••** (overflow) button, and select **Settings**. {% image src='/img/pages/third-party-integrations/localytics/localytics-more.png' 3-quarters center alt='Custom redirect configuration' %}
1. Once there, you'll need to add your **Store ID** (iTunes for iOS, Play Store for Android).
1. Under the section **Ad Tracking Setup**, check the box labeled **Third-party Attribution**. This will enable an **Attribution ID** for you. Copy it, and have it handy for the next steps. {% image src='/img/pages/third-party-integrations/localytics/localytics-attr-settings.png' 2-thirds center alt='Custom redirect configuration' %}

{% protip title="What does this mean?" %}
Once you have selected to allow third-party attribution, Localytics will attribute non-Localytics installs to your dashboard. **This information is delayed by 10 minutes.**
{% endprotip %}

{% caution %}
When [creating a Branch]({{base.url}}/getting-started/creating-links-other-ways) link to use with Localytics, be sure to specify a **campaign** and **channel**.
{% endcaution %}

## Testing

Now that your Branch account is configured to send data to Localytics, we'll tell you the best strategy to test.

### To test Branch attribution with Localytics

1. Grab a Branch link from your dashboard, paste it in mobile Safari, and hit go.
1. Once the click is registered, run (Command+R) your application. This will allow Branch's SDK to match the "link-click" from earlier and confirm a Branch install just occurred (instead of another type of install).
1. Navigate back to the Webhooks section of the Branch dashboard and click the Localytics webhook you're testing. If it worked, you'll notice a successful webhook sent, with a response code of `202`. This is what it would look like:

{% image src='/img/pages/third-party-integrations/localytics/localytics-success.png' 2-thirds center alt='success' %}

{% protip title="Simulating a fresh install" %}
Inside XCode's iOS Simulator, select `Reset Content and Settings` under `File`. The next time you run your app, it will simulate a new install. You need to continually do this every time you want to test an attribution.
{% endprotip %}


### To test regular Localytics attribution

Since Branch is not responsible for all installs, you need to hit `Reset Content and Settings` again, and re-run your app without any Branch link click. This will **NOT** fire a Localytics webhook from Branch, and will **NOT** attribute to Branch in your Localytics dashboard.

{% elsif page.support %}

## FAQ

##### How do my Branch analytics tags map to Localytics' tags?

Branch Analytics Tag | Localytics Data Placeholder Tag
--- | ---
Campaign | Campaign
Channel | Ad Group 
Feature | Creative Name

##### My Localytics webhook returned a 404

The most common case is that you used the wrong key. You'll need to use the **Attribution ID**, found under the Attribution Settings section of your Localytics dashboard. Navigate to the `Set Up Localytics` section for more information.

##### My Localytics webhook returned a 404, but I have the correct ID

It takes 10 minutes to attribute after you enable the **Attribution ID**. This means your Attribution ID is correct, despite the 404. Localytics just hasn't enabled 3rd party attribution as the 10 minutes haven't passed. Wait 10 minutes, then try again.

##### Branch shows a 202 but I don't see it in Localytics

This is likely because 10 minutes haven't passed yet. Since your Localytics account is configured to accept 3rd party attributions, they have a 10 minute time window to accept, and will only display data after the 10 minute window has passed.

##### What is "Branch Campaign" in my Localytics dashboard?
If you don't set a campaign tag in your Branch links, then any installs from those links will appear generically tagged with "Branch Campaign" in the Localytics dashboard. 

##### I only see campaign tags in my Localytics dashboard (not channel, tags, feature or other data)
At this time we only pass the campaign tag to Localytics. We're improving this soon to give you richer data.

{% endif %}