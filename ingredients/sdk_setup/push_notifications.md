#### Branch links in push notifications

You can use Branch links with push notifications. When creating a push notification, you should specify the Branch link in the `userInfo` dictionary. It should be an NSString, and the key in `userInfo` should be Branch. So, for example: `@{ @"branch" : @"https://bnc.lt/ALMc/e03OVEJLUq" }`.

You must also configure your app to allow Branch to handle push notifications:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [[Branch getInstance] handlePushNotification:userInfo];
    
    // ... handle push notifications that do not include Branch links
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
    Branch.getInstance().handlePushNotification(userInfo)
    
    // ... handle push notifications that do not include Branch links
}
{% endhighlight %}
{% endtab %}
{% endtabs %}
