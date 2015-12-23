
## Advanced: Filters

Filters allow you to specify when a webhook gets sent to your back-end based off criteria matches. The filters you choose are specified from the metadata found inside an event.

Event metadata is passed via the SDK. The specific method is `userCompletedAction`, with the param `withState`, where state is a JSON dictionary of key/value pairs. More information on saving events [here](/recipes/advanced_referral_incentives/ios/#tracking-events).

Let's say you're interested in receiving a webhook on every `sign_up` event you're tracking, but only in a specific market, like Chicago. If your event metadata looked like the following:

    event: "sign_up",
    metadata: {
        "city" : "Chicago",
        "username" : "john_smith_1",
    }

We can send you a webhook only when `city` is equal to `Chicago`. In order to specify a filter on the key `city`, we require the following structure:

`branch_data.event.metadata.city`.

The value, in this case, would be "chicago". Note, however, that if you wanted to filter on `username`, you would do:

`branch_data.event.metadata.username`.

In case you want to filter on just a key, you can put a * in the value box.

The end product would look like this:

![filter webhook](/img/ingredients/webhooks/filters.png)

For reference, Branch automatically tracks the **install**, **referred session**, **open** and **click** event, so if you're interested in something like only being notified when an install occurs based off of a Branch link, you can do that without using `userCompletedAction`. The filter, in this case, would simply be:

`branch_data.event.metadata.referred`

And you would add `true` inside the value box.