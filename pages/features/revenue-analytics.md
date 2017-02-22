---
type: recipe
directory: features
title: "Revenue Analytics"
page_title: "Revenue Analytics"
sections:
- overview
- guide
- advanced
platforms:
- ios
- android
---

{% if page.overview %}

Branch allows you to easily track purchases and revenue in the Branch dashboard. With Branch links in every channel, it’s easy to compare the quality of traffic coming in from your marketing efforts. 

This week you can see commerce data in Source Analytics and Marketing Links pages, allowing you to determine which campaigns, channels, features and links are resulting in the most revenue. From there, you can decide how to allocate resources and spend to most effectively achieve conversions.

{% image src="/img/pages/features/revenue-analytics/revenue-marketing-links.png" full center %}
**Viewing revenue driven by individual marketing links ([go to Marketing Links Page](https://dashboard.branch.io/marketing)).**

{% getstarted %}{% endgetstarted %}


{% elsif page.guide %}

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide).

{% endprerequisite %}

## 1. Tracking purchase events in the SDK

The first step to powerful, granular revenue tracking is ensuring that SDKs track purchase events. (We are deprecating old SDK methods for tracking purchases with revenue.) Be sure to include the field `revenue` anytime you track a purchase. All other fields are optional but may be used in the future to provide additional insights.

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

{% elsif page.android %}

To track purchases with Branch, add a `sendCommerceEvent()` call to be executed immediately after a purchase is complete:

{% highlight java %}
CommerceEvent commerceEvent = new CommerceEvent();
commerceEvent.setRevenue(1101.99);
Branch.getInstance().sendCommerceEvent(commerceEvent, null, null);
{% endhighlight %}

{% endif %}

For a more complete example that demonstrates what purchase- and product-related information Branch can receive, please see the [Advanced](#advanced) section.


## 2. Testing

The best way to test is to trigger a purchase event (using the code snippet above) and then to visit the [Branch Dashboard's Live View page](https://dashboard.branch.io/liveview/commerce_events). Here is a screenshot of what commerce events look like:

{% image src="/img/pages/features/revenue-analytics/revenue-live-view.png" full center %}

To test end to end, first click on a Branch link, such as a marketing link, then trigger a purchase. Then in Live View you can select `Columns`, check `Link Data`, and ensure the data is present for the link you clicked prior to purchase.


## 3. Viewing Revenue Analytics in the Dashboard

Right now, revenue data is visible in two places:

- [Source Analytics](https://dashboard.branch.io/analytics/source)
- [Marketing Links](https://dashboard.branch.io/marketing)

On the [previous page](#overview) we showed you a screenshot of revenue on the Marketing Links page. Here's a quick look at how you can see revenue breakdowns on the Source Analytics page:

TODO: Screenshot of Source Analytics

## 4. Coming Soon: Journeys

In the coming weeks you will be able to set up Journeys to target users with a purchase history (e.g. “include users who have past purchases amounting to greater than $50”). It will be as simple as adding a filter:

{% image src="/img/pages/features/revenue-analytics/revenue-journeys.png" full center %}



{% elsif page.advanced %}

## Full Example Code

{% if page.ios %}

Here is a fuller example of the `sendCommerceEvent:metadata:withCompletion:` call.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BNCProduct *product = [BNCProduct new];
product.price = [NSDecimalNumber decimalNumberWithString:@"1000.99"];
product.sku = @"acme007";
product.name = @"Acme brand 1 ton weight";
product.quantity = @(1.0);
product.brand = @"Acme";
product.category = BNCProductCategoryMedia;
product.variant = @"Lite Weight";

BNCCommerceEvent *commerceEvent = [BNCCommerceEvent new];
commerceEvent.revenue = [NSDecimalNumber decimalNumberWithString:@"1101.99"];
commerceEvent.currency = @"USD";
commerceEvent.transactionID = @"tr00x8";
commerceEvent.shipping = [NSDecimalNumber decimalNumberWithString:@"100.00"];
commerceEvent.tax = [NSDecimalNumber decimalNumberWithString:@"1.00"];
commerceEvent.coupon = @"Acme weights coupon";
commerceEvent.affiliation = @"ACME by Amazon";
commerceEvent.products = @[ product ];

[[Branch getInstance] sendCommerceEvent:commerceEvent
                               metadata:@{ @"Meta": @"Never meta dog I didn't like." }
                         withCompletion:^ (NSDictionary *response, NSError *error) {
    if (error) { /* handle error */ }
}];
{% endhighlight %}
{% endtab %}
{% tab swift %}

Here is a fuller example of the `sendCommerceEvent()` call.

{% highlight swift %}
let product = BNCProduct.init()
product.price = NSDecimalNumber.init(string:"1000.99")
product.sku = "acme007"
product.name = "Acme brand 1 ton weight"
product.quantity = 1.0;
product.brand = "Acme";
product.category = BNCProductCategoryMedia;
product.variant = "Lite Weight";

let commerceEvent = BNCCommerceEvent.init()
commerceEvent.revenue = NSDecimalNumber.init(string:"1101.99")
commerceEvent.currency = "Smackeroos"
commerceEvent.transactionID = "tr00x8"
commerceEvent.shipping = NSDecimalNumber.init(string:"100.00")
commerceEvent.tax = NSDecimalNumber.init(string:"1.00");
commerceEvent.coupon = "Acme weights coupon"
commerceEvent.affiliation = "ACME by Amazon"
commerceEvent.products = [ product ];

Branch.getInstance()?.send(
    commerceEvent,
    metadata: ["Meta": "Never meta dog I didn't like." ],
    withCompletion: { (response, error) in
        if let e = error { /* handle error */ }
    }
)
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% elsif page.android %}

Here is a fuller example of the `sendCommerceEvent()` call.

{% highlight java %}
Branch branch = Branch.getInstance();
Product product = new Product();
product.setPrice(100.99);
product.setSku("acme007");
product.setName("Acme brand 1 ton weight");
product.setQuantity(1);
product.setBrand("Acme");
product.setProductCategory(ProductCategory.MEDIA);
product.setVariant("Lite Weight");

CommerceEvent commerceEvent = new CommerceEvent();
commerceEvent.setRevenue(1101.99);
commerceEvent.setCurrencyType(CurrencyType.USD);
commerceEvent.setTransactionID("tr00x8");
commerceEvent.setShipping(100.00);
commerceEvent.setTax(1.00);
commerceEvent.setCoupon("Acme weights coupon");
commerceEvent.setAffiliation("ACME by Amazon");
commerceEvent.addProduct(product);

JSONObject jsonObject = new JSONObject();
try { jsonObject.put("Meta", "never meta dog I didn't like."); } catch ( JSONException e ) {}
branch.sendCommerceEvent(commerceEvent, jsonObject, null);
{% endhighlight %}

{% endif %}



{% endif %}