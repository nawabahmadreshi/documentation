---
type: recipe
directory: marketing-channels
title: Responsys
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
    - usage
alias: [ /third-party-integrations/responsys/, /third-party-integrations/responsys/overview/, /third-party-integrations/responsys/setup/, /third-party-integrations/responsys/usage/, /third-party-integrations/responsys/support/ ]
---

{% if page.overview %}

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

With a script provided by Branch, you can dynamically create Branch links in email. In any place the script is called, the web URL is converted into its corresponding Branch link. The email is then sent.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

{% getstarted %}{% endgetstarted %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- You must have an EMD (Email Message Designer) enabled account in order to use the Branch integration. If you do not have one, or if you’re not sure, please talk to your Responsys Account Manager.
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) at any time for assistance with the setup steps.

## Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="_blank"} section of the Branch dashboard. Select Responsys as your email service provider and click **Get Started**.

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

In the meantime, you can proceed to the next step: **Configure ESP**.

## Configure your ESP

To open the app directly on iOS 9.2+, you must configure your Responsys integration to support [Universal Links](/getting-started/universal-app-links/), and configure your app to support Responsys + Universal Links. In this step, you will also upload a snippet to Responsys so that your email links can be converted to Branch links that deep link into your app.

### Tell us your click tracking domain

{% image src="/img/pages/third-party-integrations/responsys/configure-responsys-1.png" center full alt='Click tracking domain' %}

You can retrieve your click tracking domain from your Responsys settings. Enter it in item 1 of this step. On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

### Send your AASA file to Responsys

{% image src="/img/pages/third-party-integrations/responsys/configure-responsys-2.png" center 2-thirds alt='Responsys CSM' %}

Your AASA file must be uploaded to your click tracking domain by Responsys. Your Responsys CSM will do this for you - enter their email and click **Send**, and they will receive an email with the file and request to upload.

### Configure your app for your click tracking domain

{% image src="/img/pages/third-party-integrations/responsys/configure-responsys-3.png" center 2-thirds alt='Developer email' %}

