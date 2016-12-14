---
type: recipe
directory: features
title: Journeys App Banners
page_title: Journeys App Banner Platform
description: A complete guide to using the Journeys tool to drive high value, retained users to your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Apple Universal Links, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner, Interstitial, Download Interstitial
hide_platform_selector: true
premium: true
sections:
- overview
- guide
- advanced
- examples
---

{% if page.overview %}

{% protip %}
Journeys introduces many more advanced features on top of the basic smart app banner functionality, but **you can still create and Android and iOS smart app banner for free**. Premium-only advanced features (including the option to run multiple Journeys simultaneously) are indicated with a {% premiumflag %}{% endpremiumflag %} icon and a 14 day trial period is available.
{% endprotip %}

On a daily basis, Google Search drives **more app installs** than all of Facebook's paid install products combined. Converting your mobile web visitors into native app users is one of the most effective acquisition channels available, and Branch's Journeys App Banners platform makes this easy.

{% image src='/img/pages/features/journeys/journeys-examples.png' full center alt='Journeys intro' %}

- **Customizable presentation.** WYSIWYG designer for smart banner or full-page interstitial, with more coming soon.
- **Powerful targeting rules.** Want to show your Journey only visitors without your app installed already? All iOS users from Japan? Just users viewing your checkout page? Android users who have visited your website twice AND purchased something using your app? The possibilities are infinite.
- **Run A/B tests.** Design multiple campaign versions to see which converts most effectively.
- **Optimized user experience.** If installed, your app will open and users can be routed directly to the content they expect. If not, the App/Play store will open and users can still be routed directly to the content they expect after installing.
- **Comprehensive analytics.** Measure the downstream performance and retention of every Journeys campaign.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## Add the Branch Web SDK to your site

