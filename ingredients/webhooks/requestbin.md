
## Testing

{% image src='/img/ingredients/webhooks/requestbin_create.png' half center alt='requestbin create' %}

### Using RequestBin

If you're not sure whether one of our webhooks is configured correctly, take a look at [requestb.in](http://requestb.in/). RequestBin gives you a URL that collects requests, such as our webhook's requests, to see what the client (aka Branch) is sending.

To get started, navigate to their website and click "+ Create a RequestBin".


<div class="full-width">Now you should have a dedicated URL that you can use to simulate your own servers. For example:</div>

{% image src='/img/ingredients/webhooks/requestbin_inspect.png' half center alt='requestbin create' %}

You can test it out using cURL, which is pretty sweet. Give it a shot if you want.

{% image src='/img/ingredients/webhooks/requestbin_add_webhook.png' half right alt='requestbin inspect' %}

The next step is to setup your postback with Branch. Navigate to the Dashboard's Webhooks page and click "+ Add a new webhook".

Now you should copy your URL from RequestBin into the textfield following the label "Send a webhook to".

Choose `Install` for the event.

Now every time someone opens the app, the webhook you've configured on Branch will send a request to your RequestBin. Give it a shot!

<div class="full-width">After tapping a marketing link–visit our <a href="/recipes/advertising_facebook/">Advertising on Facebook</a> guide to see how this link was constructed–RequestBin shows the following response:</div>

{% image src='/img/ingredients/webhooks/requestbin_response.png' half center alt='requestbin create' %}

### Testing Considerations and FAQs

**Question** Why is my app not sending a device ID?

**Answer** Check to see if you are in Test Mode with your SDK. If we are sending a fake ID to simulate installs, we will not send it inside a webhook.

**Question** How can I ensure a webhook is from Branch?

**Answer** Right now, we do not support a encryption method to verify requests come from Branch. If you save events through the Branch SDK, you can specify a secret key inside the event metadata, and pass that through inside the URL of the webhook itself. 

**Question** I'm getting a first referring data and session referring data. What's the difference?

**Answer** Because webhooks are event based, and tie back to a unique user, we will send you link data that first drove said user into your app. Then, if they click a branch link later, that will be session referring data. For an install event, these should be the same. For any consequent events, session referring data may be different.

