{% if page.android %}

If you already have an Application class, then create a Branch instance in your `Application#onCreate()` method. If you don't know what a custom application class is, you probably don't have one, so skip this Step 3 and use the one below.

{% highlight java %}
public void onCreate() {
    super.onCreate();
    Branch.getAutoInstance(this);
}
{% endhighlight %}

{% endif %}