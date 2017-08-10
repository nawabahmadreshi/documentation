
### One time setup

{% prerequisite %}
- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
{% endprerequisite %}

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) at any time for assistance with the setup steps.

## Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="_blank"} section of the Branch dashboard. Select {{page.title}} as your email service provider and click **Get Started**.

{% image src="/img/pages/marketing-channels/email/choose-esp.png" center full alt='Choose your email service provider' %}

## Set up deep linking for email

### Email link behavior

Branch turns the web URLs you put into your emails into Branch deep links, opening the app for users with your app installed to that same content in the app. 

{% image src="/img/pages/marketing-channels/email/users-with-app.png" center third alt='Behavior for users with the app' %}

To do this, it must be possible to map your web URL content (e.g. a page with brown loafers at `https://shop.com/shoes/brown-loafers`) into a working deep link that takes users to brown loafers in the app. The Deep Linked Email [setup flow](https://dashboard.branch.io/email){:target="_blank"} will attempt to automatically detect this mapping for you.

If you do not want to set this up yet, you can select **No, just open to app homepage for now**.

{% image src="/img/pages/marketing-channels/email/app-homepage.png" center half alt='Select behavior for users with the app' %}

By default, email deep links will redirect users _without your app_ to the same content on the web instead.

{% image src="/img/pages/marketing-channels/email/users-without-app.png" center third alt='Behavior for users without the app' %}

If you would like to send users to the App Store or another default you have specified in Link Settings, you can select **Open to default redirects**.

{% image src="/img/pages/marketing-channels/email/default-redirects.png" center half alt='Select behavior for users without the app' %}

### Enter a web URL

If you chose **not** to set up deep linking to specific content within your app, then you can [skip this step](#configure-your-esp).

{% image src="/img/pages/third-party-integrations/responsys/enter-web-url.png" center full alt='Enter a web URL' %}

In this step, you will want to enter a web URL that corresponds to a specific screen within your app. In other words, the webpage should have content that also exists in your app. If you do not know whether your web content also exists in-app, try any URL other than your website homepage. Some examples:

- A product page, like a page with brown loafers
- An article
- A content page, like a video or image

Once you choose one and click **Submit**, [meta tags that can be used for deep linking](/getting-started/hosted-deep-link-data/guide/) will be retrieved from your webpage. You will see a result indicating the mapping between your web content and your app content:

#### We think you use your web URL for deep linking

{% image src="/img/pages/third-party-integrations/responsys/web-url-result.png" 2-thirds center alt='Using your web URL for deep linking' %}

If your webpage, for instance at the URL `https://shop.com/shoes/brown-loafers`, has a tag like this:

`<meta name="al:ios:url" content="shop://https://shop.com/shoes/brown-loafers" />`

or this:

`<meta name="al:android:url" content="shop://shoes/brown-loafers" />`

Your deep linking setup for email will use all or part of your **web URL** as a deep link value. It can use either the full URL including the protocol (`https://shop.com/shoes/brown-loafers`), the full URL without the protocol (`shop.com/shoes/brown-loafers`), or the path of the URL (`shoes/brown-loafers`).

#### We think you host your deep link data on your website

{% image src="/img/pages/third-party-integrations/responsys/hosted-data-result.png" 2-thirds center alt='Using hosted data for deep linking' %}

If instead, your webpage has a tag like this:

`<meta name="branch:deeplink:product_id" content="123456" />`

or this:

`<meta name="al:ios:url" content="shop://id/123456" />`

Your deep linking setup for email will use the **hosted deep link data** method. This means that no mapping can be made to the URL, and [meta tags that can be used for deep linking](/getting-started/hosted-deep-link-data/guide/) will be retrieved from your webpage on an ongoing basis.

#### We couldn't determine your deep linking setup from your web URL

If there are no meta tags for deep linking on your webpage, or you indicate that the mapping is incorrect, you can try a Branch link instead.

{% image src="/img/pages/third-party-integrations/responsys/enter-branch-link.png" center 2-thirds alt='Enter a Branch link' %}

Here, you will want to enter a Branch link that opens to a page within your app (not the home screen). 

When you click **Submit**, the link's values for `$canonical_url`, `$desktop_url`, and `$fallback_url` will be compared against other values in the link. If there is a mapping between values for the full URL or the path of the URL, your deep linking setup for email will use those methods.

### Test your link

When you submit a web URL or Branch link, you will be prompted with a test link. Click this link on iOS and Android devices, and verify that it will open your app to the right place.

{% image src="/img/pages/third-party-integrations/responsys/test-link.png" center half alt='Test your link' %}

Once you click **Yes**, your deep linking will be set up for email. When a user clicks a link in your emails, we will embed the full web URL, path of the web URL, or retrieved deep link data from the webpage into a Branch version of that link and pass it to your app, so that it will open to the right place.

### We couldn't determine your deep linking setup

If an app deep linking scheme that maps to your web content cannot be successfully detected, a Branch account manager will be in touch to help you set up your deep linking for email. 

{% image src="/img/pages/third-party-integrations/responsys/failure-result.png" center 2-thirds alt='Could not set up deep linking' %}

We will help you set up one of the following methods:

If you use unique key/value data as deep link values:

1. _Recommended:_ **Hosted deep link data:** You can host your deep link data on your website with a metatag that looks like this `<meta name="branch:deeplink:my_key" content="my_value" />` where `my_key` and `my_value` will become a key value pair in deep link data. For each web URL, Branch will look for those tags and embed the deep link data (if found) into the deep link. Note that Branch also accepts App Links tags for deep linking. For more details, please read [Hosted Deep Link Data](/getting-started/hosted-deep-link-data/guide/).
1. **As query parameters:** Simply append query parameters on to your web url and Branch will take those parameters and put them in deep link data.

If you use your web URL as a deep link value:

1. **URL path:** If you use the path of your web URL as your  `$deeplink_path` value, or any other deep link value, then the configuration will automatically take the path of the URL and put it in deep link data.
1. **Full URL:** If you use the full web URL as your `$deeplink_path` value, or any other deep link value, then the configuration will take the entire URL and put it in deep link data.

{% protip title="Host deep link data for more than just emails" %}
The Branch [Quick Link creator](/getting-started/creating-links/dashboard/) also scrapes your web URL for deep link data to make link creation even easier. [Hosting Deep Link Data](/getting-started/hosted-deep-link-data/guide/) on your website will make using Branch products easier in future.
{% endprotip %}

In the meantime, you can proceed to the next step: **[Configure ESP](#configure-your-esp)**.

### Deep linking settings for email

The following are all the possible settings you can configure for deep linking with email.

#### Link behavior for app users

| | Setting | Example | Link Data Result 
| --- | ---
| | **Open the app homepage** | No settings configured to generate deep link data for email; email links will route to the app homepage.
| | **Open to specific app content** | Deep link to specific app content based on one or more of the following settings. | 
| | Translate query parameters on URLs into Branch link data | **URL:** `https://shop.com/shoes/brown-loafers&product_id=123456` | `product_id: 123456`
| | Translate web URL into Branch link data: <br> Full URL for key ______ | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Key:** `$canonical_url` | `$canonical_url: https://shop.com/shoes/brown-loafers`
| | Translate web URL into Branch link data: <br> URL path for key ______ | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Key:** `$deeplink_path` | `$deeplink_path: shoes/brown-loafers`
| | Retrieve hosted deep link data from website and translate into Branch link data | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Meta Tags:** `<meta name="branch:deeplink:product_id" content="123456" />` | `product_id: 123456`
| | Strip protocol (http:// or https://): <br> from $deeplink_path <br> from $ios_deeplink_path <br> from $android_deeplink_path <br> *Note: Typically used with one of the other settings.* | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Other Settings:** Translate web URL into Branch link data: Full URL for key `$deeplink_path` | `$deeplink_path: shop.com/shoes/brown-loafers`
| | Translate query parameters on URLs into Branch link data from parameter ______ to key ______ <br> *Note: Not configurable in the UI.* | **URL:** `https://shop.com/shoes/brown-loafers&product_id=123456&utm_content=shoes` <br> **Parameter:** `utm_content` <br> **Key:** `category` | `category: shoes`

#### Link behavior for users without your app

| Setting | Description
| --- | --- 
| Open to specific web content | Route to the original URL specified in the email.
| Open to default redirects | Route to defaults specified in [Link Settings](https://dashboard.branch.io/link-settings){:target="_blank"}.

UI only setting; defaults "append_all_params" to true

"append_all_params":true

"append_full_url_for_key":"$deeplink_path"
URL path for key ______
"append_path_for_key":"$deeplink_path"
Retrieve hosted deep link data from website and translate into Branch link data
auto_fetch: true
Strip protocol (http:// or https://)
UI only setting
from $deeplink_path
"strip_protocol_from_deeplink_path":true
from $ios_deeplink_path
"strip_protocol_from_ios_deeplink_path":true
from $android_deeplink_path
"strip_protocol_from_android_deeplink_path":true
[not in the UI] Translate query parameters on URLs into Branch link data from parameter __ to key ______
{"map_query_params_to_deep_link_data":{"utm_campaign":"~campaign"}
Link behavior for users without your app
Corresponding setting example
Open to specific web content
"link_fallback_method":"ORIGINAL_URL"
Open to default redirects
"link_fallback_method":"BRANCH_DEFAULT"


