---
type: recipe
directory: marketing-channels
title: "Universal App Campaigns"
page_title: "Advertising with Deep Links: Google Ads - Universal App Campaign"
description: 
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/google-uac/overview/, /features/google-uac/overview/, /features/google-uac/guide/, /features/google-uac/support/ ]
---

{% if page.overview %}
If you're running Google's new Universal App Campaign, Branch links can be placed inside your ads. This allows you to track ad-driven installs across Android and iOS on the Branch dashboard and deep link those new users directly to content the first time they open your app.

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

Universal App Campaigns don’t use traditional ads and ad groups. Instead different types of ad units are automatically created by Google using information given at the campaign level. There are no destination URLs, you will just use your App Store or Play Store ID. 

{% prerequisite %}
- To track installs from Google Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

## One time setup: Google Adwords <> Branch postback

The following steps will add a Branch postback to your Adwords account, allowing Branch to check with Google every time we see an install of your app. You'll only need to do this once per mobile platform!

**1)** Go to your [Adwords dashboard](https://adwords.google.com/cm/CampaignMgmt){:target="_blank"}.

**2)** In the top nav bar, click into `Tools` > `Conversions`.

**3)** Click `+ Add a Conversion` button.

**4)** Select `App` from the cards. 

**5)** Select `First opens and in-app actions`.

**6)** Select the appropriate platform (iOS or Android).

**7)** Select `App installs (first-open)`.

**8)** Now fill out the conversion action page:

- Give it a name like `Branch Android Conversion`
- Under `Value` assign a value (or select “Don’t assign a value to this install”)
- Under `Mobile app` input your application details
- In the `Postback URL` section, input the following link for Android:{% highlight sh %}http://branch.io?adid={adid}&lat={lat}&click_url={click_url}{% endhighlight %}and the following link for iOS:{% highlight sh %}http://branch.io?idfa={md5_advertising_id}&lat={lat}&click_url={click_url}{% endhighlight %}

**9)** Click `Save and continue`.

**10)** Select the option to have a server report conversions: `Set up a server-to-server conversion feed...`.

**11)** Note your `Conversion ID` & `Conversion label` as shown in the screenshot below.{% image src="/img/pages/features/google-uac/adwords-conversions.png" half center alt='Conversion IDs' %}

**12)** Head to the [Branch dashboard link settings](https://dashboard.branch.io/settings/link){:target="_blank"} and scroll to `Google Ads Conversions`.

**13)** Paste in the `Conversion ID` and `Conversion label` from your Adwords dashboard.

**14)** Scroll down and `Save` your Branch link settings.

**15)** Click `Done` in your Adwords dasbhoard.

If you're running a Universal App Campaign for both iOS and Android, all four fields under your Branch Link Settings should be populated, even if you have the same conversion ID and Label for iOS and Android. If you want to stop running Universal App Campaign reporting for a platform, just remove the two fields for that platform.

{% image src='/img/pages/features/google-uac/conversions-branch.png' full center alt='Branch Settings For Conversions' %}

You're all set with this one time setup. Note that you will be modifying the postback URL occasionally in this conversion, but we'll get to that later.

## Create a Quick Link on the Branch dashboard

1. Visit the [Marketing page](https://dashboard.branch.io/#/marketing) on the Branch dashboard and click **+ Add link**.
1. Pick a **Marketing Title** for later reference. For example: "Ad for blue sneakers" {% image src='/img/pages/features/google-search-ads/ad_example_create.png' 3-quarters center alt='Create Quick Link' %}
1. **Channel** and **Campaign** are optional but recommended. **Tags** is free form.

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a `$deeplink_path` or a product identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

## Modify your postback URL with the Branch link reference

Now that you've created your Branch link, we need to associate your conversion postback with the correct link. As a result, you can have 1 link per platform conversion.

**1)** Grab the Branch link off of the dashboard and append `?debug=true` to the end of it. For example:{% highlight sh %}https://branchster.app.link/znlg7dlCJD{% endhighlight %} would become {% highlight sh %}https://branchster.app.link/znlg7dlCJD?debug=true{% endhighlight %}

**2)** Paste the link with `?debug=true` into your desktop browser’s address bar.

**3)** You can read the link ID from the redirected URL in the browser address bar, as well as the “~id” parameter in the “Data” section on the page. In example below, `400316647170355019` is the link ID.{% highlight sh %}https://dashboard.branch.io/link-debug/400316647170355019{% endhighlight %}

**4)** Head back to your [Adwords dashboard](https://adwords.google.com/cm/CampaignMgmt){:target="_blank"}.

**5)** In the top nav bar, click into `Tools` > `Conversions`.

**6)** Find you previous Branch conversion(s) and click `Edit Settings`

**7)** Modify the `Postback URL` to append `&link_identifier=link-<link ID from previous steps>`. For example, if you read `400316647170355019` from step 3, you would change your `Postback URL` to include the following query parameter:{% highlight sh %}http://branch.io?adid={adid}&lat={lat}&click_url={click_url}&link_identifier=link-400316647170355019{% endhighlight %}

**8)** Click `Save`

You're all good to go! Just create your Universal App Campaign and you'll see the data start to populate in your Branch dashboard.

## View your data using the Branch dashboard

The [Quick Links page](https://dashboard.branch.io/quick-links) on the Branch dashboard shows the performance of each individual link. You can find your link listed in the table with a quick summary of the _total_ clicks and installs. 

{% image src='/img/pages/features/google-search-ads/marketing_link_row.png' full center alt='Facebook Example Ad' %}

To view more detailed stats, click the _small button_ in the **Actions** column and select `View stats`. Note that these stats are **limited to the date range** at the top. You can expand the range if you'd like.

{% image src='/img/pages/features/google-search-ads/click_flow_analytics.png' full center alt='Facebook Example Ad' %}

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