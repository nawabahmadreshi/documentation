---
type: recipe
directory: basic-setup
title: 1. Before Getting Started
page_title: Before getting started with Branch.
description: Before getting started with Branch you'll need to determine a few things. This page will help guide the discussions necessary to make these decisions.
hide_platform_selector: true
hide_section_selector: true
---
## Some Background

Traditional linking on the web and deep linking within apps is done with a URI. This URI is divided up into different components which define different things.

**Web URL**

| Component | Example | Description
| :--- | --- | ---
| Protocol | http:// | Determines how the connection is to be made. (e.g. <u>h</u>yper<u>t</u>ext <u>t</u>ransfer <u>p</u>rotocol)
| Domain | www.mydomain.com | Identifies the web site that will receive the request
| Path | path/to/content | The structured path to a given piece of content within the web site

**Deep Link URI**

| Component | Example | Description
| :--- | --- | ---
| Scheme | my-app:// | Used by the OS to determine which app will handle this URI.
| Path | path/to/content | The structured path to a given piece of content within the app.

The domain (for web URLs) and the URI scheme (for app deep links) define which web site or app will ultimately handle the request. The path is then examined by the site/app to determine where the user wants to go.

Because Branch links act as both web links and deep links across every platform everywhere, this paradigm is changed a bit. This is an example of a Branch link:

~~~~
https://branch.app.link/lQwUZf3ab2
~~~~

Notice how the path doesn't actually tell you much? Rather than storing all of the information about the link on the path we store it on our servers, and we deliver the **link data** as a dictionary of key-value pairs to our SDKs. The path on a Branch link identifies which link data gets delivered. Here is an example of some Branch link data.

{% highlight js %}
{
    '~campaign': 'foo',
    '~channel': 'facebook',
    '~feature': 'share',
    'data': {
        '$ios_url': 'https://www.mydomain.com/path/to/content',
        '$android_url': 'https://www.mydomain.com/path/to/content',
        '$desktop_url': 'https://www.mydomain.com/get-the-app',
        '$og_image_url': 'https://cdn.mydomain.com/image123.jpg',
        '$og_title': 'Amazing Content',
        '$og_description': 'You won’t believe this thing!',
        'productId': '1234'
    }
}
{% endhighlight %}

Branch reserves a number of these keys for analytics purposes (i.e. channel, campaign), other keys for Open Graph (or 'og') information, and further keys for fallback logic in the event the user does not have the app installed. We also store some information that we don’t expose in the data dictionary about how and when the link was created as well as who created it (for referral purposes). You can read more about all of the ways you can configure Branch links here.

Aside from that, we give you the flexibility to pack as much data into these links as you want. The most important thing to consider is how you want to use this link data to route your users to your in-app content once they’re in the app. We want to define this as early in the setup process as possible.

## Why Do I Need to Define Routing Logic Now?

Think of your routing logic as a contract between the app, which will handle the incoming link data, and the link creators, who are responsible for getting the proper data into the links. Links can be created on the dashboard, by the app SDKs, by the Web SDK, and a handful of other ways. If any party creating a link using these methods does not understand what link data needs to be present to route users within the app, your links will not function as intended.

Additionally, much of the setup process outlined in this documentation will likely be performed by different parties, so establishing this contract now will help avoid any conflicts as you proceed.

## Leveraging Existing Logic

You may want to tailor your routing logic to take advantage of some features that you already have set up. This is generally considered good practice, but there are some changes that will need to be made due to the way that Branch links deliver link data versus traditional methods.

If you are currently leveraging **Universal Links** or traditional **Deep Links** within your app, you probably already have some mechanism to route based on the path of a URI.

~~~~
https://www.mydomain.com/path/to/content

my-app://path/to/content
~~~~

As we showed earlier, the path that you want to route on no longer lives on the URL/URI of the Branch link, so we’ve come up with a suggested methods for packing this information into the link data. Which one you use depends on what you’re currently leveraging.

### I have a mobile website, but am not otherwise deep linking

If you have a mobile website, you’ve already spent a good deal of time thinking about how to structure your content in a web-friendly (i.e. path-friendly) format. There is likely also some additional information about your content on your website that you’d like to be able to leverage automatically.

You may also have Universal Links enabled on your website, which means that your web URLs map (to some extent) to your in-app content. That makes things easy to leverage here, but even if you don’t have Universal Links set up, we can still move along this path.

**Suggested:**

Set `$canonical_url` to be the URL of the content on the web.

**Example:**

*URL:*

`https://www.mydomain/com/path/to/content`

*Link Data:*
{% highlight js %} {
    '~campaign': 'foo',
    '~channel': 'facebook',
    '~feature': 'share',
    'data': {
        '$canonical_url': 'https://www.mydomain.com/path/to/content', // <<<---
        '$og_image_url': 'https://cdn.mydomain.com/image123.jpg',
        '$og_title': 'Amazing Content',
        '$og_description': 'You won’t believe this thing!'
    }
} {% endhighlight %}

**Considerations:**

While you could pack the URL in the link data using any key you choose, using the Branch-defined **$canonical_url** key will make your life easier as you implement [Deep Linked Email]({{base.url}}/third-party-integrations), [Journeys]({{base.url}}/features/journeys/overview), and other advanced products down the line, since we’ll automatically set this for you in most cases.

### I'm already doing deep linking within my app

You may already have deep linking set up for your engagement emails or push notifications. If so, you’ve already put time and effort into structuring your paths so that you can link to content. Branch can play well with this, but remember that traditional deep links don’t work if the app is not installed, and Branch links work everywhere, so there is some additional work that has to be factored in.

