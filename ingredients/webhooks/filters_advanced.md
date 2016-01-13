
## Advanced: Filters

Filters allow you to specify when a webhook gets sent to your back-end based off criteria matches. The filters you choose are specified from the metadata found inside an event.

Event metadata is passed via the SDK. The specific method is `userCompletedAction`, with the param `withState`, where state is a JSON dictionary of key/value pairs. More information on saving events [here](/recipes/advanced_referral_incentives/ios/#tracking-events).

Let's say you're interested in receiving a webhook on every `sign_up` event you're tracking, but only in a specific market, like Chicago. If your event metadata looked like the following:

    event: {
        name: "sign_up",
        metadata: {
            "city" : "Chicago",
            "username" : "john_smith_1",
        }
    }

We can send you a webhook only when `city` is equal to `Chicago`. In order to specify a filter on the key `city`, we require the following structure:

`event.metadata.city`.

The value, in this case, would be "chicago". Note, however, that if you wanted to filter on `username`, you would do:

`event.metadata.username`.

In case you want to filter on just a key being present, you can put a * in the value box.

The end product would look like this:

![filter webhook](/img/ingredients/webhooks/filters.png)

For reference, Branch automatically tracks the **install**, **referred session**, **open** and **click** event, so if you're interested in something like only being notified when an install occurs based off of a Branch link, you can do that without using `userCompletedAction`. The filter, in this case, would simply be:

`event.metadata.referred`

And you would add `true` inside the value box.

Please see the full list of filters available [here](/recipes/webhooks_and_exporting_data/#filter--template-keywords).

## Advanced: Filtering Branch Tracking Links

Building upon the concept of filters, let's say you want a webhook to your back-end for all **installs** events driven by a single Branch tracking link. This typically occurs if you run a campaign with an ad provider and they need install information posted back to their servers. Use filters to accomplish this goal. Create an individual webhook for each link you want to track.

To begin, create a link through the marketing page. Once you have added necessary data to the link and saved it, you must grab its ID. The simplest way to do this is by taking the full link (**https://bnc.lt/abcd/a1b2c3d4e5**), and appending `?debug=1` to the end (**https://bnc.lt/abcd/a1b2c3d4e5?debug=1**).

Enter that URL inside your browser. You will see all of the link's details, including a section that says `Data`. Inside that section, the  ID of the link itself is present (~id). Grab the value for that ID. For our example, let's assume the ID is 12345.

With this information handy, go to your webhooks, and set one up for the `install` events. Go to the filters drop down for that webhook, and add the following key/values:

    identity.link_data.~id : 12345
    event.metadata.referred : true

Since these filters are ANDs (and not ORs), both filter values must be satisfied at the time of the event for the webhook to fire. In this example, that means someone installing your app without clicking a Branch link will not fire this webhook. Someone installing your app through a Branch link with an ID of 67890 will also not fire this webhook.

The picture below show cases what a webhook would look like with proper filters.

![filter single link](/img/ingredients/webhooks/filters1.png)

**Testing Branch Tracking Links**

Once filters are correctly set, you will want to test using your device. Since installs are uniquely tracked per device, you must ensure you are in test mode. More information [here](/recipes/testing_your_integration/) on how to accomplish that.

If you are in test mode, do the following steps to test if your webhook works:

* Uninstall your .IPA or .APK from your device
* Click Branch link anywhere
* Re-install your .IPA or .APK from XCode / Android Studio
* Confirm an install occurs by looking through the SDK's `initSession` callbacks and verifying `+clicked_branch_link` and `+is_first_session` equal `1`.
* If all steps are met, your webhook will fire.

Please see the full list of filters available [here](/recipes/webhooks_and_exporting_data/#filter--template-keywords).