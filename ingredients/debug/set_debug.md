
## Use setDebug To Simulate Fresh Installs

One challenge aspect testing Branch's service is simulating a fresh install. We intentionally add a lot of restrictions to prevent 'install' events from being triggered on app updates or uninstall/reinstall. 

{% if page.android %}
1. Add the below to the Manifest near the Branch key. Remember to flip it to false before release!
{% else %}
1. use the setDebug call before you call initSession (see below). Remember to delete it before release!
{% endif %}
1. Uninstall your test app
1. Clear your browser cookies
1. Click a link in the browser
1. Run your test app:

{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[Branch setDebug];
Branch *branch = [Branch getInstance];
[branch initSession.....
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branch: Branch = Branch.getInstance()
branch.setDebug()
branch.initSession.....
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}

{% if page.android %}
{% highlight java %}
<meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
branch.setDebug(true);
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch.GetInstance().Debug = true;
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.setDebug();
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported :(
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.setDebug(true);
{% endhighlight %}
{% endif %}