---
type: recipe
title: "Mixpanel"
ios_page_title: Sync Branch iOS data with Mixpanel
android_page_title: Sync Branch Android data with Mixpanel
ios_description: Learn how to synchronize your Branch iOS data with Mixpanel, for example to track in-app events, segment users from Branch installs and calculate LTV.
android_description: Learn how to synchronize your Branch Android data with Mixpanel, for example to track in-app events, segment users from Branch installs and calculate LTV.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Mixpanel, user segmentation, life time value, LTV
platforms:
- ios
- android
---

{% protip title="Do I need both SDKs integrated?" %}
Yes, in order to have synchronization between Branch and Mixpanel, you need both SDKs integrated. In order to integrate Branch, follow [these instructions](/recipes/quickstart_guide/ios). In order to integrate Mixpanel, follow these [instructions](https://mixpanel.com/help/reference/ios).{% endprotip %}

## Getting Started

In case you leverage Mixpanel to track in-app events, or want to segment users from Branch installs and calculate LTV, or any other unique use case, we can support you through a couple of methodologies.

We have two methods to synchronize data between services. The first is using Branch callbacks to make a call to Mixpanel. This is under methodology 1, Track Through SDK. The second is using Templated Webhooks to deliver data to your backend, which can then send that data to Mixpanel. This is under methodology 2, Track Through Webhooks.

Methodology 1 is a simpler integration, but provides less flexibility. Methodology 2 is an advanced integration, but provides a bit more flexibility.

## Track Through SDK

	Pre-Reqs:
    Successful integration of both the Mixpanel and Branch SDKs
    Methods mapped out inside apps that want to event data sent to Mixpanel

The easiest way to send event data that comes in from Branch is to invoke the Mixpanel event tracking function inside any Branch callback.

In this example, we'll take an instance of an install responsible by Branch. We let you know if an install (or referred session if a user already had the app) was caused by Branch, by examining the `referred` parameter.

{% if page.ios %}

    [branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
        if (!error) {
            if ([params[BRANCH_INIT_KEY_CLICKED_BRANCH_LINK] boolValue]) {
            	// Add call here to let MP know a Branch-driven install occurred
            	[[Mixpanel sharedInstance] track:@"install" properties:params];
            }
        }
	}];

{% endif %}

{% if page.android %}

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

{% endif %}

Mixpanel would then receive the Branch install event, and you would know Branch is responsible because `referred` would equal `true` inside the `properties` argument.

### Identity And Customer Segments / Profiles

Let's say you want to take it a step further and track Branch specific installs and users inside your segments for Mixpanel. We have support for that as well. The way to leverage that would be with the following:

- After a successful Branch session, set an [identity](https://dev.branch.io/recipes/quickstart_guide/ios/#identifying-your-users).
- Set an identity in [Mixpanel](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.html#identify-java.lang.String-)
- Track events.

Since you set identity depending on your user authentication flow, we'd recommend taking care of that first. When that's done, all you need to do is the following:

{% if page.ios %}

    [[Branch getInstance] userCompletedAction:@"purchase" withState:@{@"item":@"123-AB-456"}];
    [[Mixpanel sharedInstance] track:@"purchase" properties:@{@"item":@"123-AB-456"}];

{% endif %}

{% if page.android %}

    JSONObject data = new JSONObject();
    data.put("item", "123-AB-456");

	Branch.getInstance().userCompletedAction(“purchase”, data);
	Mixpanel.getInstance().track("purchase", data);

{% endif %}


## Track Through Webhooks
	
	Pre-Reqs:
    A server that accepts GET or POST commands
    Mixpanel back-end SDK configured to upload data to Mixpanel account

In this methodology, you will need to configure the GET or POST with our webhooks. You will specify what parameter is passed through to your server in addition to the data we provide, which is found below: 

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

This is the base body that we send over, but you will use [[Branch getInstance] trackEvent:”@exciting_event” withState:state]] to attach any state variables you need (state being a JSON Dictionary).
