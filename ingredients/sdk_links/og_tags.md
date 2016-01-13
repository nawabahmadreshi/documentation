{% section header %}### OG Tags - Looking Good on Social Media

If you want to tailor how a link will appear on social media, you should make use of our support for Open Graph (OG) tags. You can customize the OG tags associated with the link by including key-value pairs in the params dictionary when creating a link. Note that these overwrite any defaults that you previously set on the Branch Dashboard.

| Key | Value
| --- | ---
| "$og_title" | The title you'd like to appear for the link in social media
| "$og_description" | The description you'd like to appear for the link in social media
| "$og_image_url" | The URL for the image you'd like to appear for the link in social media
| "$og_video" | The URL for the video
| "$og_url" | The URL you'd like to appear
| "$og_app_id" | Your OG app ID. Optional and rarely used.

{% endsection %}

<!--- iOS -->
{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

// Add any additional custom OG tags here
[branchUniversalObject addMetadataKey:@"$og_video" value:@"http://mysite/video.mpg"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"

// Add any additional custom OG tags here
branchUniversalObject.addMetadataKey("$og_video", value: "http://mysite/video.mpg")
{% endhighlight %}
{% endtab %}
{% endtabs %}

Check out our [Content Sharing](/recipes/content_sharing/{{page.platform}}/) guide to see simple examples of complete a link from the Branch Universal Object.

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")

// Add any additional custom OG tags here
                .addContentMetadata("$og_video", "http://mysite/video.mpg");
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
        "$og_title": "MyApp is disrupting apps",
        "$og_image_url": "http://yoursite.com/pics/987666.png",
        "$og_description": "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out."
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
data.Add("$og_image_url", "http://yoursite.com/pics/987666.png");
data.Add("$og_description", "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out.");

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
    { "$og_title", "Hot off the presses!" },
    { "$og_image_url", "http://yoursite.com/pics/987666.png" },
    { "$og_description", "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out." }
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
    "$og_title": "Hot off the presses!",
    "$og_image_url": "http://yoursite.com/pics/987666.png",
    "$og_description": "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out."
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

{% if page.titanium %}

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",

// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
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

Check out our [Content Sharing](/recipes/content_sharing/{{page.platform}}/) guide to see simple examples of complete a link from the Branch Universal Object.
{% endif %}