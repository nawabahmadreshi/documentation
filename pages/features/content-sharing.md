---
type: recipe
directory: features
title: "Content Sharing"
page_title: Deep Links for Content Sharing
description: How to create deep links programmatically to share content and how to route to content within your app. With code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Content Sharing, Content, Routing, SMS, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Content Sharing, Content, Routing, SMS, Android
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
- overview
- guide
- advanced
---

{% if page.overview %}

If your users are creating content in your app, they will probably want to share that content with their friends. You can encourage this by making it easy to generate sharing links that open your app *and* route back exactly to the piece of content that was originally shared. This will even work when the user who opens the link doesn't have your app installed yet.

**By using Branch deep links, you can take users directly to where they want to go in your app!**

{% getstarted title="Get started with content sharing" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To implement a content sharing flow, you will need to [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

Let's say you have developed an app called **Branch Monster Factory**. You want your users to share the monsters they create with their friends, and see the monster that was shared as soon as your app opens. Let's get started!

## Generate sharing links

The first thing we need to do is allow your users to create links. These links will to contain references to the content being shared, which generate analytics data and allow your app to route straight back to that content when a link is opened.

<!--- iOS -->
{% if page.ios %}

Start by importing the relevant Branch frameworks into the view controller you will be using:

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

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"monster/12345"];
branchUniversalObject.title = @"Meet Mr. Squiggles";
branchUniversalObject.contentDescription = @"Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
branchUniversalObject.imageUrl = @"https://example.com/monster-pic-12345.png";
[branchUniversalObject addMetadataKey:@"userId" value:@"12345"];
[branchUniversalObject addMetadataKey:@"userName" value:@"Josh"];
[branchUniversalObject addMetadataKey:@"monsterName" value:@"Mr. Squiggles"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "monster/12345")
branchUniversalObject.title = "Meet Mr. Squiggles"
branchUniversalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!"
branchUniversalObject.imageUrl = "https://example.com/monster-pic-12345.png"
branchUniversalObject.addMetadataKey("userId", value: "12345")
branchUniversalObject.addMetadataKey("userName", value: "Josh")
branchUniversalObject.addMetadataKey("monsterName", value: "Mr. Squiggles")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Then define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"share";
linkProperties.channel = @"facebook";
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "share"
linkProperties.channel = "facebook"
{% endhighlight %}
{% endtab %}
{% endtabs %}

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"got my Branch invite link to share: %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrlWithLinkProperties(linkProperties,  andCallback: { (url: String?, error: NSError?) -> Void in
    if error == nil {
        NSLog("got my Branch invite link to share: %@", url)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("monster/12345")
                .setTitle("Meet Mr. Squiggles")
                .setContentDescription("Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!")
                .setContentImageUrl("https://example.com/monster-pic-12345.png")
                .addContentMetadata("userId", "12345")
                .addContentMetadata("userName", "Josh");
                .addContentMetadata("monsterName", "Mr. Squiggles");
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Then define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
{% endhighlight %}

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

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

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}
<!--- /Android -->

{% if page.cordova %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

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

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

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

{% endif %}

{% if page.xamarin %}

Build a link containing details about the user who is inviting friends. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight c# %}
var data = new Dictionary<string, object>(); 
data.Add("userId", "12345");
data.Add("userName", "Josh");
data.Add("monsterName", "Mr. Squiggles");
data.Add("$og_title", "Meet Mr. Squiggles");
data.Add("$og_description", "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!");
data.Add("$og_image_url", "https://example.com/monster-pic-12345.png");

Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "facebook", "share");
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

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "monster/12345";
universalObject.title = "Meet Mr. Squiggles";
universalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
universalObject.imageUrl = "https://example.com/monster-pic-12345.png";
universalObject.metadata.Add("userId", "12345");
universalObject.metadata.Add("userName", "Josh");
universalObject.metadata.Add("monsterName", "Mr. Squiggles");
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Then define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "share";
linkProperties.channel = "facebook";
{% endhighlight %}

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

{% highlight c# %}
Branch.getShortURL(universalObject, linkProperties, (url, error) => {
    if (error != null) {
        Debug.LogError("Branch.getShortURL failed: " + error);
    } else {
        Debug.Log("Branch.getShortURL shared params: " + url);
    }
});
{% endhighlight %}

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}

<!--- Adobe -->

{% if page.adobe %}

Build a link containing details about the user who is inviting friends. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "got my Branch invite link to share: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
	"userId": "12345",
	"userName": "Josh",
	"monsterName": "Mr. Squiggles",
	"$og_title": "Meet Mr. Squiggles",
	"$og_description": "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!"
	"$og_image_url": "https://example.com/monster-pic-12345.png"
};

