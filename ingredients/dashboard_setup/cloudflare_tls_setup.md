### ADVANCED: Support SSL/TLS with your domain for Universal Links

[By December 17th we hope to simplify this flow dramatically. Here are the steps to enable Universal Links with custom domains/subdomains at the moment.]

Universal Links require HTTPS URLs. For your subdomain to work with Universal Links and Branch, you need to terminate SSL ahead of the Branch service.

This is actually pretty easy if you use CloudFlare, it's just a couple of button clicks. 

 _Step 1._ Make sure your traffic is proxied to Branch. With CloudFlare, this is done by clicking the cloud with the arrow to make it _orange_.

{% image src='/img/recipes/universal_links/orange_cloud.png' 3-quarters center alt='cloudflare TLS' %}

 _Step 2._ Make your Crypto settings match this screenshot. This is done by enabling SSL on the domain/subdomain.

{% image src='/img/recipes/universal_links/ssl.png' third center alt='cloudflare TLS' %}

#### Test your link 

You can verify if it's all set up correctly by using this tool: [https://limitless-sierra-4673.herokuapp.com/](https://limitless-sierra-4673.herokuapp.com/) (credit to [ShortStuffSushi](https://github.com/shortstuffsushi)). Ignore the IPA file upload and just paste your custom domain link in "Domain". 

#### Issues with SSL 

The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

{% highlight javascript %}
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
{% endhighlight %}

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.

Note that you have to delete the app and reinstall to trigger the iOS scrape of the apple-app-site-association file—re-running an installed app doesn't trigger the scrape.