---
type: recipe
directory: other
exclude_from_google_search: true
title: PostUp
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
premium: true
sections:
- overview
- setup
- usage
- support
contents:
  number:
    - setup
alias: [ /third-party-integrations/postup/, /third-party-integrations/postup/overview/, /third-party-integrations/postup/setup/, /third-party-integrations/ostup/usage/, /third-party-integrations/postup/support/ ]
---

{% if page.overview %}

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

{% getstarted %}{% endgetstarted %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) at any time for assistance with the setup steps.

<!-- ## Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="_blank"} section of the Branch dashboard. Select PostUp as your email service provider and click **Get Started**.

{% image src="/img/pages/third-party-integrations/responsys/choose-esp.png" center full alt='Choose your email service provider' %}

## Set up deep linking for email

Branch turns the web URLs you put into your emails into Branch links. To do this, it must be possible to map your web URL content (e.g. a page with brown loafers at `https://shop.com/shoes/brown-loafers`) into a working deep link that takes users to brown loafers in the app. The Deep Linked Email [setup flow](https://dashboard.branch.io/email){:target="_blank"} will automatically detect this mapping for you.

### Enter a web URL

{% image src="/img/pages/third-party-integrations/responsys/enter-web-url.png" center full alt='Enter a web URL' %}

In this first step, you will want to enter a web URL that corresponds to a specific screen within your app. In other words, the webpage should have content that also exists in your app. If you do not know whether your web content also exists in-app, try any URL other than your website homepage. Some examples:

- A product page, like a page with brown loafers
- An article
- A content page, like a video or image

Once you choose one and click **Submit**, [meta tags that can be used for deep linking](/getting-started/hosted-deep-link-data/guide/) will be retrieved from your webpage. You will see a result indicating the mapping between your web content and your app content:

#### We think you use your web URL for deep linking

{% image src="/img/pages/third-party-integrations/responsys/web-url-result.png" 2-thirds center alt='Using your web URL for deep linking' %}

If your webpage, for instance at the URL `https://shop.com/shoes/brown-loafers`, has a tag like this:

`<meta name="al:ios:url" content="shop://https://shop.com/shoes/brown-loafers" />`

or this:

`<meta name="al:android:url" content="shop://shoes/brown-loafers" />`

Your deep linking setup for email will use all or part of your **web URL** as a deep link value. It can use either the full URL including the protocol (`https://shop.com/shoes/brown-loafers`), the full URL without the protocol (`shop.com/shoes/brown-loafers`), or the path of the URL (`shoes/brown-loafers`).

#### We think you host your deep link data on your website

{% image src="/img/pages/third-party-integrations/responsys/hosted-data-result.png" 2-thirds center alt='Using hosted data for deep linking' %}

If instead, your webpage has a tag like this:

`<meta name="branch:deeplink:product_id" content="123456" />`

or this:

`<meta name="al:ios:url" content="shop://id/123456" />`

Your deep linking setup for email will use the **hosted deep link data** method. This means that no mapping can be made to the URL, and [meta tags that can be used for deep linking](/getting-started/hosted-deep-link-data/guide/) will be retrieved from your webpage on an ongoing basis.

#### We couldn't determine your deep linking setup from your web URL

If there are no meta tags for deep linking on your webpage, or you indicate that the mapping is incorrect, you can try a Branch link instead.

{% image src="/img/pages/third-party-integrations/responsys/enter-branch-link.png" center 2-thirds alt='Enter a Branch link' %}

Here, you will want to enter a Branch link that opens to a page within your app (not the home screen). 

When you click **Submit**, the link's values for `$canonical_url`, `$desktop_url`, and `$fallback_url` will be compared against other values in the link. If there is a mapping between values for the full URL or the path of the URL, your deep linking setup for email will use those methods.

### Test your link

When you submit a web URL or Branch link, you will be prompted with a test link. Click this link on iOS and Android devices, and verify that it will open your app to the right place.

{% image src="/img/pages/third-party-integrations/responsys/test-link.png" center half alt='Test your link' %}

Once you click **Yes**, your deep linking will be set up for email. When a user clicks a link in your emails, we will embed the full web URL, path of the web URL, or retrieved deep link data from the webpage into a Branch version of that link and pass it to your app, so that it will open to the right place.

### We couldn't determine your deep linking setup

If an app deep linking scheme that maps to your web content cannot be successfully detected, a Branch account manager will be in touch to help you set up your deep linking for email. 

{% image src="/img/pages/third-party-integrations/responsys/failure-result.png" center 2-thirds alt='Could not set up deep linking' %}

We will help you set up one of the following methods:

If you use unique key/value data as deep link values:

1. _Recommended:_ **Hosted deep link data:** You can host your deep link data on your website with a metatag that looks like this `<meta name="branch:deeplink:my_key" content="my_value" />` where `my_key` and `my_value` will become a key value pair in deep link data. For each web URL, Branch will look for those tags and embed the deep link data (if found) into the deep link. Note that Branch also accepts App Links tags for deep linking. For more details, please read [Hosted Deep Link Data](/getting-started/hosted-deep-link-data/guide/).
1. **As query parameters:** Simply append query parameters on to your web url and Branch will take those parameters and put them in deep link data.

If you use your web URL as a deep link value:

1. **URL path:** If you use the path of your web URL as your  `$deeplink_path` value, or any other deep link value, then the configuration will automatically take the path of the URL and put it in deep link data.
1. **Full URL:** If you use the full web URL as your `$deeplink_path` value, or any other deep link value, then the configuration will take the entire URL and put it in deep link data.

{% protip title="Host deep link data for more than just emails" %}
The Branch [Quick Link creator](/getting-started/creating-links/dashboard/) also scrapes your web URL for deep link data to make link creation even easier. [Hosting Deep Link Data](/getting-started/hosted-deep-link-data/guide/) on your website will make using Branch products easier in future.
{% endprotip %}

In the meantime, you can proceed to the next step: **Configure ESP**. -->

## Configure your ESP

To open the app directly on iOS 9.2+, you must configure your PostUp integration to support [Universal Links](/getting-started/universal-app-links/), and configure your app to support PostUp + Universal Links.

### Prerequisites

- Confirm with your Branch Account Manager that you are enabled for the Branch email product.
- Notify your PostUp Account Manager that you plan to use Branch Deep Linked Email.

### Create a click tracking domain

We recommend creating a new click tracking domain for the PostUp integration. You can switch over your production click tracking domain to PostUp but we recommend testing with a different domain to get started.

1. Create a new click tracking domain like `clicktrack2.mycompany.com`
1. Create NS Records for PostUp (they should look like `ns1.texasdns.com`).
1. Notify your Branch and PostUp Account Managers that you have prepared your domain. 
1. PostUp will configure your domain and notify your Branch Account Manager that the domain is ready.
1. Branch will whitelist your integration. 

Once you've done this, an AASA file - required for Universal Links - specific to that domain will be generated.

### Configure your app for your click tracking domain

## Technical setup

The following app changes ensure that your email integration supports [Universal Links](/getting-started/universal-app-links/). You will need access to your app code to make these changes.

{% protip title="How does it work?"%}
Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will robotically “click” the link, registering the click with the ESP, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. See the [Support](/third-party-integrations/PostUp/support) tab for more information.
{% endprotip %}

### Add your click tracking domain to your Associated Domains

To enable Universal Links on your click tracking domain, you'll need to add the click tracking domain to your Associated Domains entitlement. 

1. In Xcode, go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains` if it is not already enabled. {% image src='/img/pages/getting-started/universal-app-links/enable_ass_domains.png' 3-quarters center alt='enable xcode associated domains' %}
1. Copy your click tracking domain from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), or retrieve it from your PostUp settings.
1. In the `Domains` section, click the `+` icon and add your click tracking domain. For example, if your click tracking domain is `email.example.com`, add an entry for `applinks:email.example.com`.
{% image src='/img/pages/getting-started/universal-app-links/add_domain.png' 3-quarters center alt='xcode add domain' %}

{% protip title="Having trouble or new to Universal Links?" %}
Follow [these instructions](/getting-started/universal-app-links/guide/ios/) for more details on enabling Universal Links in the Branch dashboard and in Xcode.
{% endprotip %}

### Handle links for web-only content

If you have links to content that exists only on web, and not in the app (for example, a temporary marketing webpage that isn't in the app) then this code snippet will ensure all links that have not had the deep linking script applied will open in a browser.

You should add this code snippet inside the `deepLinkHandler` code block in `application:didFinishLaunchingWithOptions:`. Note that this uses query `open_web_browser=true`, but you can choose whatever you like. This should match the web URL you enter in the email.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
if (params[@"+non_branch_link"] && [params[@"+from_email_ctd"] boolValue]) {
    NSURL *url = [NSURL URLWithString:params[@"+non_branch_link"]];
    if (url) {
        [application openURL:url];
        // check to make sure your existing deep linking logic, if any, is not executed, perhaps by returning early
    }
}
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
if let nonBranchLink = params["+non_branch_link"] as? String, let fromEmailCtd = params["+from_email_ctd"] as? Bool {
    if fromEmailCtd, let url : URL = URL(string: nonBranchLink) {
        application.openURL(url)
        // check to make sure your existing deep linking logic, if any, is not executed, perhaps by returning early
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Validate and send emails

{% image src="/img/pages/third-party-integrations/responsys/validation.png" center full alt='Click tracking domain' %}

The last step of the [Deep Linked Email setup flow](https://dashboard.branch.io/email){:target="_blank"} validates whether you have completed steps 1 and 2 and whether an engineer on your team has completed the [technical setup](#technical-setup) steps. From here you can also access [guides for ongoing use](/third-party-integrations/PostUp/usage) of Deep Linked Email.

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

### Ongoing use of Deep Linked Email

Once you’ve completed the [one time setup steps](/third-party-integrations/postup/setup/), it’s time to send your first email.

This guide will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

## Making regular Branch links compatible with email

Be sure to add `"$3p":"e_pu"` to the deep link data of any links you use in email to ensure Universal Link and click tracking works as expected.

## Create email links via API without changing your email templates

To create email links via API, please use the instructions on how to [create links via API](/getting-started/creating-links/other-ways/#http-api), but include the following key value pairs in your call:

1. `"$3p":"e_pu"` This is required for Universal Link and click tracking functionality.
1. `"$original_url":"{{your web url URI encoded}}"` For each piece of content, include a URI encoded version of your content's web URL. You can also add deep link data as query parameters on that web URL. This ensures accurate Content Analytics reporting. **Example: `"$original_url":"https%3A%2F%2Fshop.com%2Fshoes%2Fbrown-shoes%3Fmy_key%3Dmy_value%26campaign%3Dshoe_discounts"`**

## Convert all web links in your email to deep links

We have provided [a way](/third-party-integrations/remote-deep-links/guide/) of easily converting web links to Branch links, as well as [an example](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-sendgrid-demo-js). The example takes an html email (as a string) and applies the script to it.

To use this script, make sure you've set up deep links according to one of the [linking schemas outlined here](/third-party-integrations/sendgrid/setup/#set-up-deep-linking-for-email).

Here is the script:
{% highlight js %}
var crypto = require('crypto');
module.exports = function(original_url, branch_base_url) {
    if (!original_url) { return new Error('Missing original_url'); }
    if (typeof original_url != 'string') { return new Error('Invalid original_url'); }
    if (!branch_base_url) { return new Error('Missing branch_base_url, should be similar to https://bnc.lt/abcd/3p?%243p=e_pu'); }
    if (typeof branch_base_url != 'string') { return new Error('Invalid branch_base_url'); }

    return branch_base_url + '&%24original_url=' + encodeURIComponent(original_url);
};
{% endhighlight %}

Here is how links look before and after (the latter being a Branch deep link).

1. *Before:* http://example.com/?foo=bar
2. *After:* https://vza3.app.link/3p?%243p=e_pu&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar

(note that these are simplified examples, not actual demo links)

{% elsif page.support %}

## How does link creation work?

### Three stages of a link

| Link name| Link example | Link description
| --- | --- | --- | ---
| Original link | https://www.shop.com/product | This is the original link that you would put in an email. If emails are dynamically personalized, this will be the link that is filled in by the personalization engine.
| Branch link | https://branch.shop.com/?original_url=https%3A%2F%2Fwww.shop.com%2Fproduct | A Branch deep link, that handles all redirection for users on any platform, with or without the app.
| Click Tracking URL | https://email.shop.com/click/abcde12345 | A PostUp generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-creation-flow.png" center full alt='Deep Linked Email Creation Flow' %}

### Redirect behavior and tracking

When your customer clicks the click tracking link in an email, the browser will generally open. Once in the browser, the click tracking redirect will happen, followed by an instant redirect to the Branch link. At this point, Branch will either stay in the browser, and load the original URL (if the app is not installed, or the customer is on a desktop device), or Branch will open the app and deep link to content. Branch uses the information from the original URL to deep link to the correct in-app content.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-post-click.png" center full alt='Branch Email Deep Linking Redirects' %}

## Universal links and click tracking
Apple introduced Universal Links starting with iOS 9. Apple introduced Universal Links starting with iOS 9. You must configure your app and your links in a specific way to enable Universal Link functionality. Branch guides developers through this process so that Branch links function as Universal Links.

For Universal Links to work, Apple requires that a file called an “Apple-App-Site-Association” (AASA) file must be hosted on the domain of the link in question. When the link is clicked, Apple will check for the presence of this file to decide whether or not to open the app. All Branch links are Universal Links, because we will host this file securely on your Branch link domain.

When you click a Branch link directly from an email inside the Mail app on iOS 9+, it functions as a Universal Link - it redirects directly into the desired app. However, if you put a Branch Universal Link behind a click tracking URL, it won’t deep link into the app. This is because generally, a click tracking URL is not a Universal Link. If you’re not hosting that AASA file on the click tracking URL’s domain, you aren’t going to get Universal Link behavior for that link.

**Solution**

To solve this, Branch will host the AASA file on your click tracking domain. We’ll help you get set up with this.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-universal-links.png" center full alt='Deep Linked Email Universal Links' %}

{% endif %}