---
type: recipe
directory: features
title: "Twitter Ads"
hide_platform_selector: true
sections:
- guide
---

Configuring Twitter install ads to use Branch links is very simple. The only trick is that you will be using the website click/conversion ads instead of the standard app install ad.

{% prerequisite %}

- To track installs from Twitter Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Create a Branch link

Use the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard to create a link for your ad campaign.

{% image src='/img/pages/features/twitter-ads/add_full.png' half center alt='Add a Branch Marketing link' %}

## Configure ad campaign on Twitter

{% image src='/img/pages/features/twitter-ads/twitter_screenshot_0.png' 3-quarters center alt='Twitter Ads' %}

### Select campaign type

Go to Twitter and set up a new ad campaign. When selecting the campaign type that you want, select **Website Clicks or Conversions**.

### Set the device targeting

Set the device targeting as desired. 

## Enter Branch marketing link

On the ad creation card, enter the Branch marketing link you created in the **Website URL** field.

{% image src='/img/pages/features/twitter-ads/twitter_screenshot_1.png' 3-quarters center alt='Twitter Ads' %}

## Save

Save the Campaign. You're done!
