---
type: overview
title: Link creation
page_title: How to create mobile deep links for apps
description: Learn how to create fully customized deep links for apps in Android and iOS and what properties and customizations are available when using Branch Metrics.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Link Properties, Redirect Customization, Mobile SDK, Web SDK, HTTP API
---

There are many, many ways to create links!

## Mobile SDKs

- [iOS documentation](https://github.com/BranchMetrics/iOS-Deferred-Deep-Linking-SDK#branch-universal-object-for-deep-links-content-analytics-and-indexing)
- [Android documentation](https://github.com/BranchMetrics/Android-Deferred-Deep-Linking-SDK#branch-universal-object-for-deep-links-content-analytics-and-indexing)
- [Cordova/Ionic documentation](https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK#linkdata-callback)
- [Xamarin documentation](https://github.com/BranchMetrics/Xamarin-Deferred-Deep-Linking-SDK#shortened-links)
- [Unity documentation](https://github.com/BranchMetrics/Unity-Deferred-Deep-Linking-SDK#shortened-links)
- [Titanium documentation](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK#linkdata-callback)
- [Air ANE documentation](https://github.com/BranchMetrics/AIR-ANE-Deferred-Deep-Linking-SDK#shortened-links)

Here is an example URL creation call in iOS. This would be called after using the initSession call with the appropriate app key to register the native library for your app.

First create the object that you'd like to link to:

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

Then define the properties of the link you'd like to create.

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

Lastly, create the link by referencing the universal object.

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
        NSLog(@"got my Branch link to share: %@", url!)
    }
}];
{% endhighlight %}
{% endtab %}
{% endtabs %}

-----

## Appending query parameters

- [For link customizations, see here](https://dev.branch.io/link_configuration/)

If you'd like to just build a Branch link by appending query parameters, we support that too. Here's an example of how to do that:

1. Start with your Branch domain. http://bnc.lt (or your white labeled one).
2. Append /a/your_Branch_key. *http://bnc.lt/a/your_branch_key*
3. Append the start of query params '?'. *http://bnc.lt/a/your_branch_key?*
4. [optional] Append the Branch analytics tag to keep your data organized in the dashboard. ([list here](https://dev.branch.io/link_configuration/#analytics-labels-for-data-organization)) *feature=marketing&channel=email&tags[]=drip1&tags[]=welcome*
5. [optional] Append any custom deep link parameters. *&user_id=4562&name=Alex&article_id=456*
6. [optional] Append your Branch control parameters - see [a full list of them here](https://dev.branch.io/link_configuration/#redirect-customization).

Here's an example of a finalized one:

{% highlight sh %}
https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$deeplink_path=article%2Fjan%2F123&$fallback_url=https%3A%2F%2Fgoogle.com&channel=facebook&feature=affiliate
{% endhighlight %}

-----

## Web SDK

- [Web link documentation](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#linkdata-callback)
- [Smart banner documentation](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#banneroptions-data)
- [SMS link documentation](https://github.com/BranchMetrics/Smart-App-Banner-Deep-Linking-Web-SDK/blob/master/WEB_GUIDE.md#sendsmsphone-linkdata-options-callback)

Here's some example code to show the smart banner on your mobile website.

{% highlight javascript %}
branch.banner({
    icon: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png',
    title: 'Branch Demo App',
    description: 'The Branch demo app!',
    openAppButtonText: 'Open',              // Text to show on button if the user has the app installed
    downloadAppButtonText: 'Download',      // Text to show on button if the user does not have the app installed
    sendLinkText: 'Send Link',              // Text to show on desktop button to allow users to text themselves the app
    phonePreviewText: '+44 9999-9999',      // The default phone placeholder is a US format number, localize the placeholder number with a custom placeholder with this option
    showiOS: true,                          // Should the banner be shown on iOS devices?
    showAndroid: true,                      // Should the banner be shown on Android devices?
    showDesktop: true,                      // Should the banner be shown on desktop devices?
    iframe: true,                           // Show banner in an iframe, recomended to isolate Branch banner CSS
    disableHide: false,                     // Should the user have the ability to hide the banner? (show's X on left side)
    forgetHide: false,                      // Should we show the banner after the user closes it? Can be set to true, or an integer to show again after X days
    position: 'top',                        // Sets the position of the banner, options are: 'top' or 'bottom', and the default is 'top'
    mobileSticky: false,                    // Determines whether the mobile banner will be set `position: fixed;` (sticky) or `position: absolute;`, defaults to false *this property only applies when the banner position is 'top'
    desktopSticky: true,                    // Determines whether the desktop banner will be set `position: fixed;` (sticky) or `position: absolute;`, defaults to true *this property only applies when the banner position is 'top'
    customCSS: '.title { color: #F00; }',   // Add your own custom styles to the banner that load last, and are gauranteed to take precedence, even if you leave the banner in an iframe
    make_new_link: false                    // Should the banner create a new link, even if a link already exists?
}, {
    feature: 'mobile_web',
    stage: 'logged_in',
    data: {
        deeplinkdata: 'something',
        referring_page: 'bar',
    }
});
{% endhighlight %}

-----

## HTTP API

- [URL endpoint](https://github.com/BranchMetrics/Branch-Public-API#creating-a-deep-linking-url)
- [Bulk link endpoint](https://github.com/BranchMetrics/Branch-Public-API#bulk-creating-deep-linking-urls)

Here is an example CURL call to create a link with some example parameters. You would specify the Branch key received by going through the start.branch.io configuration.

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

This will return a dictionary like so, with your specific link.

	{'url’ : ‘https://bnc.lt/ADaEf23-0’}

-----

## Dashboard

{% ingredient dashboard_links/creating_links %}
	{% override title %}{% endoverride %}
	{% override description %}{% endoverride %}
{% endingredient %}