---
type: recipe
directory: marketing-channels
title: "Dynamic Ads"
page_title: "Advertising with Deep Links: Facebook Dynamic Ads"
description: Learn how to create Facebook Dynamic Ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/facebook-dynamic-ads/overview/, /features/facebook-dynamic-ads/overview/, /features/facebook-dynamic-ads/guide/, /features/facebook-dynamic-ads/support/ ]  
---

{% if page.overview %}

Dynamic remarketing campaigns on desktop have been proven to deliver 16x return on ad spend. Now you can easily set up Facebook Dynamic Ads on mobile to drive incredible results.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- To track installs from Facebook Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Use [Branch Deep Linked Feeds](/features/deep-linked-feeds) to create your Facebook Dynamic Ad compatible deep links.
{% endprerequisite %}

## Connect Branch to Facebook

Facebook requires a custom deep linking integration for deferred deep linking. Fortunately, Branch handles that all for you! Complete Option 1 or Option 2 in [Connect Branch to Facebook](https://dev.branch.io/features/facebook-ads/guide/ios/#connect-branch-to-facebook) in order to set up your app.

## Create a Deep Linked Feed

Branch makes it easy for you to create and manage feeds with Facebook-compatible deep links.

Learn how to [create a Deep Linked Feed](/features/deep-linked-feeds/guide){:target="_blank"}.

## Upload your feed to Facebook

1. Navigate to your [Facebook Ads Manager](https://www.facebook.com/ads/manager/){:target="_blank"}.
1. In the top left hand corner, click the overflow menu and select **Product Catalogs**.{% image src='/img/pages/features/facebook-dynamic-ads/fb-product-catalogs.png' half center alt='Facebook Product Catalogs' %}
1. From the drop down menu click "Create new catalog...", name it (remember this name, you'll need it later) and select "Products sold online". {% image src='/img/pages/features/facebook-dynamic-ads/create-new-catalog.png' half center alt='Facebook Create New Product Catalog' %}
1. Now that you have a product catalog, you can add a new feed. Click "Add Product Feed." {% image src='/img/pages/features/facebook-dynamic-ads/add-new-feed.png' 3-quarters center alt='Add new feed' %}
1. If you have a [Hosted Deep Linked Feed](/features/deep-linked-feeds/guide/#schedule-refresh){:target="_blank"} (recommended), select the option "Scheduled recurring uploads." Paste your Branch-provided URL into the **Feed URL** text field. {% image src='/img/pages/features/facebook-dynamic-ads/new-feed-settings.png' 3-quarters center alt='Feed URL option' %} {% image src='/img/pages/features/facebook-dynamic-ads/upload-feed-url.png' 3-quarters center alt='Feed URL settings' %} 
1. If you've created a Deep Linked Feed CSV file to upload, select the option "Single upload: Upload a single file feed now." Select the Deep Linked Feed URL or CSV file you would like to upload to Facebook, and click "Upload". {% image src='/img/pages/features/facebook-dynamic-ads/successful-feed-upload.png' 3-quarters center alt='Feed uploaded' %}
1. Wait for the upload to complete successfully. If you'd like to create a "Product set" (a subset of products in your catalog for use in specific ad sets) you can do that now.

## Setting up App Events and the Facebook Pixel

Facebook requires you to report events about your users interacting with your content, for example: viewing, adding to cart, and purchasing. To add the Facebook Pixel to your website, and the Facebook SDK to your app, follow these instructions:

- [Sending App Events with the Facebook SDK](https://developers.facebook.com/docs/app-events){:target="_blank"}
- [Sending Web Events with the Facebook Pixel](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8){:target="_blank"}

Use the "Product events" tab in your Product Catalog view to ensure that Facebook is registering the events against your Product Catalog items correctly.

## Creating a Dynamic Ad Campaign

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Choose **Product Catalog Sales**. Select the Product Catalog to which you uploaded your Deep Linked Feed.
1. Select the targeting, bid, budget and placements that you'd like.

{% protip title="Driving installs with dynamic ads" %}
By default, Facebook sends customers without the app to your mobile website. To drive installs, you can send customers without your app the app store by adding a `web_should_fallback` column to your Feed Source and setting each row to `false`. Then, after you've created your campaign, edit the ad within your ad set. Under "Creative," set your "App link destination" to "Deep link, app store backup."
{% endprotip %}

## View your data using the Branch dashboard

The [Source Analytics page](https://dashboard.branch.io/analytics/source) on the Branch dashboard shows the performance of your dynamic ad campaign. 

The [Content Analytics page](https://dashboard.branch.io/analytics/content) on the Branch dashboard shows the performance of individual pieces of content in your dynamic ad campaigns.

You can find your link listed in the table with a quick summary of the _total_ clicks, installs, opens and custom events. 

{% caution %}
Facebook prevents Branch from measuring the number of clicks on their ads for install campaigns, so Branch's **Clicks** numbers for Facebook ads are inaccurate when users are being directed to the App Store to download your app.
{% endcaution %}

{% elsif page.support %}

You can find robust troubleshooting steps in our [Facebook Ads Troubleshooting section](/features/facebook-ads/support){:target="_blank"}. 

{% endif %}
