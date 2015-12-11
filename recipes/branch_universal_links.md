---
type: recipe
title: "Universal/App Links"
page_title: How To Setup iOS9 or Android Universal App Links With Branch
description: "Learn how to enable iOS9 Universal Links on your Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- android
---

{% image src='/img/recipes/universal_links/how_branch_improves.png' 3-quarters center alt='branch improves ulinks' %}

{% if page.android %}
App Links allow users visiting your website to route straight to your app if they have the app installed instead of first opening up the browser when a link is clicked. With Branch, you can enable Android App Links without all of the complicated server hosting. You simply need to add the correct intent strings.

-----

## Prerequisites for using Android App Links

- Setup your Branch account and link routing for your app at [start.branch.io](https://start.branch.io). 
- [optional] Configure deep linking {% if page.ios || page.android %}[with our simple guide](/recipes/easy_deep_linking/{{page.platform}}/){% else %}[with our simple guide](/recipes/easy_deep_linking/ios/){% endif %}.

## Enable App Links on Dashboard

Simply head to the [Branch dashboard's link settings page](https://dashboard.branch.io/#/settings/link) and toggle the App Links checkbox in the Android section.

{% image src='/img/recipes/universal_links/enable_app_links.png' quarter center alt='enable app links' %}

After that, you'll need to generate a SHA256 fingerprint of your app's signing certificate. This is the file that you use to build the debug and production version of your APK file before deploying it. Navigate to the keystore file and run this command on it to generate the fingerprint.

`keytool -list -v -keystore my-release-key.keystore`

You'll see a value like `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5` come out the other end. Paste this into the Branch dashboard in the field that appeared after you enabled App Links. You can insert your debug and production fingerprints for testing.

## Add Intent Filter to Manifest

In order to receive the App Links intent so that the Branch SDK can retrieve the deep link data associated with the link, please add the below intent filter to your app's manifest file. Put this between the `activity` tags for the corresponding Activity that you want to open on click.

{% highlight xml %}
<!-- AppLink example -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="/your_app_id_obtained form Branch dash board " /> -->
    <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="READ_FROM_DASHBOARD" /> <!-- Live App link-->
    <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="READ_FROM_DASHBOARD" /> <!-- Test App link-->
</intent-filter>
{% endhighlight %}
{% endif %}

{% if page.ios %}
Universal Links allow users visiting your website to route straight to your app if they have the app installed instead of first opening up Safari when a link is clicked. With Branch, you can enable Universal Links without all of the complicated server hosting and JSON signing. You simply need to add an entitlement to your app project.

-----

## Prerequisites for using Universal Links

- Setup your Branch account and link routing for your app at [start.branch.io](https://start.branch.io).
- You must have created your account at developer.apple.com and enabled Associated Domains. You can see [how to do this below](/recipes/branch_universal_links/#configure-developerapplecom). 
- [optional] Configure deep linking {% if page.ios || page.android %}[with our simple guide](/recipes/easy_deep_linking/{{page.platform}}/){% else %}[with our simple guide](/recipes/easy_deep_linking/ios/){% endif %}.

-----

## Configure developer.apple.com

In order to enable your app for Universal Links, you'll need to register your bundle ID for an official App ID and request the `Associated Domains` entitlement. 

If you have done this already, please click [here](/recipes/branch_universal_links/#add-the-entitlement-in-xcode) to skip to the next section.

### Register your app on developer.apple.com

First, head to developer.apple.com and login. Then click on `Certificate, Identifiers & Profiles`, and then click on `Identifiers`. 

{% image src='/img/recipes/universal_links/background_certificates.png' half center alt='apple certificates' %}

If you don’t have a registered _App Identifier_ already, you’ll need to create one by clicking the **+** sign. If you do have one, skip ahead to the next section.

You need to fill out 2 fields here: **name** and **bundle ID**. For name, you enter whatever you want. For bundle ID, you’ll fill in the value of the bundle identifer.

{% image src='/img/recipes/universal_links/background_bundle.png' half center alt='bundle identifier' %}

You can retrieve this by looking at the `General` tab of your Xcode project for the proper build target.

{% image src='/img/recipes/universal_links/background_bundle_xcode.png' half center alt='bundle identifier xcode' %}

### Enable Associated Domains for your app on developer.apple.com

For your pre-existing or work-in-progress _App Identifier_, scroll down to the last section and check the `Associated Domains` services.

{% image src='/img/recipes/universal_links/background_ass_domains.png' half center alt='bundle ass domains' %}

Scroll down and click `Save`.

-----

## Add the entitlement in Xcode

Configuring your app for Branch's Universal Links is very simple. At a high level, you just need to go in and add in the selected `Associated Domains` to your Xcode project.

### Step 1. Enable Associated Domains in Xcode

First, double check that provisioning profiles in your app belong to the same team that you are going to use throughout the Universal Link configuration process with Branch. Using provisioning profiles from a different team will cause Universal Links to fail and fall back to normal Branch links. Then go to the `Capabilities` tab of your project file.

Scroll down and enable `Associated Domains` so that the accordion expands.

{% image src='/img/recipes/universal_links/enable_ass_domains.png' half center alt='xcode ass domains' %}

If you see an error like this, make sure:

- that you have the right team selected
- your Bundle Identifier of your Xcode project matches the one used to register the App Identifier

### Step 2: Add in your Branch link domains

In the `Domains` section, add the appropriate domain tags for `bnc.lt` as well as your `white label domain` if you use one. You must prefix it with `applinks:`.

#### Non white label domains

If you're just using `bnc.lt` for all of your Branch links, you only need to add a single domain:

- `applinks:bnc.lt`

#### White label domains

##### Support TLS with your DNS
**If you have a white label domain, follow [the instructions below](/recipes/branch_universal_links/ios/#advanced-support-ssltls-with-your-dns) to ensure that it is configured for Universal Links.**

For this example, we've whitelabeled our Branch links with `link.customapp.com`, so we need to add two domains:

- `applinks:bnc.lt`
- `applinks:link.customapp.com`

{% image src='/img/recipes/universal_links/add_domains.png' half center alt='xcode add domains' %}

### Step 3: Make sure entitlements file is included

Lastly, for some reason, Xcode 7 did not include my entitlements file in my build after I added it. In the project browser, verify that your new entitlements file is selected for membership to the right targets so that it’s built.

-----

## Integrate code snippet with AppDelegate

Integrate the following code snippet with **AppDelegate.m** or **AppDelegate.swift**

{% ingredient sdk_setup/ios9_restoration_handler %}{% endingredient %}

-----

## Enable Universal Links on the Branch dashboard

For the final and easiest part of the configuration process:

1. Navigate to [Link Settings](https://dashboard.branch.io/#/settings/link) in Dashboard.
2. Enable Universal Links from iOS redirects.
3. Type in your App's Bundle Identifier.
4. Type in your Apple Team ID (found from Organization Profile > Account Summary on Apple's Developer Portal).
5. Scroll down and click on the Save button.

This is what our Universal Link settings look like after going through steps 1 - 5:

{% image src='/img/recipes/universal_links/dashboard_enable_universal_links.png' half center alt='xcode add domains' %}


With your [Apple Developer Account](/recipes/branch_universal_links/#configure-developerapplecom), [Xcode project](/recipes/branch_universal_links/#add-the-entitlement-in-xcode) and [Branch dashboard](/recipes/branch_universal_links/#enable-universal-links-on-the-branch-dashboard) configured correctly, we will start using Universal Links for all non-aliased links. Then as soon as your users upgrade to iOS9, they will benefit from Universal Links.

Note that Universal Links are of the form https://bnc.lt/<<four-letter-identifier>>/<<link-hash>> or https://your-domain.com/<<four-letter-identifier>>/<<link-hash>>. Existing links of the form https://bnc.lt/m/<<link-hash>> or https://bnc.lt/l/<<link-hash>> will continue to function normally as non-Universal Links.

{% ingredient dashboard_setup/cloudflare_tls_setup %}{% endingredient %}

-----

## Troubleshooting Universal Links

1. **Is it definitely a Universal Link?** Universal Links are in the form https://bnc.lt/abcd/[link_id]. If there is a four letter code between two slashes, then it's a Universal Link. If it isn't a Universal Link, follow the above instructions to enable Universal Links, and double check that your Branch Dashboard Settings > Link Settings for iOS have "Enable Universal Links" checked. 
2. **Are you testing by manually entering into Safari?** Universal Links don't work properly when entered into Safari. Use Notes or iMessage for testing.
3. **Are your applinks entitlements correct?** [Check XCode](/recipes/branch_universal_links/ios/#add-the-entitlement-in-xcode) for the correct setup.
4. **Do your Team ID & Bundle ID match those on your dashboard?** You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to "Enable Universal Links." They should match your Team ID and Bundle ID. Team ID can be found here [https://developer.apple.com/membercenter/index.action#accountSummary](https://developer.apple.com/membercenter/index.action#accountSummary). Your Bundle ID is found in Xcode, in the `General` tab for the correct build target.
5. **Using a custom domain?** There are known issues with HTTPS traffic and whitelabeled domains. You can try and [resolve them here](/recipes/branch_universal_links/ios/#advanced-support-ssltls-with-your-dns)) or wait until December 17th when we should have a fix. In the meantime, leave Universal Links off, and your Branch links will simply fall back to the App Store for devices on iOS 9.2.

{% endif %}

-----

## What's next?

You've got the basics, but let's take your integration to the next level:

{% ingredient recipe_preview/easy_deep_linking %}{% endingredient %}
{% ingredient recipe_preview/content_sharing %}{% endingredient %}
{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}
{% ingredient recipe_preview/referral_links_with_incentives %}{% endingredient %}

-----
{% ingredient recipe_preview/contact_us %}{%endingredient%}