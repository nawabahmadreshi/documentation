---
type: recipe
directory: features
title: "Referral Programs"
ios_page_title: App Invites & Referral Links for iOS Apps
android_page_title: App Invites & Referral Links for Android
ios_description: How to set up App Invites, Referral Links and Reward Schemes for iOS apps using deep links. With objective-c and swift code snippets.
android_description: How to set up App Invites, Referral Links and Reward Schemes for Android apps using deep links. With Java code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Referral Links, App Invites, Reward Schemes, Promotion codes, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Referral Links, App Invites, Reward Schemes, Promotion codes, Android
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
- support
---

{% ingredient quickstart_preview/quickstart_preview %}{% endingredient %}

For a referral system, Branch provides:

- User attribution through a tracking, download URL.
- Custom rewarding rules tied to events (install, signup, purchase, etc) in app.
- User reward tracking/storage
- Credit transaction history

## Generating Links

{% ingredient sdk_links/creating_links %}
  {% override explanation %}
  You can attach information about the user who is sharing the link. Then this information about this user--here "John" with id "1234"--is present anytime John's friends install the app after clicking his link.
  {% endoverride %}

  {% override params %}{% if page.ios %}@{@"referringUsername":@"John", @"referringUserId":@"1234"}{% endif %}{% if page.android %}JSONObject obj = new JSONObject();
obj.put("referringUserName", "John");
obj.put("referringUserId", "1234"));{% endif %}{% endoverride %}
{% endingredient %}

{% ingredient sdk_links/sharing_teaser %}{% endingredient %}
<!--- /Generating Links-->

## Tracking Events

{% ingredient events/standard_events %}{% endingredient %}
{% ingredient events/custom_events %}{% endingredient %}

## Rewards
{% ingredient rewards/overview %}
	{% override header %}{% endoverride %}
{% endingredient %}
{% ingredient rewards/reward_rule_basics %}
	{% override header %}### Rewarding Users{% endoverride %}
	{% override more %}{% endoverride %}
{% endingredient %}
{% ingredient rewards/reward_example %}{% endingredient %}
{% ingredient rewards/testing_rewards_protip %}{% endingredient %}

{% ingredient rewards/get_credits %}{% override different_bucket %}{% endoverride %}{% endingredient %}
{% ingredient rewards/redeem_credits %}{% override different_bucket %}{% endoverride %}{% endingredient %}
{% ingredient rewards/redeem_flow %}{% endingredient %}
<!--- /Incentives: Tracking and Rewarding-->


{% ingredient rewards/fraud_protection %}{% endingredient %}


## Conclusion: So Much More

This guide covered the basics. The following may be of interest to you, if you want to:

{% ingredient recipe_preview/advanced_referral_incentives %}{% endingredient %}
{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}
{% ingredient recipe_preview/influencers %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{% endingredient %}
