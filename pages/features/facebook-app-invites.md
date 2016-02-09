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
- advanced
- support
---

{% if page.overview %}

To help you grow your app, Facebook offers a feature called App Invites as an alternative to sharing on the Facebook wall. It is a private, friend-to-friend invite, similar to a direct SMS message. 

{% image src='/img/pages/features/facebook-app-invites/appinvite.png' 2-thirds center alt='app invite' %}

### [Get started with Facebook App Invites!]({{base.url}}/features/facebook-app-invites/guide)

{% elsif page.guide %}

{% if page.ios %}
{% caution title="Incomplete support on iOS" %}
Facebook has noted that App Invites for iOS do not support Deep Linking and attribution. **This means that iOS App Invites and Branch Links will not work correctly together.**

You can still complete this guide and App Links will function, but attribution data will not be collected for your links and deep linking will not work at this time.
{% endcaution %}
{% endif %}

{% prerequisite %}

- To use Facebook App Invites, you need to first [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) and {% if page.ios %}[the Facebook SDK](https://developers.facebook.com/docs/ios/getting-started){% elsif page.android %}[the Facebook SDK](https://developers.facebook.com/docs/android/getting-started){% endif %} into your app. 

{% endprerequisite %}

## Authenticate Branch with Facebook

In order for Branch to work with Facebook App Invites, you must first allow Branch to access your Facebook app information.

1. Log in to Facebook, navigate to [developers.facebook.com/apps](http://developers.facebook.com/apps) and choose your app. You'll need the **App ID** and **App Secret**.{% image src='/img/pages/features/facebook-app-invites/fb_auth_fb.png' 3-quarters center alt='Facebook Auth' %}
1. On the Branch Dashboard, go to [Link Settings](https://dashboard.branch.io/#/settings/link) and scroll down to 'Authenticate for Facebook Install Ads'. Enter your **App ID** and **App Secret** from Facebook.{% image src='/img/pages/features/facebook-app-invites/fb_auth_branch.png' 3-quarters center alt='Facebook Auth' %}
1. Press 'Authenticate'.

## Insert Branch link into App Invite

Every Branch link automatically handles both _fresh installs_ for new users and _opens_ for users who already have the app. You simply need to insert it into the Facebook App Invite dialog.

<!--- iOS -->
{% if page.ios %}

First import the relevant Branch and FBSDK frameworks into your view controller:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
#import "Branch.h"
#import <FBSDKShareKit/FBSDKShareKit.h>
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
import FBSDKCoreKit
import Branch
{% endhighlight %}
{% endtab %}
{% endtabs %}

Then create the Branch link and pass it to the Facebook SDK:

{% tabs %}
{% tab objective-c %}
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
{% endtab %}
{% endtabs %}

Then use the Facebook SDK's `appInviteDialog` method ([documentation here](https://developers.facebook.com/docs/reference/ios/current/protocol/FBSDKAppInviteDialogDelegate/)) to show the App Invite dialog:

{% tabs %}
{% tab objective-c %}
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

This snippet first creates the Branch link and passes it to the Facebook SDK's `AppInviteDialog` method ([documentation here](https://developers.facebook.com/docs/reference/android/current/class/AppInviteDialog/)) to show the App Invite dialog:

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

## View your data using the Branch dashboard

The [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard shows the performance of each individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs. 

{% caution %}
Facebook prevents Branch from measuring the number of clicks for App Invites, so all **Clicks** numbers will be inaccurate.
{% endcaution %}

{% image src='/img/pages/features/facebook-app-invites/marketing_link_row.png' full center alt='Facebook Example Ad' %}

To view more details stats, click the _small button that looks like a bar chart_ on the far right. Note that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

{% image src='/img/pages/features/facebook-app-invites/click_flow_analytics.png' full center alt='Facebook Example Ad' %}

## Next steps

You're done! If you would like to offer a personalized welcome experience for new users from Facebook App Links, continue on to the [Advanced page]({{base.url}}/features/facebook-app-invites/advanced{% if page.ios %}/ios{% elsif page.android %}/android{% endif %}#show-personalized-welcome-screen).

{% elsif page.advanced %}

## Show personalized welcome screen

Since you used a Branch link for the URL in the App Invite, you can use Branch to determine if a new user came from an existing app user, and show a personalized welcome. Our partner [Gogobot](http://www.gogobot.com) used this method to drive a **78% lift in registration conversion** by showing the screen below, compared to the generic onboarding with just a fancy picture.

{% image src='/img/pages/features/facebook-app-invites/gogobot_onboarding_screens.png' actual center alt='Gogobot invite example' %}

<!--- iOS -->
{% if page.ios %}

As before, begin by importing the relevant Branch and FBSDK frameworks into your view controller:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
#import "Branch.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
import FBSDKCoreKit
import Branch
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab objective-c %}

Then modify your **AppDelegate.m** file to handle the incoming links:

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
{% endtab %}

{% tab swift %}

Then modify your **AppDelegate.swift** file to handle the incoming links:

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
{% endtab %}
{% endtabs %}

This method is for handling the case where the app is already installed when the URI scheme gets called:

{% tabs %}
{% tab objective-c %}
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

Begin by importing the relevant Branch and FBSDK frameworks:

{% highlight java %}
import io.branch.referral.Branch;
import com.facebook.FacebookSdk;
{% endhighlight %}

Then modify your Manifest file to handle the incoming links:

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

1. Inside the Activity you want to display, you'll need to hook into the `onNewIntent` method specified inside the Activity lifecycle and set the intent. This is required for conformity with Facebook's AppLinks.
1. Verify that the activity you're implementing has `launchMode` set to `singleTask` inside the Manifest declaration.
1. Once that's done, go to said Activity and do something like the following:

{% highlight java %}
@Override
public void onNewIntent(Intent intent) {
    this.setIntent(intent);
}
{% endhighlight %}

{% protip %}
This is a requirement because of a recent Facebook AppLinks change. Facebook doesn't open up the browser anymore and just calls the URI to open the app directly, preventing Branch clicks from being registered. Instead, we pass that link click ID through the URI scheme to Branch, and send that back to the app, creating a 'click' without actually seeing a click. Android does a very poor job of clearing out intents that were previously called, so this helps ensure that once a URI scheme is called and consumed, it won't trigger deep linking anymore.
{% endprotip %}

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

{% elsif page.support %}

## Issues reading Facebook App Links

If Facebook is having trouble reading the AppLinks from the Branch link, you might see this message while trying to test out the flow. This means that there is something corrupted in the OG tags causing Facebook to not parse it.

{% image src='/img/pages/features/facebook-ads/missing_applinks.png' third center alt='troubleshooting' %}

### Rescrape the OG tags

You can test the OG tags using the [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) provided by Facebook:

1. Paste the Branch Link into the Input URL box. 
1. Click on the Show existing scrape information button.
1. Examine errors regarding AppLinks from the output window.
1. Click on the Fetch New Scrape Information button. This last step typically resolves this problem if you are certain that your Branch Link Settings are correct. 

{% protip %}
You can further automate the rescraping process by using this command after you create a new link and before you use it for any ads: 
 
{% highlight sh %}
curl --insecure "https://graph.facebook.com/?id=[YOUR-URL-TO-SCRAPE]&scrape=true"
{% endhighlight %}
{% endprotip %}

### If the OG tag tester continues to report problems

1. Examine your [Link Settings](https://dashboard.branch.io/#/settings/link) and ensure that for all platforms (for which an app is available), that a URI scheme and a link to the app in the Play/App Store is configured. If you are using a Custom URL for your iOS Redirect then you need to append ?id<App Store Id> to the URL.
1. If errors from the output window pertain to OG tags i.e. missing title, description etc. then examine link OG tags by appending `?debug=true` as described on the [Integration Testing page]({{base.url}}/getting-started/integration-testing/guide/#debugging-an-individual-link).
1. If you haven't set OG tags on a per link level, then please check your Dashboard's global Social Media Display Customization settings from the [Link Settings](https://dashboard.branch.io/#/settings/link) page.

If your OG tags look fine and you're still getting errors, please reach out to support@branch.io immediately.

## Known issue with App Restrictions

We recently discovered a bug within the Facebook system that prevents App Links from being read by the robot if you change any of these values from the defaults in your Advanced Facebook App Settings tab. Please make sure

- Contains Alcohol is set to **No**
- Age Restriction is set to **Anyone (13+)**
- Social Discovery is set to **Yes**
- Country Restricted is set to **No**

It has to look like this **exactly**:
{% image src='/img/pages/features/facebook-ads/app_restrictions.png' 3-quarters center alt='app restrictions troubleshooting' %}


## Common issues with Facebook Authentication

If you are having trouble authenticating with Facebook, please check the following:

##### Be sure you have the correct App ID and App Secret

Be sure you have the correct App ID and App Secret. This is the number one source of issues.

##### App Secret embedded?

If you have entered the correct App ID and Secret but are still getting issues, it may be related to how you are using your Secret. Visit the Settings > Advanced page on Facebook and check that you don't have the toggle enabled for "Is your App Secret embedded?" You will only have this option if you have enabled "Native or desktop app?" on this page.

So if you have enabled "Native or desktop app", then your advanced options should appear like the following:

{% image src='/img/pages/features/facebook-ads/facebook_secret.png' 3-quarters center alt='Client Secret' %}

{% endif %}