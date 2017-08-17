## Flag your web-only links

With {{page.title}}, all email links will open the app by default. In order for your app to know that the email link should bounce to web after opening the app, add `%24web_only%3Dtrue` to your links as a query parameter, for example:

{% highlight html %}
<a href="https://vza3.app.link/3p?%243p={{ page.machine_name }}&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar%24web_only%3Dtrue" >Link to your app!</a>
{% endhighlight %}

{% caution title="Handle links for web-only content" %}
Make sure you have completed the [technical setup steps](/marketing-channels/{{page.title}}/setup/#handle-links-for-web-only-content) to handle web-only links within your app.
{% endcaution %}
