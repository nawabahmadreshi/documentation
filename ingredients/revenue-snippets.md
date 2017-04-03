{% if page.ios %}

{% tabs %}
{% tab objective-c %}
To track purchases with Branch, add a `sendCommerceEvent:metadata:withCompletion:` call to be executed immediately after a purchase is complete:

{% highlight objc %}
BNCCommerceEvent *commerceEvent = [BNCCommerceEvent new];
commerceEvent.revenue = [NSDecimalNumber decimalNumberWithString:@"20.00"];
[[Branch getInstance] sendCommerceEvent:commerceEvent
                               metadata:nil
                         withCompletion:^ (NSDictionary *response, NSError *error) {
    if (error) { /* handle error here */ }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}

To track purchases with Branch, add a `sendCommerceEvent()` call to be executed immediately after a purchase is complete:

{% highlight swift %}
let commerceEvent = BNCCommerceEvent.init()
commerceEvent.revenue = NSDecimalNumber.init(string:"1101.99")
Branch.getInstance()?.send(
    commerceEvent,
    metadata: ["foo": "bar"],
    withCompletion: { (response, error) in
        if let e = error { /* handle error */ }
    }
)
{% endhighlight %}
{% endtab %}
{% endtabs %}

Tracking commerce events gives you powerful insights on the Branch dashboard, as well as more options with Journeys. See the [Revenue Analytics]({{base.url}}/features/revenue-analytics) page for more.

{% elsif page.android %}

To track purchases with Branch, add a `sendCommerceEvent()` call to be executed immediately after a purchase is complete:

{% highlight java %}
CommerceEvent commerceEvent = new CommerceEvent();
commerceEvent.setRevenue(1101.99);
Branch.getInstance().sendCommerceEvent(commerceEvent, null, null);
{% endhighlight %}

Tracking commerce events gives you powerful insights on the Branch dashboard, as well as more options with Journeys. See the [Revenue Analytics]({{base.url}}/features/revenue-analytics) page for more.

{% elsif page.web %}

Here is a fuller example of the `trackCommerceEvent()` call.

{% highlight javascript %}
var metadata =  { "foo": "bar" };
var commerce_data = { "revenue": 50.0 };
branch.trackCommerceEvent('purchase', commerce_data, metadata, function(err) {
    if (err) { /* handle error */ }
});
{% endhighlight %}

Tracking commerce events gives you powerful insights on the Branch dashboard, as well as more options with Journeys. See the [Revenue Analytics]({{base.url}}/features/revenue-analytics) page for more.

{% endif %}
