---
type: recipe
directory: marketing-channels
title: Deep Linked Feeds
page_title: "Deep Linked Feeds for Dynamic Ads"
description: "Use deep links in your dynamic ads for the most ROI efficient in mobile advertising"
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
premium: true
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
alias: [ /features/deep-linked-feeds/, /features/deep-linked-feeds/overview/, /features/deep-linked-feeds/guide/, /features/deep-linked-feeds/advanced/, /features/deep-linked-feeds/support/ ] 
---

{% if page.overview %}

{% protip title="Deep Linked Feeds for Dynamic Ads is a premium product"%}
The product is free to use for a 14 day trial period. To learn more, please contact your Branch account manager or get started in the [Dashboard](https://dashboard.branch.io/ads).
{% endprotip %}

Branch is your preferred linking infrastructure for mobile. With Deep Linked Feeds for Dynamic Ads, advertisers can easily create mobile-optimized links at scale for dynamic ad campaigns. By taking users to the most relevant content on the most relevant platform (web or app) advertisers can maximize revenue and engagement opportunities on mobile.

Deep Linked Feeds takes an existing product feed and adds correct deep links for each piece of content.

Take advantage of our visual interface for uploading and managing feeds, or set up a more automated integration between you, Branch and your ad network of choice.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To use Deep Linked Feeds you must [have the Branch SDK in your app](../getting-started/sdk-integration-guide/guide/).
- To use your Deep Linked Feed on Facebook, please ensure you have completed the [Facebook Advertising setup steps](/features/facebook-ads/guide/ios/#connect-branch-to-facebook){:target="_blank"}.
{% endprerequisite %}

## Preparing your Feed Source

To create a deep linked feed, upload a content or product feed. In Branch terminology, this is called a **Feed Source**.

When you need to create a **Deep Linked Feed** you'll go through a creation flow that will ask you to select a Feed Source for modification.

You'll be asked to enter some attribution tags and optionally configure linking. After you've done this, Branch will prepare a Deep Linked Feed, adding any missing columns that are needed, or editing existing columns to use the correct links for deep linking. More specifics on the transformation process can be found in our Advanced section.

A couple of things to note:

- Be sure that your Feed Source has a `link` column with each product's web URL. This is the minimum requirement for Branch to create deep links (although it will likely not be sufficient to be accepted by Facebook or partners.)
- We recommend [hosting deep link data](/getting-started/hosted-deep-link-data/guide/){:target="_blank"} on your website for each web URL in your feed. We won't use it to modify your feed, but when your link is clicked from an ad, we'll get the link data from your website and return it to your app.

If you choose this option, go to your [Link Settings](https://dashboard.branch.io/settings/link) > Advanced Settings and check **Enable Link Scraping**. This option is only available once you've enabled the Deep Linked Feeds product for your account (you can enable the product by creating and downloading a Deep Linked Feed). 

{% image src='/img/pages/features/deep-linked-feeds/enable-link-scraping.png' half center alt='Enable Link Scraping' %}

- If you can't host your link data, add the necessary link data as a column in the Feed Source.
- Want to get creative with your Feed Sources? Check out our [Advanced section](/features/deep-linked-feeds/advanced) for some power user tips.
- Branch accepts feed sources that are compatible with Facebook’s format. If you’re not sure about the compatibility of your feed, please use [Facebook’s Product Feed Debug Tool](https://business.facebook.com/ads/product_feed/debug){:target="_blank"} to test and debug it.

{% protip title="Example Feed Source"%}
Facebook has example CSVs that Branch accepts as Feed Sources on the [Facebook Developer Portal](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog){:target="_blank"}. Scroll down to "Supported Formats" to find the feed examples.
{% endprotip %}

## Upload a Feed Source

Go directly to [Deep Linked Feeds](http://dashboard.branch.io/ads){:target="_blank"} in the Branch dashboard to get started.

1. Click on the "Feed Sources" tab at the top of the page.
1. Click the **Add New Feed Source** button. {% image src='/img/pages/features/deep-linked-feeds/add-new-feed-source.png' full center alt='Add New Feed Source' %}
1. Name your Feed Source. You can supply a URL (recommended) or upload a file. {% image src='/img/pages/features/deep-linked-feeds/name-and-upload-feed-source.png' 3-quarters center alt='Add New Feed Source' %}

You can see all of the **Feed Sources** you've uploaded by going to the [Feed Sources](http://dashboard.branch.io/ads/feedsources){:target="_blank"} tab.

## Create a New Deep Linked Feed

1. Click the **Add Deep Linked Feed** button from either tab. {% image src='/img/pages/features/deep-linked-feeds/add-deep-linked-feed.png' full center alt='Add Deep Linked Feed' %}

## Deep Linked Feed Creation Flow

1. In "Deep Linked Feed Information" you'll name your Deep Linked Feed for reference, and specify which Feed Source you'd like to turn into a Deep Linked Feed. You'll also input the Ad Platform on which you'd like to run your campaigns. This information will be used to modify the feed and insert well-structured Branch attribution data into the links.
{% image src='/img/pages/features/deep-linked-feeds/dlf-step-1.png' half center alt='Deep Linked Feed Creation Step 1' %}
1. In "Create Deep Links" you'll be presented with two optional elements. The first is a list of column names from your feed source. To add deep link data to each link, select the column that contains the relevant data.
{% example %}Let's say you have a column in your product feed titled `id`. That column contains the product id for each piece of content in your Feed Source file, and your app needs that id to deep link correctly. To create deep links with that id for each product, select the column by checking the box on the left hand side. If you'd like to change the name of the key (for example, from `id` to `product_id`) you can write the new name for the key in the text box on the right hand side. This will add the correct `product_id` to each link for every single product in your feed (e.g. the first item will have `"product_id":1392`, the second item will have `"product_id":5284`)!{% endexample %}
{% image src='/img/pages/features/deep-linked-feeds/customize-columns.png' 3-quarters center alt='Customize Feed Columns' %}

## Getting your Deep Linked Feed

Finally, in "Get Deep Linked Feed" you can choose to get a URL that will host your Deep Linked Feed or download a file with your Deep Linked Feed.

Once you get to the final step, you will see "Your links are being created..." Feel free to navigate away if you have a large feed source. Once this process has completed, you will receive a dashboard notification and an email with a link to your finished Deep Linked Feed.

{% image src='/img/pages/features/deep-linked-feeds/generating-dlf.png' 3-quarters center alt='Generating CSV' %}

{% image src='/img/pages/features/deep-linked-feeds/getting-dlf.png' 3-quarters center alt='Getting your CSV' %}

### Schedule refresh

If you used a Feed Source hosted on a URL (recommended), you will see two options for accessing your feed. We recommend selecting "Schedule Refresh." If you select this option, Branch will host a URL for your Deep Linked Feed that will update itself from your Feed Source URL at regular intervals. You can then provide the Deep Linked Feed URL to your partners, and Branch will keep the content up to date.

{% image src='/img/pages/features/deep-linked-feeds/hosted-dlf.png' 3-quarters center alt='Hosted Deep Linked Feeds' %}

You can see all of the **Deep Linked Feeds** you've created by going to the [Deep Linked Feeds](http://dashboard.branch.io/ads/deeplinkedfeeds){:target="_blank"} tab.

### Download CSV

Click "Download CSV" if you just need a one-time file with your Deep Linked Feed.

You can see all of the **Deep Linked Feeds** you've created by going to the [Deep Linked Feeds](http://dashboard.branch.io/ads/deeplinkedfeeds){:target="_blank"} tab.

## Using your Deep Linked Feed

After you've downloaded your feed, it's time to use it!

{% protip title="Facebook Dynamic Ads"%}
Launch a [Facebook Dynamic Ad Campaign](/features/facebook-dynamic-ads/guide/){:target="_blank"} to drive engagement or installs with your Deep Linked Feed!
{% endprotip %}

{% protip title="Ad Network Integrations"%}
Branch Deep Linked Feeds are accepted by top remarketing companies like [Criteo](/features/criteo-dynamic-ads/guide/){:target="_blank"}, Remerge and AppNexus. Ask your Account Manager about launching your campaign with Branch deep links.
{% endprotip %}

{% protip title="Drive Installs With Your Content"%}
Use [Content Analytics](https://dashboard.branch.io/analytics/content){:target="_blank"} to see which products are driving results, then use Deep Linked Feeds to create the links you need at scale with every type of ad.
{% endprotip %}


## Understanding Ad Performance

Your Deep Linked Feed provides a bevy of important insights for you to optimize your campaigns and your content.

Deep Linked Feed Field | Branch Analytics Tag
--- | ---
Feature | Paid Ads
Campaign | Campaign
Ad Platform | Channel
Ad Type | Tag

- Visit [Content Analytics](https://dashboard.branch.io/analytics/content){:target="_blank"} to see which products are driving clicks, opens, installs and conversions
- Check out [Source Analytics](https://dashboard.branch.io/analytics/source){:target="_blank"} to simply understand which Ad Channels are most impactful for you.
- Set up a [Data Integration](https://branch.io/data-integrations){:target="_blank"} to send your Dynamic Ads data to another attribution or analytics dashboard.

{% elsif page.advanced %}

## Adding additional link data in your Feed Source

You can add additional data to each link by adding a column to your Feed Source called `branch_query_params`. This column accepts parameters in the web query parameter format `key1=value1&key2=value2`.

## Advanced segmentation with Data Integrations

The attribution Data Integrations (Tune, Kochava, AppsFlyer, Localytics and Adjust) support additional network segmentation with additional measurement parameters that can be appended to HTTP deep links.

To get started, please visit the *Advanced* documentation for your Data Integration for instructions on how to generate and construct the correct query parameters for your campaign and ad network.

This field accepts parameters in the web query parameter format `key1=value1&key2=value2` so do not include `?` at the beginning of the entry.

Once you've created the right parameters, add them in the `Advanced: Add Measurement Parameters` text field in Step 2. Your parameters will be added to every HTTP Branch link in the `link` column.

{% image src='/img/pages/features/deep-linked-feeds/add-measurement-parameters.png' full center alt='Add Measurement Parameters' %}

## How does Branch create a Deep Linked Feed?

When we create a Deep Linked Feed, we take your Feed Source, your Link Settings, and any input you provide to generate a working feed.

We look for the presence of the following columns, and for each one we either modify the existing column, or add a new one with the relevant information:
- link (by default, we use a Branch link with a web fallback)
- ios_url
- ios_app_name
- ios_app_store_id
- android_url
- android_app_name
- android_package

{% elsif page.support %}

## Links don't open the app

- First, understand what the [intended behavior](/getting-started/link-behavior/guide/){:target="_blank"} of your link should be.
- Links created by the Deep Linked Feeds tool currently fall back to the Web URL you originally specified in the `link` column by default. You can override this behavior by including a column called `branch_query_params` and including `$fallback_method=app_wide` as the value for every row. This will make each link fall back to the platform fallback you have specified in your [Link Settings](https://dashboard.branch.io/settings/link){:target="_blank"}, which is usually the App Store.
- Facebook requires certain ["applink treatment"](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/mobile-app-events#deeplinksetup){:target="_blank"} values to be present to change fallback behavior. We're working on adding these to our interface, but for the moment, include them in your feed source.

## Deep links aren't working

- Ensure you've included your deep link data. Branch will scrape any [Hosted Deep Link Data](/getting-started/hosted-deep-link-data/guide/){:target="_blank"} corresponding to the Web URL in your Feed Source's `link` column for every link. Alternatively, you can include deep link data as a column in your Feed Source and then select the relevant data in Step 2 of Deep Linked creation.
- To see which data is getting through to your app, click the link and then view the link click in [Live View](https://dashboard.branch.io/liveview/link_clicks){:target="_blank"} to see the data going through to your app.
-  If you don't know what deep link data you need to include, ask a technical teammate to show you which data is included in a working Branch link.

## Feed Source won't upload

- Branch accepts Feed Sources that are compatible with Facebook’s [feed format](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog){:target="_blank"}. Please use [Facebook’s Product Feed Debug Tool](https://business.facebook.com/ads/product_feed/debug){:target="_blank"} to test and debug your Product Feed format.
- Please ensure you have a column titled `link` in your Feed Source
- The largest file size accepted by the tool is 50MB. Please contact [integrations@branch.io](mailto:integrations@branch.io) if you need to upload a larger file.

## Reporting issues
- For Facebook data discrepancies, please see our [Facebook Advertising troubleshooting documentation](/features/facebook-ads/support/){:target="_blank"}.

If you run into any issues, or have questions, please contact [integrations@branch.io](mailto:integrations@branch.io).

{% endif %}
