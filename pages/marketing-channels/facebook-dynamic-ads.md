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

Branch links can be used in conjunction with Facebook's dynamic advertisements. Dynamic remarketing campaigns on desktop have been proven to deliver 16x return on ad spend. Now you can easily set up Facebook Dynamic Ads on mobile to drive incredible results.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Conversion | Product Catalogue Sales | Cross-platform Product Links

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic
--- | --- | --- | --- | --- | --- | ---
Product Catalogue Sales | ✔︎ |  | ✔︎ |  |  |

{% ingredient link-to-facebook-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Facebook Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- To use Branch links in for app deeplinks ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal and App Links]({{base.url}}/getting-started/universal-app-links).
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- Use [Branch Deep Linked Feeds](/features/deep-linked-feeds) to create your Facebook Dynamic Ad compatible deep links.
{% endprerequisite %}

{% ingredient enable-facebook-ad-partner %}{% endingredient %}

## Create a Deep Linked Ad Feed

Branch makes it easy for you to create and manage feeds with Facebook-compatible deep links.

1. Create a Branch Deep Linked Ad Feed from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Facebook Link` button under the Google Adwords Partner and select `Create Product Link`
{% image src='/img/pages/features/facebook-ads/create-link-product.png' half center alt='Link Creation' %}
1. Enter a Deep Linked Feed Name.
1. Enter a already set up feed source or upload a new source.
1. Configure the feed with the Ad Partner set to **Facebook**, and the Ad Format set to **Product**.
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/feed-setup.png' 3-quarters center alt='Ad Link Setup' %}
1. On the next section, select any keys from your feed that you'd like to include in the deep linked data contained in the generated links.
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/feed-keys-setup.png' 3-quarters center alt='Create Deep Linked Feed' %}
1. If you used a Feed Source hosted on a URL (recommended), you will see two options for accessing your feed. We recommend selecting “Schedule Refresh.” If you select this option, Branch will host a URL for your Deep Linked Feed that will update itself from your Feed Source URL at regular intervals.
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/hosted-dlf.png' half center alt='Hosted Deep Linked Feed Scheduling' %}
1. Download the feed data or copy the deep linked feed URL (for hosted feeds) to be used in your Ad Campaign.

## Upload your feed to Facebook

1. Navigate to your [Facebook Ads Manager](https://www.facebook.com/ads/manager/){:target="_blank"}.
1. In the top left hand corner, click into the menu, select **All tools**, and select **Product Catalogues**.
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/fb-product-catalogs.png' 3-quarters center alt='Facebook Product Catalogs' %}
1. From the drop down menu click "Create new catalog...", name it (remember this name, you'll need it later) and select "Products sold online".
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/create-new-catalog.png' third center alt='Facebook Create New Product Catalog' %}
1. Now that you have a product catalog, you can add a new feed. Click "Add Product Feed."
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/add-new-feed.png' 3-quarters center alt='Add new feed' %}
1. If you have a [Hosted Deep Linked Feed](/features/deep-linked-feeds/guide/#schedule-refresh){:target="_blank"} (recommended), select the option "Scheduled recurring uploads." Paste your Branch-provided URL into the **Feed URL** text field.
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/new-feed-settings.png' 3-quarters center alt='Feed URL option' %}
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/upload-feed-url.png' 3-quarters center alt='Feed URL settings' %}
1. If you've created a Deep Linked Feed CSV file to upload, select the option "Single upload: Upload a single file feed now." Select the Deep Linked Feed URL or CSV file you would like to upload to Facebook, and click "Upload".
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/successful-feed-upload.png' 3-quarters center alt='Feed uploaded' %}
1. Wait for the upload to complete successfully. If you'd like to create a "Product set" (a subset of products in your catalog for use in specific ad sets) you can do that now.

## Setting up App Events and the Facebook Pixel

Facebook requires you to report events about your users interacting with your content, for example: viewing, adding to cart, and purchasing. To add the Facebook Pixel to your website, and the Facebook SDK to your app, follow these instructions:

- [Sending App Events with the Facebook SDK](https://developers.facebook.com/docs/app-events){:target="_blank"}
- [Sending Web Events with the Facebook Pixel](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8){:target="_blank"}

Use the "Product events" tab in your Product Catalog view to ensure that Facebook is registering the events against your Product Catalog items correctly.

## Creating a Dynamic Ad Campaign

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Choose **Product Catalog Sales**. Select the Product Catalog to which you uploaded your Deep Linked Feed.
{% image src='/img/pages/features/facebook-ads/facebook-dynamic-ads/campaign-selection.png' 3-quarters center alt='Feed uploaded' %}
1. Select the targeting, bid, budget and placements that you'd like.
1. Select your desired ad format and launch your campaign. The Branch deep linked feed will be automatically set up in your Facebook product catalogue ads.

{% protip title="Driving installs with dynamic ads" %}
By default, Facebook sends customers without the app to your mobile website. To drive installs, you can send customers without your app the app store by adding a `web_should_fallback` column to your Feed Source and setting each row to `false`. Then, after you've created your campaign, edit the ad within your ad set. Under "Creative," set your "App link destination" to "Deep link, app store backup."
{% endprotip %}

{% caution %}
Facebook prevents Branch from measuring the number of clicks on their ads for install campaigns, so Branch's **Clicks** numbers for Facebook ads are inaccurate when users are being directed to the App Store to download your app.
{% endcaution %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

{% ingredient fb-ads-support %}{% endingredient %}

{% endif %}
