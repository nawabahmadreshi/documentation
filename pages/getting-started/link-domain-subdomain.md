---
type: recipe
directory: getting-started
title: Link Domain/Subdomain
page_title: Information about your app's custom subdomain
description: Every app is assigned a custom app.link subdomain. Learn how to use this when setting up your Branch configuration
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Webhooks, data export, funnel, RequestBin, Filters, Tempting
hide_platform_selector: true
sections:
- guide
---

{% if page.guide %}

## The default app.link subdomain

Every app on the Branch platform is assigned a subdomain of the form `xxxx.app.link`. This is unique to your app and must be used in several places when integrating the SDK.

{% protip %}
Because of the way that Apple implements Universal Links, every app also has a shadow subdomain of the form `xxxx-alternate.app-link`. This is used in select places but will not be shown to your users.
{% endprotip %}

### Retriving the subdomain assigned to your app

1. Go to the [Link Settings](https://dashboard.branch.io/#/settings/link) page on the dashboard.
1. Scroll down to the **Custom Link Domain** area.
1. Copy the value inside the **Default domain name** box.

{% image src='/img/pages/getting-started/link-domain-subdomain/default-link-domain.png' half center alt='retrieving the default link subdomain' %}

{% caution title="Test environment domain" %}

The assigned subdomain for your [test environment]({{base.url}}/getting-started/integration-testing#the-test-sandbox-environment) is of the form `xxxx.test-app-link` and must be configured separately.

{% endcaution %}

## Setting a custom link domain

If you want to use a custom domain or subdomain for your Branch links instead of the `XXXX.app.link` domain, setting one up is simple.

{% caution title="Avoid switching later" %}
We recommend that you choose one domain or subdomain to use with Branch and stick with it, as switching can cause significant problems with your existing links.
{% endcaution %}

{% protip title="SSL for custom domains and subdomains" %}
Branch automatically handles HTTPS traffic for custom subdomains and root domains. Branch will acquire the necessary SSL certificate if you follow the simple setup instructions below. Branch will also automatically renew the certificates when needed.
{% endprotip %}

### Custom SUBDOMAIN (go.branch.com)

{% caution title="Do not use www" %}
Some browsers have special rules for processing URLs beginning with `www`. We strongly recommend you do not include a `www` prefix in your custom subdomain.
{% endcaution %}

1. Create a CNAME for your subdomain and point it to `custom.bnc.lt`
1. Go to [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} on the Branch dashboard, and find the **Custom Link Domain** section.
1. Check the **Enable custom domain** box.
1. You should see a message telling you the status of your domain under the `Domain name` field. If you don't, please type your domain in again.
1. Click the `Save` button.

{% image src='/img/pages/getting-started/link-domain-subdomain/enable-custom-subdomain.png' 2-thirds center alt='successful custom subdomain configuration' %}

### Custom ROOT domain (branch.com)

{% caution title="Use this domain for Branch links only" %}
Once you enable this root domain for Branch links, you will not be able to use it for hosting anything else. We recommend using a subdomain, or purchasing a new root domain for this purpose. **You cannot use your main website domain for hosting Branch links**.
{% endcaution %}

1. Go to [Link Settings](https://dashboard.branch.io/#/settings/link){:target="_blank"} on the Branch dashboard, and find the **Custom Link Domain** section.
1. Check the **Enable custom domain** box.{% image src='/img/pages/getting-started/link-domain-subdomain/enable-custom-domain.png' 2-thirds center alt='successful custom domain configuration' %}
1. Enter your custom domain into the text box and click the `Save` button. (If the validation status doesn't update with nameservers please **refresh the page.**) {% image src='/img/pages/getting-started/link-domain-subdomain/custom_domain_nameservers_error.png' fullcenter alt='root domain nameservers' %}
1. Work with your domain registrar to make the Branch-provided nameservers authoritative for your domain. **Note that this means you cannot host anything else on this domain — only Branch links**
1. Click the `Save` button on the Branch dashboard again.

## About the legacy bnc.lt domain

The bnc.lt domain is no longer available for new apps. If you have existing links with this domain as the base, they will continue to function.

{% endif %}
