---
type: recipe
directory: third-party-integrations
title: Other Email Service Providers
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

## Email + Branch Deep Linking

It has always been possible to put normal Branch deep links into emails and send them out. It has always been fairly time-consuming (you had to convert individual web links to Branch deep links). With iOS 9, things got much worse. Apple basically [forced developers to adopt Universal Links](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links), which did not work in emails that had click tracking enabled.

Branch's solution to this has been to work with email service providers to make Universal Links work again. At the same time, we tackled the problem of manually creating Branch links for emails. Our solution allows marketers to paste normal web links into an email, then a script rewrites those links as Branch deep links.

## Partnering with Branch

If you are an email service provider and wish to partner with Branch to offer deep links in emails, please read this guide.

If you use Branch and wish to use deep links in email but do not see your current email service provider listed in these docs, please reach out to them and send them this guide.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}



## Two approaches to email: API vs UI (Dashboard)

Email Service Providers (ESPs) typically allow partners to send emails via two mechanisms: APIs and UIs, such as dashboards. Both mechanisms are valuable. The breakdown of responsibilities for converting normal emails to deep linked emails is slightly different for these two mechanisms.

In short, when emails are sent via APIs, it is the partner's responsibility to convert normal web links to Branch deep links. Branch has examples of how to do this in both Javascript and Python. However, when emails are sent via an ESP dashboard, such as a template designer, this responsibility falls to the ESP. See the section on [Rewriting links](TODO) below.

The following two sections cover sending emails via API versus ESP-provided UIs. Note that the initial steps are the same for both mechanisms.



## Sending emails via API

### One-time setup for Email Service Providers (ESP)

ESPs must:

1. Allow customizing the click tracking domain. A company should be able to provide a custom domain to the ESP, such as email-companyname.app.link. Then when the ESP rewrites links for click tracking, it should use this domain.
2. Provide Branch with nameservers or CNAME information so that Branch can proxy requests from the custom click tracking domain through to the ESP.
3. (Optional) Change backend to accept the X-Forwarded-For HTTP header, since Branch will be proxying requests through. This only matters if reporting provided by the ESP includes IP address of users.

### One-time setup for Partners

Partners using the ESP and Branch must:

1. Ask Branch for custom click tracking domain, such as email-companyname.app.link, and provide that to the ESP
2. Work with Branch to set up [redirect behavior and tracking](TODO)
3. Rewrite normal web links as Branch deep links, [using a Branch-provided script](TODO) ("REWRITING LINKS")



## Sending emails via UI (Dashboard)

### One-time setup for Email Service Providers (ESP)

ESPs must:

1. Allow customizing the click tracking domain. A company should be able to provide a custom domain to the ESP, such as email-companyname.app.link. Then when the ESP rewrites links for click tracking, it should use this domain.
2. Provide Branch with nameservers or CNAME information so that Branch can proxy requests from the custom click tracking domain through to the ESP.
3. (Optional) Change backend to accept the X-Forwarded-For HTTP header, since Branch will be proxying requests through. This only matters if reporting provided by the ESP includes IP address of users.
4. Rewrite normal web links as Branch deep links, [using a Branch-provided script](TODO) ("REWRITING LINKS")

### One-time setup for Partners

Partners using the ESP and Branch must:

1. Ask Branch for custom click tracking domain, such as email-companyname.app.link, and provide that to the ESP
2. Work with Branch to set up [redirect behavior and tracking](TODO)
3. Indicate which links should be rewritten as Branch deep links. The ESP should provide a method, such as appending `?deeplink=true` to URLs, that allows the partner to indicate whether a link should be rewritten.



## What Branch handles

Regardless of whether emails are sent via API or UI (Dashboard), Branch is responsible for:

1. Generating and hosting the apple-app-site-association file
2. Generating a custom domain, such as email-companyname.app.link
3. Proxying non-apple-app-site-association traffic to email-companyname.app.link through to the ESP
4. Routing of all deep links, including Universal Links
5. Automatic "clicking" of Universal Links. This allows ESPs to track clicks on Universal Links even though these links skip the browser entirely!



## Rewriting links

You will need to convert your links from normal web links to Branch deep links. We have provided [a script](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-branch-sdk-js) for doing so, as well as [an example](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-sendgrid-demo-js). The example takes an html email (as a string) and applies the script to it.

Here is the script:
{% highlight js %}
var crypto = require('crypto');
module.exports = function(original_url, branch_base_url, branch_hmac_secret, three_p_url) {
	if (!original_url) { return new Error('Missing original_url'); }
	if (typeof original_url != 'string') { return new Error('Invalid original_url'); }
	if (!branch_base_url) { return new Error('Missing branch_base_url, should be similar to https://bnc.lt/abcd/3p?%243p=xx'); }
	if (typeof branch_base_url != 'string') { return new Error('Invalid branch_base_url'); }
	if (!branch_hmac_secret) { return new Error('Missing branch_hmac_secret'); }
	if (typeof branch_hmac_secret != 'string') { return new Error('Invalid branch_hmac_secret'); }
	if (three_p_url && typeof three_p_url != 'string') { return new Error('Invalid three_p_url'); }

	var pre_hmac_url = branch_base_url + (three_p_url ? '&%243p_url=' + encodeURIComponent(three_p_url) : '') + '&%24original_url=' + encodeURIComponent(original_url),
		hmac = crypto.createHmac('sha256', branch_hmac_secret).update(pre_hmac_url).digest('hex');
	return pre_hmac_url + '&%24hmac=' + hmac;
};
{% endhighlight %}

Here is how links look before and after (the latter being a Branch deep link).

1. *Before:* http://example.com/?foo=bar
2. *After:* https://vza3.app.link/3p?%243p=st&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar&%24hmac=221dd9fb333d809b22fbdfd9b87808de73e3cd94f99b8eb26e6181e962fcb438

(note that these are simplified examples, not actual demo links)



## Web only content

The ESP can determine which tracked links should function as Universal Links, i.e. should open the app. As an example, one ESP currently has their tracked links of the form `https://esp-tracking.com/{hash}` and `https://esp-tracking.com/uni/{hash}`. Then when Branch automatically generates the apple-app-site-association file, it specifies that only links of the form `https://esp-tracking.com/uni/{hash}` should open the app. This allows links without in-app content, such as unsubscribe links or password reset links, to not open the app. We highly recommend this approach. Please notify Branch of what path you wish to use for links that should open the app.



{% elsif page.advanced %}


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
In future releases, the Branch marketing link creator will also scrape your web URL for deep link data to make link creation even easier.
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
In a future release (scheduled for September) customers will have the ability to choose not to open the app at all rather than open the app and launch a browser.
{% endprotip %}


## AASA file for Universal Link support

We will host an Apple App Site Association (AASA) file for you, so that your click tracking domain appears to Apple as a Universal Link, and the app will open and deep link.

You will need to set up a click tracking domain with Branch and SendGrid. Contact your Branch Account Manager and we will provision a domain for you, which you can then provide to SendGrid.

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
| Click Tracking URL | https://email.shop.com/click/abcde12345 | A SendGrid generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

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

## Coming soon: Don’t open the app
In some cases you may have content on web that isn’t in the app - for example, a temporary Mother’s Day promotion or an unsubscribe button. In this case, ideally you would be able to specify in the email that that link should not open the app. At the moment, the app will open, and the customers will then be taken to a browser. Oracle Responsys and Branch are working together to provide a solution where the customers will never enter the app if the content doesn't live in the app. That feature is scheduled for release in September 2016.

{% endif %}
