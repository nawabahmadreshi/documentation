---
type: recipe
directory: features
title: Personalized welcome
ios_page_title: Personalized Onboarding Flow for iOS Apps
android_page_title: Personalized Onboarding for Android Apps
ios_description: How to set up a personalized invite system and onboarding flow for iOS Apps using Branch deep links. With objective-c and swift code snippets.
android_description: How to set up a personalized invite system and onboarding flow for Android Apps using Branch deep links. With code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Personalized onboarding, onboarding, welcome screen, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Personalized onboarding, onboarding, welcome screen, Android
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- guide
---

{% ingredient quickstart-prerequisite %}{% endingredient %}

Right now, when users open your app for the first time, chances are you have no idea where they came from or who they are. You have no idea if they were invited by a friend on Facebook, found your app randomly browsing through the App Store, saw an ad, or simply discovered it through word of mouth and decided to give it a shot.

**With Branch you can finally tailor the onboarding flow for new users.** Let's get started!


## Generating Links

  In the case of a personalized referral system, you can attach information about the user who is sharing the link. Then this information about this user--here "John" with id "1234"--is present anytime John's friends install the app after clicking his link.


<!--- iOS -->
{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
#import <Branch/Branch.h>
#import <Branch/BranchUniversalObject.h>
#import <Branch/BranchLinkProperties.h>
{% endhighlight %}
{% endtab %}
{% endtabs %}

First create the object that you'd like to link to:

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"
branchUniversalObject.addMetadataKey("property1", value: "blue")
branchUniversalObject.addMetadataKey("property2", value: "red")
{% endhighlight %}
{% endtab %}
{% endtabs %}

Then define the properties of the link you'd like to create.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$desktop_url" withValue:@"http://example.com/home"];
[linkProperties addControlParam:@"$ios_url" withValue:@"http://example.com/ios"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$desktop_url", withValue: "http://example.com/home")
linkProperties.addControlParam("$ios_url", withValue: "http://example.com/ios")
{% endhighlight %}
{% endtab %}
{% endtabs %}

Lastly, create the link by referencing the universal object.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"success getting url! %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrlWithLinkProperties(linkProperties,  andCallback: { (url: String?, error: NSError?) -> Void in
    if error == nil {
        NSLog("got my Branch link to share: %@", url)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

First create the object that you'd like to link to:

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                .addContentMetadata("property1", "blue")
                .addContentMetadata("property2", "red");
{% endhighlight %}

Then define the properties of the link you'd like to create.

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$desktop_url", "http://example.com/home")
               .addControlParameter("$ios_url", "http://example.com/ios");
{% endhighlight %}

Lastly, create the link by referencing the universal object.

{% highlight java %}
branchUniversalObject.generateShortUrl(this, linkProperties, new BranchLinkCreateListener() {
    @Override
    public void onLinkCreate(String url, BranchError error) {
        if (error == null) {
            Log.i("MyApp", "got my Branch link to share: " + url);
        }
    }
});
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}

{% highlight js %}
branch.link({
    channel: 'sms',
    feature: 'share',
    data: {
		"article_id": "1234",
		"$og_title": "Hot off the presses!",
		"$og_image_url": "mysite.com/image.png",
		"$desktop_url": "mysite.com/article1234"
    }
}, function(err, link) {
	if (!err) {
    	console.log("Ready to share my " + link);
	}
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
var data = new Dictionary<string, object>(); 
data.Add("article_id", "1234");
data.Add("$og_title", "Hot off the presses!");
data.Add("$og_image_url", "mysite.com/image.png");
data.Add("$desktop_url", "mysite.com/article1234");

Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "sms", "share");
{% endhighlight %}

After you've registered the class as a delegate of `IBranchUrlInterface`

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
{% endhighlight %}
{% endif %}

<!--- Unity -->

{% if page.unity %}
First create the object that you'd like to link to:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "id12345";
universalObject.title = "id12345 title";
universalObject.contentDescription = "My awesome piece of content!";
universalObject.imageUrl = "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png";
universalObject.metadata.Add("foo", "bar");
{% endhighlight %}

Then define the properties of the link you'd like to create.

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "invite";
linkProperties.channel = "Twitter";
linkProperties.stage = "2";
linkProperties.controlParams.Add("$desktop_url", "http://example.com");
{% endhighlight %}

Lastly, create the link by referencing the universal object.

{% highlight c# %}
Branch.getShortURL(universalObject, linkProperties, (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.getShortURL failed: " + error);
    } else {
        Debug.Log("Branch.getShortURL shared params: " + url);
    }
});
{% endhighlight %}
{% endif %}

<!--- Adobe -->

{% if page.adobe %}

{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
	"article_id": "1234",
	"$og_title": "Hot off the presses!",
	"$og_image_url": "mysite.com/image.png",
	"$desktop_url": "mysite.com/article1234"
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",
  "title" : "My Content Title",
  "contentDescription" : "My Content Description",
  "contentImageUrl" : "https://example.com/mycontent-12345.png",
  "contentIndexingMode" : "public",
  "contentMetadata" : {
      "product_picture" : "12345",
      "user_id" : "6789"
  },
});
{% endhighlight %}

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

To implement the callback, you must add a listener to the event `bio:generateShortUrl`. The event returns a string object containing the generated link.

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

{% endif %}

## The Personal Touch: A Welcome Screen

{% section intro %}

This section will describe a routing example in an abstract way. In case you want the simple version, Branch can handle routing for you automatically. Just check out the section on [**simplified deep link routing**](/recipes/setup_deep_linking/{% section platform %}{{page.platform}}{% endsection %}).
{% endsection %}

{% if page.ios %}

{% section ios_explanation %}
Inside of the deepLinkHandler, you will want to examine the params dictionary to determine whether the user clicked on a link to content. Below is an example assuming that the links correspond to pictures.
{% endsection %}

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

{% section android_explanation %}
Inside `onStart`, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.
{% endsection %}

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

Inside the callback, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.

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
Inside the `InitSessionComplete` callback, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.

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
}Which Apps/Browsers Support Universal Links
{% endhighlight %}

{% endif %}

{% if page.unity %}
Inside the `initSession` callback, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.

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
Inside the `initSuccessed` callback, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.

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

Once is done, initialize the SDK:

{% highlight java %}
branch.init();
{% endhighlight %}

Be sure to have the INIT_SUCCESSED event called, otherwise read the bEvt.informations from the INIT_FAILED event.
{% endif %}

{% if page.titanium %}
Inside the callback, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.

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
