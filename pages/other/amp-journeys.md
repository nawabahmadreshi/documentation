---
type: recipe
directory: other
title: AMP Journeys
page_title: Journeys App Banner Platform
description: A complete guide to using the Journeys tool to drive high value, retained users to your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Apple Universal Links, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner, Interstitial, Download Interstitial
hide_platform_selector: true
hide_contents: true
hide_from_google_search: true
sections:
- amp
contents:
  number:
    - amp
alias: [ /features/journeys/, /features/journeys/overview/, /features/journeys/guide/, /features/journeys/advanced/, /features/journeys/examples/ ]
---

{% if page.amp %}

[Accelerated Mobile Pages (AMP)](https://www.ampproject.org/){:target="_blank"} are a way to build pages that serve static content so that they load in Google search results much faster. Google uses AMP to quickly serve content on mobile devices without users having to click through to a website to view the content, and Google prioritizes AMP pages at the top of mobile search results. 

AMP pages by design make it difficult for users to go anywhere except back to Google search, and difficult for you to convert users to your website or your app. With AMP-compatible Journeys, you can convert mobile web traffic from Google search results to your app and take advantage of Google’s prioritization of AMP pages. Select Journeys templates can be shown on your AMP-compatible website.

[image]

{% prerequisite %}

- To be prioritized in mobile search results, your webpage must be [AMP](https://www.ampproject.org/docs/){:target="_blank"}-compatible. If you do not want to build an AMP-compatible website, consider using [AMP Deepviews](#) for Google search instead.

{% endprerequisite %}

## Add the Branch AMP SDK to your site

The AMP SDK consists of 2-3 snippets that you can insert into your AMP page.

Add the following snippet between the AMP page’s `<head></head>` tags:
   {% highlight html %}<style amp-custom>#branch-amp-journey{bottom:0;width:100%;height:72px;position:fixed;}.hideme{width:100%;height:72px;left:24px;background-color:none;position:fixed;}.close{width:24px;height:100%;left:0;z-index:10000;background-color:none;position:fixed;}.branch-amp-journey-inner{position:relative;width:100%;height:100%;z-index:9999;}.donotdisplay{display:none;}</style>{% endhighlight %}

Modify the following snippet to include your domain instead of **`DOMAIN_HERE`** and your Branch key instead of **`BRANCH_KEY_HERE`** - in both the `amp-list` tag and the `amp-iframe` tag. You can find these in [Link Settings](https://dashboard.branch.io/link-settings){:target="_blank"} and [Account Settings](https://dashboard.branch.io/account-settings){:target="_blank"}.
   {% highlight html %}<amp-list tabindex=0 role="" on="tap:branch-amp-journey.hide" id="branch-amp-journey" src="https://DOMAIN-HERE/branch-amp-journeys-pre?branch_key=BRANCH_KEY_HERE&__aj_cid=CLIENT_ID(_s)&__amp_viewer=VIEWER&__aj_source_url=SOURCE_URL&__aj_canonical_url=CANONICAL_URL&__aj_v=1.0.0" layout=fixed-height height="72px"><template type="amp-mustache" id="journey-template"><a class="close" on="tap:branch-amp-journey.hide"></a><div class="hideme" ></div><amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="72px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe></template></amp-list>{% endhighlight %}
Then add the modified snippet between the `<body></body>` tags of your AMP page, preferably near or at the bottom.

Finally, if you do not already have the following AMP scripts on your page, add them between the AMP page's `<head></head>` tags:
   {% highlight html %}<script async src="https://cdn.ampproject.org/v0/amp-list-0.1.js" custom-element="amp-list"></script><script async src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js" custom-template="amp-mustache"></script><script async src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js" custom-element="amp-iframe"></script>{% endhighlight %} 

## Target AMP Web in your audience

You can target users on AMP pages by checking the box **AMP Web** on the Select Audience step:

{% image src='/img/pages/features/journeys/amp-checkbox.png' center half alt='AMP Web checkbox' %}

See the [Journeys Guide](/marketing-channels/journeys/guide#select-audience) for more information on selecting your audience.

### Audience rule limitations

Because cookies are restricted on both AMP and iOS, event-based audience rules on AMP Journeys are cookie-restricted. Practically, this means that targeting works *only within AMP* for the following rules:

* Has completed event
* Has visited web
* Has visited the app
* Has the app installed

Once a user has clicked a Branch link outside of AMP, event-based audience rules will adhere to the regular web cookie for that user, and will work across AMP and non-AMP web.

## Select an AMP-compatible template

Once you have your audience selected, you can configure your templates. Currently, only **Branch Banner Bottom** is supported on AMP because Google requires that banners not show in the top 75% of an AMP page. Over time, Branch will add support for more Journeys templates.

When you click **Select Template** from the **Configure Views** step, the **AMP-compatible** view type should already be selected, showing you the Journeys templates that are compatible with AMP:

{% image src='/img/pages/features/journeys/amp-select-template.png' center third alt='AMP-compatible templates' %}

Hover over the template and click **Create**.

### Customization limitations

For the time being, only banners of a fixed height and placement (bottom of the page) are compatible with AMP. This includes **Branch Banner Bottom**, or other custom banners with page placement on the bottom of the page and height of 76px.

## Validate & Test your AMP Journey

On the **Validate & Test** step, you will see AMP-specific messages if you have targeted **AMP Web** users on the [Select Audience](#target-amp-web-in-your-audience) step.

{% image src='/img/pages/features/journeys/amp-validation.png' center 2-thirds alt='AMP validation messages' %}

### The AMP SDK is not integrated

If Branch has not detected a click from your AMP page powered by the Branch AMP SDK, you will see an error on the **Validate & Test** step. [See what you need to add](#add-the-branch-amp-sdk-to-your-site).

### The selected template is not AMP-compatible

If Branch has detected that you have selected a template that is not compatible with AMP, you will see an error on the **Validate & Test** step. [See which templates are currently compatible](#customization-limitations).

## Deep linking with AMP

You can [configure links] with deep link data on AMP in two ways:

1. Add query parameters to your Branch link in the AMP SDK
1. Add deep link data to a Journey in the dashboard

{% protip title="Use $canonical_url for deep linking" %}
AMP Journeys, along with regular Journeys and the Quick Link Creator, automatically embeds `$canonical_url` in your link data based on meta tags on your web or AMP page. If you use this key to route to specific content in your app, you do not have to add anything extra for AMP.
{% endprotip %}

### Add query parameters in the AMP SDK

To deep link to specific content in your app, you can add query parameters to your Branch link within the `amp-iframe`. Here is what the `amp-iframe` looks like without any query parameters:

{% highlight html %}
<amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="72px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe>
{% endhighlight %}

If your deep linking keys were **productId** and **category**, for example, you would add `&productId=1234&category=shoes` to your `amp-iframe` like this:

{% highlight html %}
<amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="72px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0&productId=1234&category=shoes" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe>
{% endhighlight %}

If you are generating AMP pages programmatically, it makes sense to generate these keys as query params at the same time.

### Add deep link data in the Journeys dashboard

You can also add deep link data to a Journey in the dashboard. In the **Customize Template** screen, click the button and add your key:value pairs in the deep link data fields. For example if your deep linking key was **productId**:

{% image src='/img/pages/features/journeys/amp-deep-link-data.png' center 3-quarters alt='Add rule' %}

## AMP-specific restrictions

Because javascript is limited on AMP and cookies are restricted on both AMP and iOS, AMP Journeys does not support all of standard Journeys functionality. The following Journeys features are affected:

* Event-based audience rules work within AMP only or after a Branch link click on an AMP page. [Read more](#audience-rule-limitations).
* Only templates on the top of the page and equal to 76px in height show on AMP. [Read more](#customization-limitations).
* [Dismiss period](/marketing-channels/journeys/guide/#dismiss) is not supported - after dismiss, Journeys will show again during the next AMP session.
* [Client-side javascript controls](/marketing-channels/journeys/guide/#clientside-javascript-journeys-controls) are not supported.
* Auto-opening the app with open_app: true is not supported.
* [Deep linking with setBranchBiewData](/marketing-channels/journeys/guide/#deep-linking-from-the-banner-or-interstitial) is not supported. [Learn how](#deep-linking-with-amp) you can deep link to content from AMP pages.

{% endif %}
