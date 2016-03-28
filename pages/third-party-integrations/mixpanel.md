---
type: recipe
directory: third-party-integrations
title: "Mixpanel"
page_title: Sync Branch data with Mixpanel
description: Learn how to synchronize your Branch data with Mixpanel, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
platforms:
- ios
- android
sections:
- overview
- guide
- advanced
contents: list
---

{% if page.overview %}

Whether you simply leverage Mixpanel to track in-app events, or have a more complex implementation such as segmenting users from Branch installs to calculate LTV, we can support you. The two methods available are:

1. Branch SDK callbacks to to Mixpanel (simpler integration, but provides less flexibility).
1. Templated Webhooks to deliver data to your backend, which can then send that data to Mixpanel (advanced integration, but provides a bit more flexibility).

{% getstarted title="Get started with Mixpanel integration" %}{% endgetstarted %}

{% elsif page.guide %}

## Track through SDK

{% prerequisite %}

- This guide requires you to have already [integrated the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- You also need to [install the Mixpanel SDK](https://mixpanel.com/help/reference/).
- Know which methods inside your app will be sending event data to Mixpanel.

{% endprerequisite %}

The easiest way to send event data that comes in from Branch is to invoke the Mixpanel event tracking function inside any Branch callback.

In this example, we'll take an instance of an install through a Branch link. You can determine if an install (or referred session if a user already had the app) occurred through Branch by examining the `referred` parameter.

{% if page.ios %}

{% highlight objc %}
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
    if (!error) {
        if ([params[BRANCH_INIT_KEY_CLICKED_BRANCH_LINK] boolValue]) {
           // Add call here to let MP know a Branch-driven install occurred
           [[Mixpanel sharedInstance] track:@"install" properties:params];
        }
    }
}];
{% endhighlight %}

{% endif %}

{% if page.android %}

{% highlight java %}
String projectToken = YOUR-PROJECT-TOKEN // given via Mixpanel.

Branch.getInstance().initSession(new BranchReferralInitListener(){
    @Override
    public void onInitFinished(JSONObject referringParams, Branch.BranchError error) {
        if (error == null) {
            MixpanelAPI mp = MixpanelAPI.getInstance(getContext(), projectToken);
            if (params.optBoolean("+clicked_branch_link")) {
                mp.track("install", referringParams);
            }
        }
    }
{% endhighlight %}

{% endif %}

Mixpanel then receives the Branch install event, and you know Branch is responsible because `referred` would equal `true` inside the `properties` argument.

{% example title="Identity and customer segments/profiles" %}

Let's say you want to take it a step further and track Branch-specific installs and users inside your Mixpanel segments. The way to leverage that would be with the following:

- After a successfully initiating Branch session, [set an identity]({{base.url}}/getting-started/setting-identities).
- [Set an identity in Mixpanel](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify-java.lang.String-).
- Track events.

Since you set identity depending on your user authentication flow, we'd recommend taking care of that first. When that's done, all you need to do is the following:

{% if page.ios %}

{% highlight objc %}
[[Branch getInstance] userCompletedAction:@"purchase" withState:@{@"item":@"123-AB-456"}];
[[Mixpanel sharedInstance] track:@"purchase" properties:@{@"item":@"123-AB-456"}];
{% endhighlight %}

{% endif %}

{% if page.android %}

{% highlight java %}
JSONObject data = new JSONObject();
data.put("item", "123-AB-456");

Branch.getInstance().userCompletedAction("purchase", data);
Mixpanel.getInstance().track("purchase", data);
{% endhighlight %}

{% endif %}

{% endexample %}

{% elsif page.advanced %}

## Track through Webhooks

{% prerequisite %}

- A server that accepts GET or POST commands
- Mixpanel back-end SDK configured to upload data to Mixpanel account

{% endprerequisite %}

In this methodology, you will need to configure the GET or POST with our webhooks. You will specify what parameter is passed through to your server in addition to the data we provide, which is found below: 

{% highlight js %}
{
   "event": "open",
   "metadata": {
      "ip": "73.222.120.96",
      "referred": false
   },
   "session_referring_link_data": {
      "app_id": "98444119008870744",
      "tag": null,
      "campaign": null,
      "channel": null,
      "feature": "marketing",
      "stage": null,
      "tags": null,
   "data": {
      "$marketing_title": "Testing Mixpanel K/V",
      "extra_data": "1234"
   },
      "state": null,
      "alias": null,
      "date": "2015-04-27T18:25:36.402Z",
      "href": "/l/4ix6DwE_4U",
      "branch_id": "121303087695532448"
   },
   "os": "Android",
   "os_version": "19"
}
{% endhighlight %}

This is the base body that we send over, but you will use `[[Branch getInstance] trackEvent:”@exciting_event” withState:state]]` to attach any state variables you need (state being a JSON Dictionary).

{% endif %}