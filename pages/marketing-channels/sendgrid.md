---
type: recipe
directory: marketing-channels
title: SendGrid
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
alias: [ /third-party-integrations/sendgrid/, /third-party-integrations/sendgrid/overview/, /third-party-integrations/sendgrid/setup/, /third-party-integrations/sendgrid/usage/, /third-party-integrations/sendgrid/support/ ] 
---

{% if page.overview %}

{% ingredient email-overview %}{% endingredient %}

{% elsif page.setup %}

### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

{% ingredient email-set-up-deep-linking %}{% endingredient %}

You can retrieve your click tracking domains from your Sendgrid settings:

1. Log in to your SendGrid account.
1. Go to Settings > Whitelabels > Email Links. 
1. Find your email link whitelabeled domain, click on the gear icon and click "View" (or create a new whitelabel). {% image src='/img/pages/third-party-integrations/sendgrid/sendgrid-view-domain.png' full center alt='xcode add domain' %}
1. Note the "Host" email click tracking domain (e.g. email.mydomain.com) and the SendGrid domain under "Data". {% image src='/img/pages/third-party-integrations/sendgrid/sendgrid-whitelabel.png' full center alt='xcode add domain' %}
1. Enter both the click tracking domain and the SendGrid domain in item 1 of this step: {% image src="/img/pages/third-party-integrations/sendgrid/configure-sendgrid-1.png" center full alt='Click tracking domain' %}

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{% ingredient email-technical-setup %}{% endingredient %}

{% ingredient email-cname %}{% endingredient %}

{% ingredient email-associated-domains %}{% endingredient %}

{% ingredient email-validate-test %}{% endingredient %}

{% getstarted next="true" %}{% endgetstarted %}

{% elsif page.usage %}

### Ongoing use of Deep Linked Email

Once you’ve completed the [one time setup steps](/third-party-integrations/sendgrid/setup/), it’s time to send your first email.

This guide will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

{% caution title="Flag your Universal Links" %}
In order for SendGrid to know that the Universal Link should open the app, add `universal="true"` to the HTML, for example:

{% highlight html %}
<a href="links.example.com" universal="true">Link to your app!</a>
{% endhighlight %}

{% endcaution %}

## Making regular Branch links compatible with email

Be sure to add `"$3p":"e_sg"` to the deep link data of any links you use in email to ensure Universal Link and click tracking works as expected.

## Create email links via API without changing your email templates

To create email links via API, please use the instructions on how to [create links via API](/getting-started/creating-links/other-ways/#http-api), but include the following key value pairs in your call:

1. `"$3p":"e_sg"` This is required for Universal Link and click tracking functionality.
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
    if (!branch_base_url) { return new Error('Missing branch_base_url, should be similar to https://bnc.lt/abcd/3p?%243p=xx'); }
    if (typeof branch_base_url != 'string') { return new Error('Invalid branch_base_url'); }

    return branch_base_url + '&%24original_url=' + encodeURIComponent(original_url);
};
{% endhighlight %}

Here is how links look before and after (the latter being a Branch deep link).

1. *Before:* http://example.com/?foo=bar
2. *After:* https://vza3.app.link/3p?%243p=e_sg&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar

(note that these are simplified examples, not actual demo links)

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}