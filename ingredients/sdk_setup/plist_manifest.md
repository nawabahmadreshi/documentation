{% if page.ios %}
### PList configuration

#### Add your Branch key

Your app key can be retrieved on the [Settings](https://dashboard.branch.io/#/settings) page of the dashboard. Now you need to add it to YourProject-Info.plist (Info.plist for Swift).

1. In plist file, mouse hover "Information Property List" which is the root item under the Key column.
1. After about half a second, you will see a "+" sign appear. Click it.
1. In the newly added row, fill in `branch_key` for its key, leave type as String, and enter your app key obtained in above steps in its value column.
1. Save the plist file.

#### Configure for URI-based deep linking

To set up your URI Scheme, you'll need to open your project in XCode and complete the following.

1. Click on YourProject-Info.plist on the left (or in Swift, Info.plist).
1. Find URL Types and click the right arrow. (If it doesn't exist, right click anywhere and choose Add Row. Scroll down and choose URL Types)
1. Add `myapp`, where _myapp_ is a unique string for your app, as an item in URL Schemes as below:

{% image src='/img/ingredients/configuring_the_client/ios_uri_scheme.png' half center alt='URI in plist' %}

#### Configure for Universal Links

Configuring your app for Branch's Universal Links is very simple. At a high level, you just need to go in and add in the selected `Associated Domains` to your Xcode project.

**Step 1.** Enable Associated Domains in Xcode

First, double check that provisioning profiles in your app belong to the same team that you are going to use throughout the Universal Link configuration process with Branch. Using provisioning profiles from a different team will cause Universal Links to fail and fall back to normal Branch links. Then go to the `Capabilities` tab of your project file.

Scroll down and enable `Associated Domains` so that the accordion expands.

{% image src='/img/recipes/universal_links/enable_ass_domains.png' half center alt='xcode ass domains' %}

If you see an error like this, make sure:

- that you have the right team selected
- your Bundle Identifier of your Xcode project matches the one used to register the App Identifier

[Full instructions here](/recipes/branch_universal_links/ios/#configure-developerapplecom).

**Step 2:** Add in your Branch link domains

In the `Domains` section, add the appropriate domain tags for `bnc.lt` as well as your `white label domain` if you use one. You must prefix it with `applinks:`. If you're just using `bnc.lt` for all of your Branch links, you only need to add a single domain:

- `applinks:bnc.lt`

{% image src='/img/recipes/universal_links/add_domains.png' half center alt='xcode add domains' %}

**Note: If you encounter any issues, please follow the [full instructions here](/recipes/branch_universal_links/ios/).**

{% endif %}
<!---       /iOS-specific Branch Key -->


{% if page.android %}
### Manifest configuration

#### Step 1: Add your Branch key

Your Branch Key can be retrieved on the [Settings](https://dashboard.branch.io/#/settings) page of the dashboard. Now you need to add it to your project workspace.

Navigate to AndroidManifest.xml and add the following `<meta-data>` tags:

{% highlight xml %}

<application>
    <!-- Other existing entries -->

    <!-- Set to true to use Branch_Test_Key -->
    <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_abc123" />
    <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_abc123" />

</application>

{% endhighlight %}

-----

#### Step 2: Configure for deep linking

Find the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from. Inside your `AndroidManifest.xml` where the `Activity` is defined, do the following:

1. Copy in the intent filter as seen below with VIEW/DEFAULT/BROWSABLE in it.
2. Change _yourapp_ under `android:scheme` to the URI scheme you've registered with us.

{% highlight xml %}

<activity
	android:name="com.yourapp.SplashActivity"
	android:label="@string/app_name" >
	<intent-filter>
		<action android:name="android.intent.action.MAIN" />
		<category android:name="android.intent.category.LAUNCHER" />
	</intent-filter>

	<!-- Add this intent filter below, and change yourapp to your app name -->
	<intent-filter>
		<data android:scheme="yourapp" android:host="open" />
		<action android:name="android.intent.action.VIEW" />
		<category android:name="android.intent.category.DEFAULT" />
		<category android:name="android.intent.category.BROWSABLE" />
	</intent-filter>
</activity>

{% endhighlight %}

-----

#### Step 3: Enable Auto Session Management - Custom Application Class

{% ingredient sdk_setup/android_app_alternatives %}{% endingredient %}

#### Step 3 Alternative: Enable Auto Session Management - No Application Class

If you don't have a custom application class, the last step is to register our `Application` class. The final step in setting up the Branch SDK is as follows:

{% highlight xml %}
 <application
    android:name="io.branch.referral.BranchApp">
{% endhighlight %}

Note: Auto session tracking is only available for `minSdkVersion` 14 or above.

{% protip title="What if I support pre14 Android?" %} If you need to support pre-14, please see our section about [session management below](/recipes/quickstart_guide/android/#initialization-to-support-android-pre-14). {% endprotip %}

{% endif %}
<!---       /Android-specific Branch Key -->

{% if page.titanium %}
### Configure Android Manifest

#### Android: Register a URI Scheme and add your Branch key

In your project's `tiapp.xml` file, you can register your app to respond to direct deep links (`yourapp://` in a mobile
browser) by adding the second intent filter block. Also, make sure to change `yourapp` to a unique string that
represents your app name.

Secondly, make sure that this activity is launched as a singleTask. This is important to handle proper deep linking
from other apps like Facebook.

{% highlight xml %}
<activity
    android:name=".TestbedActivity"
    android:label="@string/app_name"
    <!-- Make sure the activity is launched as "singleTask" -->
    android:launchMode="singleTask">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

    <!-- Add this intent filter below, and change yourapp to your app name -->
    <intent-filter>
        <data android:scheme="yourapp" android:host="open" />
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
    </intent-filter>
</activity>
{% endhighlight %}

After you register your app, your Branch key can be retrieved on the Settings page of the dashboard. Add it
(them, if you want to do it for both your live and test apps) to your project's manifest file as a meta data.

Edit your manifest file to have the following items:

{% highlight xml %}
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="io.branch.sample"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-permission android:name="android.permission.INTERNET" />

    <application>
        <!-- Other existing entries -->

        <!-- Add this meta-data below, and change "key_live_xxxxxxx" to your actual live Branch key -->
        <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_xxxxxxx" />

        <!-- For your test app, if you have one; Again, use your actual test Branch key -->
        <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_yyyyyyy" />
    </application>
</manifest>
{% endhighlight %}

### Configure the iOS Plist and Entitlements

#### iOS: Register a URI Scheme and add your Branch key

In your project's `tiapp.xml` file, you can register your app to respond to direct deep links (`yourapp://` in a mobile browser) by adding `CFBundleURLTypes` block. Also, make sure to change `yourapp` to a unique string that represents your app name. 
In https://dashboard.branch.io/#/settings/link, tick `I have an iOS App` checkbox and enter your URI Scheme (e.g.: `yourapp://`) into the text box.

{% highlight xml %}
  <ios>
    <plist>
      <dict>
        <!-- Add branch key as key-value pair -->
        <key>branch_key</key>
        <string>key_live_xxxxxxxxxxxxxxx</string>
        <!-- Add unique string for direct deep links -->
        <key>CFBundleURLTypes</key>
        <array>
          <dict>
            <key>CFBundleURLSchemes</key>
            <array>
              <string>yourapp</string>
            </array>
          </dict>
        </array>
      </dict>
    </plist>
  </ios>
{% endhighlight %}

#### iOS: Enable Universal Links

In iOS 9.2, Apple dropped support for URI scheme redirects. You must enable Universal Links if you want Branch-generated links to work in your iOS app. To do this:

1. enable `Associated Domains` capability on the Apple Developer portal when you create your app's bundle identifier. 
2. In https://dashboard.branch.io/#/settings/link, tick the `Enable Universal Links` checkbox and provide the Bundle Identifier and Apple Team ID in the appropriate boxes. 
3. Finally, create a new file named `Entitlements.plist` in the same directory as your Titanium app's `tiapp.xml` with the `associated-domains` key like below. You may add more entitlement keys if you have any.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.developer.associated-domains</key>
    <array>
        <string>applinks:bnc.lt</string>
    </array>
</dict>
</plist>
{% endhighlight %}

{% endif %}

{% if page.cordova or page.xamarin or page.unity %}

### iOS: Add your Branch key

Your app key can be retrieved on the [Settings](https://dashboard.branch.io/#/settings) page of the dashboard. Now you need to add it to YourProject-Info.plist (Info.plist for Swift).

1. In plist file, mouse hover "Information Property List" which is the root item under the Key column.
1. After about half a second, you will see a "+" sign appear. Click it.
1. In the newly added row, fill in `branch_key` for its key, leave type as String, and enter your app key obtained in above steps in its value column.
1. Save the plist file.

### iOS: Configure for URI based deep linking

{% if page.unity %}
**Note this is only if you want to change it manually, but this is automatically configured for you.**
{% endif %}

To set up your URI Scheme, you'll need to open your project in XCode and complete the following.

1. Click on YourProject-Info.plist on the left (or in Swift, Info.plist).
1. Find URL Types and click the right arrow. (If it doesn't exist, right click anywhere and choose Add Row. Scroll down and choose URL Types)
1. Add `myapp`, where _myapp_ is a unique string for your app, as an item in URL Schemes as below:

{% image src='/img/ingredients/configuring_the_client/ios_uri_scheme.png' half center alt='URI in plist' %}

-----

### iOS: Configure for Universal Links

Configuring your app for Branch's Universal Links is very simple. At a high level, you just need to go in and add in the selected `Associated Domains` to your Xcode project.

#### Step 1. Enable Associated Domains in Xcode

First, double check that provisioning profiles in your app belong to the same team that you are going to use throughout the Universal Link configuration process with Branch. Using provisioning profiles from a different team will cause Universal Links to fail and fall back to normal Branch links. Then go to the `Capabilities` tab of your project file.

Scroll down and enable `Associated Domains` so that the accordion expands.

{% image src='/img/recipes/universal_links/enable_ass_domains.png' half center alt='xcode ass domains' %}

If you see an error like this, make sure:

- that you have the right team selected
- your Bundle Identifier of your Xcode project matches the one used to register the App Identifier

[Full instructions here](/recipes/branch_universal_links/ios/#configure-developerapplecom).

#### Step 2: Add in your Branch link domains

In the `Domains` section, add the appropriate domain tags for `bnc.lt` as well as your `white label domain` if you use one. You must prefix it with `applinks:`. If you're just using `bnc.lt` for all of your Branch links, you only need to add a single domain:

- `applinks:bnc.lt`

{% image src='/img/recipes/universal_links/add_domains.png' half center alt='xcode add domains' %}

The file should look like this:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.developer.associated-domains</key>
    <array>
        <string>applinks:bnc.lt</string>
    </array>
</dict>
</plist>
{% endhighlight %}

**Note: If you encounter any issues, please follow the [full instructions here](/recipes/branch_universal_links/ios/).**

-----

### Configure Android for deep linking

{% if page.unity %}
**Note this is only if you want to change it manually, but this is automatically configured for you.**
{% endif %}

Find the Activity you want to open up when a link is clicked (normally your splash Activity) and do the following:

1. Copy in the intent filter as seen below with VIEW/DEFAULT/BROWSABLE in it.
2. Change _yourapp_ to a URI scheme representative of your app

{% highlight xml %}
<activity
	android:name="com.yourapp.SplashActivity"
	android:label="@string/app_name" >

	<!-- Add this intent filter below, and change yourapp to your app name -->
	<intent-filter>
		<data android:scheme="yourapp" android:host="open" />
		<action android:name="android.intent.action.VIEW" />
		<category android:name="android.intent.category.DEFAULT" />
		<category android:name="android.intent.category.BROWSABLE" />
	</intent-filter>
</activity>
{% endhighlight %}
{% endif %}

{% if page.adobe %}
### Add your Branch key

Inside the `*-app.xml` you must add your **Branch App Key** (refer to the [dashboard](https://dashboard.branch.io/#/settings) to get it).

#### on iOS

{% highlight xml %}
<iPhone><InfoAdditions><![CDATA[
    <!-- other stuff -->
    <key>branch_key</key>
    <string>key_live_dcixJiAqOixZkdkLxgiTLkeovycqdUPp</string>
]]></InfoAdditions></iPhone>
{% endhighlight %}

#### on Android

Also don't forget to set the Branch activity.

{% highlight xml %}
<android><manifestAdditions><![CDATA[
    <!-- other stuff -->
    <application>
        <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_dcixJiAqOixZkdkLxgiTLkeovycqdUPp" />
        <activity android:name="io.branch.nativeExtensions.branch.BranchActivity" android:launchMode="singleTask" android:theme="@android:style/Theme.Translucent.NoTitleBar.Fullscreen" />
    </application>
]]></manifestAdditions></android>
{% endhighlight %}

For a full example of the `*-app.xml` please refer to the [demo](https://github.com/BranchMetrics/Branch-AIR-ANE-SDK/blob/master/bin/Branch-AIR-ANE-SDK-app.xml).

### Configure for deeplinking

In your project's `*-app.xml` file, you can register your app to respond to direct deep links (yourapp:// in a mobile browser) by adding a URI scheme. Also, make sure to change *yourApp* to a unique string that represents your app name.

#### on iOS with URIs

{% highlight xml %}
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>yourApp</string>
        </array>
    </dict>
</array>
{% endhighlight %}

#### on iOS with Universal Links

### Support Universal Linking (iOS 9)

Configuring your app for Branch's Universal Links is very simple. At a high level, you just need to go in and add in the selected `Associated Domains` to your Xcode project.

**Step 1.** Enable Associated Domains in Xcode

First, double check that provisioning profiles in your app belong to the same team that you are going to use throughout the Universal Link configuration process with Branch. Using provisioning profiles from a different team will cause Universal Links to fail and fall back to normal Branch links. Then go to the `Capabilities` tab of your project file.

Scroll down and enable `Associated Domains` so that the accordion expands.

{% image src='/img/recipes/universal_links/enable_ass_domains.png' half center alt='xcode ass domains' %}

If you see an error like this, make sure:

- that you have the right team selected
- your Bundle Identifier of your Xcode project matches the one used to register the App Identifier

[Full instructions here](/recipes/branch_universal_links/ios/#configure-developerapplecom).

**Step 2:** Add in your Branch link domains

In the `Domains` section, add the appropriate domain tags for `bnc.lt` as well as your `white label domain` if you use one. You must prefix it with `applinks:`. If you're just using `bnc.lt` for all of your Branch links, you only need to add a single domain:

- `applinks:bnc.lt`

{% image src='/img/recipes/universal_links/add_domains.png' half center alt='xcode add domains' %}

**Note: If you encounter any issues, please follow the [full instructions here](/recipes/branch_universal_links/ios/).**


#### on Android

{% highlight xml %}
<activity>
    <intent-filter>
        <data android:scheme="yourApp" />
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
    </intent-filter>
</activity>
{% endhighlight %}

For a full example of the `*-app.xml` please refer to the [demo](https://github.com/BranchMetrics/Branch-AIR-ANE-SDK/blob/master/bin/Branch-AIR-ANE-SDK-app.xml).
{% endif %}