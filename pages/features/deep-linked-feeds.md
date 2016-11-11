---
type: recipe
directory: features
title: Deep Linked Feeds for Dynamic Ads
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
---

{% if page.overview %}

{% protip title="Deep Linked Feeds for Dynamic Ads is a premium product"%}
The product is free to use for a 14 day trial period. To learn more, please contact your Branch account manager or [w@branch.io](mailto:w@branch.io)
{% endprotip %}

Branch is your preferred linking infrastructure for mobile. With Deep Linked Feeds for Dynamic Ads, advertisers can easily create mobile-optimized links at scale for dynamic ad campaigns. By taking users to the most relevant content on the most relevant platform (web or app) advertisers can maximize revenue and engagement opportunities on mobile.

Take advantage of our visual UI for uploading and managing feeds, or set up a more automated integration between you, Branch and your ad network of choice.

{% protip title="Deep Linked Feeds is in private alpha" %}
For access to the Deep Linked Feeds alpha please contact your Branch account manager or [w@branch.io](mailto:w@branch.io).
{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To use Deep Linked Feeds you must [have the Branch SDK in your app](../getting-started/sdk-integration-guide/guide/).
- Branch accepts feed sources that are compatible with Facebook's format. If you're not sure about the compatibility of your feed, please use [Facebook's Product Feed Debug Tool](https://business.facebook.com/ads/product_feed/debug) to test and debug it.
{% endprerequisite %}

{::comment}
## Upload a Feed Source

To create a deep linked feed, you'll upload a raw data or product feed. This is called a **Feed Source**. 

When you need to create a **Deep Linked Feed** you'll go through a Deep Linked Feed creation flow that will ask you to select a Feed Source and how you'd like to modify it. 

Go directly to [Deep Linked Feeds](http://dashboard.branch.io/ads) in the Branch dashboard to get started.

1. Click on the "Feed Sources" tab at the top of the page.
1. Click the **Add New Feed Source** button to get started. {% image src='/img/pages/features/deep-linked-feeds/add-new-feed-source.png' full center alt='Add New Feed Source' %}
1. Name your Feed Source and upload it.

You can see all of the **Feed Sources** you've uploaded by going to the [Feed Sources](http://dashboard.branch.io/ads/feedsources) tab.
{:/comment}

## Create a New Deep Linked Feed

To create a deep linked feed, you'll upload a raw data or product feed. This file is called a **Feed Source** in the interface.

When you want to create a **Deep Linked Feed** you'll go through a Deep Linked Feed creation flow that will ask you to select a Feed Source, and help you modify it. 

Go directly to [Deep Linked Feeds](http://dashboard.branch.io/ads) in the Branch dashboard to get started.

1. Click on the "Deep Linked Feeds" tab at the top of the page.
1. Click the **Add Deep Linked Feed** button. {% image src='/img/pages/features/deep-linked-feeds/add-deep-linked-feed.png' full center alt='Add Deep Linked Feed' %}

## Deep Linked Feed Creation Flow

1. If you need to upload a Feed Source, click the "Add New Feed Source" button. Upload the file you'd like turn into a Deep Linked Feed.
{% image src='/img/pages/features/deep-linked-feeds/add-new-feed-source-button-campaign-creation.png' half center alt='Add New Feed Source' %}
1. In "Deep Linked Feed Information" you'll name your Deep Linked Feed for reference, and specify which Feed Source you'd like to turn into a Deep Linked Feed. You'll also input the Ad Platform on which you'd like to run your campaigns. This information will be used to modify the feed and insert well-structured Branch attribution data into the links.
{% image src='/img/pages/features/deep-linked-feeds/dlf-step-1.png' half center alt='Deep Linked Feed Creation Step 1' %}
1. In "Create Deep Links" you'll be presented with two optional elements. The first is a list of column names from your feed source. To add deep link data to each link, select the column that contains the relevant data. 
  {% example %}
  Maybe you have a column in your product feed titled `id`. Let's say that column contains the product id for each piece of content, and that your app needs that id to deep link correctly. To create deep links with that id for each product, select the column by checking the box on the left hand side. If you'd like to change the name of the key (for example, from `id` to `product_id`) you can write the new name for the key in the text box on the right hand side. This will add the correct `product_id` to each link for every single product in your feed (e.g. the first item will have `"product_id":1392`, the second item will have `"product_id":5284`)!
  {% endexample %}
  {% image src='/img/pages/features/deep-linked-feeds/customize-columns.png' 3-quarters center alt='Customize Feed Columns' %}
1. "Validate and Test" will not be available in the Alpha version, but will include helpful steps for checking your feed and previewing its contents. Click "Save and Continue" to proceed.
1. In "Get Deep Linked Feed" you can download your feed! Once you get to the final step, you will see "Generating CSV..." Wait for this to finish, then click "Download CSV" when the button text changes.

{% image src='/img/pages/features/deep-linked-feeds/generating-csv.png' half center alt='Add New Deep Linked Feed' %}

{% image src='/img/pages/features/deep-linked-feeds/download-csv.png' 3-quarters center alt='Add New Deep Linked Feed' %}

You can see all of the **Deep Linked Feeds** you've uploaded by going to the [Deep Linked Feeds](http://dashboard.branch.io/ads/deeplinkedfeeds) tab.

{% elsif page.advanced %}

## Known issues

- Alpha release: 11/10
- Alpha 2 release: 11/16
- Beta release: 11/21
- GA release: 11/30

Issue description | Release slated for
--- | ---
"Back" button does not work | Alpha 2
Adding a new Feed Source from Deep Linked Feed Creation wipes data from Step 1 | Alpha 2
User can navigate back through tabs even though they shouldn't be able to | Alpha 2
Empty tables | Alpha 2
No billing modal/billing bar doesn't do anything | Beta
User messaging if something goes wrong | Beta
Can't delete feed sources or feeds | Beta
Empty validation screens | GA

{% elsif page.support %}

## Reporting issues
If you run into any issues, or have questions, please contact [w@branch.io](mailto:w@branch.io).

{% endif %}