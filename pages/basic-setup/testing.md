---
type: recipe
directory: basic-setup
title: 7. Testing Your Branch Setup
page_title: Add the Branch SDK to your mobile web site
description: This page will tell you how to quickly add the Branch SDK to your mobile web site
hide_platform_selector: true
hide_section_selector: true
---
In this section we’ll walk you through some basic testing methodologies that will help ensure that everything is set up appropriately.

## 1. Do links open the app and pass link data?

The most basic form of testing your Branch setup is making sure that if the user already has the app installed, clicking on a Branch link will open the app and pass through the link data. You can do this part even if you haven’t set up your deep link routing logic yet. You’ll want to test on a device that is tethered so that you can read any log files.

First, create a link from the marketing dashboard. It doesn’t matter what data you include in the link, as we’re just looking to see that something got passed through. For the purposes of testing, make the link on the Test mode of your dashboard, and make sure that you’re using the Test key in your app.

Then send yourself that link. You can email it to yourself, send it via SMS, Slack it to yourself, etc. Do not try to type the link in manually or copy-paste it into a browser window. The expected behavior in that case is to not open the app, and usually will cause an error to occur. For more information about expected link behavior, click here.

Next, click on the link on your device.

### It didn’t open the app - iOS

Chances are if your link didn’t open the app that there is something wrong with the setup of Universal Links. This is one of the most common problems that arises when testing on iOS devices, so much so that we’ve written up a special troubleshooting guide for Universal Links.

### It didn’t open the app - Android

If your app didn’t open, then there’s likely a mismatch between the link settings on your dashboard and what’s in your manifest. Specifically, check to make sure that the package name and URI schemes match up.

Once you’ve got a link click opening the app, you’ll want to make sure that you’re getting your link data. On your device, look through the log files. When the app opened, you should have seen a handful of logs come through with the tag "BranchSDK". Look for one that starts with "returned" and then contains a JSON object. Specifically you want to look for the key `+clicked_branch_link` and see if its value is "true" or "false." If it’s "true" then there are also probably a bunch of other keys/values in the JSON object that you set up on the link you’re testing with.

Additionally (or if you don’t want to look through your log files), open up your Branch dashboard and navigate to the Live View & Export page and then open the Events tab. This is the best place to observe what’s happening during testing, as this displays every event tracked by the app and updates in (almost) real time, whereas the other pages - which are more analytics focused - can have delays of minutes or hours. If your link click opened the app, you should see two events, one immediately after the other: an open event, and a referred session event. These should have the URL of the link that you clicked for testing under the Session Referring Link URL column.

<<Screenshot>>

### I’m not seeing link data

If you’ve followed the SDK setup and the link is opening the app properly, but you’re not seeing any link data come through (either on the dashboard or in the device’s log files) then the most likely culprit is a key mismatch between the key used to generate the link and the key you’re using in the app. Double-check that if you’re using your Live key (i.e. key_live_*) in the app, then the link you’re testing on should have been made on the Live mode on your dashboard, and vice versa with the Test key/Test mode.

If you’ve verified all of the above is correct but you’re still unable to get link data, feel free to reach out to integrations@branch.io, and we will be able to assist you further.

When you are able to see the link data take a moment to relish in your success! Branch manages everything that happens after you click in order to ensure that the app opens properly wherever the user clicked, and now that you’re able to get the link data you’re about 75% of the way through your testing!

## 2. Getting link data through install

Next, we’re going to verify that everything works when the user clicks on the link and doesn’t have the app. Your app doesn’t have to be in the store to test this functionality, nor does the link you’re testing have to have its fallback set to the store. The basic flow is:

Click -> Fallback -> Install the app -> Open the app

Whether you’re installing the app from a service like TestFlight or HockeyApp, or if you’re manually installing the app from XCode or Android Studio, the functionality remains the same.

Same as before, send a link to your device and click on it. After you’re redirected to the fallback, install the app on your device and run it. Examine the log files and the dashboard for the link data.

### A Note on open and install

By default, Branch will only treat the first time that an app is seen on a device as an `install`. That means that even if you uninstall your app, the next time you install your app and run it, Branch will count that as the app getting "re-opened" and consider it an `open` event instead of an `install`.

By enabling __Debug Mode__ in your code, you’ll be able to treat every install as an `install` event on the dashboard.

{% tabs %}
{% tab android %}
{% highlight xml %}
<application>
...

    <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_abc123" />
    <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_def456" />
...
</application>
{% endhighlight %}
__AndroidManifest.xml__

{% endtab %}
{% tab ios - swift %}
{% highlight swift %}
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    let branch: Branch = Branch.getInstance()
    branch.setDebug()
    branch.initSession...

    ...
}
{% endhighlight %}
__AppDelegate.swift__

{% endtab %}
{% endtabs %}

{% caution title="Disable Debug Mode in your code before release!" %}
Make sure that Debug Mode is not enabled when you release your app. In addition to allowing you to simulate fresh installs, Debug Mode has some additional behaviors which are not intended for use outside of a test environment.
{% endcaution %}

### I'm not seeing link data

There are a handful of things which could contribute to this. Branch leverages device fingerprinting to ensure a match, and in very rare circumstances it’s possible to get a false negative when attempting to match, such as when you are on a large, shared WiFi network which uses rotating IP addresses. If possible when testing, try to stay off of WiFi networks.

To reduce the potential for errors, you should enable cookie based matching on iOS and Android. Cookie-based matching will allow new iOS users who click links from Safari (~50-75% of all iOS users) and new Android users who click links from Chrome (estimated to be ~50-75% of all Android users) to be able to be matched with 100% accuracy.

If you are still having issues getting the link data through the install process, please reach out to our integrations team and we will help you diagnose the problem.

## 3. Validate your routing logic