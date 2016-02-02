---
type: recipe
directory: getting-started
title: "Android App Links"
page_title: "Set up Android App Links with Branch"
description: "Learn how to enable Android App Links on with Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
hide_platform_selector: true
sections:
- overview
- guide
---

{% if page.overview %}

App Links route directly to your app when opened, bypassing the web browser and URL scheme combination typically used for the redirection process. App Links were introduced with Android M, and enabling them results in a more seamless experience for your users.

{% protip title="Looking for iOS support?" %}
App Links are only available on Android. [Universal Links]({{base.url}}/getting-started/universal-links) are the iOS equivalent.
{% endprotip %}

Branch makes it simple to enable App Links, and even improves on them since you also get all the other benefits of Branch links when the visitor does not yet have your app installed:

{% image src='/img/pages/getting-started/app-links/how_branch_improves.png' 2-thirds center alt='branch improves universal links' %}

{% elsif page.guide %}

{% ingredient quickstart-prerequisite %}{% endingredient %}

## Generate signing certificate fingerprint

Start by generating a SHA256 fingerprint of your app's signing certificate. This is the file that you use to build the debug and production version of your APK file before deploying it.

1. Navigate to your keystore file.
1. Run this command on it to generate the fingerprint: `keytool -list -v -keystore my-release-key.keystore`
1. You'll see a value like `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5` come out the other end. Copy this.

## Enable App Links on the Branch dashboard

1. Head to the [Link Settings page](https://dashboard.branch.io/#/settings/link) on the Branch dashboard.
1. Toggle the **Enable App Links** checkbox in the Android section.
1. Paste the copied fingerprint value into the **SHA256 Cert Fingerprints** field that appears. {% image src='/img/pages/getting-started/app-links/enable_app_links.png' 3-quarters center alt='enable app links' %}
1. Scroll down and click `Save`.
 
{% protip title="Using multiple fingerprints" %}
You can insert both your debug and production fingerprints for testing. Simply separate them with a comma.
{% endprotip %}

## Add Intent Filter to Manifest

1. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from (and likely the same one you selected in the [SDK Integration Guide]({{base.url}}/getting-started/sdk-integration-guide)).
1. Inside your `AndroidManifest.xml`, locate where the selected `Activity` is defined.
1. Within the `Activity` definition, insert the intent filter provided below.
   - Replace `READ_FROM_DASHBOARD` with the value provided underneath the **SHA256 Cert Fingerprints** field on the Branch dashboard. It will look something like this: `android:pathPrefix="/WSuf`

{% highlight xml %}
<!-- AppLink example -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="/your_app_id_obtained form Branch dash board " /> -->
    <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="READ_FROM_DASHBOARD" /> <!-- Live App link-->
</intent-filter>
{% endhighlight %}

## Test your App Links implementation

After completing this guide and installing a new build of your app on your testing device, you can verify App Links are working correctly by following these steps:

1. [Create a new Marketing Link](https://dashboard.branch.io/#/marketing/new) on the Branch dashboard. Leave all configuration items at their default options.
1. Open this link on your testing device.
1. If successful, your app should launch immediately without routing through the web browser or showing an **Open With...** dialog.


{% endif %}