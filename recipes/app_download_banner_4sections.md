---
type: recipe
directory: features
title: App Download Banner / 4
ios_page_title: Smart App Download Banner for iOS Apps
android_page_title: Smart App Download Banner for Android
ios_description: Insert this short code snippet to add a smart app download banner to both your desktop and mobile web pages and drive iOS app downloads.
android_description: Insert this short code snippet to add a smart app download banner to both your desktop and mobile web pages and drive Android app downloads.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Smart Banner, App Download Banner, Banner
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
---

{% if page.overview %}

The Branch Smart Banner displays a fully-customizable banner at the top of your website, encouraging your mobile visitors to download the app (or open it, if already installed). Desktop visitors may enter their phone number to send themselves a link via SMS.

{% image src='/img/ingredients/web_sdk/banner2.png' half center alt='Facebook block' %}

The Download/Open button and SMS link both contain all the features of any other Branch link, including deeplinking directly to content, passing data across install, measuring clicks, and more.

*Head over to the [Implementation Guide]({{base.url}}/features/app_download_banner_3sections/guide/) to get started!*

{% elsif page.guide %}

### Prerequisites for enabling the Branch Smart Banner
> Set up your Branch account and link routing for your app at start.branch.io.

## Add Smart Banner script to your website

Add the following code somewhere inside the `<head> </head>` tags on your website.

```javascript
<script type="text/javascript">
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-v1.8.8.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setIdentity track validateCode".split(" "), 0);
branch.init('YOUR-BRANCH-KEY');
    
branch.banner({
    icon: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png',
    title: 'Branch Demo App',
    description: 'The Branch demo app!'
}, {});
</script>
```

