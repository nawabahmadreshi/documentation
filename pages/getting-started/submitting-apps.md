---
type: recipe
directory: getting-started
title: Submitting apps
ios_page_title: How to submit apps to the iOS App Store
android_page_title: Submitting Android apps to the Play Store
ios_description: How to submit your new iOS app to the App Store and how to inform Apple about the Advertising Identifier (IDFA) if you use AdSupport.framework.
android_description: How to submit your new Android app to the Google Play Store and how to collect the Google Advertising ID for advertising or tracking purposes.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, submit app, app submission, App Store, iOS App Store, IDFA, Advertising Identifier
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,submit app, app submission, App Store, Play Store, Android, Google Advertising ID
platforms:
- ios
- android
sections:
- guide
---

{% if page.ios %}

## Submitting to the App Store

After integrating the Branch SDK, you need to let Apple know that you use the IDFA. To follow proper protocol when submitting your next release to the App Store, you should:

1. Answer `Yes` to the question **Does this app use the Advertising Identifier (IDFA)?**
1. Check the two boxes for:
   - **Attribute this app installation to a previously served advertisement** 
   - **Attribute an action taken within this app to a previously served advertisement**

{% image src='/img/pages/getting-started/submitting-apps/idfa.png' center 3-quarters alt='IDFA configuration on iTunes Connect' %}

{% protip title="Why does Branch use the IDFA?" %}
Branch uses the IDFA to identify users across our entire partner network, greatly increasing match accuracy rate. You can read more about this on the [Matching accuracy page]({{base.url}}/getting-started/matching-accuracy).

The only situation in which you do not need to perform these steps is if you installed the Branch framework manually (without using CocoaPods) and elected **not** to import `AdSupport.framework`
{% endprotip %}

{% endif %}

{% if page.android %}

## Submitting to the Play Store

By default, Branch collects and uses the [Android ID](http://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID). No additional steps are required when submitting your app to the Play Store.

{% protip title="Using the Google Advertising ID instead" %}
If you'd like Branch to collect the [Google Advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en) for advertising or tracking purposes, you must add Google Play Services to your app prior to release. After you complete these steps, Branch will handle the rest!

1. Add `compile 'com.google.android.gms:play-services:7.5.0'` to the dependencies section of your `build.gradle` file.
1. Add the following line in your ProGuard settings:

{% highlight xml %}
-keep class com.google.android.gms.ads.identifier.** { *; }
{% endhighlight %}
{% endprotip %}

{% endif %}

