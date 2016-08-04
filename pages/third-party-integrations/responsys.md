---
type: recipe
directory: third-party-integrations
title: Responsys
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
---

{% if page.overview %}

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

With a script provided by Branch, you can dynamically create Branch links in email. In any place the script is called, the web URL is converted into its corresponding Branch link. The email is then sent.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- You must have an EMD (Email Message Designer) enabled account in order to use the Branch integration. If you do not have one, or if you’re not sure, please talk to your Responsys Account Manager.

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.

- Your Branch account manager will walk you through the one time setup steps. Please see the Advanced tab for more detailed information.
{% endprerequisite %}

## One time setup

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) to enable remote deep linking functionality for emails, set up your app and host the necessary files for Universal Links. You can find more details about the one time setup steps in the "Advanced" tab.

{% caution title="Ensure compatibility on iOS 9+ with Responsys" %}
Deep linking on iOS 9+ devices requires Apple’s Universal Link technology. Branch will provide you with almost everything you need, but Responsys will have to host an apple-app-site-association file over a secure connection for the click tracking domain. Your Branch account manager will help with this step as well.
{% endcaution %}

## On-going use

Once you’ve completed the one time setup steps, it’s time to send your first email.

This step will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

### Configure your Responsys email templates

This code is referred to as the "Branch script" - this script will convert your web URLs to deep links.

The Responsys integration requires you to add email template code in two places.

1. At the top of an email template
2. Immediately before a hyperlink

Copy the following snippet, and using the “Source” view, paste the snippet directly under the `<html>` tag for every template you plan to add deep linking to.

{% highlight html %}
<#include "cms://contentlibrary/Branch_SDK/branch-sdk.htm">
{% endhighlight %}

### Create deep links

Wherever you are using `<a>` tags in your email templates, replace those with `<@deeplink>` tags, or `<@tracked_deeplink>` for web URLs that you would like to deep link.

{% example title="With Link Tracking Disabled" %}

**Before:**

`<a href=“https://branch.io”>Example link</a>`

**After:**

`<@deeplink “https://branch.io”>Example link</@deeplink>`
{% endexample %}

{% example title="With Link Tracking Enabled" %}
With link tracking enabled, you can still use Branch links in emails.

**Before:**

`<a href="https://branch.io/product/1234">Example link</a>`

**After:**

`<@tracked_deeplink "https://branch.io/product/1234">
<a href="${clickthrough('TEST_TRACKED_DEEPLINK' , 'deeplink=' + deeplink)}">Example link</a>`

This latter example pulls from a Link Table. Please work with your Branch Account Manager to make sure you have this set up properly.

{% endexample %}

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-template.png" center full alt='Deep Linked Email Responsys Example' %}


{% elsif page.advanced %}

## One time setup

### Upload the Branch Responsys SDK

