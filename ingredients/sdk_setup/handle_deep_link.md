{% if page.ios %}
### Handle Deep Link

This method is necessary to receive a Branch parameter when the URI scheme is called and the app open immediately. It will automatically call the **Deep Link Handler** registered above:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    // pass the url to the handle deep link call
    [[Branch getInstance] handleDeepLink:url];

    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    return YES;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    // pass the url to the handle deep link call
    Branch.getInstance().handleDeepLink(url);

    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

### Continue User Activity

Additionally, in iOS9, for Universal Links and Spotlight listings, you'll want to receive those parameters in this App Delegate callback.

{% ingredient sdk_setup/ios9_restoration_handler %}{% endingredient %}

{% endif %}