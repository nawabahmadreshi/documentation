---
type: recipe
directory: next-steps
title: Custom Onboarding
page_title: Personalized Onboarding Flow for Apps
description: How to set up a personalized invite system and onboarding flow for Apps using Branch deep links. With code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Personalized onboarding, onboarding, welcome screen, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Personalized onboarding, onboarding, welcome screen, Android
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

Right now, when users open your app for the first time, chances are you have no idea where they came from or who they are. You have no idea if they were invited by a friend on Facebook, found your app randomly browsing through the App Store, saw an ad, or simply discovered it through word of mouth and decided to give it a shot.

By using Branch deep links, you can finally tailor the onboarding flow for new users!

**Estimated Time To Complete:**

30 Minutes - 1 Hour

**Required Personnel:**

Mobile Developer (Making app changes)

Web Developer (Making web changes)

**Requires An App Update:**

Yes

### After This

- Your users will be able to invite their friends to your app.
- You will be able to provide a personalized onboarding experience for your referred users.
- You’ll be able to track the effectiveness of your referrals at bringing people to the app.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To implement a custom onboarding flow, you will need to [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app and [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

Let's say you have developed an app called **Branch Monster Factory**, and you want your users to invite their friends. If new users open your app and immediately see a message that includes details about the friend who invited them, these invitations will be far more effective. Let's get started!

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

## Generate invite links to share

The next thing we need to do is allow your users to create links to share. These links will contain references to the information we want to show new users after signup.

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
In the <your project>-Bridging-Header.h, add the following:

{% highlight swift %}
#import "Branch.h"
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
#import "BranchConstants.h"
{% endhighlight %}
{% endtab %}
{% endtabs %}

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"invite/12345"];
branchUniversalObject.title = @"Josh wants you to try Branch Monster Factory";
branchUniversalObject.contentDescription = @"Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!";
branchUniversalObject.imageUrl = @"https://example.com/profile-pic-12345.png";
[branchUniversalObject addMetadataKey:@"userId" value:@"12345"];
[branchUniversalObject addMetadataKey:@"userName" value:@"Josh"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "invite/12345")
branchUniversalObject.title = "Josh wants you to try Branch Monster Factory"
branchUniversalObject.contentDescription = "Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!"
branchUniversalObject.imageUrl = "https://example.com/profile-pic-12345.png"
branchUniversalObject.addMetadataKey("userId", value: "12345")
branchUniversalObject.addMetadataKey("userName", value: "Josh")
{% endhighlight %}
{% endtab %}
{% endtabs %}

Then define the properties of the link. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"invites";
linkProperties.channel = @"facebook";
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "invites"
linkProperties.channel = "facebook"
{% endhighlight %}
{% endtab %}
{% endtabs %}

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error && url) {
        NSLog(@"got my Branch invite link to share: %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.getShortUrl(with: linkProperties) { (url, error) in
    if (error == nil) {
        print("Got my Branch link to share: \(url)")
    } else {
        print(String(format: "Branch error : %@", error! as CVarArg))
    }
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("invite/12345")
                .setTitle("Josh wants you to try Branch Monster Factory")
                .setContentDescription("Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!")
                .setContentImageUrl("https://example.com/profile-pic-12345.png")
                .addContentMetadata("userId", "12345")
                .addContentMetadata("userName", "Josh");
{% endhighlight %}

Then define the properties of the link. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

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

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight js %}
var branchUniversalObj = null;

Branch.createBranchUniversalObject({
  canonicalIdentifier: 'invite/12345',
  title: 'Josh wants you to try Branch Monster Factory',
  contentDescription: 'Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!',
  contentImageUrl: 'https://example.com/profile-pic-12345.png',
  contentMetadata: {
    'userId': '12345',
    'userName': 'Josh'
  }
}).then(function (newBranchUniversalObj) {
  branchUniversalObj = newBranchUniversalObj;
  console.log(newBranchUniversalObj);
});
{% endhighlight %}

Then, create the link to be shared by referencing the `BranchUniversalObject` and defining the properties of the link. In the example, our properties reflect that this is an invite feature and the user selected Facebook as the destination. We also added a default redirect to a website on the desktop.

{% highlight js %}
branchUniversalObj.generateShortUrl({
  // put your link properties here
  "feature" : "invite",
  "channel" : "facebook"
}, {
  // put your control parameters here
  "$desktop_url" : "http://desktop-url.com/invite/12345",
}).then(function (res) {
    // Success Callback
    console.log(res.generatedUrl);
});
{% endhighlight %}

{% endif %}

{% if page.xamarin %}

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "invite/12345";
universalObject.title = "Josh wants you to try Branch Monster Factory";
universalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
universalObject.imageUrl = "https://example.com/profile-pic-12345.png";
universalObject.metadata.Add("userId", "1234");
universalObject.metadata.Add("userName", "Josh");
{% endhighlight %}

Then define the properties of the link. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "sharing";
linkProperties.channel = "facebook";
{% endhighlight %}

Lastly, create the link to be shared by referencing the `BranchUniversalObject`:

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

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight c# %}
BranchUniversalObject universalObject = new BranchUniversalObject();
universalObject.canonicalIdentifier = "invite/12345";
universalObject.title = "Josh wants you to try Branch Monster Factory";
universalObject.contentDescription = "Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!";
universalObject.imageUrl = "https://example.com/profile-pic-12345.png";
universalObject.metadata.Add("userId", "12345");
universalObject.metadata.Add("userName", "Josh");
{% endhighlight %}

Then define the properties of the link. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.feature = "invite";
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
	"$og_title": "Josh wants you to try Branch Monster Factory",
	"$og_description": "Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!"
	"$og_image_url": "https://example.com/profile-pic-12345.png"
};

