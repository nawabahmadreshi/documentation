---
type: recipe
directory: basic-setup
title: 4. Web SDK Integration
page_title: Add the Branch SDK to your mobile web site
description: This page will tell you how to quickly add the Branch SDK to your mobile web site
hide_platform_selector: true
hide_section_selector: true
---
**Estimated Time to Complete**

30 Minutes - 1 Hour

**Required Personnel**

Web Developer

**Requires An App Update**

No

##Introduction

### Why do I need the Web SDK?

First and foremost, the Web SDK gives you the ability to complete your ability to track what your users do after they’ve clicked on your links. You can easily track the actions your users take on your website and combine that with Branch’s in-app event tracking to build a robust cross-platform understanding of your users’ behavior and the success of your marketing efforts, a feature unique to Branch!

Second and perhaps even more important is that the Web SDK helps convert your web traffic into high-value app users by acting as the backbone of our Journeys Web-to-App Conversion product.

### I don’t have a mobile website

You can use our [Deepviews]({{base.url}}/features/deepviews/overview) product as a way to catch your users who click on your Branch links when they don’t have the app, rather than taking them directly to the app store. In our tests, we’ve seen that adding this extra step actually _increases_ the click-to-install conversion rate __2x-6x__. Check out our [Blog Post](https://blog.branch.io/branch-deepviews-the-missing-link-in-app-discovery) for more information on Deepviews.

If you don’t have a mobile website, you can skip straight to Testing.

### How do I get started?
Add the following lines of JavaScript to the <head> block of any page where you want the Branch SDK:

{% highlight html %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

More information about this SDK can be found in the [Github README](https://github.com/BranchMetrics/web-branch-deep-linking).

### Where should I include the Branch SDK?

Insert those lines of code on any page where you to want to:

- Track a page view
- Track that a user has come there from a Branch link
- Generate a Branch link for the content on that page
- Display a Journey to convert your web traffic to app users

We'll go into more details about how to implement each of these features later.

## Hosted Deep Link Data

Hosted Deep Link Data is a way to embed link data on a web page. What does this mean?

Let’s say that you want to create a Branch link to a pair of shoes. You’re using the key “productId” to tell your app which page to display, and you want to redirect the user to the mobile web page for the shoes if they don’t have the app installed.

If you follow the link creation standards, you have to define a bunch of things on the link:

- Open Graph Title
- Open Graph Description
- Open Graph Image
- Product ID
- Fallback URL

Here’s what that looks like:

{% tabs %}
{% tab android %}
{% highlight java %}
BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
    .setTitle("Cool shoes")
    .setContentDescription("Some really awesome shoes!")
    .setContentImageUrl("https://image.hosting.com/abcd.jpg")
    .addContentMetadata("productId", "abcd")
    .addContentMetadata("$fallback_url", "https://my.domain.com/products/abcd.html");
{% endhighlight %}
{% endtab %}
{% tab ios %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject()
branchUniversalObject.title = "Cool shoes"
branchUniversalObject.contentDescription = "Some really awesome shoes!"
branchUniversalObject.imageUrl = "https://image.hosting.com/abcd.jpg"
branchUniversalObject.addMetadataKey("productId", value: "abcd")
branchUniversalObject.addMetadataKey("$fallback_url", value: "https://my.domain.com/products/abcd.html")
{% endhighlight %}
{% endtab %}
{% tab web %}
{% highlight javascript %}
branch.link({
    data: {
        '$og_title': 'Cool shoes',
        '$og_description': 'Some really awesome shoes!',
        '$og_image_url': 'https://image.hosting.com/abcd.jpg',
        'productId': 'abcd',
        '$fallback_url': 'https://my.domain.com/products/abcd.html'
    }
}, function(err, link) {
    console.log(err, link);
});
{% endhighlight %}
{% endtab %}
{% endtabs %}

That’s a fair amount of information that you’ll have to set when creating a link. And if you want to add or remove anything, you’ll need to release an app update to accommodate. So where does Hosted Deep Link Data fit into this?

Let’s assume that the web URL for this pair of shoes is `https://my.domain.com/products/abcd.html`. On that page, you’ve defined a few html tags:

{% highlight html %}
<!-- This is standard Open Graph information that you probably already have -->
<meta property="og:title" content="Cool shoes"/>
<meta property="og:description" content="Some really awesome shoes!"/>
<meta property="og:image" content="https://image.hosting.com/abcd.jpg"/>

<!-- This is Branch’s Hosted Deep Link Data -->
<meta name="branch:deeplink:productId" content="abcd"/>
{% endhighlight %}

With these tags on your page, this is what the link creation from the SDK looks like now:

{% tabs %}
{% tab android %}
{% highlight java %}
BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
    .addContentMetadata("$canonical_url", "https://my.domain.com/products/abcd.html")
    .addContentMetadata("$fallback_url", "https://my.domain.com/products/abcd.html");
{% endhighlight %}
{% endtab %}
{% tab ios %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject()
branchUniversalObject.addMetadataKey("$canonical_url", value: "https://my.domain.com/products/abcd.html")
branchUniversalObject.addMetadataKey("$fallback_url", value: "https://my.domain.com/products/abcd.html")
{% endhighlight %}
{% endtab %}
{% tab web %}
{% highlight javascript %}
branch.link({
    data: {
        '$canonical_url': 'https://my.domain.com/products/abcd.html',
        '$fallback_url': 'https://my.domain.com/products/abcd.html'
    }
}, function(err, link) {
    console.log(err, link);
});
{% endhighlight %}
{% endtab %}
{% endtabs %}

That certainly simplifies things a bit! Aside from allowing you to write less code, using tags in this manner will also work with all of Branch’s product offerings. Whether you create a link on the dashboard using a base URL, set up your emails to be Branch-ified, create a Journey to dynamically route to the content being displayed on the current, or generate links from one of the SDKs, this Hosted Deep Link Data will be utilized.

{% caution title="Do not use Google Tag Manager"%}
Do not user Google Tag Manager (GTM) to insert your content metatags. GTM requires Javascript to load on the page, and the Branch link data scraper does not support Javascript execution at this time.
{% endcaution %}

### What about Facebook App Link tags?

The same mechanism that we use to grab Hosted Deep Link Data and Open Graph tags from a web page also grabs Facebook App Link tags as well! If you’re using `$deeplink_path` in your routing logic, and you’ve got App Link tags, you’re pretty much set. Here’s how they map:

| App Link Tag | Branch Key |
| :--- | :--- |
| al:ios:url | $ios_deeplink_path |
| al:android:url | $android_deeplink_path |

If both of these values are present and are the same, we will also set `$deeplink_path` automatically.

_Example:_

{% highlight html %}
<meta property=”al:ios:url” content=”my-app://path/to/content”/>
<meta property=”al:android:url” content=”my-app://path/to/content”/>
{% endhighlight %}

_translates to:_

{% highlight javascript %}
{
    '$ios_deeplink_path': 'path/to/content',
    '$android_deeplink_path': 'path/to/content',
    '$deeplink_path': 'path/to/content'
}
{% endhighlight %}

<h3 style="margin-top:0;"><a href="{{base.url}}/basic-setup/testing" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;">Next: &nbsp; <br class="visible-md"><strong>Test Your Setup</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>