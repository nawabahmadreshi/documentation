---
type: recipe
directory: features
title: "Deeplink Routing"
page_title: Set up deeplink routing in your Android or iOS app
description: This page will tell you how to set up your Android, iOS, Cordova, Phonegap, Xamarin, Unity, Air or Titanium app for deeplink routing.
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

When a Branch link is opened, either your app launches or users are taken to the App/Play store to download it. Deeplinks improve this process by routing users directly to specific content after your app launches. With Branch, this still works even if users have to stop and download the app first (a.k.a., "deferred deeplinks").

Deeplinks are an incredibly important part of delivering a high quality user experience. With deeplinks, you can take users to the exact thing they clicked on or even offer a customized onboarding experience.

{% elsif page.guide %}

{% if page.ios or page.android %}

{% ingredient quickstart-prerequisite %}{% endingredient %}
{% protip title="Automatic vs. custom deeplink routing" %}
This guide describes how to use the automatic routing functionality included in the Branch SDK. If you need more control, check out [this section of the Advanced page](../advanced#building-a-custom-deeplink-routing-method)
{% endprotip %}

{% elsif page.unity or page.xamarin or page.cordova or page.titanium or page.adobe %}

{% caution title="Automatic routing not yet available" %}
Automatic deeplink routing is currently supported in only the native iOS and Android SDKs. Please see [this section of the Advanced page]() to set up a custom routing solution.
{% endcaution %}

{% endif %}

{% if page.ios %}

## Configure View Controller to accept deeplinks

Open the view controller that you want to appear when a user clicks a link. For example, this could be a view to show a product.

Import the Branch framework:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
#import "Branch.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
import Branch
{% endhighlight %}
{% endtab %}
{% endtabs %}

Register your view controller for the delegate `BranchDeepLinkingController`:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
@interface ExampleDeepLinkingController : UIViewController <BranchDeepLinkingController>
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
class ExampleDeepLinkingController: UIViewController, BranchDeepLinkingController {
{% endhighlight %}
{% endtab %}
{% endtabs %}

Receive the delegate method that will be called when the view controller is loaded from a link click:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
@synthesize deepLinkingCompletionDelegate;
- (void)configureControlWithData:(NSDictionary *)data {
	NSString *pictureUrl = data[@"product_picture"];

	// show the picture
	dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
		NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:pictureUrl]];
		UIImage *image = [UIImage imageWithData:imageData];
		dispatch_async(dispatch_get_main_queue(), ^{
			self.productImageView.image = image;
		});
	});
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func configureControlWithData(data: [NSObject : AnyObject]!) {
	var pictureUrl = data["product_picture"]

	// show the picture
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip title="More about link data keys" %}
The example key `product_picture` is a parameter from the [data dictionary]({{base.url}}/getting-started/link-configuration) of the link that was clicked, and would have been defined when the link [was created]({{base.url}}/getting-started/link-creation).
{% endprotip %} 

Since the view controller is displayed modally, you should add a close button:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (IBAction)closePressed {
    [self.deepLinkingCompletionDelegate deepLinkingControllerCompleted];
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
func closePressed() {
    self.deepLinkingCompletionDelegate!.deepLinkingControllerCompleted()
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Register View Controller for deeplink routing

Lastly, you need to tell Branch about the view controller you just configured, and which key it is using from the link's data dictionary.

{% tabs %}
{% tab objective-c %}

In your **AppDelegate.m** file, find the `didFinishLaunchingWithOptions` method you added in the [SDK Configuration Guide]({{base.url}}/getting-started/sdk-configuration-guide)):

{% highlight objc %}
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    if (!error) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        NSLog(@"params: %@", params.description);
    }
}];
{% endhighlight %}

Remove it, and insert this snippet in the same place:

{% highlight objc %}
ExampleDeepLinkingController *controller = [[UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]] instantiateViewControllerWithIdentifier:@"DeepLinkingController"];

[branch registerDeepLinkController:controller forKey:@"product_picture"];
[branch initSessionWithLaunchOptions:launchOptions automaticallyDisplayDeepLinkController:YES];
{% endhighlight %}
{% endtab %}
{% tab swift %}

In your **AppDelegate.swift** file, find the `didFinishLaunchingWithOptions` method you added in the [SDK Configuration Guide]({{base.url}}/getting-started/sdk-configuration-guide)):

{% highlight swift %}
branch.initSessionWithLaunchOptions(launchOptions, andRegisterDeepLinkHandler: { params, error in
    if (error == nil) {
        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
        // params will be empty if no data found
        // ... insert custom logic here ...
        NSLog("params: %@", params.description)
    }
})
{% endhighlight %}

Remove it, and insert this snippet in the same place:

{% highlight swift %}
var controller = UIStoryboard.init("Main", NSBundle.mainBundle()).instantiateViewControllerWithIdentifier("DeepLinkingController")

branch.registerDeepLinkController(controller, forKey: "product_picture")
branch.initSessionWithLaunchOptions(launchOptions, automaticallyDisplayDeepLinkController: true)
{% endhighlight %}
{% endtab %}
{% endtabs %}

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, the `ExampleDeepLinkingController` view controller will be displayed!

