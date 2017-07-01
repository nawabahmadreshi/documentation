---
type: recipe
directory: marketing-channels
title: "Universal App Campaigns"
page_title: "Advertising with Deep Links: Google Ads - Universal App Campaigns"
description:
hide_platform_selector: true
sections:
- overview
- guide
- support
contents:
  number:
  - guide
alias: [ /features/google-ads/google-uac/overview/, /features/google-ads/google-uac/guide/, /features/google-ads/google-uac/support/ ]
---

{% if page.overview %}
If you're running Google's new Universal App Campaign, Branch links can be placed inside your ads. This allows you to track ad-driven installs across Android and iOS on the Branch dashboard and deep link those new users directly to content the first time they open your app.

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Universal App Campaign | Mobile App Install | App Only: Install

{% ingredient link-to-google-ads-overview %}{% endingredient %}

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

Universal App Campaigns don’t use traditional ads and ad groups. Instead different types of ad units are automatically created by Google using information given at the campaign level. There are no destination URLs, you will just use your Apple App Store or Google Play Store Applications.

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## Enable Google as an Ad Partner

{% ingredient enable-google-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select **App Install/Engagement**
{% image src='/img/pages/features/google-ads/create-link-install-engagement.png' 3-quarters center alt='Link Creation' %}
1. Under the Define Section, pick a **Link Name** for later reference
1. Configure the link with the Ad Format set to **Display**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Universal App Campaign iOS/Android** while leaving the Campaign field blank
{% image src='/img/pages/features/google-ads/google-uac/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Tags Section and Analytics Tags sub section additional tags can be set. `Channel` and `Campaign` are optional but recommended, while `Tags` is free form
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## One time setup: Google Adwords <> Branch Postback

The following steps will add a Branch postback to your Adwords account, allowing Branch to check with Google every time we see an install of your app. You'll only need to do this once per mobile platform (iOS/Android)!

**1)** Go to your [Adwords dashboard](https://adwords.google.com/cm/CampaignMgmt){:target="_blank"}.

**2)** In the top nav bar, click into `Tools` > `Conversions`.

**3)** Click `+ Add a Conversion` button.

**4)** Select `App` from the cards.

**5)** Select `First opens and in-app actions`.

**6)** Select the appropriate platform (iOS or Android).

**7)** Select `App installs (first-open)`.

**8)** Now fill out the conversion action page:

- Give it a name like `Branch Android/iOS Conversion`
- Under `Value` assign a value (or select “Don’t assign a value to this install”)
- Under `Mobile app` input your application details
- In the `Postback URL` section, copy and paste the Branch Ad link generated in the last section.

{% image src="/img/pages/features/google-ads/google-uac/full-branch-link.png" half center alt='Example Adwords Config' %}

{% image src="/img/pages/features/google-ads/google-uac/postback-setup.png" half center alt='Example Adwords Config' %}

**9)** Click `Save and continue`.

**10)** Select the option to have a server report conversions: `Set up a server-to-server conversion feed...`.

**11)** Note your `Conversion ID` & `Conversion label` as shown in the screenshot below.{% image src="/img/pages/features/google-ads/google-uac/adwords-conversions.png" half center alt='Conversion IDs' %}

**12)** Head to the [Branch dashboard link settings](https://dashboard.branch.io/settings/link){:target="_blank"} and scroll to `Google Ads Conversions`.

**13)** Paste in the `Conversion ID` and `Conversion label` from your Adwords dashboard.

**14)** Scroll down and `Save` your Branch link settings.

**15)** Click `Done` in your Adwords dasbhoard.

If you're running a Universal App Campaign for both iOS and Android, all four fields under your Branch Link Settings should be populated, even if you have the same conversion ID and Label for iOS and Android. If you want to stop running Universal App Campaign reporting for a platform, just remove the two fields for that platform.

{% image src='/img/pages/features/google-ads/google-uac/conversions-branch.png' full center alt='Branch Settings For Conversions' %}

You're all set with this one time setup. Note that you will be modifying the postback URL occasionally in this conversion, but we'll get to that later.

You're all good to go! Just create your Universal App Campaign and you'll see the data start to populate in your Branch dashboard.

## View your data using the Branch dashboard

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## Debugging Common Discrepancies Between Branch and Google Counts

While we should always expect around a 5% discrepancy due to time zone differents and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

### Issue with iOS 10 and Limit Ad Tracking

In iOS 10, Apple broke the ability for app developers to collect the `IDFA` if the user had enabled `Limit Ad Tracking`. In this case, Branch and Google cannot compare notes to see who drove the install. This will account for about 15% discrepancy in counts across both platforms, where Branch's tracked installs will be lower.

### Not Collecting Advertising ID

If you see absolutely 0 data coming through from your integration, it's possible that you're not collecting Google Advertising ID (GAID) on Android or IDFA on iOS.

- iOS: Add the AdSupport.framework and read this extra info about [submitting](https://dev.branch.io/getting-started/sdk-integration-guide/guide/ios/#submitting-to-the-app-store) to the store.
- Android: Add Google Play Services so that we can collect GAID. See [here](https://dev.branch.io/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id).

### Installs Counted as Opens on Branch

One discrepancy root cause we've seen before is the scenario where Branch will classify an install as an 'open'. We remember the history of a particular user via their IDFA (in addition to using a few other methods) and will detect whether the user is actually a new user or a returning user who had previously unistalled your app. Facebook doesn't do this.

We've seen Google classify 're-installs' as fresh installs, where Branch will correctly classify them as 're-opens'. If you're comparing the raw install numbers on Branch, and ignoring the 're-opens', it's possibe you'll see a discrepancy. To check sum up the 'installs' and 'reopens' for the given link and compare it to Google's total installs.

{% image src='/img/pages/features/facebook-ads/installs_plus_opens.png' 2-thirds center alt='installs and opens' %}

If it's close, you know that this is the root cause.

### Fewer Clicks Recorded in Branch

The number of clicks on a link used inside of a Branch enabled Facebook Ad will be lower in Branch's dashboard than Google's. This is because Google routes users straight to the App/Play Store without letting Branch know that a link was clicked. If the user decides not to install the app/drops off at the App/Play Store, then Google will have recorded one more click than Branch. Branch does not increment the link's click count until the user enters into the app. This is why you'll see more clicks in Google's dashboard.


{% endif %}
