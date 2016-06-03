---
type: recipe
directory: getting-started
title: BranchUniversalObject
page_title: Learn about the Branch Universal Object
description: Learn what Branch Universal Objects are, and how they can help you track and analyze your app's content
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
hide_section_selector: true
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
- react
sections:
- guide
contents: list
---

A `BranchUniversalObject` is a container that Branch uses to organize and track pieces of content within your app. As a single, self-contained object associated with each thing that you want to share, it provides convenient methods for sharing, deep linking, and tracking how often that thing is viewed.

{% if page.adobe %}

Unfortunately `BranchUniversalObject` is not yet supported on this platform. Please see the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page for alternatives!

{% else %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Defining a Branch Universal Object

You build a `BranchUniversalObject` by assembling parameters. After the parameters are assembled, you can [create a link]({{base.url}}/getting-started/creating-links-in-apps) by referencing the `BranchUniversalObject`.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
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

{% endif %}

{% if page.android %}

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

{% endif %}

{% if page.cordova %}

{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'content/12345',
  title: 'My Content Title',
  contentDescription: 'My Content Description',
  contentImageUrl: 'https://example.com/mycontent-12345.png',
  contentMetadata: {
    'product_picture': '12345',
    'user_id': '6789'
  }
}).then(function (newBranchUniversalObj) {
  branchUniversalObj = newBranchUniversalObj;
  console.log(newBranchUniversalObj);
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}

{% highlight c# %}

BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "content/12345";
universalObject.title = "My Content Title";
universalObject.contentDescription = "My Content Description";
universalObject.imageUrl = "https://example.com/mycontent-12345.png";
universalObject.metadata.Add("product_picture", "1234");
universalObject.metadata.Add("user_id", "6789");
{% endhighlight %}

{% endif %}

{% if page.unity %}

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "content/12345";
universalObject.title = "My Content Title";
universalObject.contentDescription = "My Content Description";
universalObject.imageUrl = "https://example.com/mycontent-12345.png";
universalObject.metadata.Add("product_picture", "1234");
universalObject.metadata.Add("user_id", "6789");
{% endhighlight %}

{% endif %}

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

{% endif %}

{% if page.react %}

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'content/12345', // canonical identifier
  {
    contentTitle: 'My Content Title',
    contentImageUrl: 'https://example.com/mycontent-12345.png',
    contentDescription: 'My Content Description',
    metadata: {
      product_picture: '12345',
      user_id: '6789'
    }
  }
)
{% endhighlight %}

{% endif %}

## Parameters

Some of these parameters automatically [populate the link parameters]({{base.url}}/getting-started/configuring-links) of any link created from that `BranchUniversalObject`. Specifying via `BranchUniversalObject` is preferred.

{% if page.ios %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | The canonical URL, used for SEO purposes
| title | The name for the piece of content | $og_title 
| contentDescription | A description for the content | $og_description
| imageUrl | The image URL for the content | $og_image_url
| metadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing).
| type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)* | $content_type
| contentIndexMode | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| keywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use* |$keywords
| expirationDate | The date when the content will not longer be available or valid* | $exp_date
| spotlightIdentifier | Unique identifier used for iOS Spotlight Indexing. Usually can be left blank

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.android %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| setCanonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| setCanonicalUrl | The canonical URL, used for SEO purposes
| setTitle | The name for the piece of content | $og_title 
| setContentDescription | A description for the content | $og_description
| imageUrl | The image URL for the content | $og_image_url
| addContentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing).
| type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)* | $content_type
| setContentIndexingMode | Can be set to either `BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC` or `BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| addKeywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use. Can also be called as **addKeyword** with a `string`* | $keywords
| setContentExpiration | The date when the content will not longer be available or valid. Set in milliseconds.* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.cordova %}
| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| title | The name for the piece of content | $og_title 
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| contentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| contentIndexingMode | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
{% endif %}

{% if page.xamarin %}
| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| title | The name for the piece of content | $og_title 
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| metadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)* | $content_type
| contentIndexMode | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| keywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use* | $keywords
| expirationDate | The date when the content will not longer be available or valid* | $exp_date
{% endif %}

{% if page.unity %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | The canonical URL, used for SEO purposes
| title | The name for the piece of content | $og_title 
| contentDescription | A description for the content | $og_description
| imageUrl | The image URL for the content | $og_image_url
| metadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)* | $content_type
| contentIndexMode | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| keywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use* | $keywords
| expirationDate | The date when the content will not longer be available or valid* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.titanium %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| canonicalUrl | The canonical URL, used for SEO purposes
| title | The name for the piece of content | $og_title 
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| contentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)* | $content_type
| contentIndexingMode | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| keywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use* | $keywords
| expirationDate | The date when the content will not longer be available or valid* | $exp_date

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.react %}

{% protip title="Partial support in React Native" %}
Only a subset of link parameters are currently supported in the React Native SDK. We hope to include more soon, and would also gladly accept pull requests to our [GitHub repo](https://github.com/BranchMetrics/React-Native-Deferred-Deep-Linking-SDK)!
{% endprotip %}

| Parameter | Usage | Link Parameter
| --- | --- | ---
| canonicalIdentifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | $canonical_identifier
| contentTitle | The name for the piece of content | $og_title 
| contentDescription | A description for the content | $og_description
| contentImageUrl | The image URL for the content | $og_image_url
| contentIndexingMode | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps* | $publicly_indexable
| contentMetadata | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).

{% endif %}

## Methods

After you've assembled parameters to create your `BranchUniversalObject`, there are a number of methods you can call on it.

{% if page.ios %}

### registerView

Call this method in `viewDidLoad` or `viewDidAppear` to track how many times a piece of content is viewed.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject registerView];
{% endhighlight %}
{% endtab %}

{% tab swift %}
{% highlight swift %}
branchUniversalObject.registerView()
{% endhighlight %}
{% endtab %}
{% endtabs %}


### getShortUrlWithLinkProperties

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error && url) {
        NSLog(@"success getting url! %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrlWithLinkProperties(linkProperties,  andCallback: { (url: String?, error: NSError?) -> Void in
    if error == nil, let url = optUrl {
        NSLog("got my Branch link to share: %@", url)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

### showShareSheetWithLinkProperties

Use Branch's preconfigured `UIActivityItemProvider` to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/ios_share_sheet.png' actual center alt='ios share sheet' %}

To implement it, use the following `showShareSheetWithLinkProperties` method on your `branchUniversalObject`

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

### listOnSpotlightWithCallback

List your piece of content on Spotlight. Visit the [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) page to learn more.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject listOnSpotlightWithIdentifierCallback:^(NSString *url, NSString *spotlightIdentifier, NSError *error) {
    if (!error) {
        NSLog(@"success getting url! %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject. listOnSpotlightWithIdentifierCallback((url: String?, spotlightIdentifier: String?, error: NSError?) -> Void in
    if error == nil {
        NSLog("got my Branch link to share: %@", url)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}

{% if page.android %}

### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight java %}
branchUniversalObject.registerView();
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

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

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. This share sheet is customizable and will automatically generate a link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/android_share_sheet.png' half center alt='Android share sheet' %}

To implement it, use the following `showShareSheet` method on your `branchUniversalObject`

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

{% endif %}

{% if page.cordova %}
### registerView

Call this method when the content loads on screen to track how many times a piece of content is viewed.

{% highlight js %}
branchUniversalObj.registerView();
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

{% highlight js %}
branchUniversalObj.generateShortUrl({
  // put your link properties here
  "feature" : "sharing",
  "channel" : "facebook"
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com/monster/12345",
}).then(function (res) {
    // Success Callback
    console.log(res.generatedUrl);
});
{% endhighlight %}

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

To implement it, use the following `showShareSheet` method on your `branchUniversalObject`

{% highlight js %}
branchUniversalObj.showShareSheet({
  // put your link properties here
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

#### Share sheet callbacks

{% protip %}
Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.
{% endprotip %}

To implement the callback on Android, you must add listeners to the following events:

##### onShareSheetLaunched

The event fires when the share sheet is presented.

{% highlight js %}
branchUniversalObj.onShareSheetLaunched(function () {
  console.log('Share sheet launched');
});
{% endhighlight %}

##### onShareSheetDismissed

The event fires when the share sheet is dismissed.

{% highlight js %}
branchUniversalObj.onShareSheetDismissed(function () {
  console.log('Share sheet dimissed');
});
{% endhighlight %}

##### onLinkShareResponse (Android ONLY)

The event returns a dictionary of the response data.

{% highlight js %}
branchUniversalObj.onLinkShareResponse(function (res) {
  console.log('Share link response: ' + JSON.stringify(res));
});
{% endhighlight %}

##### onChannelSelected (Android ONLY)

The event fires when a channel is selected.

{% highlight js %}
branchUniversalObj.onChannelSelected(function (res) {
  console.log('Channel selected: ' + JSON.stringify(res));
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}
### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight c# %}
Branch.GetInstance().RegisterView (BranchUniversalObject universalObject)
{% endhighlight %}

### getShortURL

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more. First define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Then call getShortUrl with the `universalObject` and `linkProperties`. Make sure to pass in a reference where you've registered a delegate to `IBranchUrlInterface` as below.

{% highlight c# %}
Branch.GetInstance().GetShortURL (IBranchUrlInterface callback,
                              universalObject,
                              linkProperties);

{% endhighlight %}

Now define the delegate implementation for `IBranchUrlInterface`.

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
{% endhighlight %}

### shareLink

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

First define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Then use the following `shareLink` method on your `branchUniversalObject`

{% highlight c# %}
Branch.GetInstance().ShareLink (IBranchLinkShareInterface callback,
           universalObject,
           linkProperties,
           "Check this out!")
{% endhighlight %}

If you want to be notified when the user returns from the share sheet, implement the delegate of `IBranchLinkShareInterface`

{% highlight c# %}
#region IBranchLinkShareInterface implementation

public void LinkShareResponse (string sharedLink, string sharedChannel)
{
    // handle completion
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}

### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight c# %}
Branch.registerView(universalObject);
{% endhighlight %}

### getShortURL

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

First define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Then call getShortUrl to retrieve the Branch link with the customized properties.

{% highlight c# %}
Branch.getShortURL(universalObject, linkProperties, (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.getShortURL failed: " + error);
    } else {
        Debug.Log("Branch.getShortURL shared params: " + url);
    }
});
{% endhighlight %}

### shareLink

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

Then use the following `shareLink` method on your `branchUniversalObject`

{% highlight c# %}
Branch.shareLink(universalObject, linkProperties, "hello there with short url", (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.shareLink failed: " + error);
    } else {
        Debug.Log("Branch.shareLink shared params: " + url);
    }
});
{% endhighlight %}
{% endif %}

{% if page.titanium %}

### registerView

Call this method in `viewDidLoad` or `viewDidAppear` to track how many times a piece of content is viewed.

{% highlight js %}
branchUniversalObject.registerView();
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

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

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

To implement it, use the following `showShareSheet` method on your `branchUniversalObject`

{% highlight js %}
branchUniversalObject.showShareSheet({
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
}, {
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

#### Share sheet callbacks (Android ONLY)

{% protip %}
Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.
{% endprotip %}

To implement the callback on Android, you must add listeners to the following events:

##### shareLinkDialogLaunched

The event fires when the share sheet is presented.

{% highlight js %}
branchUniversalObject.shareLinkDialogLaunched(function () {
  console.log('Share sheet launched');
});
{% endhighlight %}

##### shareLinkDialogDismissed

The event fires when the share sheet is dismissed.

{% highlight js %}
branchUniversalObject.shareLinkDialogDismissed(function () {
  console.log('Share sheet dimissed');
});
{% endhighlight %}

##### shareLinkResponse

The event returns a dictionary of the response data.

{% highlight js %}
branchUniversalObject.shareLinkResponse(function (res) {
  console.log('Share link response: ' + JSON.stringify(res));
});
{% endhighlight %}

##### shareChannelSelected

The event fires when a channel is selected.

{% highlight js %}
branchUniversalObject.shareChannelSelected(function (res) {
  console.log('Channel selected: ' + JSON.stringify(res));
});

{% endhighlight %}

{% endif %}

{% if page.react %}

### registerView

Call this method in `viewDidLoad` or `viewDidAppear` to track how many times a piece of content is viewed.

{% highlight js %}
let viewResult = await branchUniversalObject.registerView()
{% endhighlight %}

### getShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

{% highlight js %}
let linkProperties = {
  feature: 'share',
  channel: 'facebook'
}

let controlParams = {
  $desktop_url: 'http://desktop-url.com/monster/12345'
}

let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

### showShareSheet

Use Branch’s custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios share sheet' %}

To implement it, first set your `shareOptions`

{% highlight js %}
let shareOptions = {
  messageHeader: 'Check this out',
  messageBody: 'No really, check this out!'
}

let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
{% endhighlight %}

### listOnSpotlight

For iOS apps only, you can list content on Spotlight search with the following method:

{% highlight js %}
let spotlightResult = await branchUniversalObject.listOnSpotlight()
{% endhighlight %}

{% endif %}

{% endif %}
