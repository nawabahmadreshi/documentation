{% if page.ios %}
### PList configuration

#### Add your Branch key

Your app key can be retrieved on the [Settings](https://dashboard.branch.io/#/settings) page of the dashboard. Now you need to add it to YourProject-Info.plist (Info.plist for Swift).

1. In plist file, mouse hover "Information Property List" which is the root item under the Key column.
1. After about half a second, you will see a "+" sign appear. Click it.
1. In the newly added row, fill in `branch_key` for its key, leave type as String, and enter your app key obtained in above steps in its value column.
1. Save the plist file.

#### Configure for deep linking

To set up your URI Scheme, you'll need to open your project in XCode and complete the following.

1. Click on YourProject-Info.plist on the left (or in Swift, Info.plist).
1. Find URL Types and click the right arrow. (If it doesn't exist, right click anywhere and choose Add Row. Scroll down and choose URL Types)
1. Add `myapp`, where _myapp_ is a unique string for your app, as an item in URL Schemes as below:

{% image src='/img/ingredients/configuring_the_client/ios_uri_scheme.png' half center alt='URI in plist' %}


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

{% if page.cordova or page.xamarin or page.unity or page.titanium %}
### Configure iOS for deep linking

{% if page.unity %}
**Note this is only if you want to change it manually, but this is automatically configured for you.
{% endif %}

To set up your URI Scheme, you'll need to open your project in XCode and complete the following.

1. Click on YourProject-Info.plist on the left (or in Swift, Info.plist).
1. Find URL Types and click the right arrow. (If it doesn't exist, right click anywhere and choose Add Row. Scroll down and choose URL Types)
1. Add `myapp`, where _myapp_ is a unique string for your app, as an item in URL Schemes as below:

{% image src='/img/ingredients/configuring_the_client/ios_uri_scheme.png' half center alt='URI in plist' %}

### Configure Android for deep linking

{% if page.unity %}
**Note this is only if you want to change it manually, but this is automatically configured for you.
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

#### on iOS

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