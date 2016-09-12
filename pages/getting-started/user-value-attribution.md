---
type: recipe
directory: getting-started
title: User Value Attribution
page_title: User value attribution in the Branch dashboard
description: "Use the Branch dashboard track high-value users with custom in-app event tracking"
android_description: "Learn about some advanced features of the Branch dashboard: How to set up a custom link domain and identify your best users."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
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

{% ingredient quickstart-prerequisite %}{% endingredient %}

In-app engagement and user value metrics are just as important as the click, install, and re-open metrics that Branch [automatically provides]({{base.url}}/getting-started/growth-attribution#automatic-event-tracking). You can define your own post-install events for Branch to track, and view them in the dashboard.

## Custom event tracking

In addition the default Branch events, you can track any custom user action you wish. Recording a custom event in your app is accomplished via a simple call to the SDK as shown in the examples below.

{% if page.ios %}

We've also defined a set of pre-defined events that we believe to be commonly used:

| Key | Value
| --- | ---
| BNCRegisterViewEvent | User viewed the object
| BNCAddToWishlistEvent | User added the object to their wishlist
| BNCAddToCartEvent | User added object to cart
| BNCPurchaseInitiatedEvent | User started to check out
| BNCPurchasedEvent | User purchased the item
| BNCShareInitiatedEvent | User started to share the object
| BNCShareCompletedEvent | User completed a share
{% endif %}
{% if page.android %}

We've also defined a set of pre-defined events that we believe to be commonly used:

| Key | Value
| --- | ---
| BranchEvent.EVENT_VIEW | User viewed the object
| BranchEvent.EVENT_ADD_TO_WISH_LIST | User added the object to their wishlist
| BranchEvent.EVENT_ADD_TO_CART | User added object to cart
| BranchEvent.EVENT_PURCHASE_STARTED | User started to check out
| BranchEvent.EVENT_PURCHASED | User purchased the item
| BranchEvent.EVENT_SHARE_STARTED | User started to share the object
| BranchEvent.EVENT_SHARE_COMPLETED | User completed a share
{% endif %}

{% if page.cordova or page.xamarin or page.unity or page.titanium or page.react %}
We've also defined a set of pre-defined events that we believe to be commonly used:

| Key | Value
| --- | ---
| "View" | User viewed the object
| "Add to Wishlist" | User added the object to their wishlist
| "Add to Cart" | User added object to cart
| "Purchase Started" | User started to check out
| "Purchased" | User purchased the item
| "Share Started" | User started to share the object
| "Share Completed" | User completed a share
{% endif %}

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:BNCShareInitiatedEvent];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction(BNCShareInitiatedEvent)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}

{% highlight java %}
Branch.getInstance(getApplicationContext()).userCompletedAction(BranchEvent.EVENT_SHARE_STARTED);
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
Branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.UserCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight js %}
branch.userCompletedAction("Share Started");
{% endhighlight %}
{% endif %}

