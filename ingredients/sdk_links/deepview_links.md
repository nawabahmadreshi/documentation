{% section header %}### Creating links in your app{% endsection %}

{% section explanation %}
Links are the foundation to everything Branch offers. There are many different aspects to creating links but the most important are:

- Embed key/value deep link metadata. We'll make sure this gets delivered to the app with the clicking user
- Label feature and channel for analytics on the dashboard

Here's how to create your own Branch Links. In order to share these links, we've built a _native share sheet for Android_ and implemented a simple way to use _UIActivityViewController on iOS_. Check out the section on [**content sharing**](/recipes/content_sharing/{% section platform %}{{page.platform}}{% endsection %}).
{% endsection %}

<!--- iOS -->
{% if page.ios %}

On iOS, it's a rather simple method call.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$ios_deepview" withValue:@"default_template"];
[linkProperties addControlParam:@"$android_deepview" withValue:@"default_template"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$ios_deepview", withValue: "default_template")
linkProperties.addControlParam("$android_deepview", withValue: "default_template")
{% endhighlight %}
{% endtab %}
{% endtabs %}

Check out our [Content Sharing](/recipes/content_sharing/{{page.platform}}/) guide to see simple examples of complete a link from the Branch Universal Object.

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$ios_deepview", "default_template")
               .addControlParameter("$android_deepview", "default_template");
{% endhighlight %}

Check out our [Content Sharing](/recipes/content_sharing/{{page.platform}}/) guide to see simple examples of complete a link from the Branch Universal Object.

{% endif %}
<!--- /Android -->

{% if page.cordova %}

{% highlight js %}
branch.link({
    channel: 'sms',
    feature: 'share',
    data: {
		"article_id": "1234",
		"$ios_deepview": "default_template",
		"$android_deepview": "default_template"
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
data.Add("$ios_deepview", "default_template");
data.Add("$android_deepview", "default_template");

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
{% highlight c# %}
Dictionary<string, object> parameters = new Dictionary<string, object>
{
	{ "article_id", "1234" },
	{ "$ios_deepview", "default_template" },
	{ "$android_deepview", "default_template" }
}

string channel = "sms";
string feature = "share";
Branch.getShortURLWithTags(parameters, channel, feature, delegate(string url, string error) {
    // show the link to the user or share it immediately
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
	"$ios_deepview": "default_template",
	"$android_deepview": "default_template"
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

{% if page.titanium %}

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  "$desktop_url" : "http://desktop-url.com",
  "$ios_deepview": "default_template",
  "$android_deepview": "default_template"
});
{% endhighlight %}

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

{% endif %}
