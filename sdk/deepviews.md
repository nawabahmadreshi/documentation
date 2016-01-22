---
type: sdk
title: "Deepviews"
page_title: "Deepviews - Mobile Web Splash Pages"
description: Learn how to create a mobile web deepview using Branch links.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
---

A **Deepview** is a mobile web splash page combined with a deep link that will open the app if installed, and fall back to the appropriate app store if not. Here's an example flow:

{% image src='/img/deepviews/deepviews_allthecooks.gif' actual center alt='Deepviews example' %}

Deepviews are discoverable in all search portals (Google, Apple Spotlight, Bing, etc), opening up new mechanisms for people to find your app. Plus, they drive much higher conversions to install instead of sending a user to the App/Play Store directly.

-----

## Pre-requisites

There are a few things to make sure you've done prior to leveraging deepviews

- Setup your Branch account and link routing for your app at [start.branch.io](https://start.branch.io).
- Make sure we've correctly pulled the app icon you want to use in the Social Media Display Customization section of the [settings tab](https://dashboard.branch.io/#/settings/link).
- *optional* To power deep linking and get the install/open analytics, {% if page.ios || page.android %}[integrate the SDK](/recipes/quickstart_guide/{{page.platform}}/){% else %}[integrate the SDK](/recipes/quickstart_guide/ios/){% endif %}.

-----

## Enabling Deepviews

### Enabling Deepviews for all links

1) Head to the [Dashboard Deepviews page](https://dashboard.branch.io/#/settings/deepview). It's in the settings tab on side bar.

{% image src='/img/deepviews/deepviews_tab.png' quarter center alt='Deepviews tab' %}

2) Select the **platform** you want to enable - options are desktop, Android and iOS.

{% image src='/img/deepviews/deepviews_option.png' quarter center alt='Deepviews tab' %}

3) Choose the template you want to enable and click **Enable**.

{% image src='/img/deepviews/deepviews_enable.png' quarter center alt='Deepviews tab' %}

-----

### Enabling Deepviews per link

If you don't want to enable Deepviews globally, you can do it on a per link basis by inserting custom control parameters into the **data** dictionary.

**$ios_deepview**: The name of the template to use for iOS. [default: `default_template`].

**$android_deepview**: The name of the template to use for Android. [default: `default_template`].

**$desktop_deepview**: The name of the template to use for the desktop. [default: `default_template`].

#### Dynamic link control

If you're [creating links dynamically](/overviews/link_creation_guide/#appending-query-parameters), you simply need to append the parameters. For example:

{% highlight javascript %}
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$ios_deepview=default_template&$desktop_deepview=default_template"
{% endhighlight %}

#### SDK/API link control

{% ingredient sdk_links/deepview_links %}
{% override header %}{% endoverride %}
{% override explanation %}{% endoverride %}
{% endingredient %}

#### Dashboard link control

You can also control it for individual marketing links by inserting the keys and values into the deep link data section.

{% image src='/img/deepviews/deepview_db_key.png' third center alt='Deepviews tab' %}

-----

## Customizing Deepview content

The default template is simply controlled by three different variables: _title_, _description_ and _image url_. These specify everything that the default template needs to render.

| Key | Value
| --- | ---
| "$og_title" | The title you'd like to appear on the deepview
| "$og_description" | The description you'd like to appear on the deepview
| "$og_image_url" | The URL for the image you'd like to appear on the deepview

### Customizing Deepview content on the Dashboard

If you're creating a link on the dashboard, *you cannot specify `$og_title`, `$og_description` and `$og_image_url`* in the _Deep Link Data (Advanced)_. You will need to instead edit the Title, Description and Image URL in the _Social Media Description_ section. [Click here](/img/deepviews/deepviews_social_media_description.png) to view a screenshot of how Social Media Description appears on the Marketing page.

### Hosting your own OG tags

If you want to host your own OG tags, so that you can later customize them, all you need to do is specify a **$desktop_url** when you create the link. Branch has a scraper that will retrieve the OG tags and populate the deepview based on the content of your site.

-----

### Let Branch host the OG tags

#### Dynamic link control

For dynamic links, you can specify the OG tags the same way you control the deepview settings. Please make sure to URL encode everything, lest the link will break.

{% highlight javascript %}
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$og_title=MyApp%20is%20disrupting%20apps&$og_image_url=http%3A%2F%2Fmyapp.com%2Fimage.png"
{% endhighlight %}

#### SDK/API link control

When you create links via the SDK or the API, you simply need to dynamically set the OG tags. The link that is returned to you will result in a custom deepview showing based on what you've specified

{% ingredient sdk_links/og_tags %}
{% override header %}{% endoverride %}
{% override explanation %}{% endoverride %}
{% endingredient %}

#### Dashboard link control

If you are create links one off, you can control the OG tags and deepview content in the `Social Media Description` section on the marketing tab of the dashboard.

{% image src='/img/deepviews/deepview_dashboard_og_tags.png' quarter center alt='Deepviews tab' %}

-----

## Set up deep link routing

Please head over to the [Easy Deep Link Routing](/recipes/easy_deep_linking/ios/) guide for instructions on how to easily set up deep linking for Android and iOS.

-----

## Deepview analytics

With deepviews, Branch tells you everything about the flow of users through the deepview. You can find the below tab on the [summary page](https://dashboard.branch.io/#) of the dashboard.

{% image src='/img/deepviews/deepview_analytics.png' third center alt='Deepviews tab' %}

The flow of the analytics is:

1. View the deepview page
1. Click the call to action and be sent to the App Store
2. Install or upgrade/re-install the app

Only users who do not have the app will go through this flow. You can view the total counts and conversion rate from each step on this chart.

-----

## Advanced: Customizing the Deepview templates

Coming soon!

-----

## Advanced: Convert your mobile website into a Deepview

You already have a website and you'd prefer to host the mobile web preview of the content. No problem! You can use the [Branch web SDK](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md) to convert your mobile site into a deepview.

{% ingredient web_sdk/smart_banner %}{% override header %}{% endoverride %}{% endingredient %}

-----

## What's next?

You've got the basics, but let's take your integration to the next level:

{% ingredient recipe_preview/easy_deep_linking %}{% endingredient %}
{% ingredient recipe_preview/content_sharing %}{% endingredient %}
{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}
{% ingredient recipe_preview/referral_links_with_incentives %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}