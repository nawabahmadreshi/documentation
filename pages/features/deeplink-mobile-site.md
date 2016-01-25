---
type: recipe
directory: features
title: Website to app routing
page_title: Automatically route website users to your app
description: Add powerful, best in class deep linking to your mobile website.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
hide_platform_selector: true
sections:
- overview
- guide
- support
---

{% if page.overview %}

If you maintain a mobile website, Branch allows you to deeplink mobile visitors directly into your app, or easily and automatically give them the option of downloading it. Here's a diagram that describes how it works:

{% image src='/img/pages/features/deeplink-mobile-site/deepview-websdk-routing.png' center alt='Deepviews web routing' %}

{% protip title="If you do not have a mobile website..." %}This feature essentially recreates the functionality of [Deepviews]({{base.url}}/features/deepviews) using your own website. If you do not have one, Deepviews are a good alternative!{% endprotip %}

{% elsif page.guide %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Initialize the Deepview SDK on page load

Add the following code somewhere inside the `<head></head>` tags on your website and customize the [link data dictionary]({{base.url}}/getting-started/link-configuration) to suit your needs. What this script does is move a lot of the Branch redirection logic to the Javascript on your own page, effectively 'clicking a Branch link' on page load.

{% highlight javascript %}
<script type="text/javascript">
// load the Branch SDK file
{% ingredient web-sdk-initialization %}{% endingredient %}
// define the deepview structure
branch.deepview(
    {
      'channel': 'mobile_web',
      'feature': 'deepview',
      data : {
        '$deeplink_path': 'page/1234',
        'user_profile': '7890',
        'page_id': '1234',
        'custom_data': 1234
      }
    },
    {
      'open_app': true
    }
);
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Add a Call To Action

{% protip title="Use The Branch Banner" %} If you don't want to build a custom call to action, you can use the Branch [App Download Banner]({{base.url}}/features/app-download-banner) to achieve the same results.{% endprotip %}

Trigger the `deepviewCta()` function with a button or hyperlink on your page. On mobile devices without your app installed, this method will open the app store. On non-mobile devices, this method call will redirect to your `$desktop_url` specified in the deepview() call, or fallback to your default web url in [link settings](https://dashboard.branch.io/#/settings/link).


{% highlight javascript %}
branch.deepviewCta();
{% endhighlight %}

{% example %}Here's how to call `deepviewCta()` from a hyperlink.

{% highlight html %}
<a id='downloadapp' onclick='branch.deepviewCta()'>View this in app</a>
{% endhighlight %}
{% endexample %}

## View the analytics

With your deep linking all set up, you can view conversions on the summary tab of [the Branch dashboard](https://dashboard.branch.io). It will look something like this:

{% image src='/img/pages/features/deeplink-mobile-site/deepview_analytics.png' 2-thirds center alt='Deepviews analytics tab' %}

There are various metrics to understand when deep linking from your mobile website.

- **Views:** a user viewed the mobile site.
- **Clicks:** a user clicked on the Deepview CTA
- **Installs:** a user installed the app for the first time
- **Upgrades:** a user re-opened or upgraded the app from a previous version

Only users who do not have the app will go through this flow. You can view the total counts and conversion rate from each step on this chart.

{% elsif page.support %}

## Troubleshooting

### Calls to bnc.lt blocked

Please make sure to add `bnc.lt` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://bnc.lt; child-src 'none'; object-src 'none'"> 
{% endhighlight %}

{% endif %}