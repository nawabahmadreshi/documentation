
### Redeeming Flow

You really only need to take four steps:

1. Ensure credits are loaded.
1. Call the `redeemRewards` method and show a progress dialog.
1. Show a completion dialog and reflect updates in balance.

{% if page.ios %}
{% highlight objc %}
[[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError *error) {
    if (!error && [[Branch getInstance] getCredits] > 5) {
        [[Branch getInstance] redeemRewards:5 callback:^(BOOL success, NSError *error) {
            if (!err) {
                NSInteger newBalance = [[Branch getInstance] getCredits];
                NSString *successMsg = [NSString stringWithFormat:@"You redeemed 5 credits! You have %ld remaining.", (long)newBalance];
                [[[UIAlertView alloc] initWithTitle:@"Success" message:successMsg delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil] show];
            }
        }];
    }
}];
{% endhighlight %}

{% endif %}
{% if page.android %}
{% highlight java %}
Branch.getInstance().loadRewards(new BranchReferralStateChangedListener() {
    @Override
    public void onStateChanged(boolean changed, BranchError error) {
        if (error == null && Branch.getInstance().getCredits() > 5) {
            Branch.getInstance().redeemRewards(5);
        }
    }
});
{% endhighlight %}
{% endif %}
