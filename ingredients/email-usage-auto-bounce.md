## Flag your web-only links

With {{page.title}}, all email links will open the app by default. In order for your app to know that the email link should bounce to web after opening the app, add `$web_only=true` to your links as a query parameter, for example:

{% highlight html %}
<a href="links.example.com?$web_only=true" >Link to your app!</a>
{% endhighlight %}

{% caution title="Handle links for web-only content" %}
Make sure you have completed the [technical setup steps](/marketing-channels/{{ page.title | downcase }}/setup/#handle-links-for-web-only-content) to handle web-only links within your app.
{% endcaution %}

This will also ensure that your links are converted to Branch links that will open the app on Android as well, with full tracking and attribution.

{% protip title="What happens to your links behind the scenes?" %}

This is what a link looks like within your email template:

{% highlight html %}
http://example.com/?foo=bar
{% endhighlight %}

When a user clicks your link, Branch processes the link and converts it to something like this:

{% highlight html %}
https://vza3.app.link/3p?%243p={{ page.machine_name }}&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar
{% endhighlight %}

Where `vza3.app.link` is your Branch domain.

{% endprotip %}