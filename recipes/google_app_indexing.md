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
- support
---

Google has been investing signficant resources into a project called App Indexing, where they will try to expose an 'app result' in Google Search. As the documentation is rather poor and ambiguous, and since we have a database of all of your deep links, we see this as a great opportunity to help you take advantage of App Indexing. This document serves as education and instruction on how to configure your Branch integration for success.

### What is Google App Indexing?

Google search is giant database of links that Google had indexed. When you type in a query, it looks for the most relevant link by the content that's been scraped off of the page. When that link is properly configured for App Indexing and the app is currently installed, Google will mark that link as an app result. It's that simple.

So, in order to benefit from App Indexing, you must have a website and it must be ranked in Google.

### What Branch does for you

A lot of what Branch does with App Indexing is behind the scenes and there's no direct feedback, so we want to make it clear how we help. Our goal is simple and twofold:

- Flag your existing website for App Indexing so you don't have to *or* be the website for your content if you don't have one.
- Improve your website's SEO so that your content is ranked higher.

**1. All Branch links are configured for optimal SEO and App Indexing**

If you let us host your content and metadata (and especially if you use [Deepviews](https://dev.branch.io/recipes/deepviews/)), we configure Branch links to:

1) Automatically insert the appropriate App Indexing headers.

When Google scrapes the Branch link, we return the properly configured app indexed header so they know this link should be flagged as an app result.

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

2) We'll use your canonical URL (see "canonical identifier" below) if you have one or create a unique one for you if you don't.

{% highlight html %}
<html>
<head>
  ...
  <link rel="canonical" href="http://yourapp.com/article/feburary/2014/123512" />
  ...
</head>
<body> … </body>
{% endhighlight %}

Lastly, if you don't want us to host the metadata for your links, we'll gently 301 to the URL that you've configured as the fallback.

**2. We create a sitemap of content [coming soon]**

We're working with Google to ensure that we can properly transfer all of your links directly into their index. By the end of 2015, we'll be automatically uploading the list of links via a sitemap to Google on your behalf. Below is an example of the format we'll be using.

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

**3. Attribute app traffic to organic search [coming soon]**

We're working on a dashboard table to give you a complete summary of where your traffic is coming from. We plan to report how much traffic (new and existing) comes from Google search so that you have metrics to leverage for SEO.

More instructions will follow here but no SDK update will be required.

-----

## How to list content in Google through Branch

It's very simple to list all of your content on Google. If you've gone through the [quickstart guide](https://dev.branch.io/recipes/quickstart_guide/) and [setup content sharing](https://dev.branch.io/recipes/content_sharing/), you're already good to go! If not, here's a quick summary.

### Step 1: Define the Content Object

`BranchUniversalObject` represents a single piece of content within your app, as well as any associated metadata. It provides convenient methods for sharing, deeplinking, and tracking how often that content is viewed. This is our primary mechanism to list your content on Google.

{% if page.android %}
{% highlight java %}
import io.branch.indexing.BranchUniversalObject;
{% endhighlight %}
{% endif %}
{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
#import "BranchUniversalObject.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
#import <Branch/Branch.h>
#import <Branch/BranchUniversalObject.h>
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

Below are the properties of `BranchUniversalObject`.

| Property | Required | Description
| --- | --- | ---
| canonical identifier | true | Canonical identifier for the content referred. Normally the canonical URL for your content in the application or web.
| title | true | Title for the content referred by `BranchUniversalObject`
| description | false | Description for the content referred by `BranchUniversalObject`
| image url | false | An image url associated with the content referred
| metadata | false | Any other metadata you would like to associate with the content. Especially useful for passing information to another user when deeplinking.
| type | false | mime type associated with the content referred
| index mode | false | Determines whether to index the data publically
| keywords | false | A collection of keywords associated with the content. Used for indexing.
| expiration | false | Expiry time for the content and any associated links

[1] Note that at the very least a `Canonical Identifier` or `Title` is **required** for creating a `BranchUniversalObject`. This will be used to uniquely identify content. Best practice would be to include both.

{% if page.android %}
{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                .addContentMetadata("property1", "blue")
                .addContentMetadata("property2", "red");
{% endhighlight %}
{% endif %}

{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
#import <Branch/Branch.h>
#import <Branch/BranchUniversalObject.h>
#import <Branch/BranchLinkProperties.h>
{% endhighlight %}
{% endtab %}
{% endtabs %}

First create the object that you'd like to link to:

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"
branchUniversalObject.addMetadataKey("property1", value: "blue")
branchUniversalObject.addMetadataKey("property2", value: "red")
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

### Step 2: Track Views

`BranchUniversalObject` provides easy way to track when a user views a piece of a content. It's important to track views so that we know how to determine which piece of content is more popular than others for ranking and relevancy.

{% if page.android %}
{% highlight java %}
branchUniversalObject.registerView();
{% endhighlight %}
{% endif %}
{% if page.ios %}
{% highlight objective-c %}
[branchUniversalObject registerView];
{% endhighlight %}
{% endif %}

### Optional: Create/share deep links

Once you've defined a Branch Universal Object, it's easy to get a deep link to it. We recommend that you power sharing with Branch links to help track and drive virality. Additionally, the more Branch links you have in the wild, the more back links you have that can potentially improve SEO.

You can see more about how to [setup content sharing here.](https://dev.branch.io/recipes/content_sharing/)

-----

## Conclusion

What's next?

{% ingredient recipe_preview/content_sharing %}{% endingredient %}
{% ingredient recipe_preview/web_to_app %}{% endingredient %}
{% ingredient recipe_preview/deepviews %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}