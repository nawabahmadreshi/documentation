---
type: recipe
directory: third-party-integrations
title: ExactTarget
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
premium: true
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

- You must have the ExactTarget Sender Authentication Package (SAP) in order to benefit from Universal Links + click tracking functionality.
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.

- Your Branch account manager will walk you through the one time setup steps. Please see the Advanced tab for more detailed information.
{% endprerequisite %}

## One time setup

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) to enable remote deep linking functionality for emails, set up your app and host the necessary files for Universal Links. You can find more details about the one time setup steps in the "Advanced" tab.

{% caution title="Ensure compatibility on iOS 9+ with ExactTarget" %}
Deep linking on iOS 9+ devices requires Apple’s Universal Link technology. Branch will provide you with almost everything you need, but ExactTarget will host an apple-app-site-association file over a secure connection for the click tracking domain. Your Branch account manager will help with this step as well.
{% endcaution %}

### Add a new Content Area for easy deep linking

In this step, we'll add a content area that makes it very easy to create deep links in your email. 

1. Navigate to Email Studio > Content > Content Areas.
1. Create a new Content Area called `deeplink`. {% image src="/img/pages/third-party-integrations/exacttarget/et-content-areas.png" center full alt='With and Without Branch Deep Linked Email' %}
1. Choose "Free Form" **and navigate to the "HTML" tab of the Free Form editor.** {% image src="/img/pages/third-party-integrations/exacttarget/et-choose-free-form.png" center full alt='With and Without Branch Deep Linked Email' %}
1. Paste the following code snippet into the **HTML editor** of the Free Form Content Area, replacing `@branch_hash_secret` and `@branch_base_url` with values provided by your Branch Account Manager.

~~~
 %%[ VAR @deeplink, @branch_hash_secret, @branch_base_url, @hash SET @branch_hash_secret = "fake secret" SET @branch_base_url = "http://bnc.lt/abcd/3p?%243p=e_et" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) SET @hash = SHA256(CONCAT(@branch_hash_secret, CONCAT(@deeplink , @branch_hash_secret)),"UTF-16") SET @deeplink = CONCAT(@deeplink, CONCAT("&%24hash=", @hash)) ]%%
~~~

{% caution title="Add your details to the code snippet" %}
The snippet above has placeholders for `@branch_hash_secret` and `@branch_base_url`. Work with your Branch Account Manager to get the right information in your snippet. 
{% endcaution %}

{% image src="/img/pages/third-party-integrations/exacttarget/et-paste-code-snippet.png" center full alt='With and Without Branch Deep Linked Email' %}

Save your new Content Area.

## On-going use

Once you’ve completed the one time setup steps, it’s time to send your first email.

This step will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links. You can create email links via API or add code to your email template to create links.

### Create links via API without changing your email templates