branch.getShortUrl(tags, "facebook", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}

You would next use the returned link and help the user post it to (in this example) Facebook.

{% endif %}

<!--- Titanium -->

{% if page.titanium %}

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "invite/12345",
  "title" : "Josh wants you to try Branch Monster Factory",
  "contentDescription" : "Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!",
  "contentImageUrl" : "https://example.com/profile-pic-12345.png",
  "contentMetadata" : {
      "userId" : "12345",
      "userName" : "Josh"
  },
});
{% endhighlight %}

Then define the properties of the link. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "invite",
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

The first thing we need to do is allow your users to create links to share. These links will contain references to the information we want to show new users after signup.

Create a `BranchUniversalObject` containing details about the user who is inviting friends:

{% highlight js %}
let branchUniversalObject = branch.createBranchUniversalObject(
  'invite/12345', // canonical identifier
  {
    contentTitle: 'Josh wants you to try Branch Monster Factory',
    contentImageUrl: 'https://example.com/profile-pic-12345.png',
    contentDescription: 'Your friend Josh has invited you to download Branch Monster Factory create awesome monsters!',
    metadata: {
      userId: '12345',
      userName: 'Josh'
    }
  }
)
{% endhighlight %}

Then define the properties of the link. In the example, our properties reflect that this is an invitation and the user selected Facebook as the destination:

{% highlight js %}
let linkProperties = {
  feature: 'share',
  channel: 'facebook'
}

let controlParams = {
  $desktop_url: 'http://desktop-url.com/monster/12345'
}
{% endhighlight %}

Then, create the link to be shared by referencing the `BranchUniversalObject` and defining the properties of the link.

{% highlight js %}
let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
{% endhighlight %}

{% endif %}

{% protip title="To learn more about the concepts we used, visit these pages:" %}

- [Creating Links in Apps]({{base.url}}/getting-started/creating-links/apps)
- [Configuring Links]({{base.url}}/getting-started/configuring-links)
- [BranchUniversalObject]({{base.url}}/getting-started/branch-universal-object)
- [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing)

{% endprotip %}

## The personal touch: show a welcome screen

Now that your user has created a link and sent it to a friend, you just need to wait for that friend to download your app. When that happens, you should detect the incoming link and route the new user to a custom welcome screen. Read more about how to do this on the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page.

If you want to give a preview of the invitation before the app is even downloaded, try out [Deepviews]({{base.url}}/features/deepviews).

## Viewing live data on the Branch dashboard

You can use the dashboard's [Live View page](https://dashboard.branch.io/#/liveview) to see links and link clicks in real time.

{% protip %}
The [Influencers page](https://dashboard.branch.io/#/referrals/influencers) on the dashboard will show you who is driving the most new signups.
{% endprotip %}

{% elsif page.advanced %}

## Previewing and debugging links

If you want to get an idea of what your links will look when shared on social media, Facebook's [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) can be useful.

This will show you all the meta data for your link, and a preview of what it will look like when shared on Facebook.

{% endif %}
