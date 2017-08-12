### Ongoing use of Deep Linked Email

Once you’ve completed the [one time setup steps](/marketing-channels/{{page.title}}/setup/), it’s time to send your first email.

This guide will identify which web links you'd like to open the app and deep link, as well as convert them to Branch links.

## Flag your deep links

In order for {{page.title}} to know that the email link should open the app, add `universal="true"` to the HTML, for example:

{% highlight html %}
<a href="links.example.com" universal="true">Link to your app!</a>
{% endhighlight %}

This will also ensure that your links are converted to Branch links that will open the app on Android as well, with full tracking and attribution.

{% protip title="What happens to your links behind the scenes?" %}

This is what a link looks like within your email template:

{% highlight html %}
http://example.com/?foo=bar
{% endhighlight %}

When a user clicks your link, Branch processes the link and converts it to something like this:

{% highlight html %}
https://vza3.app.link/3p?%243p=e_sg&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar
{% endhighlight %}

Where `vza3.app.link` is your Branch domain.

{% endprotip %}