
## Advanced: Templating

If your back-end relies on a dynamic URL structure to receive events, then we can support you with our webhooks. This is typically used for marketing campaigns, where a unique parameter needs to be appended to each link-click, and consequently posted back to a URL. You can also expose data we collect on the URL itself, through our templates. Here are the two options for templates and webhooks:

#### Query Parameters on Branch Links

Let's say you have created a Branch link in the Marketing tab specifically for SEM campaigns and want to track query parameters. Potentially something like below:

*http://bnc.lt/my-sf-campaign?clickId=12345*

And you wanted to return that value-- `12345`--back to your back-end. When setting up a webhook, you'd use liquid tags, which follow this convention: {{ param.name }}, and we'll pass through that value we have saved in our database. In case there isn't anything, it'll simply be empty.

**NOTE** this works for all types of Branch links, and not just marketing links.

![template webhook](/img/ingredients/webhooks/templates.png)

Any query parameter you add to Branch Links will be captured and stored. You will need to follow this format: *session.link_click.query* and specify the key from the query string to pass through the value, as shown in the example above. So, if you had *?clickId=5&deviceId=7*, our database would save and webhook them as *session.link_click.query.clickId* and *session.link_click.query.deviceId*, respectively.


#### General templates without Query Parameters

If you want to add other fields, like **device** ID, event name or metadata, and more, you can do that as well. For example, let's say you have an endpoint that accepts a `GET`, and one of the required parameters are `device.id`, and `event.name`. In this case, that would look like the following:

![template non query webhook](/img/ingredients/webhooks/templates2.png)

Please see the full list of templates available [here](/recipes/webhooks_and_exporting_data/#filter--template-keywords).

## Filter & Template Keywords

These values are all pulled from our database and sent to you as a passthrough, so you can template your URLs. These are the same values you may filter on, as well.

### Browser Filters and Templates

Browser data can give you access to information we know about the browser when a user clicks a Branch link. Possible examples of templates include adding the user agent inside the postback URL.

| Key | Description
| --- | ---
| browser.branch_id | refers to the branch ID we have for a user's unique browser
| browser.metadata.userAgent | refers to the user agent of the browser

### Click Filters and Templates

Click refers to click properties when a user clicks a Branch link.

| Key | Description
| --- | ---
| click.query | refers to any key you have on the link. Ex: https://bnc.lt/test?param1=value1. To send value1, you would call this `click.param1`. 
| click.link_data.key | See possible values for [link](/recipes/webhooks_and_exporting_data/#link-filters-and-templates). Examples include click.link_data.~id, click.link_data.photo_id, etc.
| click.referring_identity.id | Id you set of the user who generated this link, leading to consequent click.
| click.browser. | See [browser](/recipes/webhooks_and_exporting_data/#browser-filters-and-templates) for values. Examples include click.browser.branch_id, etc.
| click.device. | See [device](/recipes/webhooks_and_exporting_data/#device-filters-and-templates) for values. Examples include click.device.hardware_id.
| click.date | time of link click.

### Device Filters and Templates

Device section refers to a unique device, including attributes about that device. For all events (including installs not driven by a Branch link), we will surface device data such as the device ID, OS, and OS Version. Possible examples of filters and templates include filtering by device type, including the device's advertising ID inside the webhook template.

| Key | Description
| --- | ---
| device.hardware_id | For iOS, this is the Advertising ID. For Android, this is the Android ID
| device.metadata.google_advertising_id | Android only. Refers to the Google Advertising ID
| device.metadata.os | Refers to the OS of the device
| device.metadata.os_version | refers to the OS version of the OS

### Event Filters and Templates

Events refer to events that occur in-app tracked by you, or events tracked by us automatically, which are `Install`, `Open`, `Referred Session`, and `Click`. Here are the possible values:

| Key | Description
| --- | ---
| event.name | refers to the name of the event. Example `install`, or `sign_up`
| event.metadata.key | refers to the key of the metadata key values you save through webhooks
| event.date | refers to the timestamp of the event being saved

### Identity Filters and Templates

Identity refers to the unique user that Branch tracks. If they clicked a Branch link, then their `link_click` and `link_data` values will be populated. These `link_click` and `link_data` values are permanently tied to the identity. If a link with a campaign of 'google' drives an install, then the person (identity) who installed will have a permanent value of campaign equal to google. You would then filter or template on this like so: `identity.link_data.~campain`.

| Key | Description
| --- | ---
| identity.id | ID you set of a user using the secondtIdentity method
| identity.link_click. | See possible values for [click](/recipes/webhooks_and_exporting_data/#click-filters-and-templates). Examples include identity.link_click.~id.
| identity.link_data.key | See possible values for [link](/recipes/webhooks_and_exporting_data/#link-filters-and-templates). Examples include identity.link_data.~id, identity.link_data.photo_id, etc.
| identity.referring_identity.id | ID you set of the user who drove this user's event
| identity.referring_device.hardware_id | Device ID of referrer who drive this user's event

### Link Filters And Templates

Link refers to the values of the link, including the key values you specify as deeplink data. **Note, you cannot use this by itself**. You must use this with session or identity, so the final filter or template value would be `session.link_data.~id` or `identity.link_data.~id`.

| Key | Description
| ~id | ID of the link
| ~creation_source | what created the link, e.g. iOS SDK, API, etc.
| ~tags | tags of the link
| ~campaign | campaign of the link
| ~channel | channel of the link
| ~feature | feature of the link
| ~stage | stage of the link
| $one_time_use | whether this was a one time use link or not
| $one_time_use_used | whether this one time use link was used or not
| $identity_id | Branch internal identity of user who generated the link
| $match_duration | length of time (in milliseconds) that a match could have occurred
| +url | the full URL of the link, e.g. bnc.lt/m/abcde12345
| key | any key value you specify as deeplink data. ex identity_link.data.photo_id

### Session Filters and Templates

Session refers to the values driven by a Branch link click that are ongoing, regardless if the event was an install or open. Opposite from identity, which only gets set once and cannot be changed afterwards. If you're interested in re-engagement, then session would be a better choice than identity. For example, let's say you create a link with a campaign of `re-engage`, and want to see all `open` events that result from people clicking this link. You would filter something like `session.link_data.~campaign` : `re-engage`

| Key | Description
| --- | ---
| session.link_click. | See possible values for [click](/recipes/webhooks_and_exporting_data/#click-filters-and-templates). Examples include session.link_click.date, etc.
| session.link_data. | See possible values for [link](/recipes/webhooks_and_exporting_data/#link-filters-and-templates). Examples include session.link_data.~id, session.link_data.photo_id, etc.
| session.referring_identity.id | ID you set of user who created a link that drove this new session
| session.referring_device.hardware_id | device ID of user who created a link that drove this new session
