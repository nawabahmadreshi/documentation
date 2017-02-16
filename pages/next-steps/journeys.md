---
type: recipe
directory: next-steps
title: Web to App Conversion with Journeys
page_title: Web to App Conversion with Journeys
description: Convert your mobile web visitors into higher-value app users with customizable user Journeys.
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- examples
- support
---

{% if page.overview %}
**Estimated Time To Complete:**

30-60 Minutes

**Required Personnel:**

Product/Marketing Rep (Defining user Journeys)

Web Developer (Making optional web changes)

**Requires An App Update:**

No

## Overview

On a daily basis, Google Search drives _more app installs_ than all of Facebook’s paid install products combined. Converting your mobile web visitors into native app users is one of the most effective acquisition channels. Enter Branch’s **Journeys App Banners**.

Native app banners on Android and iOS can drive installs, but they are limited in how they look, when you can show them, who you show them to, etc. With Journeys, you get:

- **Customizable presentation.** WYSIWYG designer for smart banner or full-page interstitial, with more coming soon.
- **Powerful targeting rules.** Want to show your Journey only visitors without your app installed already? All iOS users from Japan? Just users viewing your checkout page? Android users who have visited your website twice AND purchased something using your app? The possibilities are infinite.
- **Run A/B tests.** Design multiple campaign versions to see which converts most effectively.
- **Optimized user experience.** If installed, your app will open and users can be routed directly to the content they expect. If not, the App/Play store will open and users can still be routed directly to the content they expect after installing.
- **Comprehensive analytics.** Measure the downstream performance and retention of every Journeys campaign.

### After This…

- You will have an understanding of what you can do with Journeys.
- You will be able to define unique Journeys to drive your mobile web users to the app.
- You will be able to test Journeys prior to pushing them live.
- You will be able to see the performance of your Journeys.

## Pre-Setup

In order for your Journeys to show up on your website, you’ll need Branch’s [Web SDK]({{base.url}}/basic-setup/setup-web-sdk), on any page where you might want to show a Journey. If you haven’t done this yet, go ahead and take care of it now.

In order for your Journeys to get proper attribution and have the ability to deep link your new users through the install process, your app will need to have the [Branch SDK]({{base.url}}/basic-setup/setup-mobile-sdk/guide) integrated into your mobile apps.

### A note on deep linking with Journeys

As you’ll soon see, you can define exactly what data gets attached to a given Journey. However, if you want to show a Journey on every single one of your product pages AND deep link your users to that same product after install, you’ll need to dynamically set some of this data.

We provide a number of ways for you to do this:

- Hosted Deep Link Data
- Facebook App Links
- Setting Data via Web SDK

#### Hosted Deep Link Data

Hosted Deep Link Data tags will be automatically scraped by Branch’s Web SDK and added to the link data behind any Journey that appears on a given page. Refer to the [Web SDK setup guide]({{base.url}}/basic-setup/setup-web-sdk) for instructions on how to implement these.

#### Facebook App Links

Facebook App Links define a set of deep links for a given web page using a standardized format. Branch’s Web SDK will scrape these when present on a page where a Journey is displayed and use their values to define the `$deeplink_path` on the link data that the Journey uses. These values will also be scraped when generating links through Deep Linked Emails as well as the dashboard. Refer to your deep link routing logic to see if this is sufficient for your needs.

#### Setting Data via Web SDK

The Web SDK method _setBranchViewData_ can be used to set the link data on a Journey.

{% highlight javascript %}
branch.setBranchViewData({
    tags: ['march_promo'],
    data: {
        promo_code: 'MARCH2017',
        product_id: '12345',
        ...
    }
});
{% endhighlight %}

_This method will only work for Journeys._ Using Hosted Deep Link Data or Facebook App Link tags will make the same data accessible across all of your link-creation mechanisms.

## Premium journeys functionality

