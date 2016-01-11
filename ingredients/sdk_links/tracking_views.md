
{% section header %}### Tracking Content Views{% endsection %}

Once you've created the universal object, we make it easy to track analytics to it. We recommend dropping in view tracking whenever a user views the particular object you're using. Just add this one line:

<!--- Unity -->

{% if page.unity %}
{% highlight js %}
branchUniversalObject.registerView();
{% endhighlight %}
{% endif %}

<!--- Titanium -->

{% if page.titanium %}
{% highlight js %}
branchUniversalObject.registerView();
{% endhighlight %}
{% endif %}

<!--- Android -->

{% if page.android %}
{% highlight java %}
branchUniversalObject.registerView();
{% endhighlight %}
{% endif %}

<!--- iOS -->

{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
[branchUniversalObject registerView];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
branchUniversalObject.registerView()
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}