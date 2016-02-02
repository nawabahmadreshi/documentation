---
type: recipe
directory: getting-started
title: "Events and Referrals"
page_title: Using events to track analytics and power referrals with Branch
description: The Branch dashboard shows you all the analytics for your deeplinks and create referral rewards from events. Track install attribution, measure marketing channels and ad campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Attribution, Analytics, Dashboard, App Install, App Open, Conversion, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Attribution, Analytics, Dashboard, App Install, App Open, Conversion, Android
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- guide
---

## Automatic events

Branch _automatically_ creates events whenever a user accesses your site or your app. We measure installs, opens and web page visits with separate events. Here is a list of the auto-created ones:

| **Event** | **Description**
| `install` | Triggered the first time a user launches your app
| `open` | Trigged when the user opens the app after the very first launch OR if a user reinstalls the app after uninstalling it
| `web session start` | Triggered when the user views a webpage using the Branch Web SDK.
| `referred session` | Triggered _in addition_ to install, open or web session start if a user comes from a Branch link

{% protip title="Receiving Postbacks" %}
You can be notified via a postback to your server every time that an event occurs. Visit the [Webhooks](/getting-started/webhooks/) page for more information on configuring postbacks.
{% endprotip %}

## Custom events

In addition the default Branch events, you can track any custom user action you wish. Examples of what you may want to track:

- sign up
- purchases
- shares

Recording a custom event in your app is accomplished via a simple call to the SDK:

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:@"customAction"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction("customAction")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
Branch.getInstance(getApplicationContext()).userCompletedAction("custom_action_1");
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
branch.track("custom_action_1");
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
await branch.UserCompletedActionAsync("custom_action_1");
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Branch.userCompletedAction("custom_action_1");
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("custom_action_1");
{% endhighlight %}
{% endif %}

{% protip title="Appending custom metadata" %}

You can also include additional information when creating a custom event:

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] userCompletedAction:@"purchase" withState:@{@"item":@"123-AB-456"}];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().userCompletedAction("purchase", withState: ["item" : "123-AB-456"])
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->

{% if page.android %}
{% highlight java %}
JSONObject metaData = new JSONObject();
metaData.put("key", "value");
Branch.getInstance().userCompletedAction("custom_action_with_data", metaData);
{% endhighlight %}
{% endif %}
<!--- /Android -->

{% if page.cordova %}
{% highlight js %}
branch.track(
    "purchase_event",
    {
    	"sku": "12346789"
	}
);
{% endhighlight %}
{% endif %}

{% if page.xamarin %}
{% highlight c# %}
Branch branch = Branch.GetInstance ();
Dictionary<string, object> data = new Dictionary<string, object>();
data.Add("sku", "123456789");
await branch.UserCompletedActionAsync("purchase_event", data);
{% endhighlight %}
{% endif %}

{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> stateItems = new Dictionary<string, object>
{
    { "sku", "12346789" }
};
Branch.userCompletedAction("purchase_event", stateItems);
{% endhighlight %}
{% endif %}

{% if page.adobe %}
{% highlight java %}
Currently not supported in the ANE
{% endhighlight %}
{% endif %}

{% if page.titanium %}
{% highlight js %}
branch.userCompletedAction("purchase_event", {
	"sku": "12346789"
});
{% endhighlight %}
{% endif %}

{% endprotip %}

## Identifying users

Identifying your users will help you associate all activities and links created to a particular person. This can show you which of your users are the most influential.

{% if page.ios %}

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
// your app's userId, 127 chars or less
[[Branch getInstance] setIdentity:@"your user id"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
// your app's userId, 127 chars or less
Branch.getInstance().setIdentity("your user id")
{% endhighlight %}
{% endtab %}
{% endtabs %}

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% tabs %}
{% tab objective-c %}
{% highlight objc %}
[[Branch getInstance] logout];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
Branch.getInstance().logout()
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- iOS identify and logout -->

{% if page.android %}
Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight java %}
// your app's userId, 127 chars or less
Branch.getInstance().setIdentity("your user id");
{% endhighlight %}

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight java %}
Branch.getInstance().logout();
{% endhighlight %}
{% endif %}
<!--- Android identify and logout -->

