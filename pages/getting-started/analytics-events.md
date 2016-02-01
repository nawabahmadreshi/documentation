---
type: recipe
directory: getting-started
title: "Analytics event tracking"
page_title: Using events to track analytics with Branch
description: The Branch dashboard shows you all the analytics for your deeplinks. Track install attribution, measure marketing channels and ad campaigns.
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

The [Branch Dashboard](https://dashboard.branch.io) is a powerful tool for measuring growth and engagement in your app. This page covers Branch configuration options that you can use to organize and improve the quality of your analytics data. 

{% image src='/img/pages/getting-started/analytics-events/dashboard_summary.png' 3-quarters center alt='Branch dashboard' %}

## Organize your links with labels

Branch offers many ways to [create links]({{base.url}}/getting-started/link-creation). If your organization has many people creating links in different ways, it's important to label everything appropriately. Here are the main filtering options available on the Branch dashboard: 

| **Label** | **Usage**
| ---: | ---
| **channel** | Use channel to tag the _route_ that your link reaches users. For example, tag links with ‘Facebook’ or ‘LinkedIn’ to help track clicks and installs through those paths separately.
| **feature** | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature ‘referral’.
| **campaign** | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that.
| **stage** | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
| **tags** | This is a free form entry with unlimited values. Use it to organize your link data with labels that don't fit within the bounds of the above.

{% protip %}
You can read about how to specify these keys on the [Link Creation]({{base.url}}/getting-started/link-creation) page.
{% endprotip %}

## Automatic analytics events

Branch _automatically_ creates events whenever a user accesses your site or your app. We measure installs, opens and web page visits with separate events. Here is a list of the auto-created ones:

| **Event** | **Description**
| `install` | Triggered the first time a user launches your app
| `open` | Trigged when the user opens the app after the very first launch OR if a user reinstalls the app after uninstalling it
| `web session start` | Triggered when the user views a webpage using the Branch Web SDK.
| `referred session` | Triggered _in addition_ to install, open or web session start if a user comes from a Branch link

{% protip title="Receiving Postbacks" %}
You can be notified via a postback to your server every time that an event occurs. Visit the [Webhooks](/getting-started/webhooks/) page for more information on configuring postbacks.
{% endprotip %}

## Custom analytics events

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
