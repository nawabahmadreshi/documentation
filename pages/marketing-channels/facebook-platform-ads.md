---
type: recipe
directory: marketing-channels
title: "Facebook Platform Ads"
page_title: "Advertising with Deep Links: Facebook Ads"
description: Learn how to create Facebook ads that are powered by Branch Metrics deep links. It’s simple - configure the dashboard, generate links and set up your app.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Advertising, Ads, Facebook Ads, Facebook Authentication
hide_platform_selector: true
sections:
- overview
- guide
- support
alias: [ /features/facebook-app-install/, /features/facebook-app-install/overview/, /features/facebook-app-install/guide/, /features/facebook-ads/support/ ]
---

{% if page.overview %}

Branch links can be used together with Facebook Platform Campaign ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Consideration | App Installs | App Only: Install

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic
--- | --- | --- | --- | --- | --- | ---
App Installs | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |

{% ingredient deep-linked-ad-ideas %}{% endingredient %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
- To track installs from Facebook Ads you should [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- To use Branch links in Facebook Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal and App Links]({{base.url}}/getting-started/universal-app-links).
- If you want to deep link from your ads directly content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
{% endprerequisite %}

{% ingredient enable-facebook-ad-partner %}{% endingredient %}

## Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Facebook Link` button under the Google Adwords Partner and select `App Install or Engagement`
{% image src='/img/pages/features/facebook-ads/create-link-install-engagement.png' half center alt='Link Creation' %}
1. Under the Define Section, pick a Link Name for later reference.
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Facebook**, and the Secondary Ad Format set to **App Install Ads**.
{% image src='/img/pages/features/facebook-ads/facebook-app-install/ad-link-setup.png' 3-quarters center alt='Create Ad Link' %}
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android redirect is set to the desired app being promoted by the ad campaign.
1. Under the Analytics Tags sub section additional tags can be set including Channel, Campaign, and freeform tags
{% image src='/img/pages/features/ads-analytics/analytics-tags.png' 3-quarters center alt='Analytics Tags' %}

{% caution %}

In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](https://dev.branch.io/features/deepviews/guide/ios/) for your entire account or [disable Deepviews for one link]({{base.url}}/features/deepviews/advanced/ios/#disabling-deepviews-for-one-link).

{% endcaution %}

{% protip title="Optional: Deep Link Data (Advanced)" %}

You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

{% endprotip %}

{% protip title="Setting Attribution Windows" %}

You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows]({{base.url}}/marketing-channels/ad-network-integrations/advanced/#changing-attribution-windows) for instructions.

{% endprotip %}

## Configure an Ad

To set up a Facebook App Install campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook App Install Campaign information is available **[here](https://www.facebook.com/business/ads-guide/app-installs)**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) while logged in to the account that owns your Facebook app.
1. Select **App Installs** as the campaign marketing objective.
{% image src='/img/pages/features/facebook-ads/facebook-app-install/campaign-selection.png' 3-quarters center alt='Campaign Selection' %}
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. After setting up your advertisement, fill in the **Deep Link** field with your Branch Ad link
{% image src='/img/pages/features/facebook-ads/facebook-app-install/ad-deep-link.png' 3-quarters center alt='Deep Link Placement' %}
1. Complete the rest of the ad campaign setup.

Your Facebook Ad Campaign is now setup to use Branch Links to handle App Installs!

{% protip title="Optional: Ad formats with Multiple Links" %}

Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{% endprotip %}

{% caution %}

Facebook prevents Branch from measuring the number of clicks on their ads, so all **Clicks** numbers for Facebook App Install Ads are inaccurate.

{% endcaution %}

{% ingredient view-ad-link-data %}{% endingredient %}

{% elsif page.support %}

## Don't use setDebug

Facebook ads are incompatible with [debug mode]({{base.url}}/getting-started/integration-testing/guide/ios/#use-debug-mode-to-simulate-fresh-installs), as this prevents us from sending the correct hardware ID to Facebook.

## Testing deep linked ads

The only way to test the deep linking functionality is outside of the actual ads system. Follow these instructions to test the deep linking functionality:

1. Head to the [Ads tester tool](https://developers.facebook.com/tools/app-ads-helper/)
1. Choose the app that you're advertising with
1. Scroll down to the button that says 'Test Deep Link'
1. Paste in the Branch link
1. Check 'Send Deferred'
1. Click 'Send to iOS/Android'
1. Install the app and it should deep link!

##### Demo/preview ads do not deep link

Unfortunately, Facebook uses a different mechanism for showing the preview ads that you send to your phone. **This prevents you from testing deep linking from your Facebook ads**. Do not waste time trying to get this to work. We've confirmed with Facebook representatives that this is broken.

##### Liked live ads do not deep link

If you see that someone liked your ad, do not bother trying to click and test it. Clicking your own ad that shows up in notifications **will not deep link**.

## Conflicts with Facebook SDK (iOS)

If your app integrates the FBSDK, be certain you are *not* using the [`FBSDKAppLinkUtility` method](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/). This has been known to cause conflicts with Branch when handling incoming deep links.

## Issues reading Facebook App Links

If Facebook is having trouble reading the App Links from the Branch link, you might see messages like these while trying to test out the flow. This means that there is something corrupted in the OG tags causing Facebook to not parse your link.

{% image src='/img/pages/features/facebook-ads/invalid-app-links-error.png' half center alt='Invalid app links' %}
{% image src='/img/pages/features/facebook-ads/missing_applinks.png' quarter center alt='troubleshooting' %}

### Rescrape the OG tags

You can test the OG tags using the [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) provided by Facebook:

1. Paste the Branch Link into the Input URL box.
1. Click on the Show existing scrape information button.
1. Examine errors regarding App Links from the output window.
1. Click on the Fetch New Scrape Information button. This last step typically resolves this problem if you are certain that your Branch Link Settings are correct.

{% protip %}
You can further automate the rescraping process by using this command after you create a new link and before you use it for any ads:

{% highlight sh %}
curl --insecure "https://graph.facebook.com/?id=[YOUR-URL-TO-SCRAPE]&scrape=true"
{% endhighlight %}
{% endprotip %}

### If the OG tag tester continues to report problems

1. Examine your [Link Settings](https://dashboard.branch.io/#/settings/link) and ensure that for all platforms (for which an app is available), that a URI scheme and a link to the app in the Play/App Store is configured. If you are using a Custom URL for your iOS Redirect, then you need to append `?id[10-digit App Store ID]` to the URL. This is necessary in order to fully generate the App Links and OG tags that the Facebook scraper expects to find.
    - For example, if your App Store URL is `https://itunes.apple.com/us/app/my-app-name/id1234567890`, then your Custom URL value should be `https://example.com?id1234567890`
1. If errors from the output window pertain to OG tags i.e. missing title, description etc. then examine link OG tags by appending `?debug=true` as described on the [Integration Testing page]({{base.url}}/getting-started/integration-testing/guide/#debugging-an-individual-link).
1. If you haven't set OG tags on a per link level, then please check your Dashboard's global Social Media Display Customization settings from the [Link Settings](https://dashboard.branch.io/#/settings/link) page.

### Use a direct deep link

As a last resort, you can manually input a direct deep link. To retrieve this:

1. Go to Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)
1. Input the Branch link you want to use for your ad
1. Click **Fetch new scrape information**
1. Find the `al:ios:url` line (it should look like `<meta property="al:ios:url" content="myapp://open?link_click_id=link-242052337263342024" />`)
1. Copy the value of this (`myapp://open?link_click_id=link-242052337263342024`) and input it as the Deep Link value of your ad

If none of these approaches work, please reach out to integrations@branch.io immediately.

## Known issue with App Restrictions

We recently discovered a bug within the Facebook system that prevents App Links from being read by the robot if you change any of these values from the defaults in your Advanced Facebook App Settings tab. Please make sure

- Contains Alcohol is set to **No**
- Age Restriction is set to **Anyone (13+)**
- Social Discovery is set to **Yes**
- Country Restricted is set to **No**

It has to look like this **exactly**:
{% image src='/img/pages/features/facebook-ads/app_restrictions.png' 2-thirds center alt='app restrictions troubleshooting' %}

## No IP Whitelists

Because Branch has a large distribution of API servers that will be making requests to Facebook on behalf of your app, you cannot have an IP whitelist in your [Facebook advanced settings](https://developers.facebook.com/apps/390736167768543/settings/advanced/) and still have this integration work. Please remove any IPs from this setting if they are present.

## Common issues with Facebook Authentication

If you are having trouble authenticating with Facebook, please check the following:

##### Be sure you have the correct App ID and App Secret

Be sure you have the correct App ID and App Secret. This is the number one source of issues.

##### App Secret embedded?

If you have entered the correct App ID and Secret but are still getting issues, it may be related to how you are using your Secret. Visit the Settings > Advanced page on Facebook and check that you don't have the toggle enabled for "Is your App Secret embedded?" You will only have this option if you have enabled "Native or desktop app?" on this page.

So if you have enabled "Native or desktop app", then your advanced options should appear like the following:

{% image src='/img/pages/features/facebook-ads/facebook_secret.png' 2-thirds center alt='Client Secret' %}

## Debugging Common Discrepancies Between Branch and Facebook Counts

While we should always expect around a 5% discrepancy due to time zone differents and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

### Issue with iOS 10 and Limit Ad Tracking

In iOS 10, Apple broke the ability for app developers to collect the `IDFA` if the user had enabled `Limit Ad Tracking`. In this case, Branch and Facebook cannot compare notes to see who drove the install. This will account for about 15% discrepancy in counts across both platforms, where Branch's tracked installs will be lower.

### Not Collecting Advertising ID

If you see absolutely 0 data coming through from your integration, it's possible that you're not collecting Google Advertising ID (GAID) on Android or IDFA on iOS.

- iOS: Add the AdSupport.framework and read this extra info about [submitting](https://dev.branch.io/getting-started/sdk-integration-guide/guide/ios/#submitting-to-the-app-store) to the store.
- Android: Add Google Play Services so that we can collect GAID. See [here](https://dev.branch.io/getting-started/sdk-integration-guide/advanced/android/#use-google-advertising-id).

### Intercepting Deep Links Before Branch

We recently discovered a discrepancy where and app was calling Facebook's SDK to fetch the deferred app link within their iOS and Android app. Branch calls uses this same mechanism via a direct API integration, but if Facebook's SDK retrieves it before we do, Branch will not see any deep link data. Please ensure to comment out any calls to the following API within your app:

- [Android: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/android/current/class/AppLinkData/)
- [iOS: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/)

### Installs Counted as Opens on Branch

One discrepancy root cause we've seen before is the scenario where Branch will classify an install as an 'open'. We remember the history of a particular user via their IDFA (in addition to using a few other methods) and will detect whether the user is actually a new user or a returning user who had previously unistalled your app. Facebook doesn't do this.

We've seen Facebook classify 're-installs' as fresh installs, where Branch will correctly classify them as 're-opens'. If you're comparing the raw install numbers on Branch, and ignoring the 're-opens', it's possibe you'll see a discrepancy. To check sum up the 'installs' and 'reopens' for the given link and compare it to Facebook's total installs.

{% image src='/img/pages/features/facebook-ads/installs_plus_opens.png' 2-thirds center alt='installs and opens' %}

If it's close, you know that this is the root cause.

### Fewer Clicks Recorded in Branch

The number of clicks on a link used inside of a Branch enabled Facebook Ad will be lower in Branch's dashboard than Facebook's. This is because Facebook routes users straight to the App/Play Store without letting Branch know that a link was clicked. If the user decides not to install the app/drops off at the App/Play Store, then Facebook will have recorded one more click than Branch. Branch does not increment the link's click count until the user enters into the app. This is why you'll see more clicks in Facebook's dashboard.

{% endif %}
