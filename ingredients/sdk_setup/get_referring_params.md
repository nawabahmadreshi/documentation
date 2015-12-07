#### Retrieve deep link params after initialization

You can retrieve the deep link data at any time from the Branch singleton by calling one of the below methods.

##### Get First Referring Params

This is the latest set of deep link data from the most recent link that was clicked. If you minimize the app and reopen it, the session will be cleared and so will this data.

{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
NSDictionary *params = [[Branch getInstance] getLatestReferringParams];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let sessionParams = Branch.getInstance().getLatestReferringParams()
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android %}
{% highlight java %}
JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
var params = branch.data();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> sessionParams = branch.GetLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> sessionParams = Branch.getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
var sessionParams:String = branch.getLatestReferringParams();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
var params = branch.data();
{% endhighlight %}
{% endif %}

##### Get first referring params

These are the first set of deep link data the ever referred the user. Once it's been set for a given user, it can never be updated. This is useful for referral programs.

{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
NSDictionary *params = [[Branch getInstance] getFirstReferringParams];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let firstParams = Branch.getInstance().getFirstReferringParams()
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android %}
{% highlight java %}
JSONObject installParams = Branch.getInstance().getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
Unfortunately not supported on this plaform.
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> installParams = branch.GetFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> installParams = Branch.getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
var installParams:String = branch.getFirstReferringParams();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
Unfortunately not supported on this plaform.
{% endhighlight %}
{% endif %}