{% if page.cordova %}

Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
branch.setIdentity("your user id");
{% endhighlight %}

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
branch.logout();
{% endhighlight %}
{% endif %}

{% if page.xamarin %}

Add a `SetIdentityAsync` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `SetIdentityAsync` when the user first logs in. We will cache the identity for future sessions.

{% highlight c# %}
Branch branch = Branch.GetInstance ();
branch.SetIdentityAsync("your user id", this);
{% endhighlight %}

Add a `LogoutAsync` call anywhere you allow the user to logout. `LogoutAsync` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `LogoutAsync` can likewise lead to bugs if multiple users log in on the same device.

{% highlight c# %}
Branch.GetInstance(getApplicationContext()).LogoutAsync(this);
{% endhighlight %}

{% endif %}

{% if page.unity %}
Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight c# %}
Branch.setIdentity("your user id");
{% endhighlight %}

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight c# %}
Branch.logout();
{% endhighlight %}
{% endif %}

{% if page.adobe %}
Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight java %}
branch.setIdentity("your user id");
{% endhighlight %}

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight java %}
branch.logout();
{% endhighlight %}
{% endif %}

{% if page.titanium %}
Add a `setIdentity` call wherever you create or login a user. This should be done after you have successfully initialized a Branch session. Only call `setIdentity` when the user first logs in. We will cache the identity for future sessions.

{% highlight js %}
branch.setIdentity("your user id");
{% endhighlight %}

Add a `logout` call anywhere you allow the user to logout. `Logout` should only be called when the user logs out. Calling it at other times could lead to hard-to-discover errors. Failing to call `logout` can likewise lead to bugs if multiple users log in on the same device.

{% highlight js %}
branch.logout();
{% endhighlight %}
{% endif %}

{% protip title="Retroactive event attribution" %}
The **first** time `setIdentity` is called for each unique user ID, it will retroactively associate any previously recorded events from the current device with that user ID. This only occurs once.
{% endprotip %}

## Referral rewards

Branch allows you reward users with credits, track those credits, and redeem them when appropriate. It is a unit-less currency available to your users without you having to build a system from scratch.

With every event that is recorded in Branch, we check automatically if that event is eligible for credits based on the rules that you configured, then deposit the credits if so. Reward rules can be based on both automatic events and custom events.

{% protip title="Referral Fraud Protection" %}
Branch tracks the hardware ID and IDFA of every device we detect, and ties these to our concept of a user identity. However, this means that you may run into issues if you test repeatedly with the same devices. When testing referral programs and reward rules, you should [use debug mode](/getting-started/integration-testing#use-debug-mode-to-simulate-fresh-installs).
{% endprotip %}

### Awarding credits

To add a rule, go to the Dashboard Referrals page and click the [Rules tab](https://dashboard.branch.io/#/referrals/rules). Click the green "+ Add a new rule" button. Once there, you can select between two options:

#### Promo code

Properties you can define:

1. The code a user may enter
1. How many credits the reward is
1. Which `bucket` the credits go to
1. Whether the reward occurs the first time or every time

#### Give reward

Properties you can define:

1. Who gets a reward
1. How many credits the reward is
1. Which `bucket` the credits go to
1. Whether the reward occurs the first time or every time
1. Which event triggers the reward

{% example %}
Let's say you want to give 10 credits to each new user who signs up through a friend, and 5 credits to the friend who referred him or her. That can be done through a combination of two rules:

#### Rule 1: rewarding the referred user 10 credits

1. Who gets a reward: **"Referred acting users"**
1. How many credits the reward is: **10**
1. Which bucket the credits go to: **default**
1. Whether the reward occurs the first time or every time: **the first time**
1. Which event triggers the reward: **install**

{% image src='/img/pages/getting-started/events-referrals/referred_rule.png' center 2-thirds alt='referred used' %}

#### Rule 2: rewarding the referring user 5 credits

1. Who gets a reward: **"Referring users"**
1. How many credits the reward is: **5**
1. Which bucket the credits go to: **default**
1. Whether the reward occurs the first time or every time: **every time**
1. Which event triggers the reward: **install**

{% image src='/img/pages/getting-started/events-referrals/referring_rule.png' center 2-thirds alt='referring user' %}

{% endexample %}

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

{% example title="Example redemption flow" %}

This is a simple three-part process:

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
{% endexample %}