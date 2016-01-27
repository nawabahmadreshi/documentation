### ADVANCED: Support SSL/TLS with your custom domain for Universal Links

**If you use a custom SUBDOMAIN** (e.g. go.branch.com): Point your CNAME for the subdomain to `custom.bnc.lt` and verify it under Settings > Link Settings > Custom Link Domain. You should see a message telling you the status of your domain under the custom domain field. If you don't, please type your domain in again and save. That's it!

{% image src='/img/recipes/universal_links/custom-domain-success.png' 3-quarters center alt='successful custom domain' %}

**If you use a ROOT domain** (e.g. branch.com) then follow the steps below to enable SSL on your custom domain:

 _Step 0._ First setup your root domain to CNAME to `custom.bnc.lt`. [Here's how to set up a CNAME](https://support.cloudflare.com/hc/en-us/articles/200169046-How-do-I-add-a-CNAME-record-) with CloudFlare if you're new to it. 

 _Step 1._ Make sure your traffic is proxied to the domain 'custom.bnc.lt'. With CloudFlare, this is done by clicking the cloud with the arrow to make it _orange_.

{% image src='/img/recipes/universal_links/orange_cloud.png' 3-quarters center alt='cloudflare TLS' %}

 _Step 2._ Make your Crypto settings match this screenshot. This is done by enabling SSL on the domain/subdomain.

{% image src='/img/recipes/universal_links/ssl.png' third center alt='cloudflare TLS' %}

 _Troubleshooting SSL_

The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

{% highlight javascript %}
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
{% endhighlight %}

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.