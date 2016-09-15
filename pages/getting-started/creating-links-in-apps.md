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
- react
- mparticle_ios
- mparticle_android
sections:
- overview
- apps
- dashboard
- chrome-extension
- other-ways
hide_platform_selector:
- dashboard
- chrome-extension
- other-ways
contents:
  list:
  number:
    - apps
    - dashboard
  hide:
---

{% if page.overview %}
Links are the foundation of everything Branch offers. By using our mobile SDKs to create Branch links in your app, you can easily allow your users to accomplish tasks such as sharing content or inviting friends.

{% protip %}
For alternative ways to create Branch links, including via the dashboard, your website, the API, or appending URL query parameters, see the [Creating Links in Other Ways page]({{base.url}}/getting-started/creating-links-other-ways).

You can read more about using the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters used throughout this page on the [Link Configuration page]({{base.url}}/getting-started/configuring-links).
{% endprotip %}

{% getstarted %}{% endgetstarted %}

{% elsif page.apps %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

<!--- iOS -->
{% if page.ios or page.mparticle_ios %}

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
    if (!error && url) {
        NSLog(@"success getting url! %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrlWithLinkProperties(linkProperties,  andCallback: { (optUrl: String?, error: NSError?) -> Void in
    if error == nil, let url = optUrl {
        print("got my Branch link to share: %@", url)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/ios/#showsharesheetwithlinkproperties).
{% endprotip %}

{% protip title="What happens if the internet goes out?" %}
When the Branch SDK requests a short link, it will try three times before failing. In the event that the request fails, the SDK reverts to local link generation. Rather than not creating a link at all, the link parameters will be appended as query params, and then the link metadata is appended as base64 encoded data. If your app is generating unusually long links, check the device's internet connection.
{% endprotip %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android or page.mparticle_android %}

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

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/android/#showsharesheet).
{% endprotip %}

{% protip title="What happens if the internet goes out?" %}
When the Branch SDK requests a short link, it will try three times before failing. In the event that the request fails, the SDK reverts to local link generation. Rather than not creating a link at all, the link parameters will be appended as query params, and then the link metadata is appended as base64 encoded data. If your app is generating unusually long links, check the device's internet connection.
{% endprotip %}

{% endif %}
<!--- /Android -->

{% if page.cordova %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'monster/12345',
  title: 'Meet Mr. Squiggles',
  contentDescription: 'Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!',
  contentImageUrl: 'https://example.com/monster-pic-12345.png',
  contentMetadata: {
    'userId': '12345',
    'userName': 'Josh',
    'monsterName': 'Mr. Squiggles'
  }
}).then(function (newBranchUniversalObj) {
  branchUniversalObj = newBranchUniversalObj;
  console.log(newBranchUniversalObj);
});
{% endhighlight %}

## Assemble link parameters

Then, create the link to be shared by referencing the `BranchUniversalObject` and defining the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination. We also added a default redirect to a website on the desktop.

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

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/cordova/#showsharesheet).
{% endprotip %}

{% endif %}

{% if page.xamarin %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "item/12345";
universalObject.title = "My Content Title";
universalObject.contentDescription = "My Content Description";
universalObject.imageUrl = "https://example.com/mycontent-12345.png";
universalObject.contentIndexMode = 0; // 1 for private
universalObject.metadata.Add("property1", "red");
universalObject.metadata.Add("property2", "blue");
{% endhighlight %}

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$desktop_url", "http://example.com/home");
linkProperties.controlParams.Add("$ios_url", "http://example.com/ios");
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` you created:

{% highlight c# %}

Branch.GetInstance().GetShortURL (callback,
                              universalObject,
                              linkProperties);

{% endhighlight %}

After you've registered the class as a delegate of `IBranchUrlInterface`, you would next use the returned link and help the user post it to (in this example) Facebook.

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
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

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/unity/#sharelink).
{% endprotip %}

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

## Assemble link parameters and generate the links

Define the analytics tags and control parameters, and generate the link by referencing the `BranchUniversalObject` you created:

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
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

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/titanium/#showsharesheet).
{% endprotip %}

{% endif %}

{% if page.react %}

## Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

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

{% ingredient buo-overview %}{% endingredient %}

## Assemble link parameters

Define the analytics tags and control parameters, and generate the link by referencing the `BranchUniversalObject` you created:

{% highlight js %}
let linkProperties = {
  feature: 'sample-feature',
  channel: 'sample-channel'
}

let controlParams = {
  '$desktop_url': 'http://desktop-url.com'
}
{% endhighlight %}

## Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` and parameters you created:

{% highlight js %}
let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/react/#showsharesheet).
{% endprotip %}

{% endif %}

## Next steps

Now that your users can create links inside your app, you will want to set up [**Deep Link Routing**]({{base.url}}/getting-started/deep-link-routing) to send them directly to specific content in your app based on the Branch link they opened.

{% elsif page.dashboard %}

### Creating marketing links in the dashboard

You can create deep links that work on all platforms and look good on social media directly in the Branch [dashboard](https://dashboard.branch.io){:target="_blank"}.

{% image src='/img/pages/getting-started/creating-links/create-link.png' 2-thirds center alt='Create link button' %}

{% protip title='Optimize your link creation' %}

Creating deep links into your app is much easier if you [host deep link data on your website]({{base.url}}/getting-started/hosted-deep-link-data). You should also be sure to fill out your [link settings](https://dashboard.branch.io/settings/link){:target="_blank"} completely, so that your users are always directed to the right place.

{% endprotip %}

## Define your link

Step 1 includes all the fields you need to fill in order to create a successful link.

{% image src='/img/pages/getting-started/creating-links/define.png' full center alt='Define your link' %}

#### Name your link

This is the name that will show for your link under **Marketing Title** on the [Marketing Links](https://dashboard.branch.io/settings/link){:target="_blank"} page. Choosing a descriptive name will help you find your link later through search or table sorting.

{% image src='/img/pages/getting-started/creating-links/name-your-link.png' half center alt='Name your link' %}

#### Web URL

When you type or paste a URL from your website into this field, we autofetch all kinds of useful information.  

{% image src='/img/pages/getting-started/creating-links/web-url.png' half center alt='Web URL' %}

#### Channel and campaign

{% image src='/img/pages/getting-started/creating-links/channel-campaign.png' 2-thirds center alt='Name your link' %}

## Configure options

### Change your URL appearance

{% image src='/img/pages/getting-started/creating-links/alias.png' full center alt='Change your link alias' %}

### Deep link into your app

{% image src='/img/pages/getting-started/creating-links/deep-linking.png' full center alt='Deep linking' %}

### Define redirects when the app isn't installed

{% image src='/img/pages/getting-started/creating-links/redirects.png' full center alt='Redirects' %}

### Set channel, campaign, and tags for analytics

{% image src='/img/pages/getting-started/creating-links/analytics-tags.png' full center alt='Analytics tags' %}

### Customize your link appearance on social media

{% image src='/img/pages/getting-started/creating-links/social-media.png' full center alt='Social media' %}

## Validate and share

{% image src='/img/pages/getting-started/creating-links/validate-share.png' full center alt='Validate and share' %}

{% image src='/img/pages/getting-started/creating-links/validation.png' full center alt='Validation' %}

{% image src='/img/pages/getting-started/creating-links/marketing-copy.png' full center alt='Copy to clipboard' %}

## See your link analytics

{% image src='/img/pages/getting-started/creating-links/marketing-title.png' full center alt='Marketing title' %}

{% elsif page.chrome-extension %}

### Creating links with the chrome extension

The Branch Chrome Extension makes it very easy for you to create new links, and easily share via any channel for marketing purposes. In the guide below, we'll explain how to get set up and start linking!

{% image src='/img/pages/features/chrome-extension/chrome-extension-overview.png' 2-thirds center alt='Chrome extension example' %}

## One time setup

You must be using Chrome as your browser, as this extension will not work on any other. Apologies for the inconvenience.

### Install the extension

Head to the Chrome Web Store and install the `Branch Link Creator`. You can find it [here](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf).

### Enter your Branch key

Once installed, click the Branch icon at the top right corner. It will show you the following screen:

{% image src='/img/pages/features/chrome-extension/chrome-no-key.png' half center alt='enter key' %}

You can retrieve the Branch key associated with the account you'd like create links for on the main settings page of your [dashboard](https://dashboard.branch.io/settings). Please copy the one starting with `key_live_...` and paste it into the extension. Hit save when you are done.

## Ongoing Branch link creation

Any time you want to create a new Branch link, just do the following:
1. Visit the website you'd like to create a link to
2. Click the Branch icon in the top right

A link will automatically be created for this website.

### Properties of these links

The links will automatically configured with the following properties:

| **Property** | **Value** |
| ---: | --- |
| **type** | 2 - marketing link by default
| **marketing title** | Automatically set to "Link to: <your website URL>"
| **$fallback_url** | the website URL
| **auto_fetch** | true: we'll automatically scrape the website to pull in app links tags and deep link routing info

### Viewing the click data

Since these links are automatically added to the marketing tab of your dashboard, you can easily view the performance by heading to [there](https://dashboard.branch.io/marketing). If you have the SDK integrated, you'll be able to track installs and re-opens. Clicks will be visible always.

{% image src='/img/pages/features/chrome-extension/link-performance.png' half center alt='link performance' %}

{% elsif page.other-ways %}

## Appending query parameters

You can dynamically append additional query parameters to any existing Branch link, or even build a new Branch link by appending query parameters to the base link domain (this method can be useful if you don't want to wait for a server callback and don't care whether the link is short or not because you won't be displaying it to users).

1. Start with an exiting Branch link, or your Branch link domain: **http://[branchsubdomain]**.
1. Append `?` to start the query params string: **http://[branchsubdomain]?**
   - If you're creating a new link and and you're using the legacy `bnc.lt` domain or a custom domain/subdomain as the base for your links, instead append `/a/your_Branch_key?`: **http://bnc.lt/a/your_branch_key?**
1. [optional] Append any additional key/value pairs, and analytics or link control parameters.

{% ingredient branchsubdomain %}{% endingredient %}

{% example %}

Here's an example of a finalized dynamic link (line breaks added for legibility):

{% highlight sh %}
https://[branchsubdomain]?
  %24deeplink_path=article%2Fjan%2F123&
  %24fallback_url=https%3A%2F%2Fgoogle.com&
  channel=facebook&
  feature=affiliate&
  user_id=4562&
  name=Alex
{% endhighlight %}

The following keys have been embedded:

| Key | Value |
| --- | --- |
| **$deeplink_path** | article/jan/123 |
| **$fallback_url** | https://google.com |
| **channel** | facebook |
| **feature** | affiliate |
| **user_id** | 4562 |
| **name** | Alex |

{% endexample %}

{% caution title="Link URL considerations" %}
1. Don't forget to URL encode everything, otherwise the link will break.
1. If any of your links use the legacy `bnc.lt` domain be sure to include your custom domain **and** `bnc.lt` when configuring the [Associated Domains entitlement]({{base.url}}/getting-started/universal-app-links/guide/ios/#add-your-branch-link-domains) for iOS Universal Links.

{% endcaution %}

### URL formats by base domain type

| Link Type | bnc.lt | wxyz.app.link | customdomain.com |
| --- | --- | --- | --- |
| New link | https://bnc.lt/a/key_live_xxxxxxxxxxxxxxx?param=value | https://wxyz.app.link?param=value | https://customdomain.com/a/key_live_xxxxxxxxxxxxxxx?param=value
| Existing SDK link | https://bnc.lt/wxyz/KDSYTMnSZs?param=value | https://wxyz.app.link/KDSYTMnSZs?param=value | https://customdomain.com/wxyz/KDSYTMnSZs?param=value
| Existing marketing link | https://bnc.lt/linkslug?param=value | https://wxyz.app.link/linkslug?param=value | https://customdomain.com/linkslug?param=value

## Web SDK

You can use the Branch Web SDK to create links in several ways:

- [Text-Me-The-App]({{base.url}}/features/text-me-the-app)
- [Journeys Web To App Platform]({{base.url}}/features/journeys)
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
    'https://[branchsubdomain]/l/3HZMytU-BW' // Branch shortlink URL
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
{"url":"https://[branchsubdomain]/m/BqmToC9Ion"}
{% endhighlight %}

{% endif %}