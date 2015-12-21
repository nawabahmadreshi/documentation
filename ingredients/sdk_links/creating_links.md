{% section header %}### Creating links in your app{% endsection %}

{% section explanation %}

{% if page.ios or page.android or page.unity %}
`BranchUniversalObject` is the best way of tracking and sharing content with Branch. It provides convenient methods for sharing, deeplinking, and tracking how often that content is viewed. This information is then used to provide you with powerful content analytics. 

Below is how to create your own Branch Links. In order to share these links, we've built a _native share sheet for Android_ and implemented a simple way to use _UIActivityViewController on iOS_. 
{% section learn-more %} Check out the section on [**content sharing**](/recipes/content_sharing/{% section platform %}{{page.platform}}{% endsection %}).{% endsection %}
{% else %}
Links are the foundation to everything Branch offers. There are many different aspects to creating links but the most important are:

Embed key/value deep link metadata. We'll make sure this gets delivered to the app with the clicking user.

Here's how to create your own Branch Links:
{% endif %}

{% endsection %}

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

{% if page.titanium %}

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
