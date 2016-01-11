
## Register Webhook on Dashboard

To register a webhook on the Dashboard, open the [Webhooks](https://dashboard.branch.io/#/webhook) page.

Click Add a new webhook to get started.

{% image src='/img/ingredients/webhooks/add.png' half alt='add a new webhook button' %}

<div class="full-width">We've layed out the webhook registration in a sentence format. The format is:</div>

<div class="attention-grabber">Send a webhook to [ WEBHOOK URL ] [ EVERY TIME / THE FIRST TIME ] users trigger the event [ EVENT ].</div>

{% image src='/img/ingredients/webhooks/edit.png' half center alt='add a new webhook' %}


### Enter your webhook URL

First, enter the webhook URL in your own web server URL that you would like the events to be posted to. For testing, you can try out using a URL from [RequestBin](http://requestb.in/). More information on that [below](/recipes/webhooks_and_exporting_data/#example-using-requestbin-to-test).


### Choose frequency of webhook

There are two options for frequency (as seen above). Either you can receive a webhook for every single event called or can receive it the first time only for each user.


### Choose event for which to receive webhook calls

The first step is to register for which events you`d like to receive a webhook for. These can be tailored to:

1. [Branch-provided events](/recipes/advanced_referral_incentives/{{page.platform}}#standard-events): `click`, `install`, `open`, `referred session`, and `web session start`
1. Specific, [custom events](/recipes/advanced_referral_incentives/{{page.platform}}#custom-events), like `purchase` or `share`
1. a wildcard event `*` which will return every single event tracked through Branch

(Branch automatically tracks `clicks` as soon as a Branch link is clicked. `installs`, `opens`, `referred session` and `web session start` events are tracked as soon the native library is run on a device. Any other events will be recorded through the userCompletedAction function of the native library.)

The example above shows a wildcard webhook with event name `*`.


### Save and Confirm

After you press `Add webhook`, you should see the webhook in the list of your reward rules.

{% image src='/img/ingredients/webhooks/added.png' 2-thirds alt='save and confirm' %}