**Suggested:**

Set `$deeplink_path` to the path of the deep link.

**Example:**

*Deep Link:*

`my-app://path/to/content`

*Link Data:*
{% highlight js %} {
    '~campaign': 'foo',
    '~channel': 'facebook',
    '~feature': 'share',
    'data': {
        '$deeplink_path': 'path/to/content', // <<<---
        '$og_image_url': 'https://cdn.mydomain.com/image123.jpg',
        '$og_title': 'Amazing Content',
        '$og_description': 'You won’t believe this thing!'
    }
} {% endhighlight %}

**Considerations:**

By setting $deeplink_path, we’ll take that path and, when trying to open your app, prepend your URI scheme and essentially fire the original deep link. So in the above example, when you set your URI scheme on the dashboard, we’ll wind up firing “my-app://path/to/content” when opening the app, and you’ll be able to just use your original deep link routing logic. We will also be able to pull this value directly from any Facebook App Link tags that you have on your site.

*App Link Tags:*

{% highlight html %}
<meta property=”al:ios:url” content=”my-app://path/to/content”/>
<meta property=”al:android:url” content=”my-app://path/to/content”/>
{% endhighlight %}

*Translates To:*
{% highlight js %} {
    '~campaign': 'foo',
    '~channel': 'facebook',
    '~feature': 'share',
    'data': {
        '$deeplink_path': 'path/to/content',         // <<<---
        '$ios_deeplink_path': 'path/to/content',     // <<<---
        '$android_deeplink_path': 'path/to/content', // <<<---
        '$og_image_url': 'https://cdn.mydomain.com/image123.jpg',
        '$og_title': 'Amazing Content',
        '$og_description': 'You won’t believe this thing!'
    }
} {% endhighlight %}

_However, your original deep link routing logic (i.e. openin the app with a deep link) will only work in certain cases:_

| Use Case | Covered | Not Covered |
:--- | :---: | :---: |
iOS 9+|||
    App not installed |  | X |
    App installed, link clicked from Chrome, Twitter, Pinterest | X |  |
    App installed, link clicked elsewhere |  | X |
iOS 8|||
    App not installed |  | X |
    App installed | X |  |
Android:|||
    App not installed |  | X |
    App installed |  | X |

Because of this, you’ll need to include additional logic to cover the cases where the original URI was not fired. This can be as simple as taking the value of $deeplink_path from the link data and passing it to your routing mechanism.

If this seems overly complex, as an alternative you could pack the entire deep link (e.g. my-app://path/to/content) into the link data using a different key, and simply pass the original link along to your routing mechanism, bypassing the “try to fire the original URI” functionality entirely.

### I have or need multiple values to route

You may have a website, but you need multiple values which aren’t represented in a path, possibly because you define these values as query parameters. Because of the way Branch stores link data, this is very easy for us to manage, and we actually have a way for you to define automatic deep link routes based on the presence of certain keys.

Even if you only need a single value (that’s not part of the URL path) this mechanism can easily be used.

**Suggested:**

Use Hosted Deep Link Data tags on your site.

**Example:**

*Required:*

Category: shoes

Subcategory: mens_shoes

*Hosted Deep Link Tags:*

{% highlight html %}
<meta name=”branch:deeplink:category” content=”shoes”/>
<meta name=”branch:deeplink:subcategory” content=”mens_shoes”/>
{% endhighlight %}

*Link Data:*

{% highlight js %} {
    '~campaign': 'foo',
    '~channel': 'facebook',
    '~feature': 'share',
    'data': {
        'category': 'shoes',            // <<<---
        'subcategory': 'mens_shoes',    // <<<---
        '$og_image_url': 'https://cdn.mydomain.com/image123.jpg',
        '$og_title': 'Amazing Content',
        '$og_description': 'You won’t believe this thing!'
    }
} {% endhighlight %}

**Considerations:**

You can pack as many or as few Hosted Deep Link tags on your site as you wish. Every link creation mechanism available to Branch has some way of grabbing this data from the web page and packing it into the link data.

## Deep Linking and Onboarding Flow

Your app may have an onboarding flow which introduces your new users to various features. Maybe your onboarding process has new users define some settings to help you figure out what content to show them. One thing to consider is how this flow is impacted when a new user installed the app and supposed to be deep linked to some content.

### Option 1: Bypass Onboarding

The first option is to completely bypass the onboarding process altogether. You may determine that a user who installed your app because they clicked on a link to a pair of shoes wants to see that pair of shoes immediately when they open the app. In this case, if the link data contains routing values, then you could simply not show the onboarding and take them directly to their desired content.

You could opt to show the onboarding flow later, say at second launch, or when the user closes the window to the deep linked content.

### Option 2: Onboard and then Deep Link

Another option is to run through the onboarding process all the same, and then deep link them as soon as the process finishes. Normally you would decide whether to route the user as soon as the app opens, but Branch will maintain the link data until the app closes, so you can still perform the valuable onboarding process and then examine the link data later to see if they need to be deep linked.

This mechanism can also be used if you wish to gate your deep linkable content behind a login/registration wall, or require the user to enter a credit card or other important information before entering your app.

### Option 3: Ignore Deep Link

This is essentially the default behavior of apps prior to integrating Branch. If your onboarding flow is too valuable to skip you can simply discard any deep link data and proceed as if they had not clicked on a link to content.

<h3 style="margin-top:0;"><a href="{{base.url}}/basic-setup/setup-dashboard" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Time to Get Started!</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>