> Be sure to replace `YOUR-BRANCH-KEY` with your Branch Key inside the `init()` call. You can find your Branch Key on the Dashboard’s [Settings](https://dashboard.branch.io/#/settings) page.

## Customizations

That’s all you need to add the smart banner to your website! Go to the [Advanced page](advanced.md) to see some common customizations, or take a look at the [Method Reference]() for all available options.

{% elsif page.advanced %}

## Configuration options

All properties are optional. You can customize the banner in lots of ways, including changing button text or color and adding ratings and review counts.

![](https://dev.branch.io/img/ingredients/web_sdk/mobile_banners.png)

{% highlight javascript %}
branch.banner(
// These are the customizations to the banner itself
{
    icon: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png',
    title: 'Branch Demo App',
    description: 'The Branch demo app!',
    openAppButtonText: 'Open',              // Text to show on button if the user has the app installed
    downloadAppButtonText: 'Download',      // Text to show on button if the user does not have the app installed
    sendLinkText: 'Send Link',              // Text to show on desktop button to allow users to text themselves the app
    phonePreviewText: '+44 9999-9999',      // The default phone placeholder is a US format number, localize the placeholder number with a custom placeholder with this option
    showiOS: true,                          // Should the banner be shown on iOS devices?
    showAndroid: true,                      // Should the banner be shown on Android devices?
    showDesktop: true,                      // Should the banner be shown on desktop devices?
    iframe: true,                           // Show banner in an iframe, recomended to isolate Branch banner CSS
    disableHide: false,                     // Should the user have the ability to hide the banner? (show's X on left side)
    forgetHide: false,                      // Should we show the banner after the user closes it? Can be set to true, or an integer to show again after X days
    position: 'top',                        // Sets the position of the banner, options are: 'top' or 'bottom', and the default is 'top'
    mobileSticky: false,                    // Determines whether the mobile banner will be set `position: fixed;` (sticky) or `position: absolute;`, defaults to false *this property only applies when the banner position is 'top'
    desktopSticky: true,                    // Determines whether the desktop banner will be set `position: fixed;` (sticky) or `position: absolute;`, defaults to true *this property only applies when the banner position is 'top'
    customCSS: '.title { color: #F00; }',   // Add your own custom styles to the banner that load last, and are gauranteed to take precedence, even if you leave the banner in an iframe
    make_new_link: false,                   // Should the banner create a new link, even if a link already exists?
    rating: 5,                              // Number of stars (should be your store rating)
    reviewCount: 1000,                      // Number of reviews that generate the rating (should be your store reviews)
    theme: 'light',                         // Uses Branch's predetermined color scheme for the banner { 'light' || 'dark' }, default: 'light'
    buttonBackgroundColor: css color,        // Overrides the theme's default colors
    buttonFontColor: css color,
    buttonBorderColorHover: css color,
    buttonBackgroundColorHover: css color,
    buttonFontColorHover: css color
},

// Here is where you define the deep link that you'd like to use
{ 
    tags: ['version12', 'trial-b'],
    feature: 'smart_banner',
    stage: 'shoe_page'
    data: {
        '$deeplink_path': 'content/page/12354',
        deeplink: 'data',
        username: 'Alex'
    }
});
{% endhighlight %}

## Deeplinking from the banner

Like all Branch deeplinks, you can pass custom parameters through the App/Play Store by specifying keys in the data dictionary. If you have [enabled deeplink routing]() in your app, the example below will take the visitor straight to a picture with id “12345” after installing and opening the app.

```javascript
branch.banner(options, {
    data: {
      '$deeplink_path': 'picture/12345',
        'picture_id': '12345',
        'user_id': '45123'
    }
});
```

To dynamically specify the deep link path depending on which website page is loaded, use this example:

```javascript
branch.banner(options, {
    data: {
      '$deeplink_path': window.location.split('com/')[1],
    }
});
```

## Styling the banner using the custom css property

By default, the Smart Banner is encapsulated in an IFrame to protect against CSS conflicts. You can customize the Smart Banner's appearance with the `customCSS` property. To set the title text to red, use this example:

```javascript
branch.banner({
    customCSS: '.title{ color: #F00; }'
}, {});
```

Alternatively, set the `iframe` property to false to apply your own CSS:

```javascript
branch.banner({
    iframe: false
}, {});
```

## Listening for Banner specific events

If you would like your app to listen for and react to Banner events, the Web SDK includes a simple event listener. Available branch.banner() events include:

- willShowBanner
- willNotShowBanner
- didShowBanner
- willCloseBanner
- willSendBannerSMS
- sendBannerSMSError
- didSendBannerSMS

Here’s an example of listening for the willShowBanner event:

```javascript
var listener = function(event) { console.log(event); }
branch.addListener('willShowBanner', listener);
branch.banner({
    icon: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png',
    title: 'Branch Demo App',
    description: 'The Branch demo app!'
}, {});
```

## Closing the app banner programmatically

The App Banner includes a close button the user can click, but you may want to close the banner with a timeout, or via some other user interaction with your web app. In this case, closing the banner is very simple by calling `Branch.closeBanner().`

```javascript
js branch.closeBanner();
```

{% elsif page.support %}

## FAQ

### Q: Can I use the App Smart Banner on non mobile-optimized pages?

A: Yes, you can. However, you are responsible for handling the resizing of the banner whenever a user zooms in or zooms out. The smart banner is meant for mobile-optimized pages.

### Q: How does Branch determine whether the banner says download or open?

A: Initially, if we’ve never determined a device has your application, we will default to download (or whatever custom text you’ve set for when a user doesn’t have the app). If they have clicked one of your links before and consequently opened the application, we will switch the text to say open (or whatever custom text you’ve set for when a user has your app).

### Q: I’ve sent myself multiple texts just now and only received the first few, what’s going on?

A: This occurs when a carrier filters you SMS out due to spam. We try our hardest to rate limit a specific user, however, if bypassed, carriers may block your SMS. The reason is that carriers will agressively block content if it’s similar and repeatedly sent to the same number. The solution is to wait 24-48 hours.

### Q: How come my (non US) phone number isn’t working?

A: With full numbers, you are required to use the “+” and the country code. If you know your users are only in a certain country, you could automatically append the + and the country code so that they only need to append their number without the country code.

{% endif %}