{% caution title="Names reserved for Branch events" %}
`click`, `view`, `served`, `install`, `open`, `install_bypass`, `open_bypass`, `install_assist`, and `open_assist` are reserved for Branch events, and these are filtered out of [custom events in the dashboard](#measuring-custom-events). Please choose distinct names for your custom events.
{% endcaution %}

## Tracking interaction with multiple contents

Let's say you want to track an event where user adds multiple items to their cart, letting Branch know which of those objects were added. Or register a view on multiple objects at once. You'd use the state dictionary to pass us those items as shown in the below examples.

{% if page.ios %}
Additionally, you're going to want to use these constants for the custom metadata.

 Key | Value
| --- | ---
| BNCCanonicalIdList | The key for the array of canonical identifiers
| BNCPurchaseAmount | The key to define the checkout price if applicable
| BNCPurchaseCurrency | The key to define the [currency](https://en.wikipedia.org/wiki/ISO_4217) of the purchase amount if applicable

{% endif %}
{% if page.android %}
Additionally, you're going to want to use these constants for the custom metadata.

 Key | Value
| --- | ---
| BranchEvent.CANONICAL_ID_LIST | The key for the array of canonical identifiers
| BranchEvent.PURCHASE_AMOUNT | The key to define the checkout price if applicable
| BranchEvent.PURCHASE_CURRENCY | The key to define the [currency](https://en.wikipedia.org/wiki/ISO_4217) of the purchase amount if applicable

{% endif %}

{% if page.cordova or page.xamarin or page.unity or page.titanium or page.react %}
Additionally, you're going to want to use these constants for the custom metadata.

 Key | Value
| --- | ---
| "$canonical_identifier_list" | The key for the array of canonical identifiers
| "$amount" | The key to define the checkout price if applicable
| "$currency" | The key to define the [currency](https://en.wikipedia.org/wiki/ISO_4217) of the purchase amount if applicable

{% endif %}

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:BNCPurchasedEvent withState:@{
	BNCCanonicalIdList:@[@"12345", @"67891"],
	BNCPurchaseAmount:@"45.12"
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction(BNCPurchasedEvent, withState: [BNCCanonicalIdList: ["12345", "67891"], BNCPurchaseAmount: "45.12"])
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
JSONObject metaData = new JSONObject();
try {
	JSONArray productList = new JSONArray();
	productList.put("12345");
	productList.put("67891");
	metaData.put(Branch.CANONICAL_ID_LIST, productList);
	metaData.put(Branch.PURCHASE_AMOUNT, "45.12");
} catch (JSONException e) { }
Branch.getInstance().userCompletedAction(Branch.EVENT_PURCHASED , metaData);
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
Branch.userCompletedAction(
    "purchase",
    {
      "$canonical_identifier_list": [ "12345", "67891" ],
      "$amount": "45.12"
  	}
);
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> data = new Dictionary<string, object>();
data.Add("$canonical_identifier_list", new string[] {"12345", "67891"});
data.Add("$amount", "45.12");
await branch.UserCompletedAction("purchase", data);
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> stateItems = new Dictionary<string, object>();
stateItems.Add("$canonical_identifier_list", new string[] {"12345", "67891"});
stateItems.Add("$amount", "45.12");
Branch.userCompletedAction("purchase", stateItems);
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction(
	"Purchased",
	{
		"$canonical_identifier_list": [ "12345", "67891" ],
		"$amount": "45.12"
	}
);
{% endhighlight %}
{% endif %}

{% if page.react %}
{% highlight js %}
branch.userCompletedAction(
	"Purchased",
	{
		"$canonical_identifier_list": [ "12345", "67891" ],
		"$amount":"45.12"
	}
);
{% endhighlight %}
{% endif %}

## Measuring custom events

You can see data for one custom event at a time in the dashboard by using the dropdown picker above [Marketing](https://dashboard.branch.io/#/marketing){:target="_blank"} and [Source Analytics](https://dashboard.branch.io/#/analytics/source){:target="_blank"} data. 

{% image src='/img/pages/getting-started/user-value-attribution/events-dropdown.png' third center alt='Branch dashboard' %}

Custom events columns on these pages show total events count and events %, where the percentage is total events over total Branch-referred app sessions (installs + re-opens). You can see these metrics for individual links, campaigns, channels, tags, stages, and features.

{% image src='/img/pages/getting-started/user-value-attribution/custom-events-source.png' full center alt='Branch dashboard' %}

There’s no hard limit to tracking custom events data, but Branch will only allow you to see your first 100 custom events in the Branch dashboard. Most apps track 5-10 of the most important custom events they care about.

{% protip title="What attribution logic does Branch use for reporting on custom events in the dashboard?" %}
 
- *90-day attribution window*: Branch will include counts of events that happen within 90 days of a user’s most recent Branch-referred session.

- *Last-session attribution*: We’ll attribute a custom event to the link click and resulting Branch-referred session that occurs most recently prior to a custom event.

- *Events are reported on the date the attributed Branch-referred session occurred, not the date the the actual event occurred*: In the following sequence of events, Branch will report on the event on Feb 1, although the event itself happened on Feb 3:


  1. Feb 1: User clicks on a Branch link and installs app
  1. Feb 3: User returns to app (not via Branch link) and completes an in-app custom event

For more information on how Branch attributes custom events, see this [FAQ](https://support.branch.io/solution/articles/6000116662-branch-dashboard-custom-events-overview-and-how-to){:target="_blank"}.

{% endprotip %}

You can also see custom events as they occur on the [Live View > Events](https://dashboard.branch.io/#/liveview/events/view){:target="_blank"} page. 

{% image src='/img/pages/getting-started/user-value-attribution/live-view-events.png' full center alt='Live View Events' %}