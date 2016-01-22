---
type: recipe
title: "Content Analytics Preparation Guide"
page_title: How To Configure Content Analytics
description: Learn how to synchronize your Branch iOS data with Mixpanel, for example to track in-app events, segment users from Branch installs and calculate LTV.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Content Analytics, Content Marketing
platforms:
- ios
- android
sections:
- guide
---

We've found that content marketing is the best way to grow a mobile app. Users download your app because they want to interact with a piece of content or product. Content insights will let you know which entities within your app are driving the most engagment and virality. Here's a sample of a video app:

| Video ID | Views | Links | Clicks | Installs
| --- | --- | --- | --- | ---
| id_213 | 56,721 | 4,321 | 230,012 | 1,231
| id_1099 | 43,795 | 6,321 | 10,012 | 1,001
| id_89 | 15,412 | 3,012 | 8,132 | 923
| ... | ... | ... | ... | ...

## Integration Checklist

Prequisite: Integrate Branch SDK (see [docs here](/recipes/add_the_sdk/ios/) for guide)

1. Define content object with Branch Universal Object
1. Track views with registerView
1. Create Branch links for sharing feature
1. Optional: Setup deep linking!

## Step 1: Define the Content Object

`BranchUniversalObject` is the best way of tracking and sharing content with Branch. `BranchUniversalObject` represents a single piece of content within your app, as well as any associated metadata. It provides convenient methods for sharing, deeplinking, and tracking how often that content is viewed. This information is then used to provide you with powerful content analytics.

{% if page.android %}
{% highlight java %}
import io.branch.indexing.BranchUniversalObject;
{% endhighlight %}
{% endif %}
{% if page.ios %}
{% highlight objective-c %}
#import "BranchUniversalObject.h"
{% endhighlight %}
{% endif %}

Below are the properties of `BranchUniversalObject`.

| Property | Required | Description
| --- | --- | ---
| canonical identifier | true | Canonical identifier for the content referred. Normally the canonical path for your content in the application or web.
| title | true | Title for the content referred by `BranchUniversalObject`
| description | false | Description for the content referred by `BranchUniversalObject`
| image url | false | An image url associated with the content referred
| metadata | false | Any other metadata you would like to associate with the content. Especially useful for passing information to another user when deeplinking.
| type | false | mime type associated with the content referred
| index mode | false | Determines whether to index the data publically
| keywords | false | A collection of keywords associated with the content. Used for indexing.
| expiration | false | Expiry time for the content and any associated links

[1] Note that at the very least a `Canonical Identifier` or `Title` is **required** for creating a `BranchUniversalObject`. This will be used to uniquely identify content. Best practice would be to include both.

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
{% if page.ios %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
branchUniversalObject.contentIndexMode = ContentIndexModePublic;
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];
{% endhighlight %}
{% endif %}

## Step 2: Track Views

`BranchUniversalObject` provides easy way to track when a user views a piece of a content.

{% if page.android %}
{% highlight java %}
branchUniversalObject.registerView();
{% endhighlight %}
{% endif %}
{% if page.ios %}
{% highlight objective-c %}
[branchUniversalObject registerView];
{% endhighlight %}
{% endif %}

## Step 3: Use Branch For Sharing

Once you've set up the universal object, it's easy to get a link that points back to it.

#### First specify link properties

The `LinkProperties` object contains any additional information you need that is specific to the link but does not need to be associated with the object. This includes specifying the `channel` to which a link is shared, the `feature`, etc. This also includes any additional "control parameters" that determine how the link should behave, such as custom redirects.

Note that these values will also be passed into the receiving app when the resulting link is clicked.

{% if page.android %}
{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
                           .setChannel("facebook")
                           .setFeature("sharing")
                           .addControlParameter("$desktop_url", "http://example.com/home")
                           .addControlParameter("$ios_url", "http://example.com/ios");
{% endhighlight %}
{% endif %}
{% if page.ios %}
{% highlight objective-c %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$desktop_url" withValue:@"http://example.com/home"];
[linkProperties addControlParam:@"$ios_url" withValue:@"http://example.com/ios"];
{% endhighlight %}
{% endif %}

After creating your link properties, you can create links either synchronously or asynchronously. We recommend creating links asynchronously as you can better handle poor Internet connectivity.

### Create a single link

Create a single link if you want to manage the `channel` argument. This is the primary method if you have created a custom sharing screen.

{% if page.android %}
#### Synchronously

{% highlight java %}
String shortUrl = branchUniversalObject.getShortUrl(context, linkProperties)
{% endhighlight %}

#### Asynchronously

{% highlight java %}
branchUniversalObject.generateShortUrl(context, linkProperties, new BranchLinkCreateListener() {
    @Override
    public void onLinkCreate(String url, BranchError error) {
        String shortUrl = url;
    }
});
{% endhighlight %}
{% endif %}
{% if page.ios %}
{% highlight objective-c %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"success getting url! %@", url);
    } else {
        NSLog(@"error getting url: %@", error);
    }
}];
{% endhighlight %}
{% endif %}

### Use the Branch Share Sheet

Use the Branch share sheet if you want the SDK to take care of automatically creating links with the correct `channel` argument assigned. This is important for tracking which channels convert the best.

{% if page.android %}
#### First define the styling object

The parameter `shareSheetStyle` below is an instance of `ShareSheetStyle` class which defines the customisation parameters for the share sheet.

{% highlight java %}
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
                        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL);
{% endhighlight %}

#### Show the sheet

Creating a Share Sheet for the content of `BranchUniversalObject` is as simple as follows

{% highlight java %}
branchUniversalObject.showShareSheet(MainActivity.this, 
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

Here's an example of what you'll get!

{% image src='/img/ingredients/sdk_links/android_share_sheet.png' third center alt='android share sheet' %}
{% endif %}
{% if page.ios %}
{% highlight objective-c %}
[branchUniversalObject showShareSheetWithLinkProperties:linkProperties
                                           andShareText:@"Super amazing thing I want to share!"
                                     fromViewController:self 
                                     	    andCallback:^{
	NSLog(@"finished presenting");
}];
{% endhighlight %}

Here's an example of what you'll get!

{% image src='/img/ingredients/sdk_links/ios_share_sheet.jpg' third center alt='ios share sheet' %}
{% endif %}

## Step 4: Set Up Deep Linking

You can head over to our [easy deep linking section](/recipes/setup_deep_linking/ios/) to see how to quickly set it up if you haven't already.