{% endif %}
{% if page.android %}

### Configure Activity to accept deeplinks

Open the Activity that you want to appear when a user clicks a link. For example, this could be an Activity to show a product.

Insert the following code snippet to display your content when the Activity is loaded from a link click:

{% highlight java %}
@Override
protected void onResume() {
    super.onResume();
    if (Branch.isAutoDeepLinkLaunch(this)) {
        try {
            String autoDeeplinkedValue = Branch.getInstance().getLatestReferringParams().getString("product_picture");
            launch_mode_txt.setText("Launched by Branch on auto deep linking!"
                    + "\n\n" + autoDeeplinkedValue);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    } else {
        launch_mode_txt.setText("Launched by normal application flow");
    }
}
{% endhighlight %}

{% protip title="More about link data keys" %}
The example key `product_picture` is a parameter from the [data dictionary]({{base.url}}/getting-started/link-configuration) of the link that was clicked, and would have been defined when the link [was created]({{base.url}}/getting-started/link-creation).
{% endprotip %} 

### Register Activity for deeplink routing

Lastly, you need to tell Branch about the Activity you just configured, and which key it is using from the link's data dictionary.

In your Manifest file, locate the definition for the Activity above and add this meta-data tag:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_keys" android:value="product_picture" />
{% endhighlight %}

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, this Activity will be displayed!

{% endif %}

{% elsif page.advanced %}

## Building a custom deeplink routing method

{% if page.ios %}

Inside the `andRegisterDeepLinkHandler` callback in your AppDelegate, you will want to examine the params dictionary to determine whether the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  // initialize the session, setup a deep link handler
  [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                          andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {

    // start setting up the view controller hierarchy
    UINavigationController *navC = (UINavigationController *)self.window.rootViewController;
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    UIViewController *nextVC;

    // If the key '{% section ios_key %}pictureId{% endsection %}' is present in the deep link dictionary
    {% section ios_comment %}// then load the picture screen with the appropriate picture{% endsection %}
    NSString *{% section ios_key %}pictureId{% endsection %} = [params objectForKey:@"{% section ios_key %}pictureId{% endsection %}"];
    if ({% section ios_key %}pictureId{% endsection %}) {
      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"{% section vc_name %}PicVC{% endsection %}"];
      [nextVC setNext{% section ios_key_U %}PictureId{% endsection %}:{% section ios_key %}pictureId{% endsection %}];
    } else {
      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
    }

    // navigate!
    [navC setViewControllers:@[nextVC] animated:YES];
  }];

  return YES;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    let branch: Branch = Branch.getInstance()
    branch.initSessionWithLaunchOptions(launchOptions, true, andRegisterDeepLinkHandler: { params, error in

        // If the key '{% section ios_key %}pictureId{% endsection %}' is present in the deep link dictionary
        if (params["+clicked_branch_link"] && params["pictureId"]) {
            NSLog("clicked picture link!")
            // load the view to show the picture
        } else {
            // load your normal view
        }
    })
    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android %}

Inside `onStart` in the Activity that initializes Branch, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight java %}

@Override
public void onStart() {
    super.onStart();

    Branch branch = Branch.getInstance();

    // If NOT using automatic session management
    // Branch branch = Branch.getInstance(getApplicationContext());

    branch.initSession(new BranchReferralInitListener(){
        @Override
        public void onInitFinished(JSONObject referringParams, Branch.BranchError error) {
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked before showing up
                // params will be empty if no data found
                String {% section akeyU %}pictureID{% endsection %} = referringParams.optString({% section akeyL %}"picture_id"{% endsection %}, "");
                if ({% section akeyU %}pictureID{% endsection %}.equals("")) {
                    startActivity(new Intent(this, HomeActivity.class));
                }
                else {
                    Intent i = new Intent(this, ViewerActivity.class);
                    i.putExtra({% section akeyL %}"picture_id"{% endsection %}, {% section akeyU %}pictureID{% endsection %});
                    startActivity(i);
                }
            } else {
                Log.e("MyApp", error.getMessage());
            }
        }
    }, this.getIntent().getData(), this);
}
{% endhighlight %}

{% endif %}

{% if page.cordova %}

Inside the callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight js %}
branch.init("YOUR BRANCH KEY HERE", function(err, data) {
    if (!err && data.data['+clicked_branch_link']) {
        if (data.data['picture_id']) {
            // load the view to show the picture
        } else {
            // load your normal view
        }
    } 
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}
Inside the `InitSessionComplete` callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight c# %}
public class App : Application, IBranchSessionInterface
{
    public void InitSessionComplete (Dictionary<string, object> data)
    {
        if (data.ContainsKey("picture_id")) {
            // load the view to show the picture
        } else {
            // load your normal view
        }
    }
}
{% endhighlight %}

{% endif %}

{% if page.unity %}
Inside the `initSession` callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight c# %}
public class MyCoolBehaviorScript : MonoBehaviour {
    void Start () {
        Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
            if (parameters.ContainsKey("picture_id") {
                // load the view to show the picture
            } else {
                // load your normal view
            }
        });
    }
}
{% endhighlight %}
{% endif %}

