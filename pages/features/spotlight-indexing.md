---
type: recipe
directory: features
title: "iOS9 Spotlight Indexing"
page_title: "Index and track your content in iOS 9 Spotlight"
description: Learn how to list your content in Apple's new Spotlight search.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, iOS9, iOS 9, Apple Spotlight Search
hide_platform_selector: true
sections:
- overview
- guide
- advanced
---

{% if page.overview %}
Listing your app content on Apple's new Spotlight search with Branch is easy. Note that this guide will list on both _cloud search_ in addition to _local spotlight search_.

{% caution title="Legacy device support" %}
Some older devices cannot index content. iPad minis, for example, cannot use CoreSpotlight. The SDK includes a check for these devices and will return an error message if you attempt to index content on them.
{% endcaution %}

{% getstarted title="Get started with Spotlight Indexing!" %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- For Spotlight search results to function as intended, you should also [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).

{% endprerequisite %}

## Listing your content

Content can be added to Spotlight search by using the `BranchUniversalObject`. We'd recommend that you put this on every page that renders a piece of content for your users. This way, a user could rediscover a previous thing that they had viewed.

{% ingredient buo-overview %}{% endingredient %}

First, define the content that you'd like to be listed by customizing the `BranchUniversalObject`.

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

Then call the `listOnSpotlightWithCallback` method on your `BranchUniversalObject`. The callback will return the URL used to list the content for your own records.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[branchUniversalObject listOnSpotlightWithCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"success getting url! %@", url);
    }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.listOnSpotlightWithCallback((url: String?, error: NSError?) -> Void in
    if error == nil {
        NSLog("got my Branch link to share: %@", url)
    }
})
{% endhighlight %}
{% endtab %}
{% endtabs %}

## Handle incoming traffic from Spotlight

{% tabs %}
{% tab objective-c %}

Open your **AppDelegate.m** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight objc %}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];
    
    return handledByBranch;
}
{% endhighlight %}
{% endtab %}
{% tab swift %}

Open your **AppDelegate.swift** file and add the following method (if you completed the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide), this is likely already present).

{% highlight swift %}
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    // pass the url to the handle deep link call

    return Branch.getInstance().continueUserActivity(userActivity)
}
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% elsif page.advanced %}

## Use deepviews for user acquisition

If the user doesn't have the app installed and finds your content through search, Spotlight will open up the browser. In this situation, you can [show a Deepview]({{base.url}}/features/deepviews), which is an automatically-generated, mobile web render of the app content.

## Further content customizations

You can use our identifier when indexing to perform advanced customizations of the content being listed. 

{% highlight objc %}
[branch getSpotlightUrlWithParams:@{@"$og_title": @"My App",
                                    @"$og_description": @"My app is disrupting apps",
                                    @"$og_thumb": @"https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png",
                                    @"object_id": @"1234"}
                         callback:^(NSDictionary *params, NSError *error) {
    if (!error) {
        // params will contain @"url" and @"spotlight_identifier"
        // the example below shows where to use them
        
        CSSearchableItemAttributeSet *attributes = [[CSSearchableItemAttributeSet alloc] initWithItemContentType:@"public.content"];
        attributes.identifier = params[@"spotlight_identifer"];
        attributes.relatedUniqueIdentifier = params[@"spotlight_identifer"];
        attributes.contentURL = [NSURL URLWithString:params[@"url"]]; // content url links back to our web content
        attributes.title = @"My awesome content!";
        attributes.contentDescription = @"Note that this property is contentDescription, not description";
        
        // Index via the NSUserActivity strategy
        // Currently (iOS 9 Beta 5) we need a strong reference to this, or it isn't indexed
        NSUserActivity *currentUserActivity = [[NSUserActivity alloc] initWithActivityType:params[@"spotlight_identifer"]];
        currentUserActivity.webpageURL = [NSURL URLWithString:params[@"url"]];
        
        // Index via the CoreSpotlight strategy
        CSSearchableItem *item = [[CSSearchableItem alloc] initWithUniqueIdentifier:params[@"spotlight_identifier"] domainIdentifier:@"branchified_content" attributeSet:attributes];
        [[CSSearchableIndex defaultSearchableIndex] indexSearchableItems:@[ item ] completionHandler:^(NSError *indexError) {
            if (!indexError) {
                NSLog(@"success!");
            }
        }];
    }
}];
{% endhighlight %}

{% endif %}