All Journeys features are available to upgraded apps, and are charged per event with a 14 day free trial. Visit [this page](https://branch.io/pricing) for full pricing information.

#### Limitations for apps with free accounts

- Any number of Journeys may be created in **Draft** mode using all features.
- An invitation to upgrade will be displayed when premium-only functionality (indicated with a {% premiumflag %}{% endpremiumflag %} icon) is enabled
- Only a single Journey using the Smart Banner template (either top or bottom position) may be **Active** at any one time.
- To enable a different Journey, the currently active Journey must first be put into **Stopped** mode.
- Any Journey using premium-only features cannot be placed into **Active** mode until the app has been upgraded.

{% getstarted title="Get Started with Journeys" %}{% endgetstarted %}

{% elsif page.guide %} [//]: <> (page.overview)

### Managing Your Journeys

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

### Journey Definition

A Journey is defined by two things:

1. The "rules" you use to define the target audience for the Journey.
2. The possible "views" you wish to show to this audience.

For example, if you want to show a specific banner on your product pages, that would be one Journey. But if you wanted to show a banner to users with the app and a full-screen interstitial to users without the app, that would require two different Journeys because you're targeting two different audiences.

For some example Journeys, see our [Examples]({{base.url}}/next-steps/journeys/examples) section.

## Create a new Journey

You have two options when creating a new Journey. You can start completely from scratch by clicking the "Create a New Journey" button, or you can base a new Journey on an existing Journey by clicking the "..." button on any existing Journey and selecting "Clone".

{% image src='/img/pages/next-steps/journeys/create-journey.png' half center alt='New Journeys' %}

When you create a new Journey you’ll need to give it a name. This name needs to be unique amongst all your Journeys, and is used for internal tracking purposes only. It will never be visible to your users.

{% image src='/img/pages/next-steps/journeys/journeys-name.png' half center alt='Name your Journey' %}

## Define your audience

Next you’ll define who you want to show this Journey to. You can segment your audience by platform, operating system, region, and filters based on user behavior.

{% image src='/img/pages/next-steps/journeys/audience-rules.png' full center alt='Define Audience' %}

### Platform

Currently, Journeys is only supported on mobile web.

### Devices (i.e. Operating System)

You can opt to show a given Journey to only Android users, only iOS users, or both.

### Regions {% premiumflag %}{% endpremiumflag %}

By default your Journey will be visible to any user in any country around the globe. If you wish to set up a Journey to display to only a specific country or group of countries, this is where you would set that up.

### Advanced Filters {% premiumflag %}{% endpremiumflag %}

The advanced filters give you the ability to group users based on actions they've taken (both within your app and on your mobile website), their interactions with your other Branch products (have they clicked on an ad powered by Branch?), what website they came from, which page they're currently viewing, whether they have the app installed, and so on.

We discuss the powerful ability to filter based on user behavior in detail in the [Advanced]({{base.url}}/next-steps/journeys/advanced#advanced-audience-rules) section.

After defining your audience, click "Save & Continue" to proceed.

## Configure Views

In this section you'll define the look and feel of the Journey.

### Determine Number of Variations {% premiumflag %}{% endpremiumflag %}

We provide the option to several views on a given Journey, as well as the ability to specify the proportion of visitors who will see each variation for the purposes of A/B testing. Some examples of this include:

- A single view that is only shown to 25% of visitors
- Two variations of the same banner to test the effectiveness of different button text
- Three variations testing full page vs. half page vs. quarter page interstitials

{% protip title="Premium Feature" %}
In order to define multiple views for a given Journey, you must enable premium features.
{% endprotip %}

{% image src='/img/pages/next-steps/journeys/journeys-variations.gif' full center alt='Set number of variations' %}

Select the number of variations you want and specify which proportion of your users you would like to display each variation to. The total percent of users cannot exceed 100%. If the total is less than 100% the remaining percent will not be shown any view.

### Style Each View

Each view uses a pre-defined template as its base. The templates include:

- Banners (displayed at the top or bottom of the screen)
- A floating button {% premiumflag %}{% endpremiumflag %}
- Full-/Half-/Quarter-page interstitials {% premiumflag %}{% endpremiumflag %}

{% image src='/img/pages/next-steps/journeys/journeys-templates.gif' full center alt='Select from a variety of templates.' %}

{% protip title="A Note about Google SEO & Full-screen Interstitials" %}
We always strive to adhere our solutions to SEO best practices as they continue to evolve, including the recent update from Google. Journeys enables mobile marketers to target specific audience segments based on different user behavior.  By combining the audience segmenting capability with the Journey creative, marketers have the flexibility to personalize user flows to ensure all mobile web users have a smooth experience.
{% endprotip %}

Selecting one of the templates will bring up a WYSIWYG editor. Clicking on each element in the editor will display options to customize that element. This includes setting custom images, custom text, custom link data, as well as defining certain widget behaviors. These options are discussed in greater detail in the [Advanced]({{base.url}}/next-steps/journeys/advanced) section.

{% image src='/img/pages/next-steps/journeys/journeys-editor.gif' full center alt='Edit the templates.' %}

Additionally, we provide a [CSS editor]({{base.url}}/next-steps/journeys/advanced/#css-editor){% premiumflag %}{% endpremiumflag %} which will give you full customization of the look/feel of the template.

After selecting each view’s template and customizing it as desired, click “Save & Continue” to proceed.

## Validate & Test

### Validation

We will run a series of checks to ensure that your Journey will perform as expected.

{% image src='/img/pages/next-steps/journeys/validation-messages.png' 2-thirds center alt='validation messages' %}

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

### Preview

Select which variation of your Journey you’d like to preview. Enter a URL for a page on your website where you’d like to test this Journey. This does not have to be a page where the Journey would normally show up, but the page does have to have the [Web SDK]({{base.url}}/basic-setup/setup-web-sdk) integrated.

Click on the “Get Test Link” button to convert the link into one which will display your Journey. You can then send this to yourself via text from the dashboard or email it to yourself.

If all previewed variations are satisfactory you can save it for later publication or publish immediately.

{% caution %}
Make sure that you have thoroughly validated each view in your Journey. Once a Journey has left the "Draft" state it can no longer be edited in any way. This restriction is in place in order to ensure data integrity for your Journeys.
{% endcaution %}

## View Performance

### Analytics & attribution

Journeys map to [standard Branch analytics labels](https://dev.branch.io/getting-started/configuring-links/#analytics-labels):

- All Journeys: `feature` = `journeys`
- Each Journey: `campaign` = `[Journey Name]`
- Individual Templates: `tags` = `[Template Name]` (+ any additional tags you specify during configuration)

You can access your Journey’s performance by selecting **View Performance** from the actions menu in the Journeys Manager.

{% image src='/img/pages/next-steps/journeys/view-performance.png' quarter center alt='view performance' %}

### Using Source Analytics

You can also access Journeys analytics by selecting the above filters from the [Source Analytics](http://dashboard.branch.io/analytics/source) page of the Branch dashboard.

{% image src='/img/pages/next-steps/journeys/view-source-analytics.png' 2-thirds center alt='view performance using source analytics' %}

#### To compare all of your Journeys

1. Filter by `feature` = `journeys`

#### To compare variations within one Journey

1. Filter by `feature` = `journeys`
2. Filter by `campaign` = `[Journey Name]`

{% elsif page.advanced %}

## Advanced audience rules

You can target users on a more granular level - based on behavior like where they came from, whether they already have your app installed, and what they’ve done on your website or in your app. We've created a bunch of great examples on the [next tab]({{base.url}}/next-steps/journeys/examples).

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

## Dynamic Journeys layout customization

We now support the ability to customize the appearance of a Journey with a referring link. So, you can create a Branch link with a set of defined keys and values that will change properties such as the title or images of your Journey. If a user who does not have the app installed click on that link and is routed to your mobile website, these values will be used to override the default values of the Journey.

| **Link Data Key** | **Value** | **Example Value** |
| ---: | --- | --- |
| `$journeys_button_get_has_app` | The call to action button when the app is currently installed | "Open App" |
| `$journeys_button_get_no_app` | The call to action button when the app is **not** currently installed | "Install App" |
| `$journeys_title` | The title or main text of your Journey | "Download Appsolutely today" |
| `$journeys_description` | This is the description or subtitle in the frame | "This app is disrupting apps" |
| `$journeys_icon_image_url` | The app icon displayed in the layout | "https://mysite.com/image.png" |
| `$journeys_background_image_url` | The background image for the frame when the template supports it. *Coming soon!* | "https://mysite.com/background.png" |

Note that not all template support all override keys. For example, the floating button does not support title, description or icon image url. If a template is to be rendered and the key you've specified does not exist, we'll simply ignore it while rendering the template. 

## Clientside Javascript Journeys controls

There are a number of clientside APIs to help you build quality user experiences. See below:

### Use Javascript to block a Journey from showing

You can prevent Journeys from showing on a certain page by inserting `no_journeys` with the value of `true` into the options during initialization.

{% highlight javascript %}
<script type="text/javascript">
// load the Branch SDK file
branch.init('BRANCH_KEY', {
      'no_journeys': true
    }
);
</script>
{% endhighlight %}

### Listen to Journeys lifecycle events

You can easily listen to Journeys lifecycle events by registering listener functions like so:

{% highlight javascript %}

var listener = function(event) { console.log(event); }

// Specify an event to listen for
branch.addListener('willShowJourney', listener);

// Listen for all events
branch.addListener(listener);

{% endhighlight %}

| Listener Name | Description |
| --- | --- |
| willShowJourney | Journey is about to be shown. |
| didShowJourney | Journey's entrance animation has completed and it is being shown to the user. |
| willNotShowJourney | Journey will not be shown and no other events will be emitted. |
| didClickJourneyCTA | User clicked on Journey's CTA button. |
| didClickJourneyClose | User clicked on Journey's close button. |
| willCloseJourney | Journey close animation has started. |
| didCloseJourney | Journey's close animation has completed and it is no longer visible to the user. |

## Journeys text localization

Journeys now has an entire localization framework. Due to the complexity of this offering, we're not exposing it directly to partners. Please reach out to your account manager or integrations@branch.io to receive access to this functionality.

## CSS Editor {% premiumflag %}{% endpremiumflag %}

If you have an upgraded premium account, you may also modify your CSS code directly in addition to using the WYSIWYG View Editor. To do so, go to the **Configure Views** step, click to edit a template, and then select the **CSS Editor** tab on the **Customize Template** screen.

{% image src='/img/pages/features/journeys/view-css-editor.png' third center alt='view editor and css editor toggle' %}

## Custom fonts with Journeys

1) Go to [Google Fonts](https://fonts.google.com/) and select a font.

{% image src='/img/pages/features/journeys/font_embedding.png' center half alt='Font embedding' %}

2) Add to CSS EDITOR in Journeys. Please note: trailing semicolon on @import line is important. It's always good to have a fallback web font in case the google font fails to load.

{% image src='/img/pages/features/journeys/custom_font.png' center half alt='Custom Fonts' %}

## Template customization options

The customization options available depend on the template chosen:

- [Smart Banner](#smart-banner)
- [Full Screen Interstitial](#full-screen-interstitial) {% premiumflag %}{% endpremiumflag %}
- [Half Page Interstitial](#full-screen-interstitial) {% premiumflag %}{% endpremiumflag %}
- Floating Button {% premiumflag %}{% endpremiumflag %}

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

## Open app if installed

You can call `setBranchViewData` after you initilize the Web SDK on your page and include `open_app: true` as a key/value pair. Doing this will effectively click on the Journey as soon as it loads, provided the user has the app installed.

{% highlight javascript %}
<script type="text/javascript">
// Load the Branch SDK file
{% ingredient web-sdk-initialization %}{% endingredient %}

// Define the Journey's data
branch.setBranchViewData({
    /* This will force the app to open if present */
    open_app: true,

    tags: ['march_promo'],
    data: {
        offerCode: 'MARCH2017'
    }
});
</script>
{% endhighlight %}

{% elsif page.examples %}

These example Journeys are intended to give you an idea of how to utilize the customization options that Journeys offers.

## 1. Basic Banner

This Journey will display a basic banner, similar to the native iOS and Android banners, to all users across your entire site.

### Website Setup

All web pages on your website have the [Web SDK]({{base.url}}/basic-setup/setup-web-sdk/) set up.

### Audience Definition

All settings will be set to the default values.

### View Configuration

We'll have a single view using the `Branch Banner Top` template. We'll use our app's icon for the image, set our title, and a brief blurb about the app. We'll keep the default button text (defaults to OPEN/GET for users who do/do not have the app installed).

## 2. A/B Test with Two Banners

This Journey will test out the effectiveness of two different banners.

### Website Setup

All web pages on your website have the [Web SDK]({{base.url}}/basic-setup/setup-web-sdk/) set up.

### Audience Definition

All settings will be set to the default values.

### View Configuration

We will define two variations. The first variation will target 50% of the audience, use `Branch Banner Top` as the template, and all the same settings as with the [Basic Banner](#basic-banner). We will give it the name "Basic Banner" so that it will show up as such in the tags.

The second variation will also target 50% of the audience and use `Template 5` (the skinny banner) as its template. We'll set the background color of the banner as well as the button to something appropriately themed. We'll use a smaller version of our icon as the image, and maintain the default button text. We will give it the name "Skinny Banner" so that we can differentiate the variation.

## 3. Convert Frequent Web Visitors

This Journey is intended to target users who regularly visit your mobile web site and present them with a strong call to action which contains an incentive to download the app.

For the purposes of this example, we assume that your app has some mechanism to use promotional codes from Branch Link data. The promotional code we use will give the user **free shipping** on their first purchase.

### Website Setup

All web pages on your website have the [Web SDK]({{base.url}}/basic-setup/setup-web-sdk/) set up.

### Audience Definition

We will use the default settings for Platforms, Devices, and Regions. We will add two advanced filters.

1. __<u>Has visited web</u> &nbsp; <u>more than or equal to</u> &nbsp; <u>3</u>__ times.
2. __<u>Has the app installed</u> &nbsp; <u>false</u>__

### View Configuration

We'll use a single view for 100% of our target audience. This view will use the template `Template 1` as its basis. We set the background image to something relevant to our app. The title will be set to "FREE SHIPPING" and the description to "on your first purchase". The button will have Deep Link Data set with the key "promo_code" whose value is "FREE-SHIPPING-BANNER".

## 4. Product-Specific Journeys

This Journey will live on your product pages and capture the context of what the user is viewing. When they install the app using this Journey they'll automatically be taken to the in-app product page for what they had been viewing.

We assume that the product pages on your website are all of the pattern: 

`https://www.mydomain.com/product/xxxx.html`

### Website Setup

All web pages on your website have the [Web SDK]({{base.url}}/basic-setup/setup-web-sdk/) set up.

We also need to capture the context of the current product page so that the Mobile SDK knows how to link to it. How this is done depends on your deep link routing logic. Take a moment to [review]({{base.url}}/basic-setup/before-getting-started/).

#### Using the Full URL of the Page

No further work is required.

#### Using a Path or Part of the Path

If you're already using [Facebook App Link]({{base.url}}/basic-setup/setup-web-sdk/#what-about-facebook-app-link-tags) tags, you're all set. Otherwise you could set the path using [Hosted Deep Link Data]({{base.url}}/basic-setup/setup-web-sdk/#hosted-deep-link-data) tags. You could also use the Web SDK method `setBranchViewData` to dynamically set the path.

#### Using Specific Keys/Values

You'll need to update your page generation mechanism to include the required key/value pairs using [Hosted Deep Link Data]({{base.url}}/basic-setup/setup-web-sdk/#hosted-deep-link-data) tags.

### Audience Definition

We will use the default settings for Platforms, Devices, and Regions. We will add one advanced filter.

1. __<u>Is viewing a page url</u> &nbsp; <u>containing</u> &nbsp; <u>product</u>__

### View Configuration

## 5. Personalized Journey

This Journey is a full-page interstitial intended to be shown to users coming from an email campaign. The Branch link they click from the email will take advantage of some of the [layout customization keys]({{base.url}}/next-steps/journeys/#dynamic-journeys-layout-customization) mentioned in the Advanced section to customize the experience.

| KEY | VALUE | EXPLANATION |
| :--- | :--- | :--- |
| `$journeys_title` | "Hey (username)," | Replace '(username)'' with the user's actual name. This will replace the title for the Journey. |
| `$journeys_background_image_url` | Some image relevant to the user | This will replace the full-screen background image for the interstitial. |

{% protip title="Note:"%}
Right now the only way to customize the look/feel of a Journey outside of the dashboard is by using these key/value pairs in a Branch link that takes the user to your mobile website.
{% endprotip %}

### Website Setup

All web pages on your website have the [Web SDK]({{base.url}}/basic-setup/setup-web-sdk/) set up.

### Audience Definition

We only want to show this Journey for people who came from our email campaign.

We will use the default settings for Platforms, Devices, and Regions. We will add one advanced filter.

1. __<u>Has clicked on email</u> &nbsp; <u>more than or equal to</u> &nbsp; <u>1</u>__ time

### View Configuration

We'll start with a single full-screen interstitial targeting 100% of our intended audience. We'll populate it with some default text that can easily be overridden by the link data.

Select the `Template 1` template. Change the title text so something generic, like "Hey there!" Then 

{% elsif page.support %}
## Troubleshooting

### Calls to [branchsubdomain] blocked

{% ingredient branchsubdomain %}{% endingredient %}

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'">
{% endhighlight %}

### Non-mobile optimized sites

If you're not using a mobile viewport tag (`<meta name="viewport" content="width=device-width initial-scale=1, maximum-scale=1, user-scalable=no">`) because your site isn't mobile optimized, Journeys will look shrunken and weird. Don't worry, we have you covered:

1. design the banner as you would like it to look on your site
2. Go to the CSS editor and scroll to the bottom of the CSS code
3. Add two properties to the #branch-banner selector
    - `height: 228;`
    - `zoom: 3;`

The image will not look scaled properly in the editor view. This is because the dashboard is mobile optimized. Use the preview test link on the validation page to make sure the banner looks right
{% endif %}