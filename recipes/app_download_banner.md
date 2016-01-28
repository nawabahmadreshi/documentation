---
type: recipe
title: App download banner
ios_page_title: Smart App Download Banner for iOS Apps
android_page_title: Smart App Download Banner for Android
ios_description: Insert this short code snippet to add a smart app download banner to both your desktop and mobile web pages and drive iOS app downloads.
android_description: Insert this short code snippet to add a smart app download banner to both your desktop and mobile web pages and drive Android app downloads.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Smart Banner, App Download Banner, Banner
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Smart Banner, App Download Banner, Banner
hide_platform_selector: true
---

{% image src='/img/ingredients/web_sdk/banner2.png' half center alt='Facebook block' %}

{% ingredient quickstart_preview/quickstart_preview %}{% endingredient %}

## The Smart Banner

{% ingredient web_sdk/smart_banner %}{% endingredient %}

----

## Advanced: deep linking from the Banner

You can pass custom parameters through the App/Play Store by specifying keys in the data dictionary. In the example below, when a user clicks on the Smart Banner on a mobile device, installs and opens the app, they will be taken straight to a view controller to see picture with id "12345".

{% highlight javascript %}
branch.banner(options, {
	tags: ['page 3', 'signed in']
	feature: 'smart banner'
    data: {
    	'$deeplink_path': 'picture/12345',
        'picture_id': '12345',
        'user_id': '45123'
    }
});
{% endhighlight %}

If you wanted to dynamically specify the deep link path depending on which page is loaded, it's simple. Here's an example:

{% highlight javascript %}
branch.banner(options, {
    data: {
    	'$deeplink_path': window.location.split('com/')[1],
    }
});
{% endhighlight %}

----

## Advanced: Styling the banner using the custom css property

Set the `iframe` property to false to inspect the Smart Banner's html structure and use the `customCSS` property to style its elements. 

Property Syntax: 

`customCSS : '#div and or .classname {property-to-style:value;}'`

Examples:

To set the color of title text to red use:

`customCSS:'.title{ color: #F00; }'`

To set the background color of the entire Banner to green use: 

`customCSS:'#branch-banner .content{background-color:green;}'`

----

## Advanced: Listening for Banner specific events

If you would like your app to listen for and react to Banner events, the Web SDK includes a simple event listener that currently only publishes events for Branch.banner() events. Available branch.banner() events include:

- **willShowBanner**
- **willNotShowBanner**
- **didShowBanner**
- **willCloseBanner**
- **willSendBannerSMS**
- **sendBannerSMSError**
- **didSendBannerSMS**

Here's an example of listening for the **willShowBanner** event:

{% highlight javascript %}
var listener = function(event) { console.log(event); }
branch.addListener('willShowBanner', listener);
branch.banner({
    icon: 'http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Appstore-icon.png',
    title: 'Branch Demo App',
    description: 'The Branch demo app!'
}, {});
{% endhighlight %}

----

## Advanced: Prepdending Country Codes to Phone Numbers

If your app audience belongs to one country, you can choose a specific country code to prepend to all phone numbers. You simply add the following code snippet to your `HTML` after the `branch.init()` call. Note that this will prepend the country code to whatever number is entered. You might need to do extra validation to ensure that the user didn't add the country code themselves. 

{% highlight javascript %}
var listener = function(event) { 
    var banner_iframe = document.getElementById("branch-banner-iframe").contentWindow.document;
    var submit_btn = banner_iframe.getElementById("branch-sms-send");
    
    submit_btn.addEventListener('click', function(e){
        var phone_number = banner_iframe.getElementById("branch-sms-phone");
        var country_code = "+2"
        phone_number.value = country_code + phone_number.value;
    });
}

branch.addListener('didShowBanner', listener);
{% endhighlight %}

----

#### Advanced: Closing the app banner programmatically

The App Banner includes a close button the user can click, but you may want to close the banner with a timeout, or via some other user interaction with your web app. In this case, closing the banner is very simple by calling `Branch.closeBanner()`.

```js
branch.closeBanner();
```

----

## FAQ

**Q: Can I use the App Smart Banner on non mobile-optimized pages?**

A: Yes, you can. However, you are responsible for handling the resizing of the banner whenever a user zooms in or zooms out. The smart banner is meant for mobile-optimized pages.

**Q: How does Branch determine whether the banner says download or open?**

A: Initially, if we've never determined a device has your application, we will default to *download* (or whatever custom text you've set for when a user doesn't have the app). If they have clicked one of your links before and consequently opened the application, we will switch the text to say *open* (or whatever custom text you've set for when a user has your app).

**Q: I've sent myself multiple texts just now and only received the first few, what's going on?** 

A: This occurs when a carrier filters you SMS out due to spam. We try our hardest to rate limit a specific user, however, if bypassed, carriers may block your SMS. The reason is that carriers will agressively block content if it's similar and repeatedly sent to the same number. The solution is to wait 24-48 hours.

**Q: How come my (non US) phone number isn't working?**

A: With full numbers, you are required to use the "+" and the country code. If you know your users are only in a certain country, you could automatically append the + and the country code so that they only need to append their number without the country code.

----

## What's next

{% ingredient recipe_preview/personalized_welcome %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{% endingredient %}
