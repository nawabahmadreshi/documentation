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


{% endhighlight %}
{% endtab %}
{% endtabs %}