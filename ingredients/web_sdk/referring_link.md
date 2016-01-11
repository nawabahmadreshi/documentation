
## Using your own SMS service (Advanced)

While we provide your users the ability to text themselves the app for free -- we use Twilio -- you can use your own SMS service. You can access the link the user clicked to view your site by accesing the `referring_link` returned in the Web SDK's init callback. See the code below:

{% highlight javascript %}
branch.init('YOUR-BRANCH-KEY', function(err, data) {
	if (data.referring_link) {
		console.log("data.referring_link:", data.referring_link);
	}
});
{% endhighlight %}

So, to roll your own SMS service, your logic should be as follows:

1. Does `referring_link` exist, a.k.a. did the user end up on this text-me-the-app page because of a Branch link? If so, use this link when sending the SMS.
2. If `referring_link` is null, generate a new Branch link by making a call to the Web SDK's `link()` method. Use this link when sending the SMS.
