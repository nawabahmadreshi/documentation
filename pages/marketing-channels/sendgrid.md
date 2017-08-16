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

Once you’ve completed the [one time setup steps](/marketing-channels/{{page.title}}/setup/), it’s time to send your first email.

This guide will help you identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

## Flag your deep links

In order for {{page.title}} to know that the email link should open the app, add `universal="true"` to the template HTML, for example:

{% highlight html %}
<a href="links.example.com" universal="true">Link to your app!</a>
{% endhighlight %}

## Options for generating Branch links for email

There are a few different ways you can create Branch links that are compatible with Deep Linked Email + {{ page.title }}. You will need to replace the web URLs in your templates with these. To create Branch links, you can either:

1. [Create email links via API without changing your email templates](#create-email-links-via-API-without-changing-your-email-templates)
1. [Convert all web links in your email to deep links](#convert-all-web-links-in-your-email-to-deep-links)

{% ingredient email-link-options %}{% endingredient %}

{% elsif page.support %}

{% ingredient email-support %}{% endingredient %}

{% endif %}