{% caution %}
Your Branch account manager will do this with you. The full instructions are only here for reference. There is also a [tutorial video](https://www.youtube.com/watch?v=u8h8KlqFvo4) that walks through these steps.
{% endcaution %}

Navigate to your Content Manager, and under `All Content`, create a new folder called `Branch_SDK`. In that folder, create a new document called `branch-sdk`.

Paste the following code snippet into the file, and put your secret key in it:

{% highlight html %}
<#macro deeplink link_to_be_wrapped><#assign branch_base_url='BASE URL FROM BRANCH'><#assign branch_hash_secret='HASH SECRET FROM BRANCH'><#assign final_link=branch_base_url + link_to_be_wrapped?url('ISO-8859-1')><#assign hash=messagedigest(branch_hash_secret+final_link+branch_hash_secret,"SHA","hex")><#assign final_link=final_link+'&%24hash='+hash><a href="${final_link}"><#nested></a></#macro>
<#macro tracked_deeplink link_to_be_wrapped><#assign branch_base_url='BASE URL FROM BRANCH'><#assign branch_hash_secret='HASH SECRET FROM BRANCH'><#assign deeplink=branch_base_url + link_to_be_wrapped?url('ISO-8859-1')><#assign hash=messagedigest(branch_hash_secret+deeplink+branch_hash_secret,"SHA","hex")><#assign deeplink=deeplink+'&%24hash='+hash></#macro>
{% endhighlight %}

The code above does not include your base url or hash secret. You should obtain this from Branch.

{% example %}
Create a file for the Branch SDK and paste in the following:

{% highlight html %}
<#macro deeplink link_to_be_wrapped><#assign branch_base_url='https://bnc.lt/abcd/3p?%243p=rs'><#assign branch_hash_secret='F+sNEMK3Jg/3yskR3pB9fEgLuNFcrbROYTJwQ8ABno0='><#assign final_link=branch_base_url + link_to_be_wrapped?url('ISO-8859-1')><#assign hash=messagedigest(branch_hash_secret+final_link+branch_hash_secret,"SHA","hex")><#assign final_link=final_link+'&%24hash='+hash><a href="${final_link}"><#nested></a></#macro>
<#macro tracked_deeplink link_to_be_wrapped><#assign branch_base_url='https://bnc.lt/abcd/3p?%243p=rs'><#assign branch_hash_secret='F+sNEMK3Jg/3yskR3pB9fEgLuNFcrbROYTJwQ8ABno0='><#assign deeplink=branch_base_url + link_to_be_wrapped?url('ISO-8859-1')><#assign hash=messagedigest(branch_hash_secret+deeplink+branch_hash_secret,"SHA","hex")><#assign deeplink=deeplink+'&%24hash='+hash></#macro>
{% endhighlight %}

Screenshot:
{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-create-doc.png" 3-quarters center alt='Example Create Folder' %}

Your file structure should look as follows:
{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-manage-content.png" 3-quarters center alt='Example Manage Content' %}
{% endexample%}

## Setting up your link schema for email

The Branch script turns your web url (`ORIGINAL_URL` in the example snippet in this guide) into a Branch link.

There are four ways to do this. Your Branch account manager will set your app configuration up according to the technique you use.

If you use your web URL as a deep link value:

1. **URL path:** If you use the path of your web URL as your  `$deeplink_path` value, or any other deep link value, then the configuration will automatically take the path of the URL and put it in deep link data.
1. **Full URL:** If you use the full web URL as your `$deeplink_path` value, or any other deep link value, then the configuration will take the entire URL and put it in deep link data.

If you use unique key/value data as deep link values:

1. **Hosted deep link data:** You can host your deep link data on your website with a metatag that looks like this `<meta name="branch:deeplink:my_key" content="my_value" />` where `my_key` and `my_value` will become a key value pair in deep link data. For each web URL, Branch will look for those tags and embed the deep link data (if found) into the deep link. Note that Branch also accepts App Links tags for deep linking.
1. **As query parameters:** Simply append query parameters on to your web url and Branch will take those parameters and put them in deep link data.

{% protip title="Host deep link data for more than just emails" %}
In future releases, the Branch marketing link creator and Chrome extension will also scrape your web URL for deep link data to make link creation even easier.
{% endprotip %}

## App changes for Universal Link support

### Add your click tracking domain to your Associated Domains
To enable Universal Links on your click tracking domain, you'll need to add the click tracking domain to your Associated Domains entitlement. Follow [these instructions](/getting-started/universal-app-links/guide/ios/#add-the-associated-domains-entitlement-to-your-project) to add your click tracking domain to Associated Domains. Your domain will likely be entered as `applinks:email.example.com`.

### Handle links for web-only content

If you have links to content that exists only on web, and not in the app (for example, an Unsubscribe button, or a temporary marketing webpage that isn't in the app) then this code snippet will ensure all links that have not had the deep linking script applied will open in a browser.

You should add this code snippet inside the `deepLinkHandler` code block in `application:didFinishLaunchingWithOptions:`. Note that this uses query `open_web_browser=true`, but you can choose whatever you like. This should match the web URL you enter in the email.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
if (params[@"+non_branch_link"] && [params[@"+non_branch_link"] rangeOfString:@"open_web_browser=true"].location != NSNotFound) {
  NSURL *url = [NSURL URLWithString:params[@"+non_branch_link"]];
  if (url) {
    [application openURL:url];
    // check to make sure your existing deep linking logic, if any, is not executed
  }
}
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
if let nonBranchLink = params["+non_branch_link"] {
    if nonBranchLink.rangeOfString("open_web_browser=true") != nil, let url : NSURL = NSURL(string: params["+non_branch_link"]!) {
        application.openURL(url)
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip title="Do not open the app" %}
In a future release (scheduled for September) customers will have the ability to choose not to open the app at all rather than open the app and launch a browser.
{% endprotip %}


## AASA file for Universal Link support

Responsys will host an Apple App Site Association (AASA) file for you, so that your click tracking domain appears to Apple as a Universal Link, and the app will open and deep link.

To set up your AASA file, obtain the AASA file from your Branch account manager, send it to your Responsys CSM. Let them know that you'd like them to host this.

{% protip title="How does it work?"%}
Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will robotically “click” the link, registering the click with the ESP, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. See the "Support" tab for more information.
{% endprotip %}

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
The `<@deeplink >` and `<@tracked_deeplink >` tags even work with dynamic links injected via RPL.
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

## Coming soon: Don’t open the app
In some cases you may have content on web that isn’t in the app - for example, a temporary Mother’s Day promotion or an unsubscribe button. In this case, ideally you would be able to specify in the email that that link should not open the app. At the moment, the app will open, and the customers will then be taken to a browser. Oracle Responsys and Branch are working together to provide a solution where the customers will never enter the app if the content doesn't live in the app. That feature is scheduled for release in September 2016.

{% endif %}