{% if page.adobe %}
Inside the `initSuccessed` callback, when Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight java %}
private function initSuccessed(bEvt:BranchEvent):void {
    var referringParams:Object = JSON.parse(bEvt.informations);
    if (referringParams.picture_id) {
        // load the view to show the picture
    } else {
        // load your normal view
    }
}
{% endhighlight %}
{% endif %}

{% if page.titanium %}
Inside the callback where Branch is initialized, you will want to examine the dictionary passed in the callback to see if the user opened a link to content. Below is an example assuming that the links correspond to pictures.

{% highlight js %}
branch.getAutoSession();
{% endhighlight %}

To implement the callback, you must add a listener to the event `bio:initSession`.

{% highlight js %}
branch.addEventListener("bio:initSession", $.onInitSessionFinished);
{% endhighlight %}

{% highlight js %}
$.onInitSessionFinished = function(data) {
    Ti.API.info("inside onInitSessionFinished");
    for (key in data) {
        if ((key != "type" && key != "source" && key != "bubbles" && key != "cancelBubble") && data[key] != null) {
            Ti.API.info(key + data["key"]);
        }
    }

    if (data["picture_id"]) {
        // load the view to show the picture
    } else {
        // load your normal view
    }
}
{% endhighlight %}
{% endif %}

{% if page.android %}

## Be notified when deeplink Activity finishes

In your Manifest, you can specify a custom code for the deeplink Activity like so:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
{% endhighlight %}

To be notified when the deeplink Activity finishes, use the `onActivityResult` parameter to check for the custom code you inserted in the Manifest:

{% highlight java %}
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);

	//Checking if the previous activity is launched on branch Auto deep link.
	if(requestCode == getResources().getInteger(R.integer.AutoDeeplinkRequestCode)){
		//Decide here where  to navigate  when an auto deep linked activity finishes.
		//For e.g. Go to HomeActivity or a  SignUp Activity.
		Intent i = new Intent(getApplicationContext(), CreditHistoryActivity.class);
		startActivity(i);
	}
}
{% endhighlight %}

{% endif %}

-----

## Support existing deeplink routes

If you spent a bunch of time setting up deeplink paths before you heard of Branch and you want to continue using them, you can set the `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` link control parameters to the URI path you'd like to display.

{% if page.android %}

In your app's Manifest, add this meta-data key to the definition of the Activity you want to show when a link to content is opened:

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_path" android:value="custom/path/*,another/path/" />
{% endhighlight %}

{% endif %}
{% if page.ios %}

{% caution title="Incomplete support on iOS" %}
[Universal Links]({{base.url}}/features/universal-links) and [Spotlight]({{base.url}}/features/spotlight-indexing) do not support URI paths. We recommend avoiding this approach to deeplink routing if possible.
{% endcaution %}

{% endif %}

### How to insert custom deeplink routes into a Branch link

All of the examples below create links that will cause Branch to display `myapp://content/1234` after launch.

{% example title="When creating links dynamically" %}

If you're creating a link by appending query parameters, just append the control parameters to the URL. Please make sure to URL encode everything, lest the link will break.

{% highlight javascript %}
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$deeplink_path=content%2F1234"
{% endhighlight %}

{% endexample %}

{% example title="When using a mobile SDK" %}

When you create links via a mobile SDK, you simply need to set the control parameters.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$deeplink_path" withValue:@"content/1234"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$deeplink_path", withValue: "content/1234")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$deeplink_path", "content/1234");
{% endhighlight %}

{% endif %}

<!--- Cordova -->

{% if page.cordova %}

{% highlight js %}
branch.link({
    channel: 'sms',
    feature: 'share',
    data: {
		"article_id": "1234",
		"$deeplink_path": "content/1234"
    }
}, function(err, link) {
	if (!err) {
    	console.log("Ready to share my " + link);
	}
});
{% endhighlight %}
{% endif %}

<!--- Xamarin -->

{% if page.xamarin %}
{% highlight c# %}
var data = new Dictionary<string, object>(); 
data.Add("article_id", "1234");
data.Add("$deeplink_path", "content/1234");

Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "sms", "share");
{% endhighlight %}
{% endif %}

<!--- Adobe -->

{% if page.adobe %}

{% highlight java %}
var dataToInclude:Object = {
	"article_id": "1234",
	"$deeplink_path": "content/1234"
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
}, {
  "$deeplink_path" : "content/1234",
});
{% endhighlight %}

{% endif %}

<!--- Unity -->

{% if page.unity %}

{% highlight objective-c %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "invite";
linkProperties.channel = "Twitter";
linkProperties.stage = "2";
linkProperties.controlParams.Add("$deeplink_path", "content/1234");
{% endhighlight %}

{% endif %}

{% endexample %}

{% example title="When creating Marketing links on the Branch dashboard" %}

You can specify the control parameters for individual marketing links by inserting the keys and values into the _Deep Link Data (Advanced)_ section.

{% image src='/img/pages/features/deeplink-routing/deeplink_path.png' half center alt='deeplink path' %}

{% endexample %}

{% endif %}