---
type: recipe
directory: features
title: "Facebook App Invites"
ios_page_title: Set up Facebook App Invites for iOS Apps
android_page_title: Facebook App Invites for Android Apps
ios_description: How to set up Facebook App Invites and ad campaigns for your iOS app using Branch deep links. With objective-c and swift code snippets.
android_description: How to set up Facebook App Invites and ad campaigns for your Android app using Branch deep links. With Java code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Facebook App Invites, App Invites, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Facebook App Invites, App Invites, Android
platforms:
- ios
- android
sections:
- overview
- guide
- support
---
Facebook launched it's new App Invites feature as an alternative to sharing to the wall to help you grow your app. It's similar to a direct SMS as it's a private invite from 1 friend to another as opposed to a public post on the wall. The good news is that your Branch deep links that you've set up for SMS, email and Twitter shares work the exact same way for invites. Here's a simple guide on how to do it.

{% image src='/img/recipes/appinvites/appinvite.png' third center alt='app invite' %}

{% protip%}Facebook has noted that App Invites for iOS do not support Deep Linking and attribution.

<code>This means that iOS App Invites and Branch Links will not work correctly together.</code>

[App Invites for Android](/recipes/facebook_appinvites/android/) and Branch Links will continue to work as expected.
{% endprotip %}

{% protip title="Still need to integrate Branch or Facebook?" %}This guide assumes that you have 1. already [integrated Branch](/recipes/add_the_sdk/ios/) and 2. configured your app to [send IDFA or GAID](/recipes/submitting_apps/ios/). These are prerequisites to install ads, so please do them first. If you need integrate Facebook, you can find instructions {% if page.ios %}[in this guide](https://developers.facebook.com/docs/ios/getting-started).{% endif %}{% if page.android %}[in this guide](https://developers.facebook.com/docs/android/getting-started).{% endif %}
{% endprotip %}

## One time configuration

In order for Branch to properly run a Facebook deeplinked ad campaign, you must first send Branch your app token. This is easy to get, and you can find the step by step instructions on how to do so below. 

1. Log in to Facebook, navigate to [developers.facebook.com/apps](http://developers.facebook.com/apps) and choose your app. You'll need the App ID and Client Secret. 

{% image src='/img/recipes/deeplink_ads/fb_auth_fb.png' half center alt='Facebook Auth' %}

2. On the Branch Dashboard, go to Settings > [Link Settings](https://dashboard.branch.io/#/settings/link) and scroll down to 'Authenticate for Facebook Install Ads'. Enter your App ID and Client Secret from Facebook.

{% image src='/img/recipes/deeplink_ads/fb_auth_branch.png' half center alt='Facebook Auth' %}

3. Press 'Authenticate'. That's it!

## Insert Branch link into Invite

Every Branch link automatically comes packed with all of the AppLinks to automatically handle deep linking off of Facebook posts. The Branch link will work for both _fresh installs_ for new users and _opens_ for users who already have the app. You can show a personal welcome for each!

<!--- iOS -->
{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
#import "Branch.h"
#import <FBSDKShareKit/FBSDKShareKit.h>
{% endhighlight %}

{% highlight objc %}
[[Branch getInstance] getShortURLWithParams:branchDict
                                 andChannel:@"facebook"
                                 andFeature:@"app_invite"
                                andCallback:^(NSString *url, NSError* error) {
    FBSDKAppInviteDialog *inviteDialog = [FBSDKAppInviteDialog new];
    if ([inviteDialog canShow]) {
        inviteDialog.content =[[FBSDKAppInviteContent alloc] init];
        inviteDialog.content.appLinkURL = [NSURL URLWithString:url];
        inviteDialog.content.appInvitePreviewImageURL = [NSURL URLWithString:@"https://s3-us-west-1.amazonaws.com/host/zackspic.png"];
                                        
        [inviteDialog show];
    }
}];
{% endhighlight %}

{% highlight objc %}
// add these methods in if you extend your sharing view controller with <FBSDKAppInviteDialogDelegate>
- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog
 didCompleteWithResults:(NSDictionary *)results {
    [[Branch getInstance] userCompletedAction:@"completed_share"];
    NSLog(@"app invite dialog did complete");
}

- (void)appInviteDialog:(FBSDKAppInviteDialog *)appInviteDialog
       didFailWithError:(NSError *)error {
    [[Branch getInstance] userCompletedAction:@"cancelled_share"];
    NSLog(@"app invite dialog did fail");
}
{% endhighlight %}

{% endtab %}
{% tab swift %}
{% highlight swift %}
params["referring_user_id"] = "1234"
params["referring_user_name"] = "Zack Zuckerberg"
Branch.getInstance().getShortURLWithParams(params, "facebook", "app_invite" andCallback: { (url: String?, error: NSError?) -> Void in
    var inviteContent: FBSDKAppInviteContent = FBSDKAppInviteContent()
                
    inviteContent.appLinkURL = NSURL(String: url!)!
    
    inviteDialog.content = inviteContent
    inviteDialog.delegate = self
    inviteDialog.show()
})
{% endhighlight %}

{% highlight swift %}
func appInviteDialog(appInviteDialog: FBSDKAppInviteDialog!, didCompleteWithResults results: [NSObject : AnyObject]!) {
    println("Complete invite without error")
}

func appInviteDialog(appInviteDialog: FBSDKAppInviteDialog!, didFailWithError error: NSError!) {
    println("Error in invite \(error)")
}
{% endhighlight %}
{% endtab %}
{% endtabs %}


{% endif %}

<!--- /iOS -->


<!--- Android -->
{% if page.android %}


{% highlight java %}
JSONObject params = new JSONObject();
try {
    params.put("referring_user_id", "1234");
    params.put("referring_user_name", "Zack Zuckerberg");
} catch (JSONException ex) { }
Branch branch = Branch.getInstance(getApplicationContext());
branch.getShortUrl("facebook", "app_invite", null, params, new BranchLinkCreateListener() {
    @Override
    public void onLinkCreate(String url, Branch.BranchError error) {
		if (AppInviteDialog.canShow()) {
			AppInviteContent content = new AppInviteContent.Builder()
		                .setApplinkUrl(url)
		                .setPreviewImageUrl("https://s3-us-west-1.amazonaws.com/host/zackspic.png")
		                .build();
			AppInviteDialog.show(this, content);
		}
    }
});
{% endhighlight %}
{% endif %}
<!--- /Android -->

## Show Custom Welcome

Since you dropped a Branch link into the URL for the AppInvite, you can use Branch to determine if a new user came from an existing app user. Below, you can see an example that our partner Gogobot built using the Branch deep link callback. The screen below is what a user sees if they came from a referring Branch link, compared to the generic onboarding which just shows a fancy picture. It drove a  **78% lift in conversion** to register.

{% image src='/img/recipes/appinvites/gogobot_onboarding_screens.png' actual center alt='app invite' %}

Here's how to build it:

<!--- iOS -->
{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
#import "Branch.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
{% endhighlight %}

{% highlight objc %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                            andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
        if ([[params objectForKey:@"+clicked_branch_link"] boolValue]) {
            // show personal welcome
        }
    }];
    
    return [[FBSDKApplicationDelegate sharedInstance] application:application
                                    didFinishLaunchingWithOptions:launchOptions];
}
{% endhighlight %}

{% highlight objc %}
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *,id> *)options {
    // NOTE: Branch must come first
    BOOL wasHandled = [[Branch getInstance] handleDeepLink:url];
    if (!wasHandled)
        [[FBSDKApplicationDelegate sharedInstance] application:application
                                                       openURL:url
                                                       options:sourceApplication];
    return wasHandled;
}

{% endhighlight %}

{% endtab %}
{% tab swift %}
{% highlight swift %}
import FBSDKCoreKit
import Branch

{% endhighlight %}


{% highlight swift %}
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    branch.initSessionWithLaunchOptions(launchOptions, andRegisterDeepLinkHandler: { params, error in
        if (params["+clicked_branch_link"]) {
            NSLog("new session was referred by %@", params["referring_user_name"])
            // show personal welcome view controller
        }
    })

    let permissions = ["public_profile", "user_friends", "publish_actions"]   
    FBSession.openActiveSessionWithPublishPermissions(permissions, defaultAudience: FBSessionDefaultAudience.Everyone, allowLoginUI: true)

    return true
}
{% endhighlight %}

This method is for handling the case where the app is already installed the URI scheme gets called.

{% highlight swift %}
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    // pass the url to the handle deep link call
    Branch.getInstance().handleDeepLink(url)

    // We're not sure how to init the Facebook SDK in Swift
    // if you know, please make a pull request on this repo https://github.com/BranchMetrics/documentation/blob/master/recipes/facebook_appinvites.md

    return true
}

