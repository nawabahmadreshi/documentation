{% tabs %}
{% tab objective-c %}
{% highlight objc %}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSString *myUrl = [userActivity.webpageURL absoluteString];
        // parse URL string or access query params
    }
    return YES;
}

{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
    	let linkUrl = userActivity.webpageUrl?.absoluteString
    	// parse URL string or access query params
	}

    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}