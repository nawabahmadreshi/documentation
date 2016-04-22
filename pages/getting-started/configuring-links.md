---
type: recipe
directory: getting-started
title: Configuring Links
page_title: Configuration options for Branch links
description: Learn about the properties and customizations that are available when creating Branch links for iOS and Android apps.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Documentation, Docs, How to, Standards, Web SDK, SDK
hide_platform_selector: true
hide_section_selector: true
sections:
- guide
contents: list
---

Every Branch link that you create is completely customizable from a functionality perspective. Here are the key variables for customization.

{% protip title="Link Configuration vs. Link Creation" %}
This page describes how to use the link data dictionary to define key/value pairs for deep linking, and the various link analytics and control parameters Branch offers. You can read about how to actually create Branch links on the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) and [Creating Links in Other Ways]({{base.url}}/getting-started/creating-links-other-ways) pages.
{% endprotip %}

## The data structure of Branch links

Conceptually, the data inside a Branch link follows this model:

{% highlight js %}
{
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    alias: 'myalias',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$ipad_url': 'http://myappwebsite.com/ipad',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}
{% endhighlight %}

{% protip title="Points to understand" %}

- Analytics labels and certain parameters related to the link itself are specified at the top level. These include `channel`, `feature`, `campaign`, `stage`, `tags`, `alias`, `duration`, and `type`, and are documented in the [Link creation customizations]({{base.url}}/getting-started/configuring-links/guide/#link-creation-customizations) section of this page.
- All other parameters (essentially everything prefixed with `$`) go inside the `data` dictionary.
- Any custom data you specify also goes inside the `data` dictionary.

The mobile SDKs take care of this structure automatically, but it is important to keep in mind if you are creating links via the [Web SDK]({{base.url}}/getting-started/creating-links-other-ways/guide/#web-sdk) or [HTTP API]({{base.url}}/getting-started/creating-links-other-ways/guide/#http-api).

{% endprotip %}

## Link data dictionary

Every Branch link includes a dictionary for `key : value` pairs specified by you at the time the link is created. This data is then returned and available for use the next time your app is launched through that link. Read more about this on the [Creating Links in Apps]({{base.url}}/getting-started/creating-links-in-apps) and [Creating Links in Other Ways]({{base.url}}/getting-started/creating-links-other-ways) pages.

## Link creation customizations

### Analytics labels

Use analytics labels to help _organize your data_. Track updates, run A/B tests and measure the effectiveness of different channels using these labels.

{% ingredient analytics-labels %}{% endingredient %}

### Other parameters

| Key | Usage | Default
| --- | --- | ---
| alias | Specify a link alias in place of the standard encoded short URL (e.g., `[branchsubdomain]/youralias` or `yourdomain.co/youralias`). Link aliases are unique, immutable objects that cannot be deleted. **Aliases on the legacy `bnc.lt` domain are incompatible with [Universal Links]({{base.url}}/getting-started/universal-app-links) and [Spotlight]({{base.url}}/features/spotlight-indexing)**
| duration | *(Deprecated. Use `$match_duration`)* Lets you control the fingerprinting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds | `7200`
| type | *(Advanced)* Set to `1` to limit deep linking behavior of the generated link to a single use. Set type to `2` to make link show up under [Marketing page](https://dashboard.branch.io/#/marketing) in the dashboard | `0`

{% ingredient branchsubdomain %}{% endingredient %}

## Link control parameters

These parameters are used to customize the functionality of each individual Branch link, either by specifying a property or overriding a global default.

### Redirect customization

The redirect destinations are completely customizable for every link that you create.

#### Fallback URL customization

| Key | Usage | Default
| --- | --- | ---
| $fallback_url | Change the redirect endpoint for _all_ platforms - so you don't have to enable it by platform | System-wide Default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$desktop_url** | Change the redirect endpoint on desktops | Text-Me-The-App page (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $ios_url | Change the redirect endpoint for iOS | App Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $ipad_url | Change the redirect endpoint for iPads | `$ios_url` value
| $android_url | Change the redirect endpoint for Android | Play Store page for your app (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| **$windows_phone_url** | Change the redirect endpoint for Windows OS | Windows Phone default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $blackberry_url | Change the redirect endpoint for Blackberry OS | BlackBerry default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $fire_url | Change the redirect endpoint for Amazon Fire OS | Fire default URL (set in [Link Settings](https://dashboard.branch.io/#/settings/link))
| $ios_wechat_url | Change the redirect endpoint for WeChat on iOS devices | `$ios_url` value
| $ios_weibo_url | Change the redirect endpoint for Weibo on iOS devices | `$ios_url` value

#### After click redirect

This lets you customize where Branch will redirect a user's web view after opening up the app or app store. The alternative is that in some configs, we leave a white screen.

{% caution %}
This parameter is currently supported only on iOS.
{% endcaution %}

| Key | Usage
| --- | ---
| $after_click_url | URL redirect to after the main click redirect has completed

### Link behavior customization

Use these keys to control how URI scheme deep linking functions when opening your app from a link.

{% caution title="Incomplete support on iOS" %}
[Universal Links]({{base.url}}/getting-started/universal-app-links) and [Spotlight]({{base.url}}/features/spotlight-indexing) do not support deep linking via URI paths. If possible, we recommend not using `$deeplink_path` and its platform-specific variants as your only deep link routing method.
{% endcaution %}

| Key | Usage | Default
| --- | --- | ---
| $deeplink_path | Set the deeplink path for _all_ platforms - so you don't have to enable it by platform | `open?link_click_id=1234`
| $android_deeplink_path | Set the deeplink path for Android apps | *null*
| $ios_deeplink_path | Set the deeplink path for iOS apps | *null*
| **$match_duration** | Lets you control the fingerprinting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds | `7200` (2 hours) 
| $always_deeplink | If set to 'false' Branch will only try to open your app if we are certain the user has it | Value of **Always try to open app** in [Link Settings](https://dashboard.branch.io/#/settings/link)
| $ios_redirect_timeout | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds | `750`
| $android_redirect_timeout | Control the timeout that the clientside JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds | `750`
| $one_time_use | Set to 'true' to limit deep linking behavior of the generated link to a single use. Can also be set using `type` | `false`

### Deepviews

Control [Deepviews]({{base.url}}/features/deepviews) on a link-by-link basis.

| Key | Value | Default
| --- | --- | ---
| $ios_deepview | The name of the deepview template to use for iOS | `default_template`
| $android_deepview | The name of the deepview template to use for Android | `default_template`
| $desktop_deepview | The name of the deepview template to use for the desktop | `default_template`

## Display customization

{% protip title="Use the BranchUniversalObject if possible!" %}
Most of these parameters can also be specified using the [BranchUniversalObject]({{base.url}}/getting-started/branch-universal-object). This is the preferred method, if available on your platform.
{% endprotip %}

### Content indexing controls

Currently, these parameters are only used for [iOS Spotlight Indexing]({{base.url}}/features/spotlight-indexing) but will be used by Branch in the future.

| Key | Usage
| --- | --- | ---
| $publicly_indexable | Can be set to either `public` or `private`. Public indicates that you'd like this content to be discovered by other apps
| $keywords | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use
| $canonical_identifier | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
| $exp_date | The date when the content will not longer be available or valid
| $content_type | This is a label for the type of content present. Apple recommends that you use uniform type identifier as [described here](https://developer.apple.com/library/prerelease/ios/documentation/MobileCoreServices/Reference/UTTypeRef/index.html)

### Open Graph tags

If you do not specify a primary OG tag when creating a link, Branch will perform a one-time scrape of your **$desktop_url** (if set) and attempt to retrieve it.

| Key | Usage | Scraped?
| --- | --- | ---
| $og_title | Set the title of the link as it will be seen in social media displays | yes
| $og_description | Set the description of the link as it will be seen in social media displays | yes
| $og_image_url | Set the image of the link as it will be seen in social media displays | yes
| $og_video | Set a video as it will be seen in social media displays
| $og_url | Set the base URL of the link as it will be seen in social media displays
| $og_type | Set the type of custom card format link as it will be seen in social media displays
| $og_redirect | *(Advanced, not recommended)* Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags
| $og_app_id | *(Rarely used)* Set the OG App ID tag

### Twitter specific

| Key | Usage
| --- | ---
| $twitter_card | Set the Twitter card type of the link
| $twitter_title | Set the title of the Twitter card
| $twitter_description | Set the description of the Twitter card
| $twitter_site | Set the site for Twitter
| $twitter_app_country | Set the app country for the app card

## Appending query parameters to links

### Branch parameters

In addition to specifying parameters when creating a link, you can also append any of them on a case-by-case to the URL of a generated link.

To pass a key/value pair of `$deeplink_path : article/jan/123` on a specific instance of a link:

{% highlight sh %}
https://[branchsubdomain]/l/3HZMytU-BW?$deeplink_path=article%2Fjan%2F123
{% endhighlight %}

The following parameters can **only** be specified by appending to a link:

| Key | Usage | Default
| --- | --- | ---
| has_app | Set to 'true' or 'false' in order to tell us whether you want us to try to open up the app for this particular link or not. Functionally identical to `$always_deeplink` | `true`
| debug | Set to 'true' to route to a link debug page that shows the labels and configuration of a link | Value of **Always try to open app** in [Link Settings](https://dashboard.branch.io/#/settings/link)

### Custom parameters

If you append your own custom query parameters to a link, this data will also be captured and passed through when you initiate a Branch session.

To pass a key/value pair of `myparameter : testvalue` on a specific instance of a link:

{% highlight sh %}
https://[branchsubdomain]/l/3HZMytU-BW?myparameter=testvalue
{% endhighlight %}
