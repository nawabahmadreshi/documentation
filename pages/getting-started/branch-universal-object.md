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
sections:
- guide
contents: list
---

A `BranchUniversalObject` is a container that Branch uses to organize and track pieces of content within your app. As a single, self-contained object associated with each thing that you want to share, it provides convenient methods for sharing, deep linking, and tracking how often that thing is viewed.

{% if page.cordova or page.xamarin or page.adobe %}

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
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(String: "item/12345")
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

{% if page.unity %}

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "id12345";
universalObject.title = "id12345 title";
universalObject.contentDescription = "My awesome piece of content!";
universalObject.imageUrl = "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png";
universalObject.metadata.Add("foo", "bar");
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

## Parameters

Some of these parameters automatically [populate the OG tag parameters]({{base.url}}/getting-started/configuring-links) of any link created from that `BranchUniversalObject`.

{% if page.ios %}

| Parameter | Usage | OG Tag key
| --- | ---
| **canonicalIdentifier** | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
| **canonicalUrl** | The canonical URL, used for SEO purposes
| **title** | The name for the piece of content | $og_title 
| **contentDescription** | A description for the content | $og_description
| **imageUrl** | The image URL for the content | $og_image_url
| **metadata** | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing).
| **type** | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)*
| **contentIndexMode** | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps*
| **keywords** | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use*
| **expirationDate** | The date when the content will not longer be available or valid*
| **spotlightIdentifier** | |

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.android %}

| Parameter | Usage | OG Tag key
| --- | ---
| **setCanonicalIdentifier** | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
| **setCanonicalUrl** | The canonical URL, used for SEO purposes
| **setTitle** | The name for the piece of content | $og_title 
| **setContentDescription** | A description for the content | $og_description
| **imageUrl** | The image URL for the content | $og_image_url
| **addContentMetadata** | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing).
| **type** | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)*
| **setContentIndexingMode** | Can be set to either `BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC` or `BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE`. Public indicates that you'd like this content to be discovered by other apps*
| **addKeywords** | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use. Can also be called as **addKeyword** with a `string`*
| **setContentExpiration** | The date when the content will not longer be available or valid. Set in milliseconds.*

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.unity %}

| Parameter | Usage | OG Tag key
| --- | ---
| **canonicalIdentifier** | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
| **canonicalUrl** | The canonical URL, used for SEO purposes
| **title** | The name for the piece of content | $og_title 
| **contentDescription** | A description for the content | $og_description
| **imageUrl** | The image URL for the content | $og_image_url
| **metadata** | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| **type** | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)*
| **contentIndexMode** | Can be set to either `ContentIndexModePublic` or `ContentIndexModePrivate`. Public indicates that you'd like this content to be discovered by other apps*
| **keywords** | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use*
| **expirationDate** | The date when the content will not longer be available or valid*

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

{% endif %}

{% if page.titanium %}

| Parameter | Usage | OG Tag key
| --- | ---
| **canonicalIdentifier** | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
| **canonicalUrl** | The canonical URL, used for SEO purposes
| **title** | The name for the piece of content | $og_title 
| **contentDescription** | A description for the content | $og_description
| **contentImageUrl** | The image URL for the content | $og_image_url
| **contentMetadata** | Any extra parameters you'd like to associate with the Branch Universal Object. These will be made available to you after the user clicks the link and opens up the app, and are used for [Deep Link Routing Routing]({{base.url}}/getting-started/deep-link-routing).
| **type** | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)*
| **contentIndexingMode** | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps*
| **keywords** | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use*
| **expirationDate** | The date when the content will not longer be available or valid*

**Currently, this parameter is only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future*

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

### showShareSheetWithLinkProperties

Use Branch's preconfigured `UIActivityItemProvider` to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/ios_share_sheet.png' actual center alt='ios share sheet' %}

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

### listOnSpotlightWithCallback

List your piece of content on Spotlight. Visit the [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) page to learn more.

{% endif %}

{% if page.android %}

### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight java %}
branchUniversalObject.registerView();
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. This share sheet is customizable and will automatically generate a link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/android_share_sheet.png' half center alt='Android share sheet' %}

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

{% endif %}

{% if page.unity %}

### registerView

Call this method when the page loads to track how many times a piece of content is viewed.

{% highlight c# %}
Branch.registerView(universalObject);
{% endhighlight %}

### getShortURL

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

### shareLink

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

To implement it, use the following `shareLink` method instead of `getShortURL ` in the last step above:

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
Branch.registerView(universalObject);
{% endhighlight %}

### generateShortUrl

Create a link to a piece of content. Visit the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) page to learn more.

### showShareSheet

Use Branch's custom share sheet to share a piece of content without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination.

{% image src='/img/pages/getting-started/branch-universal-object/combined_share_sheet.png' actual center alt='ios and android share sheets' %}

To implement it, use the following `showShareSheet` method instead of `generateShortUrl` in the last step above:

{% highlight js %}
branchUniversalObject.showShareSheet({
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage",
  "duration" : 1,
}, {
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

To implement the callback on Android, you must add listeners to the following events:

| Event | Description
| --- | ---
| `bio:shareLinkDialogLaunched` | Fires when the share sheet is presented
| `bio:shareLinkDialogDismissed` | Fires when the share sheet is dismissed
| `bio:shareLinkResponse` | Returns a dictionary of the response data
| `bio:shareChannelSelected` | Fires when a channel is selected

**Note:** Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.

{% endif %}

{% endif %}