To create email links via API, please use the instructions on how to [create links via API](/getting-started/creating-links/other-ways/#http-api), but include the following key value pairs in your call:

1. `"$3p":"e_et"` This is required for Universal Link and click tracking functionality.
1. `"$original_url":"{your web url URI encoded}"` For each piece of content, include a URI encoded version of your content's web URL. You can also add deep link data as query parameters on that web URL. This ensures accurate Content Analytics reporting. **Example: `"$original_url":"https%3A%2F%2Fshop.com%2Fshoes%2Fbrown-shoes%3Fmy_key%3Dmy_value%26campaign%3Dshoe_discounts"`**

### Add deep linking to your ExactTarget email templates without using an API

This code is referred to as the "Branch script" - this script will convert your web URLs to deep links. The script uses the Content Area to turn your web URL into a deep link.

Wherever you are using `<a>` tags in your email templates, replace those with a short snippet for web URLs that you would like to deep link.

~~~
%%[SET @link_to_be_wrapped = "ADD YOUR LINK HERE" ContentAreaByName("My Contents\deeplink")]%%

<a href="%%=RedirectTo(@deeplink)=%%">Click Me</a>
~~~

{% example title="Adding the Branch script" %}

**Before:**

`<a href="https://branch.io/product/1234">Example link</a>`

**After:**

`%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234" ContentAreaByName("My Contents\deeplink") ]%%`

`<a href="%%=RedirectTo(@deeplink)=%%">Example link</a>`

{% endexample %}

{% caution title="Content Area folder" %}
Make sure your `deeplink` Content Area is in the right folder. Either change the folder to "My Contents" or change the path used by "ContentAreaByName" in the Branch script.
{% endcaution %}

{% elsif page.advanced %}

## One time setup

## Setting up your link schema for email

The Branch script turns your web url into a Branch link. To do this, we must be able to map the your web URL content (e.g. https://shop.com/shoes/brown-loafers takes a customer to brown loafers) into a working deep link that takes a user to brown loafers in the app.

There are four ways to do this, depending on how you do deep linking. Your Branch account manager will set your app configuration up according to the technique you use.

If you use unique key/value data as deep link values:

1. Recommended: **Hosted deep link data:** You can host your deep link data on your website with a metatag that looks like this `<meta name="branch:deeplink:my_key" content="my_value" />` where `my_key` and `my_value` will become a key value pair in deep link data. For each web URL, Branch will look for those tags and embed the deep link data (if found) into the deep link. Note that Branch also accepts App Links tags for deep linking. For more details, please read [Hosted Deep Link Data](/getting-started/hosted-deep-link-data/guide/).
1. **As query parameters:** Simply append query parameters on to your web url and Branch will take those parameters and put them in deep link data.

If you use your web URL as a deep link value:

1. **URL path:** If you use the path of your web URL as your  `$deeplink_path` value, or any other deep link value, then the configuration will automatically take the path of the URL and put it in deep link data.
1. **Full URL:** If you use the full web URL as your `$deeplink_path` value, or any other deep link value, then the configuration will take the entire URL and put it in deep link data.

{% protip title="Host deep link data for more than just emails" %}
In future releases, the Branch marketing link creator will also scrape your web URL for deep link data to make link creation even easier.
{% endprotip %}

## App changes for Universal Link support

### Add your click tracking domain to your Associated Domains
To enable Universal Links on your click tracking domain, you'll need to add the click tracking domain to your Associated Domains entitlement. Follow [these instructions](/getting-started/universal-app-links/guide/ios/#add-the-associated-domains-entitlement-to-your-project) to add your click tracking domain to Associated Domains. Your domain will likely be entered as `applinks:email.example.com`.

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

{% protip title="Do not open the app" %}
In a future release (scheduled for mid-Q4 2016) customers will have the ability to choose not to open the app at all rather than open the app and launch a browser. ExactTarget uses this feature for your Unsubscribe button by default.
{% endprotip %}

## AASA file for Universal Link support

ExactTarget will host an Apple App Site Association (AASA) file for you, so that your click tracking domain appears to Apple as a Universal Link, and the app will open and deep link.

To set up your AASA file, obtain your Apple App Prefix and Bundle Identifier from your Branch Account Manager, and send it to your ExactTarget Account Manager.

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
| Click Tracking URL | https://email.shop.com/click/abcde12345 | An ExactTarget-generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-creation-flow.png" center full alt='Deep Linked Email Creation Flow' %}

### Redirect behavior and tracking

When your customer clicks the click tracking link in an email, the browser will generally open. Once in the browser, the click tracking redirect will happen, followed by an instant redirect to the Branch link. At this point, Branch will either stay in the browser, and load the original URL (if the app is not installed, or the customer is on a desktop device), or Branch will open the app and deep link to content. Branch uses the information from the original URL to deep link to the correct in-app content.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-post-click.png" center full alt='Branch Email Deep Linking Redirects' %}

## Universal links and click tracking
Apple introduced Universal Links starting with iOS 9. Apple introduced Universal Links starting with iOS 9. You must configure your app and your links in a specific way to enable Universal Link functionality. Branch guides developers through this process so that Branch links function as Universal Links.

For Universal Links to work, Apple requires that a file called an “Apple-App-Site-Association” (AASA) file must be hosted on the domain of the link in question. When the link is clicked, Apple will check for the presence of this file to decide whether or not to open the app. All Branch links are Universal Links, because we will host this file securely on your Branch link domain.

When you click a Branch link directly from an email inside the Mail app on iOS 9+, it functions as a Universal Link - it redirects directly into the desired app. However, if you put a Branch Universal Link behind a click tracking URL, it won’t deep link into the app. This is because generally, a click tracking URL is not a Universal Link. If you’re not hosting that AASA file on the click tracking URL’s domain, you aren’t going to get Universal Link behavior for that link.

**Solution**

To solve this, ExactTarget will host the AASA file on your click tracking domain. We’ll help you get set up with this, but it’s ExactTarget who will actually host the file.

Apple requires that the file is hosted on a “secure” domain. To qualify as secure, the domain must have a website security certificate. This is why you need the Sender Authentication Package.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-universal-links.png" center full alt='Deep Linked Email Universal Links' %}

{% endif %}