In this prompt, enter the email of someone on your team who is qualified to modify your iOS app, and then click **Send**. They will complete the [technical setup](#technical-setup) steps below.

### Upload the Branch Responsys SDK

In this step, we'll upload an SDK that makes it very easy to create deep links in your emails.

{% protip title="Watch how to do this instead" %}
There is also a [tutorial video](https://www.youtube.com/watch?v=u8h8KlqFvo4){:target="_blank"} that walks through these steps.
{% endprotip %}

1. Press the **Copy** button to copy your snippet to clipboard: {% image src="/img/pages/third-party-integrations/responsys/configure-responsys-4.png" center 2-thirds alt='Branch Responsys SDK' %}
1. Log in to your Responsys account.
1. In the Responsys Dashboard, open your Content Library. You can also access it via the Shortcuts screen on the main page: {% image src="/img/pages/third-party-integrations/responsys/responsys-shortcuts.png" center third alt='Responsys Shortcuts' %}
1. Once you are in the Content Manager, you’ll see a list of folders where content is stored. Under **All Content**, create a new folder named `Branch_SDK`: {% image src="/img/pages/third-party-integrations/responsys/responsys-new-folder.png" center 2-thirds alt='Responsys new folder' %}
1. Select the **Branch_SDK** folder and then click **Create Document**: {% image src="/img/pages/third-party-integrations/responsys/responsys-create-document.png" center 2-thirds alt='Responsys create document' %}
1. In the Create Document window:
  * Enter `branch-sdk` in the “Document Name” field. 
  * In the **Content Box**, delete all the text. 
  * Paste the snippet you copied in **1**. 
  * Click Save. {% image src="/img/pages/third-party-integrations/responsys/responsys-snippet.png" center 2-thirds alt='Responsys snippet' %}

You have now successfully created the deep linking script. Your file structure should look as follows:
{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-manage-content.png" full center alt='Example Manage Content' %}

{% example title="Code snippet" %}
The snippet will follow this format: {% highlight html %}
<#macro deeplink link_to_be_wrapped><#assign branch_base_url="BASE URL FROM BRANCH"><#assign final_link=branch_base_url + "&%24original_url=" + link_to_be_wrapped?url("ISO-8859-1")><a href="${final_link}"><#nested></a></#macro> 
<#macro tracked_deeplink link_to_be_wrapped><#assign branch_base_url="BASE URL FROM BRANCH"><#assign deeplink=branch_base_url + "&%24original_url=" + link_to_be_wrapped?url("ISO-8859-1")></#macro>
{% endhighlight %}
The code above has a placeholder for your base url. Retrieve your snippet from the [Deep Linked Email setup flow](https://dashboard.branch.io/email){:target="_blank"}.
{% endexample %}

## Technical setup

The following app changes ensure that your email integration supports [Universal Links](/getting-started/universal-app-links/). You will need access to your app code to make these changes.

You should have [received an email from Branch](#configure-your-app-for-your-click-tracking-domain) with your Responsys click tracking domain. If not, likely you or someone on your team still needs to complete the [Deep Linked Email setup flow](https://dashboard.branch.io/email){:target="_blank"}.

{% protip title="How does it work?"%}
Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will robotically “click” the link, registering the click with the ESP, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. See the [Support](/third-party-integrations/responsys/support) tab for more information.
{% endprotip %}

### Add your click tracking domain to your Associated Domains

To enable Universal Links on your click tracking domain, you'll need to add the click tracking domain to your Associated Domains entitlement. 

1. In Xcode, go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains` if it is not already enabled. {% image src='/img/pages/getting-started/universal-app-links/enable_ass_domains.png' 3-quarters center alt='enable xcode associated domains' %}
1. Copy your click tracking domain from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), or retrieve it from your Responsys settings.
1. In the `Domains` section, click the `+` icon and add your click tracking domain. For example, if your click tracking domain is `email.example.com`, add an entry for `applinks:email.example.com`.
{% image src='/img/pages/getting-started/universal-app-links/add_domain.png' 3-quarters center alt='xcode add domain' %}

{% protip title="Having trouble or new to Universal Links?" %}
Follow [these instructions](/getting-started/universal-app-links/guide/ios/) for more details on enabling Universal Links in the Branch dashboard and in Xcode.
{% endprotip %}

## Validate and send emails

{% image src="/img/pages/third-party-integrations/responsys/validation.png" center full alt='Click tracking domain' %}

The last step of the [Deep Linked Email setup flow](https://dashboard.branch.io/email){:target="_blank"} validates whether you have completed steps 1 and 2 and whether an engineer on your team has completed the [technical setup](#technical-setup) steps. From here you can also access [guides for ongoing use](/third-party-integrations/responsys/usage) of Deep Linked Email.

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

### Ongoing use of Deep Linked Email

Once you’ve completed the [one time setup steps](/third-party-integrations/responsys/setup/), it’s time to send your first email.

This guide will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

## Configure your Responsys email templates

This code is referred to as the "Branch script" - this script will convert your web URLs to deep links.

The Responsys integration requires you to add email template code in two places.

1. At the top of an email template
2. Immediately before a hyperlink

Copy the following snippet, and using the “Source” view, paste the snippet directly under the `<html>` tag for every template you plan to add deep linking to.

{% highlight html %}
<#include "cms://contentlibrary/Branch_SDK/branch-sdk.htm">
{% endhighlight %}

## Create deep links

Wherever you are using `<a>` tags in your email templates, replace those with `<@deeplink>` tags, or add `<@tracked_deeplink />` for web URLs that you would like to deep link.

{% example title="With Link Tracking Disabled" %}

**Before:**

`<a href="https://branch.io">Example link</a>`

**After:**

`<@deeplink "https://branch.io">Example link</@deeplink>`
{% endexample %}

{% example title="With Link Tracking Enabled" %}
With link tracking enabled, you can still use Branch links in emails.

**Before:**

`<a href="https://branch.io/product/1234">Example link</a>`

**After:**

`<@tracked_deeplink "https://branch.io/product/1234" />
<a href="${clickthrough('TEST_TRACKED_DEEPLINK' , 'deeplink=' + deeplink)}">Example link</a>`

This latter example pulls from a Link Table. In the link table, set the `IOS Link URL` and `Android link URL` to the value `${deeplink}`.

{% endexample %}

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-template.png" center full alt='Deep Linked Email Responsys Example' %}

### Handle links for web-only content

In some cases you may have content on web that isn’t in the app - for example, a temporary Mother’s Day promotion or an unsubscribe button. You can designate links to only open on web if you use the Responsys Link Table feature. There are three URL fields in the link table when creating a new link: `LINK_URL`, `IOS_LINK_URL`, and `ANDROID_LINK_URL`. If you only enter the link in the `LINK_URL` field, the path of the final click-wrapped url will begin with `/pub/cc`, whereas if you input an `IOS_LINK_URL`, then the path of the final click-wrapped url will begin with `pub/acc`. You should set up your AASA file to whitelist only the path `/pub/acc*` in order to not launch the app from web-only links.

{% image src="/img/pages/third-party-integrations/responsys/branch_responsys_webonly.png" center full alt='Branch Responsys Web-Only' %}

{% image src="/img/pages/third-party-integrations/responsys/branch_responsys_deeplink.png" center full alt='Branch Responsys Deep-Link' %}

{% elsif page.support %}

## How does link creation work?

### Three stages of a link

| Link name| Link example | Link description
| --- | --- | --- | ---
| Original link | https://www.shop.com/product | This is the original link that you would put in an email. If emails are dynamically personalized, this will be the link that is filled in by the personalization engine.
| Branch link | https://branch.shop.com/?original_url=https%3A%2F%2Fwww.shop.com%2Fproduct | A Branch deep link, that handles all redirection for users on any platform, with or without the app.
| Click Tracking URL | https://email.shop.com/click/abcde12345 | A Responsys generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-creation-flow.png" center full alt='Deep Linked Email Creation Flow' %}

### Redirect behavior and tracking

When your customer clicks the click tracking link in an email, the browser will generally open. Once in the browser, the click tracking redirect will happen, followed by an instant redirect to the Branch link. At this point, Branch will either stay in the browser, and load the original URL (if the app is not installed, or the customer is on a desktop device), or Branch will open the app and deep link to content. Branch uses the information from the original URL to deep link to the correct in-app content.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-post-click.png" center full alt='Branch Email Deep Linking Redirects' %}

## Styling
If you include style tags within your `<a>` tags, you’ll need to separate those out into a separate div inside the `<@deeplink>` tag. If you use tracked links with `<a>` tags, those will work fine.

{% example title="Style Tags within your anchor tags" %}

**Before:**

{% highlight html %}
<a href="https://branch.io/" style="color:#000001; text-decoration:none;">Branch Website</a>
{% endhighlight %}

**After:**

{% highlight html %}
<@deeplink "https://branch.io/"><div style="color:#000001; text-decoration:none;">Branch Website</div></@deeplink>
{% endhighlight %}

{% endexample%}

## Launch failed error
You’ll see this error if you haven’t included the `<#import >` snippet in your template.

{% example title="Launch failed error" %}
{% highlight objc %}
Launch Failed: Launch failed: Template /contentlibrary/branch test campaign/My Default Template.htm caused an execution error: on line 183, column 92 in cms://contentlibrary/branch test campaign/Content.htm: deeplink is not a user-defined directive. It is a freemarker.template.SimpleScalar
{% endhighlight %}
{% endexample%}

## Using dynamic data from profile extension tables
{% example %}
The `<@deeplink >` and `<@tracked_deeplink />` tags even work with dynamic links injected via RPL.
{% highlight html %}<@deeplink "${latestProduct.url}">${latestProduct.name}</@deeplink>{% endhighlight %}
{% endexample%}

## Universal links and click tracking
Apple introduced Universal Links starting with iOS 9. Apple introduced Universal Links starting with iOS 9. You must configure your app and your links in a specific way to enable Universal Link functionality. Branch guides developers through this process so that Branch links function as Universal Links.

For Universal Links to work, Apple requires that a file called an “Apple-App-Site-Association” (AASA) file must be hosted on the domain of the link in question. When the link is clicked, Apple will check for the presence of this file to decide whether or not to open the app. All Branch links are Universal Links, because we will host this file securely on your Branch link domain.

When you click a Branch link directly from an email inside the Mail app on iOS 9+, it functions as a Universal Link - it redirects directly into the desired app. However, if you put a Branch Universal Link behind a click tracking URL, it won’t deep link into the app. This is because generally, a click tracking URL is not a Universal Link. If you’re not hosting that AASA file on the click tracking URL’s domain, you aren’t going to get Universal Link behavior for that link.

**Solution**

To solve this, Responsys will host the AASA file on your click tracking domain. We’ll help you get set up with this, but it’s Responsys who will actually host the file.
Apple requires that the file is hosted on a “secure” domain. To qualify as secure, the domain must have a website security certificate. Branch will provide the file to Responsys, but you must provide the security certificate to the Responsys. You probably did this when you first set up your account with Responsys, but your CSM can confirm.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-universal-links.png" center full alt='Deep Linked Email Universal Links' %}

{% endif %}