branch.getShortUrl(tags, "facebook", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}

<!--- Titanium -->

{% if page.titanium %}

Create a `BranchUniversalObject` containing details about the content that is being shared:

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "monster/12345",
  "title" : "Meet Mr. Squiggles",
  "contentDescription" : "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!",
  "contentImageUrl" : "https://example.com/monster-pic-12345.png",
  "contentMetadata" : {
      "userId" : "12345",
      "userName" : "Josh",
      "monsterName" : "Mr. Squiggles"
  },
});
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Then define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination:

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "share",
  "channel" : "facebook"
}, {
});
{% endhighlight %}

To implement the callback, you must add a listener to the event `bio:generateShortUrl`. The event returns a string object containing the generated link. You would next use the returned link and help the user post it to (in this example) Facebook.

{% highlight js %}
branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}

{% endif %}

<!--- React -->

{% if page.react %}

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight js %}
var branchUniversalObject = {
   metadata:{  
      "userId" : "12345",
      "userName" : "Josh",
      "monsterName" : "Mr. Squiggles"
   },
   "canonicalIdentifier" : "monster/12345",
   "contentTitle" : "Meet Mr. Squiggles",
   "contentDescription" : "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!",
   "contentImageUrl" : "https://example.com/monster-pic-12345.png"
};
{% endhighlight %}

{% protip %}
The `canonicalIdentifier` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.
{% endprotip %}

Then, create the link to be shared by referencing the `BranchUniversalObject` and defining the properties of the link.

{% protip title="Unsupported in React Native" %}
A stand-alone link creation method is currently not available in the React Native SDK. We hope to include one soon, and would also gladly accept pull requests to our [GitHub repo](https://github.com/BranchMetrics/React-Native-Deep-Linking-SDK)!

In the meantime, you can use the `showShareSheet` method instead. [Read more about it here]({{base.url}}/getting-started/branch-universal-object/guide/react/#showsharesheet).
{% endprotip %}

{% endif %}

{% protip title="To learn more about the concepts we used, visit these pages:" %}

- [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps)
- [Configuring Links]({{base.url}}/getting-started/configuring-links)
- [BranchUniversalObject]({{base.url}}/getting-started/branch-universal-object)
- [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing)

{% endprotip %}

## Route incoming users directly to content

Now that your user has created a link and sent it to a friend, you should detect the incoming link when that friend opens your app, and route directly to the shared content. Read more about how to do this on the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page.

If you want to give a preview of the content to users who have not yet downloaded your app, try out [Deepviews]({{base.url}}/features/deepviews).

## Viewing live data on the Branch dashboard

The [Analytics page](https://dashboard.branch.io/#/analytics/content) on the Branch dashboard allows you to see data on content your users are sharing, and which pieces of content are the most popular. You can also use the dashboard's [Live View page](https://dashboard.branch.io/#/liveview) to see links and link clicks in real time.

{% protip %}
The [Influencers page](https://dashboard.branch.io/#/referrals/influencers) on the dashboard will show you who is driving the most new signups.
{% endprotip %} 

{% elsif page.advanced %}

## Previewing and debugging links

If you want to get an idea of what your links will look when shared on social media, Facebook's [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) can be useful.

This will show you all the meta data for your link, and a preview of what it will look like when shared on Facebook.

{% endif %}