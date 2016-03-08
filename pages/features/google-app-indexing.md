---
type: recipe
directory: features
title: "Google App Indexing"
page_title: "Index and track your content with Google's App Indexing"
description: Learn how to list your content in Google's App Index.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, iOS9, iOS 9, Apple Spotlight Search
platforms:
- ios
- android
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

Google is investing significant resources into a project called App Indexing, where they will try to expose ‘app results’ in Google searches performed on mobile devices.

{% image src="/img/pages/features/google-app-indexing/allthecooks-app-indexing.png" 2-thirds center alt="App indexing example" %}

When you perform a search on Google, your results are drawn from content that Google scrapes from website pages. If the pages being scraped are properly configured for App Indexing, and that app is currently installed on the device performing the search, Google will open the app directly instead of going to the web page. Fortunately Branch has a database of all of your deep links, so we can easily help you take advantage of App Indexing.

We're working with Google to ensure that we can properly transfer all of your links directly into their index. We automatically upload a deduped list of your links in a sitemap. Google then scrapes these sitemaps.

{% getstarted title="Get started with Google App Indexing" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- For this to function as intended, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- We also recommend you enable either [Deepviews]({{base.url}}/features/deepviews) **OR** [Website-To-App Routing]({{base.url}}/features/website-to-app-routing), but this is not strictly required.

{% endprerequisite %}

## How to list content in Google through Branch

If you have completed the prerequisites, you've done the hard part! Now you should go enable automatic sitemap generation on the [Settings](https://dashboard.branch.io/#/settings) page of the Branch Dashboard. Look for the option `Automatic sitemap generation (for Google App Indexing)`.

{% image src="/img/pages/features/google-app-indexing/db-settings.png" 2-thirds center alt="Settings page" %}

Once you enable this, your app will be included in our nightly job to automatically generate sitemaps. These sitemaps can be scraped by Google, and all of the included links can then be indexed.

## When does Google scrape?

After you've given us permission to create sitemap, how can you know that Google has even seen your content? We've created a graph, which is currently located at the bottom of the Dashboard's [Summary](https://dashboard.branch.io/#) page. This graph lists four pieces of information:

1. The date the sitemap files were last generated (and included at least one of your links)
2. The total number of links to unique pieces content that Branch has included in sitemaps
3. The date Google last scraped your links
4. The total number of times that Google has scraped links to your content

Both the sitemap itself and statistics about Google scraping your links are updated via nightly map-reduce jobs.

{% image src="/img/pages/features/google-app-indexing/db-summary.png" 2-thirds center alt="Summary page" %}

{% elsif page.advanced %}

## What Branch does for you

A lot of what Branch does with App Indexing is behind the scenes and there's no direct feedback, so we want to make it clear how we help. Our goal is simple and twofold:

1. Flag your existing website for App Indexing so you don't have to (if you use [Website-To-App Routing]({{base.url}}/features/website-to-app-routing)) **OR** be the website for your content if you don't have one (by using [Deepviews]({{base.url}}/features/deepviews)).
1. Improve your website's SEO so that your content is ranked higher.
1. (Optionally) List your app's content in automatically generated sitemap files so that it can be easily scraped by Google.

### Content and metadata

#### If you let Branch host your metadata

When Google scrapes a Branch link, in most situations we can automatically insert the appropriate App Indexing headers so they know this link should be flagged as an app result.

{% highlight html %}
<html>
<head>
  ...
  <link rel="alternate" href="android-app://<com.yourapp>/<your_uri_scheme>/open?link_click_id=link-123456" />
  <link rel="alternate" href="ios-app://<your_app_id>/<your_uri_scheme>/open?link_click_id=link-123456" />
  ...
</head>
<body> … </body>
{% endhighlight %}

If you defined the `canonicalUrl` parameter when creating your `BranchUniversalObject`, we use that. If `canonicalUrl` is blank, we create a unique one for you.

{% highlight html %}
<html>
<head>
  ...
  <link rel="canonical" href="http://yourapp.com/article/feburary/2014/123512" />
  ...
</head>
<body> … </body>
{% endhighlight %}

#### If you want to host your own metadata for your links

In the less common situation that you choose to host your own link meta data (for example, by specifying the `$og_redirect` link parameter) we'll gently set 301 redirects to the URL that you've configured as the fallback.


## Attribute app traffic to organic search

Curious as to how well your content is performing -- how many clicks and installs it is driving?

We automatically tag clicks on these links as coming from Google App Indexing. In the Click Flow section of our Dashboard's [Summary](http://dashboard.dev2.branch.io/#) page, you can filter for these clicks. Just select either `channel: google_search` or `feature: google_app_index`.

## Listing content as private

Not all content is public, and not all content should be publicly indexed. If you want to enable Branch's automatic sitemap generation but exclude certain pieces of content, you can mark that content as private. You should set the content indexing mode for the individual Branch Universal Object.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.contentIndexMode = ContentIndexModePrivate;
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.contentIndexMode = ContentIndexModePrivate
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE)
{% endhighlight %}

{% endif %}


{% endif %}