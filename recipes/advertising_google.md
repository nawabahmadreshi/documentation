---
type: recipe
title: "Google Search Ads"
page_title: "Advertising with Deep Links: Google Ads - Search and Display"
description: 
hide_platform_selector: true
---

{% protip title="Still need to integrate Branch?" %}This guide assumes that you have 1. already [integrated Branch](/recipes/add_the_sdk/ios/) and 2. configured your app to [send IDFA or GAID](/recipes/submitting_apps/ios/). These are prerequisites to install ads, so please do them first.
{% endprotip %}

## Google Ads & Branch

If you're running Google AdWords campaigns, whether they're of the Search or Display variety, Branch links can be placed inside your campaigns and deep link a user through the install process. Imagine you're running a promo for 20% of your first purchase for new installs -- you can pass that data through Branch links and give people coming in from Google AdWords that experience!

## Pre-req: Create a Branch Link

{% ingredient dashboard_links/creating_links %}{% endingredient %}

## Google AdWords Campaigns

We'll walk you through the steps required to set up a Google AdWords campaign using Branch links. Because the *final URL* for your app install campaigns must match your domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is very straightforward.

First, grab your iTunes URL or Google Play Store URL, in addition to the Branch link you created from the earlier step.

### Create an Ad

After you've added your headline and description for the ad units, navigate to the *Final URL* and *Ad URL options* section.

In the *Final URL*, you will put your iTunes App Store URL, or Google Play Store URL. 

Expand *Ad URL options*. Here is where you will place the Branch link from the first step. No need to add any extra parameters.

{% image src='/img/recipes/google_ads/ad-links.png' half center alt='Google Example Ad' %}

### Keyword tracking

If you'd like to track which keywords drove installs, Branch provides a pre-configured link for you to copy and paste and place in the *Ad URL Options* section. Simply navigate to **Link Settings** in your dashboard, and copy and paste the value inside `AdWords URL`. You can add any additional parameters to that link, such as campaign, channel, and other deeplink data. However, at minimum, that is all that is required.

### FAQ / Debugging

Sometimes, your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, depeviews are disabled and a desktop redirect is set to either the App / Play store.


### Finished

That's it! Users clicking your links and downloading to deeplinked content will now display on your Branch dashboard.
