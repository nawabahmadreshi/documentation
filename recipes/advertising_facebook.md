---
type: recipe
title: "Facebook Ads"
page_title: "Advertising with Deep Links: Facebook Ads"
description: Learn how to create Facebook ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication
hide_platform_selector: true
---

{% protip title="Still need to integrate Branch?" %}This guide assumes that you have 1. already [integrated Branch](/recipes/quickstart_guide/ios/) and 2. configured your app to [send IDFA or GAID](/recipes/submitting_apps/ios/). These are prerequisites to install ads, so please do them first.
{% endprotip %}

Deeplinked ads are not a new breed--just a rare one. With Branch they're as easy as creating a link on the Dashboard and setting up your {{page.platform_formatted}} app to handle incoming deep links.

Here are some examples:

* A user clicks on an ad for 20% off all purchases before the end of the week, and upon opening the app sees the coupon and has it automatically added to the shopping cart.
* A user clicks on an ad for blue sneakers. You show him the blue sneakers as soon as he opens the app.
* You know that users clicking on your ads are already familiar with your product. So in your app you reduce the carousel shown to new users from 5 to 2 if they've come in through an ad.

{% protip title="Branch links work even on first install!" %}
With standard deeplinks, if a user doesn't have the app, the link fails. With Branch links, users without the app will be directed to the {% if page.ios %}App{% endif %}{% if page.android %}Play{% endif %} Store -- and upon opening the app can be deeplinked! Facebook calls this deferred deep linking, but Branch links do this plus way more and refer to the whole process as *contextual deep linking*.{% endprotip %}

## One time configuration

In order for Branch to properly run a Facebook deeplinked ad campaign, you must first send Branch your app token. This is easy to get, and you can find the step by step instructions on how to do so below. 

1. Log in to Facebook, navigate to [developers.facebook.com/apps](http://developers.facebook.com/apps) and choose your app. You'll need the App ID and Client Secret. 

{% image src='/img/recipes/deeplink_ads/fb_auth_fb.png' half center alt='Facebook Auth' %}

2. On the Branch Dashboard, go to Settings > [Link Settings](https://dashboard.branch.io/#/settings/link) and scroll down to 'Authenticate for Facebook Install Ads'. Enter your App ID and Client Secret from Facebook.

{% image src='/img/recipes/deeplink_ads/fb_auth_branch.png' half center alt='Facebook Auth' %}

3. Press 'Authenticate'. That's it!


## Creating your Link

{% ingredient dashboard_links/creating_links %}
	{% override screenshot %}{% image src='/img/ingredients/dashboard_links/fb_example_create.png' third left alt='Create Marketing Link' %}{% endoverride %}
	{% override description %}{% endoverride %}
	{% override screenshot_description%}The first step is to come up with a label for your link so that you can recognize it when you visit later on. For example: "Facebook ad for blue sneakers - summer 2015."{% endoverride %}
{% endingredient %}

{% ingredient dashboard_links/tags %}
	{% override screenshot%}{% image src='/img/ingredients/dashboard_links/fb_example_tags.png' third nofloat alt='tags' %}{% endoverride %}
{% endingredient %}

{% ingredient dashboard_links/custom_data %}{% endingredient %}


## Creating a Branch powered Facebook ad

Here is the flow on how to create a Branch deep linked install ad!

First, navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) while logged in to your account that owns the Facebook app. If you don't have a Facebook app yet, you'll need to visit [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/) and create a new Facebook app for your mobile app.

Choose **Get installs of your app**. Then scroll down and select Facebook app that you wish to advertise.

{% image src='/img/recipes/deeplink_ads/fb_ad_installs.png' half nofloat alt='Facebook Example Ad' %}

After you choose your audience and customize the display of the link, you can now specify the Deep Link in the following section.

{% image src='/img/recipes/deeplink_ads/fb_ad_deep_link_area.png' half no float alt='Facebook Example Ad' %}

Paste the Branch link from the dashboard into the **Deep Link** field

{% image src='/img/recipes/deeplink_ads/fb_ad_deep_link_branch.png' half nofloat alt='Facebook Example Ad' %}

You're all set to go!

## View your data

Now that you've set up your campaign and have everything all running, let's analyze the data! There are many changes in the works to the Branch dashboard, but if you'd like to see something, please send us a request.

First, visit the marketing tab to see the performance of the individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs. Unfortunately, Facebook prevents us from measurement the number of clicks on their ads, so this number is not accurate for Facebook ads.

{% image src='/img/recipes/deeplink_ads/marketing_link_row.png' full nofloat alt='Facebook Example Ad' %}

To view more details stats, click the _small button that looks like a bar chart_ on the far right. The first important note is that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

The chart is what we call the _Click Flow_. From a Facebook installs perspective, this will just report for you the number of installs and reopens from the link. Currently, clicks is not accurate through this ad format.

{% image src='/img/recipes/deeplink_ads/click_flow_analytics.png' half nofloat alt='Facebook Example Ad' %}

## A note on testing

### Demo/preview ads do not deep link

Unfortunately, Facebook uses a different mechanism for showing the preview ads that you send to your phone that **prevents you from testng deep linking**. Do not waste time trying to get this to work. We've confirmed with 2 separate Facebook representatives that it's broken.

### Liked live ads do not deep link

If you see that someone liked your ad, do not bother trying to click and test it. Clicking your own ad that shows up in notifications **will not deep link**.

### Use the deep link tester

The only way to test the deep linking functionality is outside of the actual ads system. Follow these instructions to test the deep linking functionality:

1. Head to the [Ads tester tool](https://developers.facebook.com/tools/app-ads-helper/)
2. Choose the app that you're advertising with
3. Scroll down to the button that says 'Test Deep Link'
4. Paste in the Branch link
5. Check 'Send Deferred'
6. Click 'Send to iOS/Android'
7. Install the app and it should deep link!

{% ingredient app_links/applinks_issues %}{% override header %}### Issues Reading App Links{% endoverride %}{% endingredient %}

{% ingredient dashboard_setup/facebook_auth_issues %}{% endingredient %}

## What's next?

{% ingredient recipe_preview/easy_deep_linking %}{% endingredient %}

{% ingredient recipe_preview/contact_us %}{% endingredient %}
