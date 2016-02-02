---
type: recipe
directory: getting-started
title: Link Creation
page_title: How to create Branch links
description: Learn about the multiple ways to create Branch deeplinks for iOS and Android apps.
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
- guide
---

{% protip title="Link Creation vs. Link Configuration" %}
This page describes the various ways to create links, which are the foundation to everything Branch offers. You can read more about using the link data dictionary to define key/value pairs for deeplinking, and the various link analytics and control parameters used throughout this page on the [Link Configuration page]({{base.url}}/getting-started/link-configuration).
{% endprotip %}

## Mobile SDKs

With the Branch mobile SDKs, you can easily allow your app's users to create links for sharing content, inviting friends, etc.

{% if page.ios or page.android or page.unity or page.titanium %}

{% protip title="What is a BranchUniversalObject?" %}
A `BranchUniversalObject` is the container Branch uses to organize and track your app's content. It provides convenient methods for sharing, deeplinking, and tracking analytics for each piece of content you define.
{% endprotip %}

{% endif %}

<!--- iOS -->
{% if page.ios %}

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

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, and define any custom key/value pairs:

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

Define any additional analytics and  control parameters:

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

{% example title="Let Branch handle the details" %}

Creating links is great, but creating a ton of different links up front for all the channels in `UIActivityViewController` is a pain. You can use our preconfigured `UIActivityItemProvider` to make life easier. Calling this method will automatically generate a Branch link with all the appropriate analytics tags when the user presses a button to share.

{% image src='/img/pages/getting-started/link-creation/ios_share_sheet.jpg' actual center alt='ios share sheet' %}

To implement it, use the following `showShareSheetWithLinkProperties` method instead of `getShortUrlWithLinkProperties` in the last step above:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject showShareSheetWithLinkProperties:linkProperties
                                           andShareText:@"Super amazing thing I want to share!"
                                     fromViewController:self 
                                            andCallback:^{
    NSLog(@"finished presenting");
}];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
branchUniversalObject.showShareSheetWithLinkProperties(linkProperties, 
                                        andShareText: "Super amazing thing I want to share!",
                                        fromViewController: self,
                                        andCallback: { () -> Void in
    NSLog("done showing share sheet!")
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endexample %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, and define any custom key/value pairs:

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

Define any additional analytics and control parameters:

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$desktop_url", "http://example.com/home")
               .addControlParameter("$ios_url", "http://example.com/ios");
{% endhighlight %}

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

{% example title="Let Branch handle the details" %}

Android has very poor offerings for native share sheet functionality, so we built our own and bundled it into the core SDK. This share sheet is customizable and will automatically generate a link when the user selects a channel to share to.

{% image src='/img/pages/getting-started/link-creation/android_share_sheet.png' third center alt='Android share sheet' %}

To implement it, use the following `showShareSheet` method instead of `generateShortUrl` in the last step above:

{% highlight java %}
branchUniversalObject.showShareSheet(this, 
                                      linkProperties,
                                      shareSheetStyle,
                                       new Branch.BranchLinkShareListener() {
    @Override
    public void onShareLinkDialogLaunched() {
    }
    @Override
    public void onShareLinkDialogDismissed() {
    }
    @Override
    public void onLinkShareResponse(String sharedLink, String sharedChannel, BranchError error) {
    }
    @Override
    public void onChannelSelected(String channelName) {
    }
});
{% endhighlight %}

You can customize the styling with the ShareSheetStyle class:

{% highlight java %}
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
                        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL);
{% endhighlight %}

{% endexample %}

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

Finally, generate the link:

{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "alias","channel","stage", tags, "feature", uriType);
{% endhighlight %}

{% endif %}

<!--- Unity -->

{% if page.unity %}

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, and define any custom key/value pairs:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "id12345";
universalObject.title = "id12345 title";
universalObject.contentDescription = "My awesome piece of content!";
universalObject.imageUrl = "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png";
universalObject.metadata.Add("foo", "bar");
{% endhighlight %}

Define any additional analytics and control parameters:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "invite";
linkProperties.channel = "Twitter";
linkProperties.stage = "2";
linkProperties.controlParams.Add("$desktop_url", "http://example.com");
{% endhighlight %}

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

Add the event listeners and functions:

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

Build your key/value pairs and add any additional analytics and control parameters:

{% highlight java %}
var dataToInclude:Object = {
	"article_id": "1234",
	"$og_title": "Hot off the presses!",
	"$og_image_url": "mysite.com/image.png",
	"$desktop_url": "mysite.com/article1234"
};
{% endhighlight %}

Finally, generate the link:

{% highlight java %}
branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, and define any custom key/value pairs:

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

Define any additional analytics and control parameters:

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

Finally, generate the link by referencing the `BranchUniversalObject` you created:

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

The event listener `bio:generateShortUrl` returns a `string` object containing the generated link.

{% endif %}

#### Read More

- [iOS documentation](https://github.com/BranchMetrics/iOS-Deferred-Deep-Linking-SDK#branch-universal-object-for-deep-links-content-analytics-and-indexing)
- [Android documentation](https://github.com/BranchMetrics/Android-Deferred-Deep-Linking-SDK#branch-universal-object-for-deep-links-content-analytics-and-indexing)
- [Cordova/Ionic documentation](https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK#linkdata-callback)
- [Xamarin documentation](https://github.com/BranchMetrics/Xamarin-Deferred-Deep-Linking-SDK#shortened-links)
- [Unity documentation](https://github.com/BranchMetrics/Unity-Deferred-Deep-Linking-SDK#shortened-links)
- [Air ANE documentation](https://github.com/BranchMetrics/AIR-ANE-Deferred-Deep-Linking-SDK#shortened-links)
- [Titanium documentation](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK#linkdata-callback)


## Appending query parameters

You can build a Branch link dynamically by appending query parameters. This method is useful if you don't want to wait for a server callback, and don't need to display the resulting (long) link to the user.

{% caution title="Incomplete support on iOS" %}
[Universal Links]({{base.url}}/getting-started/universal-links) and [Spotlight]({{base.url}}/features/spotlight-indexing) do not support dynamically generated links. 
{% endcaution %}

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

{% protip title="Use URL encoding" %}
Please make sure to URL encode everything, lest the link will break.
{% endprotip %}

## Web SDK

You can use the Branch Web SDK to create links in several ways:

- [Text-Me-The-App page]({{base.url}}/features/text-me-the-app-page)
- [App Download Banner]({{base.url}}/features/app-download-banner)
- [Website to app routing]({{base.url}}/features/deeplink-mobile-site)

A basic `link()` function is also available for custom implementations.

{% example title="Generic link() example" %}

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

#### Callback Format

{% highlight js %}
callback(
    "Error message",
    'https://bnc.lt/l/3HZMytU-BW' // Branch shortlink URL
);
{% endhighlight %}

{% endexample %}

#### Read More

- [Web link documentation](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#linkdata-callback)
- [Smart banner documentation](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#banneroptions-data)
- [SMS link documentation](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#sendsmsphone-linkdata-options-callback)

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

#### Read More

- [URL endpoint documentation](https://github.com/BranchMetrics/Branch-Public-API#creating-a-deep-linking-url)
- [Bulk link endpoint documentation](https://github.com/BranchMetrics/Branch-Public-API#bulk-creating-deep-linking-urls)

## Dashboard

You can create links on the [Marketing page](https://dashboard.branch.io/#/marketing) of the Branch dashboard. Many link parameters can be configured using this UI, and most others can be manually specified under the _Deep Link Data (Advanced)_ section.

{% image src="/img/pages/getting-started/link-creation/add_full.png" half center alt="Link Tags" %}