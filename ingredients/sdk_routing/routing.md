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
}
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