{% endhighlight %}

{% endtab %}
{% endtabs %}



{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

{% highlight java %}
import io.branch.referral.Branch;
import com.facebook.FacebookSdk;
{% endhighlight %}


{% highlight java %}
@Override
protected void onStart() {
    super.onStart();
    Branch branch = Branch.getInstance(getApplicationContext());
    branch.initSession(new BranchReferralInitListener(){
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (referringParams.getBoolean("+clicked_branch_link")) {
            	Log.i("MyApp", "new session was referred by " + referringParams.getString("referring_user_name"));
	    		// show personal welcome view controller
        	}
        }
    }, this.getIntent().getData(), this);
}

{% endhighlight %}

Next, you'll need to hook into the `onNewIntent` method specified inside the Activity lifecycle and set the intent. This is required for conformity with Facebook's AppLinks. Verify that the activity you're implementing has *launchMode* set to *singleTask* inside the Manifest declaration. Once that'd done, go to said activity and do something like the folllowing:

{% highlight java %}
@Override
public void onNewIntent(Intent intent) {
    this.setIntent(intent);
}
{% endhighlight %}

Side note: This is a requirement because of the new Facebook AppLinks change. Facebook doesn't open up the browser anymore and just calls the URI to open the app directly. This prevented Branch clicks from being registered. To support it, we pass that link click id through the URI scheme to Branch, and send that back to the app, creating a 'click' without actually seeing a click. Android does a very poor job of clearing out intents that were previously called, so this helps ensure that once a URI scheme is called and consumed, it won't trigger deep linking anymore.

On Android, you also need to be sure to properly close the session inside `onStop` with a `branch.closeSession()`. This helps us manage a session across activities.

{% highlight java %}
@Override
protected void onStop() {
    super.onStop();
    branch.closeSession();
}
{% endhighlight %}

{% endif %}
<!--- /Android -->

-----

## Troubleshooting
{% ingredient app_links/applinks_issues %}{% override header %}### Issues Reading App Links{% endoverride %}{% endingredient %}

{% ingredient dashboard_setup/facebook_auth_issues %}{% override header %}### Common issues with Facebook Authentication{% endoverride %}{% endingredient %}

-----

## What's next?

{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}
