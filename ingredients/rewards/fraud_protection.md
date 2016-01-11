
{% section header %}## Fraud Protection{% endsection %}

We track the hardware ID and IDFA of the device and tie our concept of a user identity to that identifier, preventing the cases of the same user triggering an event multiple times. You can use the `unique` property of a reward rule to benefit from this.

This means that while testing you may run into issues if you test repeatedly with the same devices. When testing referral programs and reward rules, you should consider using `setDebug` -- more on that {% section setdebug %}[on our "Testing your integration" page]{% endsection %}(/recipes/testing_your_integration/ios/#use-setdebug-to-simulate-fresh-installs).
