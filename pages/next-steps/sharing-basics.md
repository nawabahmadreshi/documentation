---
type: recipe
directory: next-steps
title: The Basics
page_title: The Basics
description: Use Branch to power your social sharing, whether it's through referral links or links to content.
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
- react
hide_section_selector: true
sections:
- guide
---
Before getting started with Social Sharing, there are a few steps that you should take in order to get the most out of your efforts.

## Identifying Your Users

Identifying your users will help you associate all activities and links created to a particular person. Branch maintains our own identity for users, but by setting an email address, uuid, or some other identifying label, you'll be able to tie your Branch data back to your own internal tracking.

{% if page.ios %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
// your app's userId, 127 chars or less
[[Branch getInstance] setIdentity:@"your user id"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
// your app's userId, 127 chars or less
Branch.getInstance().setIdentity("your user id")
{% endhighlight %}
{% endtab %}
{% endtabs %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] logout];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().logout()
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- iOS identify and logout -->

{% if page.android %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight java %}
// your app's userId, 127 chars or less
Branch.getInstance().setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight java %}
Branch.getInstance().logout();
{% endhighlight %}
{% endif %}
<!--- Android identify and logout -->

{% if page.cordova %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
Branch.setIdentity("your user id").then(function (res) {
  console.log(res);
}).catch(function (err) {
  console.error(err);
});
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
Branch.logout();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}

### Log in

Add a `SetIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `SetIdentityAsync` when the user first logs in. We will cache the identity for future sessions.

{% highlight c# %}
Branch branch = Branch.GetInstance ();
branch.SetIdentity("your user id", this);
{% endhighlight %}

### Log out

Add a `LogoutAsync` call anywhere you allow the user to logout. `LogoutAsync` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `LogoutAsync` can likewise lead to bugs if multiple users log in on the same device.

{% highlight c# %}
Branch.GetInstance(getApplicationContext()).LogoutAsync(this);
{% endhighlight %}

{% endif %}

{% if page.unity %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight c# %}
Branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight c# %}
Branch.logout();
{% endhighlight %}
{% endif %}

{% if page.adobe %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight java %}
branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight java %}
branch.logout();
{% endhighlight %}
{% endif %}

{% if page.titanium %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
branch.logout();
{% endhighlight %}
{% endif %}

{% if page.react %}

### Log in

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
branch.setIdentity("your user id");
{% endhighlight %}

### Log out

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
branch.logout();
{% endhighlight %}
{% endif %}

{% protip title="Retroactive event attribution" %}
The **first** time an identity is set for each unique user ID, it will retroactively associate any previously recorded events from the current device with that user ID. This only occurs once.
{% endprotip %}

## Creating Links in Your Apps

<!--- iOS -->
{% if page.ios or page.mparticle_ios %}

### Import framework

{% tabs %}
{% tab objective-c %}
Import the Branch framework into the view controller where you will be creating links:

{% highlight objective-c %}
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
{% endhighlight %}
{% endtab %}
{% tab swift %}
In the <your project>-Bridging-Header.h, add the following:

{% highlight swift %}
#import "Branch.h"
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
#import "BranchConstants.h"
{% endhighlight %}
{% endtab %}
{% endtabs %}

### Create a Branch Universal Object

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

### Assemble link parameters

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

### Generate the link

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
branchUniversalObject.getShortUrl(with: linkProperties) { (url, error) in
    if error == nil {
        print("got my Branch link to share: %@", url)
    }
}
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

### Create a Branch Universal Object

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

### Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$desktop_url", "http://example.com/home")
               .addControlParameter("$ios_url", "http://example.com/ios");
{% endhighlight %}

### Generate the link

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

### Create a Branch Universal Object

Create a `BranchUniversalObject` for the piece of content that you'd like to link to, defining any custom key/value pairs as `metadata` parameters:

{% highlight js %}
// only canonicalIdentifier is required
var properties = {
    canonicalIdentifier: '123',
    canonicalUrl: 'http://example.com/123',
    title: 'Content 123',
    contentDescription: 'Content 123 ' + Date.now(),
    contentImageUrl: 'http://lorempixel.com/400/400/',
    price: 12.12,
    currency: 'GBD',
    contentIndexingMode: 'private',
    contentMetadata: {
        'custom': 'data',
        'testing': 123,
        'this_is': true
    }
};

// create a branchUniversalObj variable to reference with other Branch methods
var branchUniversalObj = null;
Branch.createBranchUniversalObject(properties).then(function(res) {
    branchUniversalObj = res;
    alert('Response: ' + JSON.stringify(res));
}).catch(function(err) {
    alert('Error: ' + JSON.stringify(err));
});
{% endhighlight %}

### Assemble link parameters

Then, create the link to be shared by referencing the `BranchUniversalObject` and defining the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination. We also added a default redirect to a website on the desktop.

{% highlight js %}
// optional fields
var analytics = {
    channel: "channel",
    feature: "feature",
    campaign: "campaign",
    stage: "stage",
    tags: ["one","two","three"]
};

// optional fields
var properties = {
    $fallback_url: "www.example.com",
    $desktop_url: "www.desktop.com",
    $android_url: "www.android.com",
    $ios_url: "www.ios.com",
    $ipad_url: "www.ipad.com",
    more_custom: "data",
    even_more_custom: true,
    this_is_custom: 41231
};

branchUniversalObj.generateShortUrl(analytics, properties).then(function(res) {
    alert(JSON.stringify(res.url));
}).catch(function(err) {
    alert(JSON.stringify(err));
});
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/cordova/#showsharesheet).
{% endprotip %}

{% endif %}

{% if page.xamarin %}

### Create a Branch Universal Object

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

### Assemble link parameters

Define the analytics tags and control parameters of the link itself:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
linkProperties.controlParams.Add("$desktop_url", "http://example.com/home");
linkProperties.controlParams.Add("$ios_url", "http://example.com/ios");
{% endhighlight %}

### Generate the link

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

### Create a Branch Universal Object

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

### Assemble link parameters

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

### Generate the link

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

### Add the event listeners and functions

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

### Assemble link information

Build your key/value pairs and add any additional analytics and control parameters:

{% highlight java %}
var dataToInclude:Object = {
  "article_id": "1234",
  "$og_title": "Hot off the presses!",
  "$og_image_url": "mysite.com/image.png",
  "$desktop_url": "mysite.com/article1234"
};
{% endhighlight %}

### Generate the links

Then generate the link with the getShortUrl() method:

{% highlight java %}
branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}

### Create a Branch Universal Object

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

### Assemble link parameters and generate the links

Define the analytics tags and control parameters, and generate the link by referencing the `BranchUniversalObject` you created:

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "sample-feature",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  "$desktop_url" : "http://desktop-url.com",
}, function (res) {
    Ti.API.info('Completed link generation');
    Ti.API.info(res);
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

### Create a Branch Universal Object

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

### Assemble link parameters

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

### Generate the link

Finally, generate the link by referencing the `BranchUniversalObject` and parameters you created:

{% highlight js %}
let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

{% protip title="Use the Branch share sheet" %}
If you don't want to handle the link yourself, you can also use Branch's [preconfigured share sheet]({{base.url}}/getting-started/branch-universal-object/guide/react/#showsharesheet).
{% endprotip %}

{% endif %}
