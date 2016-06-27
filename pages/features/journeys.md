---
type: recipe
directory: features
title: Journeys Web to App
page_title: Journeys Web to App Platform
description: A complete guide to using the Journeys tool to drive high value, retained users to your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Apple Universal Links, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner, Interstitial, Download Interstitial
hide_platform_selector: true
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

Did you know that Google organic search gives companies **more free installs** than all of Facebook's paid install product on a daily basis? Branch's Journeys Web To App product will help you convert those users into high quality, long term retained, native mobile app users.

Journeys is a huge leap forward in the functionality of the Branch platform. It allows to design a mobile web banner, interstitial or call to action which will route the user to the App/Play Store when clicked. You can create advanced targeting rules to limit who and when the mobile web experience shows to optimally drive the right users to your app, then measure the performance of every flow.

{% image src='/img/pages/features/journeys/journeys-intro.png' full center alt='Journeys intro' %}

{% getstarted title="Get started with Journeys" %}{% endgetstarted %}

{% elsif page.guide %}

All configuration, aside from the one time setup, can be done from the [Journeys tab](http://dashboard.branch.io/journeys) on the Branch dashboard. Note that Journeys is a premium feature, although we let you try it out for 14 days free. You can find out more about the pricing [here](https://branch.io/pricing).

## Prequisite: Install the Web SDK

To use Journeys, you must have the Web SDK on your website. Don't worry, it's just a simple Javascript library that can be added to your website as shown below. Please add this snippet inside the `<head></head>` tags on your website.

{% highlight javascript %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Create Your Journey

Head to the [Branch Journeys dashboard](http://dashboard.branch.io/journeys), and click the `New Journey` button to get started. In the modal that appears, enter the name you'd like to use for later reference.

{% image src='/img/pages/features/journeys/journeys-name.png' half center alt='name' %}

## Design Your Audience

Start customizing your audience by choosing the target platform, device, and region.

{% image src='/img/pages/features/journeys/audience-rules.png' full center alt='audience' %}

1. **Platform**: For now, Branch offers Journeys on one platform: the mobile web, for display on your website. You don’t need to change any platform settings.
2. **Operating systems**: Would you like to target users on all devices, or only iOS or Android users? For example, if you only have an iOS app, then you might only want to show a Branch View to users viewing your mobile website on iOS.
3. **Regions**: Where would you like your Branch View to show? If you have users in many different countries, you might want to create distinct Journeys with Branch Views in different languages.
4. **Advanced options**: There are many advanced options for audiences that can be found [here]({{base.url}}/features/journeys/advanced/#advanced-audience-rules).

## Configure Branch View Templates

You can choose which Branch Views your audience will see, and how much of your audience will see it. First, click `Select Template` to choose customize the template you'd like to show for this Journey.

{% image src='/img/pages/features/journeys/select-template.png' half center alt='select templates' %}

### Select your template

This opens a WYSIWYG editor where you can change the style and content of your Branch View. First, choose the type of template that you want to show. You can choose from a:

- Full page injected interstitial (SEO friendly!)
- Half page injected banner (SEO friendly!)
- Floating app banner
- Floating button

{% image src='/img/pages/features/journeys/select-template-type.png' half center alt='select template type' %}

Next, to make changes to the styling or text, click `Customize`.

### Customize your template

Here, you can change the template name so you can easily find it later. To edit an element on the template, simply select it and change colors, fonts, or sizes. If you can't achieve what you're attempting in the designer, you can also use the dropdown at the top to edit the HTML, CSS, or JS. 

{% image src='/img/pages/features/journeys/customize-template.png' 2-thirds center alt='customize template' %}

**Note** Select the call to action button to define the properties of the Branch link that powers it. Direct users to a specific page or experience in your app using the “Deep Link Data” section, visible when you select the call to action.

### Split your audience

Want to test multiple Branch Views? Click `Add Rule` to split your audience so that. For instance, 60% see one Branch View, and 40% see another. You’ll be able to see analytics for each of these later. You’ll also have to select a template for each rule you add.

{% image src='/img/pages/features/journeys/multiple-templates.png' half center alt='multiple templates' %}

### Validation and testing

You can test your different Branch Views by clicking the links provided on this page. You'll also note that a few validation checks run to make sure everything is properly configured to run successfully. Here are some potential errors and warnings that you might encounter:

**Web SDK errors**: You must have the web SDK installed on your website to run a journey - setup instructions [here]({{base.url}}/features/journeys/guide/#prerequisite-install-the-web-sdk).

**App SDK warnings**: If you choose to target iOS or Android users but haven’t integrated those SDKs, your journeys will still show on the correct devices and direct users to your app. However, you won’t be able to get any download attribution for your journeys, like installs, re-opens, or in-app events. Integration instructions can be found [here]({{base.url}}/getting-started/sdk-integration-guide).

**Audience rule errors** You’ll see a warning if your audience rules don’t add up to 100%.  If it’s less than 100%, we won’t show a Branch View to the remainder of your audience - they’ll see whatever is normal behavior for your app. To change the frequency, simply press the back button.

## Managing Your Journeys

The Journeys Manager is your homepage for all of the personalized experiences you’ve created. Here you can turn journeys on and off, clone them, or view performance. A Journey can have one of three states:

- **Draft**: Not live for your users, still editable
- **Active**: Live for your users, read-only
- **Archived**: Not live for your users, hidden from default manager view

You can activate a journey directly from the creation flow, or from “Start” in the Actions menus in the Journeys Manager. Editing and Archiving are also accessible from the Actions menus.

{% image src='/img/pages/features/journeys/edit-journeys.png' third center alt='edit journeys' %}

Note that you must `clone` or `stop` a live journey to edit it. They are read only while live.

## Visualizing Journeys Performance

You can access your Journey’s performance direct from the actions menu in the Journeys Manager. Journeys map to standard Branch analytics tags:

- All Journeys: `feature` = `journeys`
- Each Journey:	`campaign` = `<journey id>`
- Branch Views:	`tags` = `<branch view name>`

{% image src='/img/pages/features/journeys/view-performance.png' 2-thirds center alt='view performance' %}

You can also access Journeys analytics by selecting the above filters in Source Analytics. To compare all of your Journeys:

1. Filter by feature = journeys
2. Group by campaign

To compare Branch View segments within one Journey:

1. Filter by feature = `journeys`
2. Filter by campaign = `<journey id>`
3. Group by tags

{% elsif page.advanced %}

## Advanced Audience Rules

You can target users on a more granular level - based on behavior like where they came from, whether they already have your app installed, and what they’ve done on your website or in your app.

{% image src='/img/pages/features/journeys/advanced-audience-rules.png' full center alt='Advanced audience' %}

**Completed event**

If you have custom event tracking set up, you can target users based on events that you define. For instance, you might want to show a Branch View to users who make a purchase, or who add an item to their shopping cart more than three times.

**Referred from site**

You can target a user based on the last touch point before they entered your website. For example, if you want to target users that found you through Google Search, you can select “Referred from site” and fill in `google.com`. Currently, we only support domain names in the Referred from site field.

**Current website url**

You can define which subsets of your website the Journey will appear. For example, maybe you have a page `yoursite.com/settings` and yoursite.com/products/1234`. You could fill in `products` here and only users visiting a URL with that substring present would see the Journey.

**Visited web**

Here, you can use website visits to determine who to target. For instance, you might decide that someone who visits your site five times is ready to see a Branch View with some extra incentive to open the app.

**Visited app**

Similar to visited web, you can target users by number of app visits. For example, someone who has visited the app two times and opens up the mobile web could be lured back into the app with a Branch View.

**Have the app installed**

You might choose to only show a Branch View that asks a user to open the app to those that already have it installed.

## Dynamic Deep Linking with Journeys

You have the option of dynamically configuring the Branch link that powers the Journey presented to the user. You'd want to do this if you want to pass custom deep link data on every page of your site. For now, you'll need to do this by calling `setBranchViewData` on the Branch Web SDK.

{% highlight javascript %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
// You'll need to set the deep link data here, in the block where you call init().
branch.setBranchViewData({
  data: {
    mydata: 'something',
    product_id: '12345',
    '$deeplink_path': 'open/item/1234'
  }
});
</script>
{% endhighlight %}

Note, calling `banner()` will also override the custom deep link parameters on the Journey that gets shown on that site. The actually banner will not be displayed when a Journey is shown, but the deep link data will be used. This is done to make it easy to migrate from the banner to Journeys.

## Web To App Routing Without Journeys

If you maintain a mobile website, Branch allows you to deep link mobile visitors directly into your app, or easily and automatically give them the option of downloading it. Here's a diagram that describes how it works:

{% image src='/img/pages/features/website-to-app-routing/deepview-websdk-routing.png' center full alt='Deepviews web routing' %}

### Open app if installed

Add the following code somewhere inside the `<head></head>` tags on your website and customize the [link parameters]({{base.url}}/getting-started/configuring-links) to suit your needs.

{% protip %}
What this script does is move a lot of the Branch redirection logic to the Javascript on your own page, effectively 'clicking a Branch link' on page load.
{% endprotip %}

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
      'open_app': true  // If true, Branch attempts to open your app immediately when the page loads. If false, users will need to press a button. Defaults to true
    }
);
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

### Add an Install Call To Action

Trigger the `branch.deepviewCta()` function with a button or hyperlink on your page. Executing this function (whether by button, link, or some other method) 'clicks' the link you defined using `branch.deepview()` above.

| Platform | Result of Call To Action
| --- | ---
| Mobile, app installed | Open app, deep link directly to content [if configured]({{base.url}}/features/website-to-app-routing/advanced/#deep-linking-from-your-website). This is a failsafe action in case the 'link click' on page load didn't fire correctly.
| Mobile, app NOT installed | Open App Store or Play Store page for your app, deep link directly to content after download [if configured]({{base.url}}/features/website-to-app-routing/advanced/#deep-linking-from-your-website).
| Desktop | Redirect to `$desktop_url` specified in the `deepview()` call, or fall back to your default web url from [Link Settings](https://dashboard.branch.io/#/settings/link).

{% example %}Here's how to add a simple hyperlink call to action:

{% highlight html %}
<a id='downloadapp' onclick='branch.deepviewCta()'>View this in app</a>
{% endhighlight %}
{% endexample %}

## Troubleshooting

### Calls to [branchdomain] blocked

{% ingredient branchsubdomain %}{% endingredient %}

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'"> 
{% endhighlight %}

{% endif %}
