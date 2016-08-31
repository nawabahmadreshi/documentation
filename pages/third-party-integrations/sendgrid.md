---
type: recipe
directory: third-party-integrations
title: SendGrid
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

{% ingredient email-paid-integration %}{% endingredient %}

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

With a script provided by Branch, you can dynamically create Branch links in email. This script will help you automatically re-write normal web links to be Branch deep links.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.

- Your Branch account manager will walk you through the one time setup steps. Please see the Advanced tab for more detailed information.
{% endprerequisite %}

## Contact Branch

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) to enable the SendGrid integration.

Give your Branch Account Manager your email click tracking domain (e.g. email.mydomain.com), and let them know you use SendGrid.

## Add your click tracking domain to your entitlements file

On iOS 9+ with Universal Links, Branch will be able to open the app directly from emails without going to the browser. To make this work, you'll need to update your app.

1. In the `Domains` section of your Entitlements, click the `+` icon and add your click tracking domain:
   * `applinks:email.mydomain.com`

{% image src='/img/pages/getting-started/universal-app-links/add_domain.png' 3-quarters center alt='xcode add domain' %}

## Set up your click tracking domain

Only do this step after you've given your Branch account manager your SendGrid click tracking domain.

1. Create a CNAME for your subdomain and point it to `thirdparty.bnc.lt`
1. Confirm with your Branch AM that the domain is working correctly.

## On-going use

Once you’ve completed the one time setup steps, it’s time to send your first email! This step will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

{% caution title="Flag your Universal Links" %}
In order for SendGrid to know that the Universal Link should open the app, add `"universal=true"` to the HTML, for example:

{% highlight html %}
<a href="links.example.com" universal="true">Link to your app!</a>
{% endhighlight %}

{% endcaution %}

### Making regular Branch links compatible with email

Be sure to add `$3p=sg" to the deep link data of any links you use in email to ensure Universal Link and click tracking works as expected.

### Create email links via API without changing your email templates

To create email links via API, please use the instructions on how to [create links via API](/getting-started/creating-links-other-ways/guide/#http-api), but include the following key value pairs in your call:

1. `"$3p":"sg"` This is required for Universal Link and click tracking functionality.
1. `"$original_url":"{{your web url URI encoded}}"` For each piece of content, include a URI encoded version of your content's web URL. You can also add deep link data as query parameters on that web URL. This ensures accurate Content Analytics reporting. **Example: `"$original_url":"https%3A%2F%2Fshop.com%2Fshoes%2Fbrown-shoes%3Fmy_key%3Dmy_value%26campaign%3Dshoe_discounts"`**

### Convert all web links in your email to deep links

We have provided [a way](/third-party-integrations/remote-deep-links/guide/) of easily converting web links to Branch links, as well as [an example](https://gist.github.com/derrickstaten/f9b1e72e506f79628ab9127dd114dd83#file-sendgrid-demo-js). The example takes an html email (as a string) and applies the script to it.

To use this script, make sure you've set up deep links according to one of the [linking schemas outlined here](/third-party-integrations/sendgrid/advanced/#setting-up-your-link-schema-for-email).

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
	return pre_hmac_url + '&%24hash=' + hmac;
};
{% endhighlight %}

Here is how links look before and after (the latter being a Branch deep link).

1. *Before:* http://example.com/?foo=bar
2. *After:* https://vza3.app.link/3p?%243p=st&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar&%24hash=221dd9fb333d809b22fbdfd9b87808de73e3cd94f99b8eb26e6181e962fcb438

(note that these are simplified examples, not actual demo links)

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

{% protip title="Do not open the app" %}
In a future release (scheduled for September) customers will have the ability to choose not to open the app at all rather than open the app and launch a browser. We'll provide more details soon.
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

{% endif %}
