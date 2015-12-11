
## Setting a custom link domain

While you may enjoy Branch, it doesn't mean you need to have bnc.lt as a part of every link you send out. If you want Branch links to use your custom subdomain, you need to follow a few simple steps.

[If you are going live before December 17th, we recommend following the steps [here](/recipes/dashboard_pro_tips/#advanced-support-ssltls-with-your-domain-for-universal-links) to set up your domain with CloudFlare]

1. Purchase a subdomain, like `get.myapp.co`. _We strongly recommend you use subdomains instead of root domains_. 
2. Through your DNS provider, point the CNAME record for this subdomain to `bnc.lt`.
3. After you've confirmed that the CNAME records have propagated throughout the internet, you need to set your custom subdomain on our Dashboard > Settings > [Link Settings](https://dashboard.branch.io/#/settings/link) > Custom Link Domain. See the screenshot below.

![always open app](/img/ingredients/dashboard_setup/custom_link_domain3.png)

{% protip title='Changing subdomains is painful' %}
Changing between custom subdomains (e.g. from get.myapp.com to download.myapp.com) is painful and should be avoided at all costs. Some links will be migrated, others will stop working. We recommend you pick a subdomain you like and stick with it for the long haul!
{% endprotip %}

### Making your subdomain work with Universal Links
With the release of iOS 9.2, Universal Links must be enabled for correct routing on iOS. [Please enable them](/recipes/branch_universal_links/ios/) if you haven't already and follow these steps.

{% ingredient dashboard_setup/cloudflare_tls_setup %}{% endingredient %}

### FAQ & Troubleshooting

#### What if I want to use a root domain?

To make root domains work with Universal Links, you'll **have** to use CloudFlare. If you must use root domains, we recommend using a domain other than your main website's domain i.e. t.co if your website's domain is twitter.com. Please review the instructions above and check out the following two articles:

1. [https://blog.cloudflare.com/zone-apex-naked-domain-root-domain-cname-supp/](https://blog.cloudflare.com/zone-apex-naked-domain-root-domain-cname-supp/)
2. [https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)


