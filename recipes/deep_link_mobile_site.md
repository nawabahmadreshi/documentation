---
type: recipe
title: "Website to app routing"
page_title: "Automatically route website users to your app"
description: Leanr how to add powerful, best in class deep linking to your mobile website..
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
hide_platform_selector: true
---

As the owner of a company that maintains a website in addition to an app, you want to ensure that these products work well together. With Branch, if a user lands on your mobile website, but already has your app, you can deep link them directly into the app. If they don't have your app, you can easily and automatically give them the option of downloading it.

It takes just a couple lines of code on your site, and stays up to date with all new deep link standards and best practices. Here's a diagram that describes how it works.

{% image src='/img/deepviews/deepview_websdk_routing.png' 2-thirds center alt='Deepviews web routing' %}

## Initialize the Deepview SDK on Page Load

What this tool does is move a lot of the Branch redirection logic to the Javascript on your own page, effectively 'clicking a Branch link' on page load. On many browsers, it's possible that this snippet will automatically open up the app as soon as the web page starts to load. 

{% highlight javascript %}
// load the Branch SDK file
{% ingredient web_sdk/_initialization %}{% endingredient %}
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
{% endhighlight %}

If you want to customize more options about the links, read more about [link customization here](https://dev.branch.io/link_configuration/).

-----

## Add an App Download Call To Action

Now. You've defined the deepview and link structure in the above call. The user is on the page and ready to convert to the app. Use a Branch banner or a custom button to send them to the app store, track the conversion and deep link through the install process.

### Create Your Own Banner

Triggering the `deepviewCta` function will eject the user out to the appropriate app store if they don't have the app, so put this behind your button or hyperlink.

{% highlight javascript %}
branch.deepviewCta();
{% endhighlight %}

Here's an example calling the `deepviewCta` in a hyperlink form.

{% highlight html %}
<a id='downloadapp' onclick='branch.deepviewCta()'>View this in app</a>
{% endhighlight %}

### Use The Branch Banner

If you don't want to build a custom call to action, you can use the Branch app banner to achieve the same results. Here's how you invoke it. Read more about the [banner here](https://dev.branch.io/recipes/app_download_banner/).

{% highlight javascript %}
branch.banner({
    icon: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png',
    title: 'Branch Demo App',
    description: 'The Branch demo app!',
    openAppButtonText: 'Open',              // Text to show on button if the user has the app installed
    downloadAppButtonText: 'Install',      // Text to show on button if the user does not have the app installed
    showiOS: true,                          // Should the banner be shown on iOS devices?
    showAndroid: true,                      // Should the banner be shown on Android devices?
    showDesktop: false,                      // Should the banner be shown on desktop devices?
    iframe: true,                           // Show banner in an iframe, recomended to isolate Branch banner CSS
    disableHide: false,                     // Should the user have the ability to hide the banner? (show's X on left side)
    forgetHide: false,                      // Should we show the banner after the user closes it? Can be set to true, or an integer to show again after X days
    position: 'top',                        // Sets the position of the banner, options are: 'top' or 'bottom', and the default is 'top'
    mobileSticky: false,                    // Determines whether the mobile banner will be set `position: fixed;` (sticky) or `position: absolute;`, defaults to false *this property only applies when the banner position is 'top'
    desktopSticky: true,                    // Determines whether the desktop banner will be set `position: fixed;` (sticky) or `position: absolute;`, defaults to true *this property only applies when the banner position is 'top'
    customCSS: '.title { color: #F00; }',   // Add your own custom styles to the banner that load last, and are gauranteed to take precedence, even if you leave the banner in an iframe
    make_new_link: false                    // Should the banner create a new link, even if a link already exists?
}, { });
{% endhighlight %}

-----

## View the Analytics

With your deep linking all set up, you can view conversions on the summary tab of [the Branch dashboard](https://dashboard.branch.io). It will look something like this:

{% image src='/img/deepviews/deepview_analytics.png' third center alt='Deepviews tab' %}

There are various metrics to understand when deep linking from your mobile website.

- *Views:* a user viewed the mobile site.
- *Clicks:* a user clicked on the Deepview CTA
- *Installs:* a user installed the app for the first time
- *Upgrades:* a user re-opened or upgraded the app from a previous version

-----

## What's next?

You've got the basics, but let's take your integration to the next level:

{% ingredient recipe_preview/easy_deep_linking %}{% endingredient %}
{% ingredient recipe_preview/content_sharing %}{% endingredient %}
{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}
