---
type: recipe
directory: getting-started
title: Creating Links
page_title: How to create Branch links
description: Learn about the multiple ways to create Branch deep links for iOS and Android apps.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
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
Links are the foundation of everything Branch offers. By using Branch links, you can easily allow your app's users to accomplish tasks such as sharing content or inviting friends. This guide explains how to generate Branch links by using the mobile SDKs for each platform. See the Advanced page to learn about other link creation methods.

{% protip %}
You can read more about using the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters used throughout this page on the [Link Configuration page]({{base.url}}/getting-started/link-configuration).
{% endprotip %}

{% elsif page.guide %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

<!--- iOS -->
{% if page.ios %}

## Import framework

Import the Branch framework into the view controller where you will be creating links:

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

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

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

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

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

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

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

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

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

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$desktop_url", "http://example.com/home")
               .addControlParameter("$ios_url", "http://example.com/ios");
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

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

The Cordova/Ionic creates link with the `link()` function. Here is a generic example:

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

## Assemble link parameters

Build your key/value pairs and add any additional analytics and control parameters:

{% highlight c# %}
var data = new Dictionary<string, object>(); 
data.Add("user", "Joe");
data.Add("profile_pic", "https://s3-us-west-1.amazonaws.com/myapp/joes_pic.jpg");
data.Add("description", "Joe likes long walks on the beach...") 

// associate a url with a set of tags, channel, feature, and stage for better analytics.
// tags: null or example set of tags could be "version1", "trial6", etc
// channel: null or examples: "facebook", "twitter", "text_message", etc
// feature: null or examples: Branch.FEATURE_TAG_SHARE, Branch.FEATURE_TAG_REFERRAL, "unlock", etc
// stage: null or examples: "past_customer", "logged_in", "level_6"

List<String> tags = new List<String>();
tags.Add("version1");
tags.Add("trial6");
{% endhighlight %}

## Generate the link

Use the `GetShortUrlAsync()` method to create a link based on the data you assembled:

{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "alias","channel","stage", tags, "feature", uriType);
{% endhighlight %}

{% endif %}

<!--- Unity -->

{% if page.unity %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "id12345";
universalObject.title = "id12345 title";
universalObject.contentDescription = "My awesome piece of content!";
universalObject.imageUrl = "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png";
universalObject.metadata.Add("foo", "bar");
{% endhighlight %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "invite";
linkProperties.channel = "Twitter";
linkProperties.stage = "2";
linkProperties.controlParams.Add("$desktop_url", "http://example.com");
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

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

## Add the event listeners and functions

Use this snippet to register the methods that respond when link creation succeeds or fails:

{% highlight java %}
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}
{% endhighlight %}

## Assemble link information

Build your key/value pairs and add any additional analytics and control parameters:

{% highlight java %}
var dataToInclude:Object = {
	"article_id": "1234",
	"$og_title": "Hot off the presses!",
	"$og_image_url": "mysite.com/image.png",
	"$desktop_url": "mysite.com/article1234"
};
{% endhighlight %}

## Generate the links

Then generate the link with the getShortUrl() method:

{% highlight java %}
branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

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

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters, and generate the link by referencing the `BranchUniversalObject` you created:

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

The event listener `bio:generateShortUrl` returns a `string` object containing the generated link:

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

{% endif %}

{% elsif page.advanced %}

## Appending query parameters

You can build a Branch link dynamically by appending query parameters. This method is useful if you don't want to wait for a server callback, and don't need to display the resulting (long) link to the user.

{% protip %}
Try out the [Dynamic Link Builder]({{base.url}}/getting-started/dynamic-link-builder) to easily construct links of this type, or verify that links you have created are valid.
{% endprotip %}

1. Start with the Branch link domain: **http://bnc.lt** (you can also use your custom domain/subdomain here).
2. Append `/a/your_Branch_key`: **http://bnc.lt/a/your_branch_key**
3. Append `?` to start the query params string: **http://bnc.lt/a/your_branch_key?**
4. [optional] Append any additional key/value pairs, and analytics or link control parameters.

{% example %}

Here's an example of a finalized dynamic link with the following keys:

| Key | Value |
| --- | --- |
| **$deeplink_path** | article/jan/123 |
| **$fallback_url** | https://google.com |
| **channel** | facebook |
| **feature** | affiliate |
| **user_id** | 4562 |
| **name** | Alex |

{% highlight sh %}
https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$deeplink_path=article%2Fjan%2F123&$fallback_url=https%3A%2F%2Fgoogle.com&channel=facebook&feature=affiliate&user_id=4562&name=Alex
{% endhighlight %}

{% endexample %}

{% caution title="Use URL encoding" %}
Please make sure to URL encode everything, lest the link will break.
{% endcaution %}

## Web SDK

You can use the Branch Web SDK to create links in several ways:

- [Text-Me-The-App]({{base.url}}/features/text-me-the-app)
- [Smart Banner]({{base.url}}/features/smart-banner)
- [Website To App Routing]({{base.url}}/features/website-to-app-routing)

#### Link() function

A basic `link()` function is also available for custom implementations:

{% highlight js %}
branch.link({
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$ipad_url': 'http://myappwebsite.com/ipad',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}, function(err, link) {
    console.log(err, link);
});
{% endhighlight %}

##### Callback Format

{% highlight js %}
callback(
    "Error message",
    'https://bnc.lt/l/3HZMytU-BW' // Branch shortlink URL
);
{% endhighlight %}

## HTTP API

If you want to build something custom, you can generate links by querying the Branch API directly. Here is an example CURL call:

{% highlight sh %}
curl -X POST \
-H "Content-Type: application/json" \
-d '{"branch_key":"key_live_jfdweptNITtAY5HVY3mBSojopgfGf8qQ",
"sdk":"api",
"campaign":"announcement",
"feature":"invite",
"channel":"email",
"tags":["4"],
"data":"{\"name\":\"Alex\",\"email\":\"alex@branch.io\",\"$desktop_url\":\"https://branch.io\"}"
}' \
https://api.branch.io/v1/url
{% endhighlight %}

This will return Branch shortlink:

{% highlight sh %}
{"url":"https://bnc.lt/m/BqmToC9Ion"}
{% endhighlight %}

## Dashboard

You can create links on the [Marketing page](https://dashboard.branch.io/#/marketing) of the Branch dashboard. Many link parameters can be configured using this UI, and most others can be manually specified under the _Deep Link Data (Advanced)_ section.

{% image src="/img/pages/getting-started/creating-links/add_full.png" half center alt="Link Tags" %}

{% endif %}