
### Custom Events

You can track any custom user actions you wish. You can then be notified via a postback to your server every time that an event happens. Visit the [Webhooks](/recipes/webhooks_and_exporting_data/) page for more information on receiving postbacks.

Examples of what you may want to track:

* sign up
* purchases
* content shares

To track custom events, you can make a simple call to the SDK.

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
branch.track("custom_action_1");
{% endhighlight %}
{% endif %}

#### Appending custom metadata

You can also include other information about the action, which is useful for [rewarding user actions](/recipes/advanced_referral_incentives/{{page.platform}}/#rewards) or receiving additional information via our [webhooks](/recipes/webhooks_and_exporting_data/). To include custom information, pass it up via the state dictionary:

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
JSONObject metaData = new JSONObject();
metaData.put("key", "value");
Branch.getInstance().userCompletedAction("custom_action_with_data", metaData);

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
branch.track(
    "purchase_event",
    {
    	"sku": "12346789"
	}
);
{% endhighlight %}
{% endif %}
