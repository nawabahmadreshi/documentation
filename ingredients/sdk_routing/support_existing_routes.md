You spent a bunch of time already setting up deeplink paths before you heard of Branch and now you want the Branch links to leverage them? No problem at all. You can either set `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` to the URI path you'd like us to call.

{% if page.ios %}
**Note that Universal Links and Spotlight on iOS do not support URI paths**
{% endif %}

All of the examples below will cause Branch to trigger `myapp://content/1234`:

#### Dynamic link control

If you're [creating links dynamically](/overviews/link_creation_guide/#appending-query-parameters), you simply need to append the parameters. For example:

{% highlight javascript %}
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$deeplink_path=content%2F1234"
{% endhighlight %}

#### SDK/API link control

{% ingredient sdk_links/deeplink_path_links %}
{% endingredient %}

#### Dashboard link control

You can also control it for individual marketing links by inserting the keys and values into the deep link data section.

{% image src='/img/ingredients/sdk_routing/deeplink_path.png' third center alt='deeplink path' %}