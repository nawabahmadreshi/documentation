{% highlight objc %}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

	Branch *branch = [Branch getInstance];

	[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {

		if (!error) {
			if (params[@"$deeplink_path"] && self.ignoreDeeplinkPath == NO) {
				NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"your-uri-scheme://%@", params[@"$deeplink_path"]]];
				// handle the URL!
				[self routeUrl:url];
			}
		}
		self.ignoreDeeplinkPath = NO;
	}];
	return YES;
}

//Entry point for iOS 8.X users and lower 

-(BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
	BOOL handledByBranch = [[Branch getInstance] handleDeepLink:url];

	self.ignoreDeeplinkPath = YES;

	// ... your other logic here, such as ...
	[self routeUrl:url];

	return handledByBranch;
}

//Entry point for iOS 9.X users

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {

	BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];
	
	// ... your other logic here ...

	return handledByBranch;
}
{% endhighlight %}