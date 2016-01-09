
### Redeeming Credits

When users spend credits, you can make a simple call to redeem their credits. On your dashboard, this will fall under the `default` bucket.

{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] redeemRewards:5 callback:^(BOOL success, NSError *error) {
    if (success) {
        NSLog(@"Redeemed 5 credits!");
    }
    else {
        NSLog(@"Failed to redeem credits: %@", error);
    }
}];
{% endhighlight %}
{% endif %}
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).redeemRewards(5);
{% endhighlight %}
{% endif %}

{% if page.cordova %}
{% highlight js %}
branch.redeem(
    5,          // Amount of credits to be redeemed
    "default"  // String of bucket name to redeem credits from
);
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.RedeemRewardsAsync(this, 5, "default");
{% endhighlight %}

After you've registered the class as a delegate of `IBranchRewardsInterface`

{% highlight c# %}
#region IBranchRewardsInterface implementation

public void RewardsRedeemed (string bucket, int count)
{
    Device.BeginInvokeOnMainThread (() => {
        // Do something with the data...
    });
}
#endregion
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.redeemRewards(5);
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight c# %}
private function redeemSuccess(bEvt:BranchEvent):void {
    // Successful redemption
}
{% endhighlight %}

Then register the callback and call `redeemRewards`

{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.REDEEM_REWARDS_SUCCESSED, redeemSuccess);
branch.redeemRewards(5);
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.redeem(
    5,          // Amount of credits to be redeemed
    "default"  // String of bucket name to redeem credits from
);
{% endhighlight %}
{% endif %}

{% section different_bucket %}

If you want to redeem credits in a custom bucket you've specified, such as `myBucket`, then you can do the following:

<!-- iOS -->
{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] redeemRewards:5 forBucket:@"myBucket" callback:^(BOOL success, NSError *error) {
    if (success) {
        NSLog(@"Redeemed 5 credits for myBucket!");
    }
    else {
        NSLog(@"Failed to redeem credits: %@", error);
    }
}];
{% endhighlight %}
{% endif %}
<!-- end iOS -->

<!-- Android -->
{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).redeemRewards("myBucket", 5)
{% endhighlight %}
{% endif %}
<!-- end Android -->

{% endsection %}

{% if page.cordova %}
{% highlight js %}
branch.redeem(
    5,          // Amount of credits to be redeemed
    "myBucket"  // String of bucket name to redeem credits from
);
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.RedeemRewardsAsync(this, 5, "myBucket");
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.redeemRewards(5, "myBucket");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
var branch:Branch = Branch.getInstance();
branch.addEventListener(BranchEvent.REDEEM_REWARDS_SUCCESSED, redeemSuccess);
branch.redeemRewards(5, "myBucket");
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.redeemRewards(5);
{% endhighlight %}

Then register the callback on event `bio:redeemRewards`

{% highlight js %}
branch.addEventListener("bio:redeemRewards", $.onRedeemRewardFinished);
{% endhighlight %}
{% endif %}