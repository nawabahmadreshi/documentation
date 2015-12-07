
Branch will handle all the deep link routing for you if you leverage the automatic deeplinking functionality described below. Here's how to build on it:

----

{% if page.ios %}

### Make your UIViewController a delegate for BranchDeepLinkingController

The work in this section will take place in the view controller that you want to appear when a user clicks a link. For example, this could be a view to show a product.

#### Import the proper header

In the view controller that will display on link click, first import `Branch.h`.

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

-----

#### Register for the delegate

Make your view controller conform to the delegate `BranchDeepLinkingController`.

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

-----

#### Configure your view on load

Receive the delegate method that will be called when the view controller is loaded from a link click.

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

-----

#### Add a close button

Since the view controller is displayed modally, you should add a close button that let's the user minimize to continue the remainder of your flow.

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

-----

### Register your UIViewController for a specific key

Lastly, you need to tell Branch which view controller you will use and which key to respond to. In this case we're using `product_picture` as above.

**Note**: If you don't know what this key is, see [Creating Links](/recipes/quickstart_guide/{% section platform %}{{page.platform}}/#creating-links{% endsection %})

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

	Branch *branch = [Branch getInstance];

	ExampleDeepLinkingController *controller = [[UIStoryboard storyboardWithName:@"Main"
                                                                          bundle:[NSBundle mainBundle]]
                                                instantiateViewControllerWithIdentifier:@"DeepLinkingController"];

	[branch registerDeepLinkController:controller forKey:@"product_picture"];
	[branch initSessionWithLaunchOptions:launchOptions automaticallyDisplayDeepLinkController:YES];


	return YES;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    let branch: Branch = Branch.getInstance()

    var controller = UIStoryboard.init("Main", NSBundle.mainBundle()).instantiateViewControllerWithIdentifier("DeepLinkingController")

    branch.registerDeepLinkController(controller, forKey: "product_picture")
    branch.initSessionWithLaunchOptions(launchOptions, automaticallyDisplayDeepLinkController: true)
    return true
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

### Register your Activity for a specific key

Most of the configuration for the auto deep link feature will happen in the Manifest file, so let's start there.

#### List the key you want

In your Manifest file, it's easy to specify which deep link keys you want to trigger the Activity to load. Just add this additional metadata for `io.branch.sdk.auto_link_keys` to the Activity you want to use. Let's use `product_picture` in this example

**Note**: If you don't know what this key is, see [Creating Links](/recipes/quickstart_guide/{% section platform %}{{page.platform}}/#creating-links{% endsection %})

{% highlight xml %}
<activity android:name="com.myapp.AutoDeepLinkExampleActivity">
    <meta-data android:name="io.branch.sdk.auto_link_keys" android:value="product_picture" />
    <!-- your other activity stuff -->
</activity>
{% endhighlight %}


#### Optional: Add in a request code for tracking 

If you register your base activity to receive `onActivityResult` you can specify a custom code for the deep link activity like so.

{% highlight xml %}
<meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
{% endhighlight %}

-----

### Setup your Activity for deep linking

Once a link has been clicked, a Branch session has been initialized and the deep link key is detected, the Activity will show. For example, this could be an Activty used to show a product.

#### Retrieve parameters on Activity start

The following code snippet shows an example of how to configure said Activity.

{% highlight java %}
@Override
protected void onResume() {
    super.onResume();
    if (Branch.isAutoDeepLinkLaunch(this)) {
        try {
            String autoDeeplinkedValue = Branch.getInstance().getLatestReferringParams().getString("auto_deeplink_key_1");
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

#### Optional: Be notified when Activity finishes

You can be notified when the deep link activity finishes by using the onActivityResult parameter. Just check for the code you inserted in the Manifest.

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
