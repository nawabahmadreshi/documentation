{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$deeplink_path" withValue:@"content/1234"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$deeplink_path", withValue: "content/1234")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$deeplink_path", "content/1234");
{% endhighlight %}

{% endif %}