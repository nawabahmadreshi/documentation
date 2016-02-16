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

### [Get started with App Indexing!]({{base.url}}/features/google-app-indexing/guide)

{% elsif page.guide %}

{% prerequisite %}

- For this to function as intended, you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- You also need to enable either [Deepviews]({{base.url}}/features/deepviews) **OR** [Website-To-App Routing]({{base.url}}/features/website-to-app-routing)

{% endprerequisite %}

## How to list content in Google through Branch

If you have completed the prerequisites, you're already good to go! Everything needed for App Indexing is configured and running in the background, so you just need to get as many Branch links as possible out into the wild.

{% elsif page.advanced %}

## What Branch does for you

A lot of what Branch does with App Indexing is behind the scenes and there's no direct feedback, so we want to make it clear how we help. Our goal is simple and twofold:

1. Flag your existing website for App Indexing so you don't have to (if you use [Website-To-App Routing]({{base.url}}/features/website-to-app-routing)) **OR** be the website for your content if you don't have one (by using [Deepviews]({{base.url}}/features/deepviews)).
1. Improve your website's SEO so that your content is ranked higher.

### Content and metadata

#### If you let Branch host your metadata

When Google scrapes a Branch link, in most situations we can automatically insert the appropriate App Indexing headers so they know this link should be flagged as an app result.

{% highlight html %}
<html>
<head>
  ...
  <---
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

## We create a sitemap of your app content

{% protip title="Coming soon..." %}
This feature should be available in early 2016. More information will follow, but no SDK update will be required.
{% endprotip %}

We're working with Google to ensure that we can properly transfer all of your links directly into their index. We'll automatically upload the list of links via a sitemap to Google on your behalf. Below is an example of the format we'll be using.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
  <loc>http://yourapp.com/example</loc>
  <xhtml:link rel="alternate" href="android-app://<com.yourapp>/<your_uri_scheme>/open?link_click_id=link-123456" />
  <xhtml:link rel="alternate" href="ios-app://<your_app_id>/<your_uri_scheme>/open?link_click_id=link-123456" />
...
</urlset>
{% endhighlight %}

## Attribute app traffic to organic search

{% protip title="Coming soon..." %}
This feature should be available in early 2016. More information will follow, but no SDK update will be required.
{% endprotip %}

We're working on a Branch dashboard table to give you a complete summary of where your traffic is coming from. We plan to report how much traffic (new and existing) comes from Google search so that you have metrics to leverage for SEO.

{% endif %}