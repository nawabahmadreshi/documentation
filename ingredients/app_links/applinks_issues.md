
{% section header %}## An Issue With App Links{% endsection %}

{% image src='/img/recipes/appinvites/missing_applinks.png' quarter right alt='troubleshooting' %}

If Facebook is having trouble reading the AppLinks from the Branch link, you might see this message while trying to test out the flow. This means that there is something corrupted in the OG tags causing Facebook to not parse it. You can test the OG tags using the following tool provided by Facebook:

[OG tag tester](https://developers.facebook.com/tools/debug/og/object). To use it simply:

1. Paste the Branch Link into the Input URL box. 
2. Click on the Show existing scrape information button.
3. Examine errors regarding AppLinks from the output window.
4. Click on the Fetch New Scrape Information button.

The last step typically resolves this problem if you are certain that your Branch Link Settings are correct. 

If the OG tag tester continues to report problems, we suggest that you:

1. Examine your [Link Settings](https://dashboard.branch.io/#/settings/link) and ensure that for all platforms (for which an app is available), that a URI scheme and a link to the app in the Play/App Store is configured. If you are using a Custom URL for your iOS Redirect then you need to append ?id<App Store Id> to the URL.
2. If errors from the output window pertain to OG tags i.e. missing title, description etc. then examine per link OG tags from [Marketing links](https://dev.branch.io/recipes/add_custom_link_data_and_routing/#og-tags---looking-good-on-social-media) or from [programatically created links](https://dev.branch.io/recipes/add_custom_link_data_and_routing/#og-tags---looking-good-on-social-media) by appending ?debug=true from a seperate tab in your broswer with Dashboard open. 
3. Alternatively, if you haven't set OG tags on a per link level, then please check your Dashboard's global Social Media Display Customization settings from the [Link Settings](https://dashboard.branch.io/#/settings/link) page.

If your OG tags look fine and you're still getting errors, please reach out to support@branch.io immediately.

#### Known issue with App Restrictions

We recently discovered a bug within the Facebook system that prevents App Links from being read by the robot if you change any of these values from the defaults in your Advanced Facebook App Settings tab. Please make sure

- Contains Alcohol is set to **No**
- Age Restriction is set to **Anyone (13+)**
- Social Discovery is set to **Yes**
- Country Restricted is set to **No**

It cannot look like this:
{% image src='/img/recipes/appinvites/app_restrictions.png' third center alt='troubleshooting' %}