Add the following code somewhere inside the `<head></head>` tags on your website. More information about this SDK can be found in the [Github README](https://github.com/BranchMetrics/web-branch-deep-linking).

{% highlight html %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
</script>
{% endhighlight %}

{% ingredient replace-branch-key %}{% endingredient %}

## Deep linking from the banner or interstitial

Like all Branch deep links, you can pass custom parameters by specifying keys in the link's [data dictionary]({{base.url}}/getting-started/configuring-links). This is useful if you are showing the Smart Banner on a website page with equivalent in-app content, because you can route directly to that content in your app.

{% example %}This example will take the visitor straight to a picture with id “12345” after installing and opening the app.

{% highlight javascript %}
branch.setBranchViewData({
    '$deeplink_path': 'picture/12345',
    'picture_id': '12345',
    'user_id': '45123'
});
{% endhighlight %}
{% endexample %}

{% protip %}
You can dynamically specify the deep link path depending on which website page is loaded.

{% highlight javascript %}
branch.setBranchViewData({
    '$deeplink_path': window.location.pathname + window.location.search + window.location.hash,
    'user_id': '45123'
});
{% endhighlight %}
{% endprotip %}

**Note:** You should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing) for deferred deep linking and attribution.

## Create Journey banner or interstitial

1. Head to the [Journeys page](http://dashboard.branch.io/journeys) on the Branch dashboard.
1. Click the **Create New Journey** button to get started. {% image src='/img/pages/features/journeys/create-journey-button.png' third center alt='name' %}
1. In the **Journey Name:** field, enter a name to use for internal reference (this will never be shown to your users). {% image src='/img/pages/features/journeys/journeys-name.png' half center alt='name' %}

## Select audience

You can customize the audience that will see your Journey by choosing the target platform, device, and region.

{% example title="Easy Localization!" %}
If you have users in many countries, you can create a separate Journey for each localization and use audience targeting rules to make sure users see the appropriate one.
{% endexample %}

{% image src='/img/pages/features/journeys/audience-rules.png' full center alt='audience' %}

| Option | Description |
| --- | --- |
| Platform | Branch currently offers Journeys on one platform: **Mobile web**. This will display for mobile users on your website. _More options coming soon._
| Devices | Which devices would you like to target? For example, if you only have an iOS app, then you might want to show a Journey only to users viewing your mobile website on iOS.
| Regions {% premiumflag %}{% endpremiumflag %} | Select one or more countries in which to display your Journey. Defaults to **Show to All Regions**
| Additional Filters {% premiumflag %}{% endpremiumflag %} | Read about advanced filtering criteria [here]({{base.url}}/features/journeys/advanced/#advanced-audience-rules).

## Select and style the banner or interstitial

1. First, click the **Select a Template** button. {% image src='/img/pages/features/journeys/select-template.png' 2-thirds center alt='select templates' %}
1. Next, click to select the type of template that you want to show. There are three template options:
    - Smart Banner at bottom of screen.
    - Smart Banner at top of screen
    - Full Screen Interstitial (SEO friendly!) {% premiumflag %}{% endpremiumflag %}
    - _The fourth option shown is an alternate preconfiguration of the full screen interstitial_{% image src='/img/pages/features/journeys/select-template-type.png' 3-quarters center alt='select template type' %}
1. Click **Customize** to make changes to the template.
1. In the **Customize Template** heading, you may edit the the name to use for internal reference.
1. Click any object in the preview to edit it. To see documentation on all customization options, [click here](../advanced/#template-customization-options).
1. When finished, click **Save & Close** button to continue.

**Note about generic deep linking params** If you are running a generic download campaign or a site-wide discount offer, your users would go to the same place inside your app regardless of where they originated on your website. You can configure this destination by setting **Deep Link Data** for the **Button** element when you [customize your template options]({{base.url}}/features/journeys/advanced/#template-customization-options).

## Validate & Test

This screen allows you to preview your Journey variations, and is where you can perform final validation and testing on your Journey before publishing it.

{% image src='/img/pages/features/journeys/validate-and-test.png' 3-quarters center alt='validate and test screen' %}

### Preview

Use the dropdown menu to switch between your Journey variations.

{% image src='/img/pages/features/journeys/select-preview-variation.png' 2-thirds center alt='select preview variation' %}

To preview your Journey in your live, production website, enter your website URL in the **Test on your mobile device** field, and press the copy button. **The URL you enter must have the Branch Web SDK integrated and be using your Branch Key.**

{% image src='/img/pages/features/journeys/test-on-device.png' third center alt='test on your mobile device' %}

{% protip title="How does this work?" %}
The Branch SDK integrated into your website listens for a unique, one-time URL parameter that is generated by the preview tool. It looks something like `_branch_view_id=296449069883323397`. When this parameter is detected, the SDK loads a temporary preview of that specific Journey. This parameter is only valid for your Branch Key, and will not work on any other website even if the Branch SDK is integrated.
{% endprotip %}

### Validation

{% image src='/img/pages/features/journeys/validation-messages.png' 2-thirds center alt='validation messages' %}

There are a number of errors and warnings you may encounter.

#### Web SDK errors
You must have the web SDK installed on your website to run a Journey

**Fix:** [Install the Web SDK]({{base.url}}/features/journeys/guide/#add-the-branch-web-sdk-to-your-site).

#### App SDK warnings

If you choose to target iOS or Android users but haven’t integrated those SDKs, your Journeys will still show on the correct devices and direct users to your app. However, you won’t be able to get any install or event attribution for your Journeys, and you will not be able to deep link users to content inside your app.

**Fix:** [Set up the mobile SDK in your app]({{base.url}}/getting-started/sdk-integration-guide).

#### Audience rule warnings

You will see a warning if your audience rules do not add up to 100%. If less than 100%, the remainder will see whatever is normal behavior for your website.

**Fix:** Not required. To change audience allocations, simply press the **Back** button.

#### Premium account warnings
If you have built a Journey that includes premium-only functionality, you will see a warning.

**Fix:**  Go back and remove the premium features such as advanced audience targeting, non-banner templates, CSS editing or A/B testing or [upgrade your app to Journeys Premium](http://dashboard.branch.io/journeys?modal=journeys-signup).

## Managing your Journeys App Banners

The [Journeys Manager](https://dashboard.branch.io/journeys) is your homepage for all of the personalized experiences create. You can turn Journeys on and off, clone them, or view performance.

{% image src='/img/pages/features/journeys/journeys-manager.png' 2-thirds center alt='journeys manager' %}

A Journey can have one of four states:

| State | Meaning | Next Stage |
| --- | --- | --- |
| Draft | Not yet published, still editable | **Active** |
| Active | Live for your users, read-only | **Stopped** |
| Stopped | Not live for your users, read-only | **Active** or **Archived** |
| Archived | Not live for your users, hidden from default manager view | _none_ |

You can activate a journey directly from the creation flow, or from **Start** in the Actions menus in the Journeys Manager.

{% image src='/img/pages/features/journeys/edit-journeys.png' quarter center alt='edit journeys' %}

{% protip title="Editing a live Journey" %}

To prevent corruption of historical analytics data, Journeys cannot be edited once they leave **Draft** status. However, you can **Clone** a Journey and make changes to the new copy.

{% endprotip %}

## Visualizing Journeys performance

### Analytics & attribution

Journeys map to [standard Branch analytics labels](https://dev.branch.io/getting-started/configuring-links/#analytics-labels):

- All Journeys: `feature` = `journeys`
- Each Journey:	`campaign` = `[Journey Name]`
- Individual Templates:	`tags` = `[Template Name]` (+ any additional tags you specify during configuration)

You can access your Journey’s performance by selecting **View Performance** from the actions menu in the Journeys Manager.

{% image src='/img/pages/features/journeys/view-performance.png' quarter center alt='view performance' %}

### Using Source Analytics

You can also access Journeys analytics by selecting the above filters from the [Source Analytics](http://dashboard.branch.io/analytics/source) page of the Branch dashboard.

{% image src='/img/pages/features/journeys/view-source-analytics.png' 2-thirds center alt='view performance using source analytics' %}

#### To compare all of your Journeys

1. Filter by `feature` = `journeys`

#### To compare variations within one Journey

1. Filter by `feature` = `journeys`
2. Filter by `campaign` = `[Journey Name]`

{% elsif page.advanced %}

## Advanced audience rules

You can target users on a more granular level - based on behavior like where they came from, whether they already have your app installed, and what they’ve done on your website or in your app. We've created a bunch of great examples on the [next tab]({{base.url}}/features/journeys/examples).

{% image src='/img/pages/features/journeys/advanced-audience-rules.png' full center alt='Advanced audience' %}

#### Has completed event

If you have [custom event tracking]({{base-url}}/getting-started/user-value-attribution/) set up, you can target users based on events that you define. For instance, you might want to show a Journey to users who have completed a purchase within the last week, or who add an item to their shopping cart more than three times.

<!-- #### Referred from site

You can target a user based on the last touch point before they entered your website. For example, if you want to target users that found you through Google Search, you can select “Referred from site” and fill in `google.com`. Currently, we only support domain names in the Referred from site field. -->

#### Is viewing a page url

You can define which subsets of your website the Journey will appear. For example, maybe you have a page `yoursite.com/settings` and `yoursite.com/products/1234`. You could fill in `products` here and only users visiting a URL with that substring present would see the Journey.

#### Has visited web

Here, you can use website visits to determine who to target. For instance, you might decide that someone who visits your site five times is ready to see a Journey with some extra incentive to open the app.

#### Has visited the app

Similar to visited web, you can target users by number of app visits. For example, someone who has visited the app two times and opens up the mobile web could be lured back into the app with a Journey.

#### Has the app installed

You might choose to only show a Journey that asks a user to open the app to those that already have it installed.

#### Has clicked on ad

A user is grouped into "Has clicked on Ad" when they've clicked a link from [Deep Linked Feeds](/features/deep-linked-feeds). 

Use this to target users who have been part of an ad campaign to improve your ROI; maybe with a specific call to action to open the app and buy something if they've also never made a purchase in the app. 

The technical definition is that they've clicked on a link with an Ad Network's custom `$3p` value in link data, but you just need to consider the way the link is created - in this case, through Deep Linked Feeds.

#### Has clicked on email

A user is grouped into "Has clicked on Email" when they've clicked a link from [Deep Linked Email](https://dashboard.branch.io/email). 

Use this to target users who have been part of an email campaign; maybe with a specific call to action to get them download the app if they don't have it and they've landed on mobile web.

The technical definition is that they've clicked on a link with an Email Service Provider's custom `$3p` value in link data, but you just need to consider the way the link is created - in this case, through a Deep Linked Email integration.

## Set up split testing {% premiumflag %}{% endpremiumflag %}

Note that if you are planning on just using the free banner, you can skip this section. This feature allows you to run A/B tests by designing multiple templates and assigning a percentage of your audience to each one.

1. Click the **Add Variation** button to add another design variation. {% image src='/img/pages/features/journeys/add-variation.png' third center alt='add a variation' %}
1. To remove an unwanted variation, click the `-` button. {% image src='/img/pages/features/journeys/remove-variation.png' quarter center alt='remove a variation' %}
1. Use the percentage fields to control the ratio of your audience that will see each variation.{% image src='/img/pages/features/journeys/multiple-templates.png' 3-quarters center alt='multiple templates' %}

{% protip title="Variation Display Limitations" %}
- You may have up to three variations in each Journey.
- Your total percentage allocation must not equal more than **100%**.
- Your total percentage allocation may be _less_ than **100%**. In this situation, the remainder of your audience will be shown your standard website without a Journey. This allows you to A/B test against your non-Journeys website experience.
{% endprotip %}

## Template customization options

The customization options available depend on the template chosen:

- [Smart Banner](#smart-banner)
- [Full Screen Interstitial](#full-screen-interstitial) {% premiumflag %}{% endpremiumflag %}

### Smart Banner

The available configuration options are identical for banners at both the top and the bottom of the screen.

#### Background

{% image src='/img/pages/features/journeys/customize-banner-background.png' 2-thirds center alt='background banner template' %}

| Option | Usage |
| --- | --- |
| Text Color | Specify the text color for elements without a specific setting. _Not currently used_ |
| Background Color | Set the background color of the banner |

#### Title

{% image src='/img/pages/features/journeys/customize-banner-title.png' 2-thirds center alt='title banner template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for title text |
| Title | The text of the title. Maximum 35 characters |

#### Description

{% image src='/img/pages/features/journeys/customize-banner-description.png' 2-thirds center alt='banner interstitial template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for description text |
| Description | The text of the description. Maximum 60 characters, will wrap to two lines |

#### Rating

{% image src='/img/pages/features/journeys/customize-banner-rating.png' 2-thirds center alt='rating banner template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for rating stars. Primarily useful for changing color |
| Rating Star Count | The number of stars of your App/Play Store rating average. We encourage you to be honest! |

#### Reviews

{% image src='/img/pages/features/journeys/customize-banner-reviews.png' 2-thirds center alt='reviews banner template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for reviews count |
| Reviews | The number of reviews of your app on the App/Play Store. We encourage you to be honest! |

#### Button

{% image src='/img/pages/features/journeys/customize-banner-button.png' 2-thirds center alt='button banner template' %}

| Option | Usage |
| --- | --- |
| Text Color | Change the color of the button text and button outline |
| Background Color | Change the color of the button background
| Button Text | Change the text shown when the app is installed and not installed. |
| Channel | Set the **[Channel]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `website`
| Tags | Set the **[Tags]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `purchase` and `fall-sale`
| Deep Link Data | Insert deep link data and advanced link control parameters. Can contain any [Branch link parameter](https://dev.branch.io/getting-started/configuring-links/)

#### Dismiss

{% image src='/img/pages/features/journeys/customize-banner-dismiss.png' 2-thirds center alt='dismiss button banner template' %}

| Option | Usage |
| --- | --- |
| Dismiss Period | Control how long the banner should be hidden once dismissed by the user. Options are `1 day`, `1 week`, `1 month`, `Never Again`, and `Custom` |

#### App Icon

{% image src='/img/pages/features/journeys/customize-banner-icon.png' 2-thirds center alt='app icon button banner template' %}

| Option | Usage |
| --- | --- |
| App Icon | Enter the URL for your app icon, or upload an image |

### Full screen interstitial {% premiumflag %}{% endpremiumflag %}

#### Background

{% image src='/img/pages/features/journeys/customize-fullpage-background.png' 2-thirds center alt='background interstitial template' %}

| Option | Usage |
| --- | --- |
| Text Color | Specify the text color for elements without a specific setting. _Not currently used_ |
| Background Color | Set the background color of the interstitial |
| Background | Enter the URL for your background graphic, or upload an image |
| Image Position | Control the vertical alignment of the background graphic |
| Content Position | Control the vertical alignment of the content block |

| Image Position | Usage |
| --- | --- |
| Top | Pin to top of screen, scale to full screen width |
| Center | Pin to middle of screen, scale to full screen width |
| Bottom | Pin to bottom of screen, scale to full screen width |
| Cover | Anchor to top of screen, scale to fill entire screen |

The content block contains everything except for the background image. Dimensions _within_ this block are preset and cannot be modified.

| Content Position | Usage |
| --- | --- |
| Top | Pin to top of screen |
| Center | Pin to center of 'safe' screen height (accounting for browser controls and device dimensions) |
| Bottom | Pin to bottom of 'safe' screen height (accounting for browser controls and device dimensions) |
| Custom | Position by relative percentage. Be sure to test for appropriate real-world alignment

#### Title

{% image src='/img/pages/features/journeys/customize-fullpage-title.png' 2-thirds center alt='title interstitial template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for title text |
| Title | The text of the title. Maximum 35 characters, will wrap to multiple lines |

#### Description

{% image src='/img/pages/features/journeys/customize-fullpage-description.png' 2-thirds center alt='description interstitial template' %}

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for description text |
| Description | The text of the description. Maximum 60 characters, will wrap to multiple lines |

#### Button

{% image src='/img/pages/features/journeys/customize-fullpage-button.png' 2-thirds center alt='button interstitial template' %}

| Option | Usage |
| --- | --- |
| Text Color | Change the color of the button text and button outline |
| Background Color | Change the color of the button background
| Button Text | Change the text shown when the app is installed and not installed. |
| Channel | Set the **[Channel]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `website`
| Tags | Set the **[Tags]({{base.url}}/getting-started/configuring-links/guide/#analytics-labels)** for the Branch link attached to the button. For example, `purchase` and `fall-sale`
| Deep Link Data | Insert deep link data and advanced link control parameters. Can contain any [Branch link parameter](https://dev.branch.io/getting-started/configuring-links/)

#### Dismiss

{% image src='/img/pages/features/journeys/customize-fullpage-dismiss.png' 2-thirds center alt='dismiss button interstitial template' %}

| Option | Usage |
| --- | --- |
| Dismiss Text | Text to show users wanting to continue to your mobile website instead of downloading the app.
| Dismiss Period | Control how long before the same visitor should see the Journey again. Options are `1 day`, `1 week`, `1 month`, `Never Again`, and `Custom` |

## CSS Editor {% premiumflag %}{% endpremiumflag %}

If you have an upgraded premium account, you may also modify your CSS code directly in addition to using the WYSIWYG View Editor. To do so, go to the **Configure Views** step, click to edit a template, and then select the **CSS Editor** tab on the **Customize Template** screen.

{% image src='/img/pages/features/journeys/view-css-editor.png' third center alt='view editor and css editor toggle' %}

## Dynamic deep linking with Journeys

You have the option of dynamically configuring the Branch link that powers the Journey presented to the user. This allows you to pass different deep link data from each page of your site, instead of using the same deep link data as defined in the Journey for every page.

You can do this by using [hosted deep link data]({{base.url}}/getting-started/hosted-deep-link-data/guide) and adding specially formatted meta tags to your site:

{% highlight html %}
<meta name="branch:deeplink:mydata" content="something"/>
<meta name="branch:deeplink:product_id" content="12345"/>

<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}
</script>
{% endhighlight %}

You can also call `setBranchViewData` from the Branch Web SDK:

{% highlight javascript %}
<script type="text/javascript">
{% ingredient web-sdk-initialization %}{% endingredient %}

// You'll need to set the deep link data here, in the block where you call init().
branch.setBranchViewData({
  data: {
    mydata: 'something',
    product_id: '12345',
  }
});
</script>
{% endhighlight %}

{% caution title="Migrating from the legacy Smart Banner" %}
Calling the `branch.banner()` function with deep link data will override the custom deep link parameters of any Journey shown on that page. The banner itself will not be displayed when a Journey is shown, but its deep link data will be used. This is done to make it easy to migrate from the smart banner to Journeys.
{% endcaution %}

## Premium journeys functionality

All Journeys features are available to upgraded apps, and are charged per event with a 14 day free trial. Visit [this page](https://branch.io/pricing) for full pricing information.

#### Limitations for apps with free accounts

- Any number of Journeys may be created in **Draft** mode using all features.
- An invitation to upgrade will be displayed when premium-only functionality (indicated with a {% premiumflag %}{% endpremiumflag %} icon) is enabled
- Only a single Journey using the Smart Banner template (either top or bottom position) may be **Active** at any one time.
- To enable a different Journey, the currently active Journey must first be put into **Stopped** mode.
- Any Journey using premium-only features cannot be placed into **Active** mode until the app has been upgraded.

## Web to app routing without Journeys

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

### Add an install call to action

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

{% elsif page.support %}

## Troubleshooting

### Calls to [branchsubdomain] blocked

{% ingredient branchsubdomain %}{% endingredient %}

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'">
{% endhighlight %}

{% elsif page.examples %}

## Example audiences

The Journeys audience tool is extremely powerful, but sometimes a few examples can help kickstart your creative juices. Here are are a couple common audience use cases to help you get started.

1. [New users](#example-new-users)
2. [Loyal users](#example-loyal-users)
3. [Retargeting users who have taken some action](#example-retargeting-users)
4. [Users from Google (for SEO)](#example-seo-friendly)
5. [iOS users from English-speaking countries](#example-english-speaking-ios-users)

All of these examples require you to configure advanced audience rules, which is a premium feature. You can add any set of complex rules using the following button:

{% image src='/img/pages/features/journeys/examples/advanced_add_filter.png' center full alt='Add rule' %}

### Example: New users

In this example, you'll configure an audience to target people who have visited your site **less than 3 times** historically. Anyone who had visited more than this will be excluded. First, you'll add a new rule for `Has visted web` in the advanced section.

{% image src='/img/pages/features/journeys/examples/new_users_0.png' center full alt='New users 0' %}

Next, you'll choose the `Less than or equal to` in the middle section:

{% image src='/img/pages/features/journeys/examples/new_users_1.png' center full alt='New users 1' %}

Finally, you'll enter 2 in the last part to indicate you want to target people who have visited less than 3 times historically.

{% image src='/img/pages/features/journeys/examples/new_users_2.png' center full alt='New users 2' %}

Save and continue!

### Example: Loyal users

In this example, you'll configure an audience to target people who have visited your site **more than 4 times** historically. Anyone who had visited less than this will be excluded. First, you'll add a new rule for `Has visted web` in the advanced section.

{% image src='/img/pages/features/journeys/examples/new_users_0.png' center full alt='loyal users 0' %}

Next, you'll choose the `More than or equal to` in the middle section:

{% image src='/img/pages/features/journeys/examples/loyal_users_1.png' center full alt='loyal users 1' %}

Finally, you'll enter 5 in the last part to indicate you want to target people who have visited more than 4 times historically.

{% image src='/img/pages/features/journeys/examples/loyal_users_2.png' center full alt='loyal users 2' %}

Save and continue!

### Example: Retargeting users

In this example, you'll configure an audience to target people who have completed some action on your site in a past or current session. For example, if a user had added something to their cart or had previously completed a purchase. You can retarget these users with a custom call to action to download. We'll use a generic event called `MyAction` in the example. First, you'll add a new rule for `Has completed event` in the advanced section.

{% image src='/img/pages/features/journeys/examples/retargeting_users_0.png' center full alt='retargeting users 0' %}

In this next dropdown, you'll choose the custom event to retarget from. Here, we'll use a generic event called `MyAction` but you would select `Purchase` or something more meaningful to your use case.

{% image src='/img/pages/features/journeys/examples/retargeting_users_1.png' center full alt='retargeting users 1' %}

Next, you'll choose the `More than or equal to` in the middle section:

{% image src='/img/pages/features/journeys/examples/retargeting_users_2.png' center full alt='retargeting users 2' %}

Finally, you'll enter 3 in the last part to indicate you want to target people who have completed `MyAction more than 2 times historically.

{% image src='/img/pages/features/journeys/examples/retargeting_users_3.png' center full alt='retargeting users 3' %}

Save and continue!

### Example: SEO friendly

Google has recently announced that it will begin punishing sites that show a full page interstitial when a user comes from search. Because of this, you'll likely need to treat Google search traffic differently than traffic that comes from any other source. In this example, you'll set up an audience specific to users who come from Google. First, you'll add a new rule for `Came directly from a url` in the advanced section.

{% image src='/img/pages/features/journeys/examples/seo_friendly_0.png' center full alt='seo friendly 0' %}

Next, you'll choose the `containing` in the middle section to match a substring:

{% image src='/img/pages/features/journeys/examples/seo_friendly_1.png' center full alt='seo friendly 1' %}

Finally, you'll enter `google.com` to target users who came from Google search (where the referrer contains google.com):

{% image src='/img/pages/features/journeys/examples/seo_friendly_2.png' center full alt='seo friendly 2' %}

Alternatively, you can target users who did NOT come from Google search (where the referrer doesn't contain google.com):

{% image src='/img/pages/features/journeys/examples/seo_friendly_3.png' center full alt='seo friendly 3' %}

### Example: English speaking iOS users

In this example, you'll restrict the audience to users in countries where English is the native language who are on the iOS operating system. Note that this is not in the advanced audience section, but rather in the top section. First, select `iOS` of the mobile OS checkboxes.

{% image src='/img/pages/features/journeys/examples/ios_english_0.png' center full alt='ios english 0' %}

Next, go through and choose the following countries: `United States`, `Canada`, `United Kingdom` and `Australia`.

{% image src='/img/pages/features/journeys/examples/ios_english_1.png' center full alt='ios english 1' %}

Save and continue!

{% endif %}
