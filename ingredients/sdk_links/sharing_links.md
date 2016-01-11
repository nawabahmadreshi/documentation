
<!--- iOS -->
{% if page.ios %}

We realized that creating links is great, but it's incredibly hard to create a ton of different links up front for the different channels in the `UIActivityViewController`. Because of this, we offer a custom `UIActivityItemProvider` to make your life easier. This will automatically generate a link dynamically when the user presses a button to share.

{% image src='/img/ingredients/sdk_links/ios_share_sheet.jpg' actual center alt='ios share sheet' %}

Here's how to implement it:

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

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

We've realized that Android had some very poor offerings for native share sheet functionality, so we built our own and bundled it into the core SDK. This share sheet it customizable and will automatically generate a link when the user selects a channel to share to.

{% image src='/img/ingredients/sdk_links/android_share_sheet.png' half center alt='ios share sheet' %}

First you can customize the styling with the ShareSheetStyle class:

{% highlight java %}
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
                        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL);
{% endhighlight %}

Then, you can show the share sheet by calling this method on the Branch Universal Object.

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


{% endif %}

<!--- Unity -->

{% if page.unity %}
We offer a custom `UIActivityItemProvider` and a custom Branch-built Android share sheet to make your life easier. This will automatically generate a link dynamically when the user presses a button to share.

{% image src='/img/ingredients/sdk_links/ios_share_sheet.jpg' actual center alt='ios share sheet' %}

{% highlight c# %}
BranchLinkProperties linkProperties = new BranchLinkProperties();
linkProperties.tags.Add("tag1");
linkProperties.tags.Add("tag2");
linkProperties.feature = "invite";
linkProperties.channel = "Twitter";
linkProperties.stage = "2";
linkProperties.controlParams.Add("$desktop_url", "http://example.com");
{% endhighlight %}

Lastly, create the link by referencing the universal object.

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


<!--- Titanium -->

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

{% highlight js %}
branchUniversalObject.showShareSheet({
  "feature" : "sample-feature",
  "alias" : "sample-alias",
  "channel" : "sample-channel",
  "stage" : "sample-stage"
}, {
  "$desktop_url" : "http://desktop-url.com",
});
{% endhighlight %}

`bio:shareLinkDialogLaunched`
- The event fires when the share sheet is presented.

`bio:shareLinkDialogDismissed`
- The event fires when the share sheet is dismissed.

`bio:shareLinkResponse`
- The event returns a dictionary of the response data.

`bio:shareChannelSelected`
- The event fires a channel is selected.

**Note:** Callbacks in iOS are ignored. There is no need to implement them as the events are handled by `UIActivityViewController`.

{% highlight js %}
branchUniversalObject.addEventListener("bio:shareLinkDialogDismissed", $.onShareLinkDialogDismissed);
{% endhighlight %}

{% endif %}

