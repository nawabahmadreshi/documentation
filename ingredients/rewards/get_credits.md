
### Viewing Credits

Once users have credits, they should be able to redeem them.

Checking the balance involves loading the most recent balance from the server and then checking the balance. These can be two separate steps but for the sake of simplicity we have combined them into one example:

<!-- iOS -->
{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *err) {
    if (!err) {
        NSLog(@"credit: %lu", [[Branch getInstance] getCredits]);
    }
}];
{% endhighlight %}
{% endif %}
<!-- end iOS -->

<!-- Android -->
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).loadRewards(new BranchReferralStateChangedListener() {
	@Override
	public void onStateChanged(boolean changed, Branch.BranchError error) {
		// changed boolean will indicate if the balance changed from what is currently in memory

		// will return the balance of the current user's credits
		int credits = branch.getCredits();
	}
});
{% endhighlight %}
{% endif %}
<!-- end Android -->

{% if page.cordova %}
{% highlight js %}
branch.credits(function(err, data) {
	if (!err) {
		// will return the balance of the current user's credits
    	var credits = data['default'];
	}
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.LoadRewardsAsync(this);
{% endhighlight %}

After you've registered the class as a delegate of `IBranchRewardsInterface`

{% highlight c# %}
#region IBranchRewardsInterface implementation

public void RewardsLoaded ()
{
    Device.BeginInvokeOnMainThread (() => {
    	// will return the balance of the current user's credits
        int credits = Branch.GetInstance().Credits["default"];
    });
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.loadRewards(delegate(bool changed, string error) {
	// will return the balance of the current user's credits
    int credits = Branch.getCredits();
});
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
private function creditSuccess(bEvt:BranchEvent):void {
	// Credits will be string in bEvt.informations.
	trace(bEvt.type, bEvt.informations);
}
{% endhighlight %}

Then register the callback and call `getCredits`

{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.GET_CREDITS_SUCCESSED, creditSuccess);
branch.getCredits();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.credits(function(err, data) {
	if (!err) {
		// will return the balance of the current user's credits
    	var credits = data['default'];
	}
});
{% endhighlight %}
{% endif %}

{% section different_bucket %}
If you want to see the number of credits in a custom bucket you've specified, such as `myBucket`, then you can do the following:

<!-- iOS -->
{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *err) {
    if (!err) {
        NSString *bucket = @"myBucket";
        NSLog(@"credit for %@ bucket: %lu", bucket, [[Branch getInstance] getCreditsForBucket:bucket]);
    }
}];
{% endhighlight %}
{% endif %}
<!-- end iOS -->
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).loadRewards(new BranchReferralStateChangedListener() {
	@Override
	public void onStateChanged(boolean changed, Branch.BranchError error) {
		// changed boolean will indicate if the balance changed from what is currently in memory

		if (error != null) {
		    String bucket = "myBucket";
		    Branch.getInstance(getApplicationContext()).getCreditsForBucket(bucket)
		}
	}
});
{% endhighlight %}
{% endif %}

{% endsection %}

{% if page.cordova %}
{% highlight js %}
branch.credits(function(err, data) {
	if (!err) {
		// will return the balance of the current user's credits
    	var credits = data['myBucket'];
	}
});
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
#region IBranchRewardsInterface implementation

public void RewardsLoaded ()
{
    Device.BeginInvokeOnMainThread (() => {
    	// will return the balance of the current user's credits
        int credits = Branch.GetInstance().Credits["myBucket"];
    });
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.loadRewards(delegate(bool changed, string error) {
    // will return the balance of the current user's credits
    int credits = Branch.getCredits("myBucket");
});
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
private function creditSuccess(bEvt:BranchEvent):void {
	// Credits will be string in bEvt.informations.
	trace(bEvt.type, bEvt.informations);
}
{% endhighlight %}

Then register the callback and call `getCredits`

{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.GET_CREDITS_SUCCESSED, creditSuccess);
branch.getCredits("myBucket");
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.loadRewards();
{% endhighlight %}

Then register the callback on event `bio:loadRewards`

{% highlight js %}
branch.addEventListener("bio:loadRewards", $.onLoadRewardFinished);
{% endhighlight %}
{% endif %}
