---
type: recipe
directory: features
title: "Deepviews"
page_title: "Deepviews - Mobile Web Splash Pages"
description: Learn how to create a mobile web Deepview using Branch links.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- overview
- guide
- advanced
---

{% if page.overview %}

A Deepview is a mobile web splash page, hosted by Branch, that gives a preview of the in-app content behind a given Branch link. When a visitor opens one of your Branch links and does not have your app installed, you can show them a Deepview instead of sending them directly to the App/Play Store.

Deepviews are discoverable in all search portals (Google, Apple Spotlight, Bing, etc), opening up new mechanisms for people to find your app, and drive much higher conversions to install than sending visitors to the App/Play Store directly. Here's an example flow:

{% image src='/img/pages/features/deepviews/deepviews_allthecooks.gif' actual center alt='Deepviews example' %}

{% protip title="If you already have a mobile website..." %}The [website to app routing]({{base.url}}/features/deepview-mobile-site) feature can be used to recreate the functionality of Deepviews using your own website. If you already host your own content previews, this is a good alternative!{% endprotip %}

{% elsif page.guide %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Enable Deepviews on the Branch dashboard

1. Head to the [Deepviews configuration page](https://dashboard.branch.io/#/settings/deepviews) on the Branch dashboard.
1. Deepviews are configured separately for visitors on each platform (iOS, Android, and desktop). Select the platforms you want and click **Enable**.
   - **Note:** if you enable desktop Deepviews, they will override any [Text-Me-The-App page]({{base.url}}/features/deepview-mobile-site) you have configured.

{% image src='/img/pages/features/deepviews/deepviews_enable.png' quarter center alt='Deepviews tab' %}

{% example %}
You are developing an app for iOS and Android, but the Android version is not yet ready. Showing a Deepview to Android users would be of limited use, so you enable Deepviews only for iOS and desktop.
{% endexample %} 

{% protip title="Changing the app icon" %}If we pulled the wrong app icon, you can upload a new one in the _Social Media Display Customization_ section of the [dashboard Settings](https://dashboard.branch.io/#/settings/link).{% endprotip %}

## View the analytics

Branch lets you track the flow of users through Deepviews. You can find this information on the [summary page](https://dashboard.branch.io/#) of the Branch dashboard.

{% image src='/img/pages/features/deepviews/deepview_analytics.png' 2-thirds center alt='Deepviews analytics tab' %}

There are various metrics to understand when deep linking from your mobile website.

- **Views:** a user viewed the mobile site.
- **Clicks:** a user clicked on the Deepview CTA
- **Installs:** a user installed the app for the first time
- **Upgrades:** a user re-opened or upgraded the app from a previous version

Only users who do not have the app will go through this flow. You can view the total counts and conversion rate from each step on this chart.

## Customizations

This is all you need to do to enable Deepviews. For each link, Branch will attempt to intelligently display the best content we have available. However, you can (and will probably want to!) what is shown. See the [Advanced]({{base.url}}/features/deepviews/advanced/) page for more information.

{% elsif page.advanced %}

## Customizing Deepview content

The default Deepview template simply displays the content from three of the link's [control parameters]({{base.url}}/getting-started/link-configuration). You can specify the content of these parameters when creating your link to control what will display in that link’s Deepview. If nothing is set for a particular link, we will gracefully fall back to the OG values set for your entire app in _Settings > Link Settings > Social Media Display Customization._

| Key | Value
| --- | ---
| **$og_title** | The title you'd like to appear on the deepview
| **$og_description** | The description you'd like to appear on the deepview
| **$og_image_url** | The URL for the image you'd like to appear on the deepview

{% protip title="Hosting your own OG tags" %}
If you want to use OG tags you host elsewhere, leave these parameters empty and specify a **$desktop_url** control parameter when you create the link. Branch will perform a one-time scrape to populate the Deepview using the OG tags from the URL you specify.
{% endprotip %}

{% example title="When creating links dynamically" %}
If you're creating a link by appending query parameters, just append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

{% highlight javascript %}
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$og_title=MyApp%20is%20disrupting%20apps&$og_image_url=http%3A%2F%2Fmyapp.com%2Fimage.png"
{% endhighlight %}
{% endexample %}

{% example title="When using a mobile SDK" %}
When you create links via a mobile SDK, you simply need to set the OG tag parameters.

<!--- iOS -->
{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

// Add any additional custom OG tags here
[branchUniversalObject addMetadataKey:@"$og_video" value:@"http://mysite/video.mpg"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
// Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"

// Add any additional custom OG tags here
branchUniversalObject.addMetadataKey("$og_video", value: "http://mysite/video.mpg")
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}
<!--- /iOS -->

<!--- Android -->
{% if page.android %}
{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")

// Add any additional custom OG tags here
                .addContentMetadata("$og_video", "http://mysite/video.mpg");
{% endhighlight %}
{% endif %}
<!--- /Android -->

<!--- Codova -->
{% if page.cordova %}
{% highlight js %}
branch.link({
    channel: 'sms',
    feature: 'share',
    data: {
        "article_id": "1234",
        "$og_title": "MyApp is disrupting apps",
        "$og_image_url": "http://yoursite.com/pics/987666.png",
        "$og_description": "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out."
    }
}, function(err, link) {
    if (!err) {
        console.log("Ready to share my " + link);
    }
});
{% endhighlight %}
{% endif %}
<!--- /Cordova -->

<!--- Xamarin -->
{% if page.xamarin %}
{% highlight c# %}
var data = new Dictionary<string, object>(); 
data.Add("article_id", "1234");
data.Add("$og_title", "Hot off the presses!");
data.Add("$og_image_url", "http://yoursite.com/pics/987666.png");
data.Add("$og_description", "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out.");

Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "sms", "share");
{% endhighlight %}

After you've registered the class as a delegate of `IBranchUrlInterface`

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
{% endhighlight %}
{% endif %}
<!--- /Xamarin -->

<!--- Unity -->
{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> parameters = new Dictionary<string, object>
{
    { "article_id", "1234" },
    { "$og_title", "Hot off the presses!" },
    { "$og_image_url", "http://yoursite.com/pics/987666.png" },
    { "$og_description", "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out." }
}

string channel = "sms";
string feature = "share";
Branch.getShortURLWithTags(parameters, channel, feature, delegate(string url, string error) {
    // show the link to the user or share it immediately
});
{% endhighlight %}
{% endif %}
<!--- /Unity -->

<!--- Adobe -->
{% if page.adobe %}
{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
    "article_id": "1234",
    "$og_title": "Hot off the presses!",
    "$og_image_url": "http://yoursite.com/pics/987666.png",
    "$og_description": "Out of all the apps disrupting apps, MyApp is without a doubt a leader. Check us out."
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}
<!--- /Adobe -->

<!--- /Titanium -->
{% if page.titanium %}
{% highlight js %}
var branchUniversalObject = branch.createBranchUniversalObject({
  "canonicalIdentifier" : "content/12345",

// Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
  "title" : "My Content Title",
  "contentDescription" : "My Content Description",
  "contentImageUrl" : "https://example.com/mycontent-12345.png",

  "contentIndexingMode" : "public",
  "contentMetadata" : {
      "product_picture" : "12345",
      "user_id" : "6789"
  },
});
{% endhighlight %}
{% endif %}
<!--- /Titanium -->

{% endexample %}

{% example title="When creating Marketing links on the Branch dashboard" %}
You **cannot** specify `$og_title`, `$og_description` and `$og_image_url` in the _Deep Link Data (Advanced)_ section. Instead, you need to edit the Title, Description and Image URL in the _Social Media Description_ section immediately above it. 

{% image src='/img/pages/features/deepviews/deepviews_social_media_description.png' half center alt='Social Media Description' %}
{% endexample %}

## Enabling Deepviews for one link

If you don't want to enable Deepviews globally, you can do it for each platform on a per link basis by inserting custom link control parameters [link control parameters]({{base.url}}/getting-started/link-configuration).

- **$ios_deepview**: The name of the template to use for iOS. [default: `default_template`].
- **$android_deepview**: The name of the template to use for Android. [default: `default_template`].
- **$desktop_deepview**: The name of the template to use for the desktop. [default: `default_template`].

{% example title="When creating links dynamically" %}
If you're creating a link by appending query parameters, you simply need to append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

Here's how to enable iOS and desktop Deepviews:

{% highlight javascript %}
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$ios_deepview=default_template&$desktop_deepview=default_template"
{% endhighlight %}
{% endexample %}

{% example title="When using a mobile SDK" %}
Here's how to enable iOS and Android Deepviews on a link using a mobile SDK call:

<!--- iOS -->
{% if page.ios %}
{% tabs %}
{% tab objective-c %}
{% highlight objc %}
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$ios_deepview" withValue:@"default_template"];
[linkProperties addControlParam:@"$android_deepview" withValue:@"default_template"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let linkProperties: BranchLinkProperties = BranchLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$ios_deepview", withValue: "default_template")
linkProperties.addControlParam("$android_deepview", withValue: "default_template")
{% endhighlight %}
{% endtab %}
{% endtabs %}
{% endif %}
<!--- /iOS -->

<!--- Android -->
{% if page.android %}
{% highlight java %}
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$ios_deepview", "default_template")
               .addControlParameter("$android_deepview", "default_template");
{% endhighlight %}
{% endif %}
<!--- /Android -->

<!--- Cordova -->
{% if page.cordova %}
{% highlight js %}
branch.link({
    channel: 'sms',
    feature: 'share',
    data: {
		"$ios_deepview": "default_template",
		"$android_deepview": "default_template"
    }
}, function(err, link) {
	if (!err) {
    	console.log("Ready to share my " + link);
	}
});
{% endhighlight %}
{% endif %}
<!--- /Cordova -->

<!--- Xamarin -->
{% if page.xamarin %}
{% highlight c# %}
var data = new Dictionary<string, object>(); 
data.Add("$ios_deepview", "default_template");
data.Add("$android_deepview", "default_template");

Branch branch = Branch.GetInstance ();
await branch.GetShortUrlAsync(this, data, "facebook", "share");
{% endhighlight %}

After you've registered the class as a delegate of `IBranchUrlInterface`

{% highlight c# %}
#region IBranchUrlInterface implementation

public void ReceivedUrl (Uri uri)
{
    // Do something with the new link...
}
#endregion
{% endhighlight %}
{% endif %}
<!--- /Xamarin -->

<!--- Unity -->
{% if page.unity %}
{% highlight c# %}
Dictionary<string, object> parameters = new Dictionary<string, object>
{
	{ "$ios_deepview", "default_template" },
	{ "$android_deepview", "default_template" }
}

string channel = "facebook";
string feature = "share";
Branch.getShortURLWithTags(parameters, channel, feature, delegate(string url, string error) {
    // show the link to the user or share it immediately
});
{% endhighlight %}
{% endif %}
<!--- /Unity -->

<!--- Adobe -->
{% if page.adobe %}
{% highlight java %}
//be sure to add the event listeners:
branch.addEventListener(BranchEvent.GET_SHORT_URL_FAILED, getShortUrlFailed);
branch.addEventListener(BranchEvent.GET_SHORT_URL_SUCCESSED, getShortUrlSuccessed);

private function getShortUrlSuccessed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_SUCCESSED", "my short url is: " + bEvt.informations);
}

private function getShortUrlFailed(bEvt:BranchEvent):void {
    trace("BranchEvent.GET_SHORT_URL_FAILED", bEvt.informations);
}

var dataToInclude:Object = {
	"$ios_deepview": "default_template",
	"$android_deepview": "default_template"
};

branch.getShortUrl(tags, "sms", BranchConst.FEATURE_TAG_SHARE, JSON.stringify(dataToInclude));
{% endhighlight %}
{% endif %}
<!--- /Adobe -->

<!--- Titanium -->
{% if page.titanium %}
{% highlight js %}
branchUniversalObject.generateShortUrl({
  "feature" : "share",
  "channel" : "facebook"
}, {
  "$ios_deepview": "default_template",
  "$android_deepview": "default_template"
});

branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
{% endhighlight %}
{% endif %}
<!--- /Titanium -->

{% endexample %}

{% example title="When creating Marketing links on the Branch dashboard" %}

You can enable Deepviews for an individual link on the [Marketing dashboard](https://dashboard.branch.io/#/marketing) by inserting the keys and values into the Deep Link Data section.

| Key | Value |
| --- | --- |
| **$ios_deepview** | `default_template` |
| **$android_deepview** | `default_template` |

{% image src='/img/pages/features/deepviews/deepview_db_key.png' half center alt='Marketing link deepview keys' %}

{% endexample %}

## Disabling Deepviews for one link

If you've enabled Deepviews globally, it's likely that you'll want to disable them now and again for specific use cases. To do so, just follow the instructions for [_enabling Deepviews for one link_](#enabling-deepviews-for-one-link) and set one or more of the key values to `false`.

| Key | Value |
| --- | --- |
| **$ios_deepview** | `false` |
| **$android_deepview** | `false` |
| **$desktop_deepview** | `false` |

## Customizing the Deepview templates

You can create new Deepview templates using the [Deepviews configuration page](https://dashboard.branch.io/#/settings/deepviews) on the Branch dashboard, either by duplicating the default Branch Public Template, or by creating a new one from scratch. New Deepview templates are shared between all platforms (iOS, Android, and desktop), and cannot be deleted after creation.

{% image src='/img/pages/features/deepviews/deepview-create-template.png' quarter center alt='Deepviews tab' %}

The Deepview editing screen contains two tabs:

### Basic

The Basic tab displays your new template and provides two sections:

#### Deepview Settings

| Setting | Usage |
| --- | --- |
| Title | Internal name for your reference |
| Key | The value that you will reference when creating a link. E.g., `$ios_deepview: [key]` |

#### App Settings 
{% caution %}
These fields are duplicates of the _Social Media Display Customization_ section of your app's [main link settings page](https://dashboard.branch.io/#/settings/link). Any updates will be applied in both locations.
{% endcaution %}

  - OG Title
  - OG Description
  - OG Image Url

{% image src='/img/deepviews/deepviews_editor_basic.png' half center alt='Deepviews tab' %}

### Editor

The Editor tab allows you to edit the raw HTML and CSS for your template. The rendered template will update as you modify the markup.

{% protip title="Javascript is not allowed on deepview templates" %}
Before rendering the template, we sanitize the markup of Javascript for security reasons. This includes script tags and event attributes on tags.
{% endprotip %}

{% image src='/img/deepviews/deepviews_editor_code.png' half center alt='Deepviews tab' %}

### Using liquid tags in Deepview templates

By customizing your Deepview template, you have the ability to pass through other parameters from your link's [data dictionary]({{base.url}}/getting-started/link-configuration).

Here's a full list of liquid available tags:

#### {% raw %}{{app}}{% endraw %}
App Object, which contains app data. Possible keys are:

- `branch_key`
- `name`
- `og_title`
- `og_description`
- `og_image_url`

_These OG values are those set for your entire app (not each individual link), and are configured in Settings > Link Settings > Social Media Display Customization._

{% example %}
If you want to use your App Name (My Awesome App!) inside a Deepview, you would expose it like so: `<h1>Get {% raw %}{{app.name}}{% endraw %}</h1>`
{% endexample %}

####{% raw %}{{link_data}}{% endraw %}
Link Object, which contains all of your link's parameters, including your deeplink values.

{% example %}
If you want to expose a key value pair of 'welcome_message': 'Welcome to my App', you would do the following: `<h1>{% raw %}{{link_data.welcome_message}}{% endraw %}</h1>`, and this would render `Welcome to my App`.
{% endexample %}

#### {% raw %}{{action}}{% endraw %}
The URL of the Branch link itself. If you create a new call to action in your Deepview, use this.

{% example %}
Create a new call to action link: `<a href="{% raw %}{{action}}{% endraw %}">Click</a>`.
{% endexample %}

{% endif %}
