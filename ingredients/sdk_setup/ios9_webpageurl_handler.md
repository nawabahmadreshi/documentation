{% tabs %}
{% tab objective-c %}
{% highlight objc %}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [self handleRouting:url];
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        [self handleRouting:userActivity.webpageURL];
    }
    return YES;
}

- (void)handleRouting:(NSURL *)url {
....
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    handleRouting(url)

    return true
}

func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
    	handleRouting(userActivity.webpageUrl)
	}

    return true
}

func handleRouting(url: NSURL) {
....

{% endhighlight %}
{% endtab %}
{% endtabs %}