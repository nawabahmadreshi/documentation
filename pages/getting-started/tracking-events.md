---
type: recipe
directory: getting-started
title: "Tracking Events"
page_title: Using events to track analytics with Branch
description: Branch allows you to measure analytics for your deep links. Track install attribution, measure marketing channels and ad campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Attribution, Analytics, Dashboard, App Install, App Open, Conversion, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Attribution, Analytics, Dashboard, App Install, App Open, Conversion, Android
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

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Automatic events

Branch _automatically_ creates events whenever a user accesses your site or your app. We measure installs, opens and web page visits with separate events. Here is a list of the auto-created ones:

| Event | Description
| --- | ---
| `install` | Triggered the first time a user launches your app
| `open` | Trigged when the user opens the app after the very first launch OR if a user reinstalls the app after uninstalling it
| `web session start` | Triggered when the user views a webpage using the Branch Web SDK.
| `referred session` | Triggered _in addition_ to install, open or web session start if a user comes from a Branch link

{% protip title="Receiving Postbacks" %}
You can be notified via a postback to your server every time that an event occurs. Visit the [Webhooks](/getting-started/webhooks/) page for more information on configuring postbacks.
{% endprotip %}

## Custom events

In addition the default Branch events, you can track any custom user action you wish. Examples of what you may want to track:

- sign up
- purchases
- shares

Recording a custom event in your app is accomplished via a simple call to the SDK:

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:@"customAction"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction("customAction")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).userCompletedAction("custom_action_1");
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
branch.track("custom_action_1");
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.UserCompletedActionAsync("custom_action_1");
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.userCompletedAction("custom_action_1");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("custom_action_1");
{% endhighlight %}
{% endif %}

{% protip title="Appending custom metadata" %}

You can also include additional information when creating a custom event:

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:@"purchase" withState:@{@"item":@"123-AB-456"}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction("purchase", withState: ["item" : "123-AB-456"])
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
JSONObject metaData = new JSONObject();
metaData.put("key", "value");
Branch.getInstance().userCompletedAction("custom_action_with_data", metaData);
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
branch.track(
    "purchase_event",
    {
    	"sku": "12346789"
	}
);
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> data = new Dictionary<string, object>();
data.Add("sku", "123456789");
await branch.UserCompletedActionAsync("purchase_event", data);
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> stateItems = new Dictionary<string, object>
{
    { "sku", "12346789" }
};
Branch.userCompletedAction("purchase_event", stateItems);
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("purchase_event", {
	"sku": "12346789"
});
{% endhighlight %}
{% endif %}

{% endprotip %}