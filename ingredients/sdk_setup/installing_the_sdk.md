{% section header %}
## Installing the SDK files
{% endsection %}

{% if page.ios %}
With extensive use, the iOS SDK footprint is **180 kb**.

For iOS, the easiest way to install the SDK is via Cocoapods. Add `pod "Branch"` to your podfile and run `pod install` from the command line. However, if you don't use Cocoapods, you can easily download and install our SDK.

- To download an open-source copy, [grab the zip here](https://github.com/BranchMetrics/Branch-ios-sdk) or [clone our repo here](https://github.com/BranchMetrics/branch-ios-sdk).
- You will need to drag and drop the Branch.framework file that you downloaded into your project. Be sure that "Copy items if needed" is selected.
- Import the following frameworks under `Build Phases` for your app target: `AdSupport.framework`, `CoreTelephony.framework`, `CoreSpotlight.framework`, `MobileCoreServices.framework`, `SafariServices.framework`

{% endif %}
<!---       /iOS-specific installing the SDK -->


{% if page.android %}
With extensive use, the Android SDK footprint is **187 kb**.

Just add `compile 'io.branch.sdk.android:library:1.+'` to the dependencies section of your `build.gradle` file.

_alternative #1 - use our .jar:_ In case you'd like to use our .jar instead, here's a [link](https://s3-us-west-1.amazonaws.com/branchhost/Branch-Android-SDK.zip) that always points to our latest. 

_alternative #2 - download our code:_ In case you'd like full control, here is our [Android SDK](https://github.com/BranchMetrics/branch-android-sdk) project, including a full test-suite. Feel free to submodule and import into your workspace.

The testbed project:
https://s3-us-west-1.amazonaws.com/branchhost/Branch-Android-TestBed.zip

Or just clone our github repo (link at top right of this page.)

{% endif %}
<!---       /Android-specific installing the SDK -->

{% if page.cordova %}
The Cordova SDK shares the same code base as the Branch Web SDK, and includes functions to call all of the same API endpoints.

This Web SDK can also be used for Cordova/Phonegap applications.  It is provided as a plugin and can be installed with Cordova plugin or the Plugman tool.  Point the tool at this repositry, https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.  For example:

```sh
cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK
```

{% protip title="For Hybrid apps" %}
Note that this SDK is meant for use with full Cordova/PhoneGap apps.  If you are building a hybrid app using an embedded web view and you want to access the Branch API from native code you will want to use the platform specific SDKs and pass data into Javascript if needed." {% endprotip %}

### Running Cordova Testbed App
This repo includes a sample app, that demonstrates all of the available methods in the Branch Cordova SDK.
Building this app is very simple:

Switch to the Cordova dir
```js
$ cd cordova-testbed
```

Run the init script to install all the required plugins
```js
$ ./init.sh
```

Build the Cordova app and launch in the iOS emulator
```sh
$ cordova emulate ios

For Cordova/Ionic, the easiest way to install the SDK is via the Cordova plugin command line tool. 

- cd into your project directory
- Run `cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK` from the command line

If you're on PhoneGap, you'll need to use us NPM now:

- cd into your project directory
- Run `npm install branch-cordova-sdk` from the command line
{% endif %}

{% if page.xamarin %}
The Branch Xamarin SDK is available as a [NuGet package](https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK). You will need to add the package to your Android, iOS and Forms (if applicable) projects.

- Right click on each project and select Add->Add NuGet Package or double click on the Packages folder to bring up the NuGet package dialog in Xamarin Studio.
- Find the `Branch Xamarin Linking SDK` and select it. This will add the required assemblies to your projects. 
- You need to do this for each project that will use Branch calls. This include the Android and iOS projects even if this is a Forms based app since an initialization call needs to be added to each of the platform specific projects.

[optional] If you would rather build and reference the assemblies directly, you can clone this repository to your local machine and add:

- Add the BranchXamarinSDK project to your solution and reference it from your Android, iOS and Forms (if applicable) project.
- Add the BranchXamarinSDK.Droid project to your solution and reference it from your Android project, if any.
- Add the BranchXamarinSDK.iOS project and reference it from you iOS project, if any.
{% endif %}

{% if page.unity %}

- You can download the package from our [filehost on S3 here](https://s3-us-west-1.amazonaws.com/branchhost/BranchUnityWrapper.unitypackage). Or clone [our repository](https://github.com/BranchMetrics/Unity-Deferred-Deep-Linking-SDK) and access the package from there.

After acquiring the `BranchUnityWrapper.unitypackage` through one of these choices, you can import it into your project by clicking `Assets -> Import Package`.

#### Configure the package and add Branch key

To allow Branch to configure itself, you must add a BranchPrefab asset to your scene. Simply drag into your scene, and then specify your `APP_KEY` and `APP_URI` in the properties.

* `APP_KEY`: This is your Branch key from the dashboard
* `APP_URI`: This is the URI scheme you would like to use to open the app. This must be the same value as you entered in [the Branch link settings](https://dashboard.branch.io/#/settings/link) as well. Do *not* include the `://` characters.

{% image src='/img/ingredients/sdk_setup/unity_branch_key.png' half center alt='unity plugins' %}

#### iOS Note

After building iOS project:

1. All required frameworks will be added automatically
2. Objective C exceptions will be enabled automatically
3. URI Scheme will be added into .plist automatically

#### iOS + Unity 4.6

Branch requires ARC, and we don’t intend to add if checks thoughout the SDK to try to support pre-ARC. However, you can add flags to the project to compile the Branch files with ARC, which should work fine for you. Simply add **-fobjc-arc** to all Branch files.

#### Android Note

Click button "Update Android Manifest" to change or add a android manifest for support deep linking, or you can change Android manifest by your hands. 

*Note that we attempt to automatically add this flag, but check it before building.*
{% endif %}

{% if page.adobe %}
- You download the package from our [filehost on Github here](https://github.com/BranchMetrics/Branch-AIR-ANE-SDK/archive/master.zip). Or clone [our repository](https://github.com/BranchMetrics/AIR-ANE-Deferred-Deep-Linking-SDK) and access the package from there.
- Import the `Branch.ane` into your project. Depending your IDE you might need to import the `Branch.swc` as well.
- Inside your `*-app.xml` be sure to add this line `<extensionID>io.branch.nativeExtensions.Branch</extensionID>`
{% endif %}

{% if page.titanium %}
#### Acquire the files

All the files you need are included in [our repository](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK), so go ahead and clone it.


## Building the iOS and Android Branch SDK Modules in Appcelerator Studio

**This tutorial assumes you are already familiar with the Titanium API, and Titanium modules**

The iOS and Android Branch SDK Titanium modules can be built from their respective `src/` directories:
`src/titanium/BranchSDK/iphone`
`src/titanium/BranchSDK/android`

To build the modules in Appcelerator Studio, they must first be imported into your project, or into a new project.

1. Open the App Explorer view on the left (Window -> Show View -> App Explorer), then click "Import Project".
1. Appcelerator Studio will show a variety of import options. Open the "General" folder, and select "Existing Folder as New Project".
1. Select the Branch Titanium SDK folder by clicking "Browse", and choose `src/titanium/BranchSDK/`, then click "Finish".
1. Select the desired module (iOS or Android) in top left of the Appcelerator Studio, above the App Explorer, and click the green play button.
1. Titanium modules can be built to 3 different output locations. The first option (Titanium SDK), publishes the module to your specific Titanium SDK location. Either wise, you can publish the module to an existing Mobile App project, or a specific location. Publishing the module to a specific location will produce a .zip file.

## Installing the iOS and Android Branch SDK Modules

1. Import the testbed app as an existing mobile project: File -> Import, then in the dialog open the "Appcelerator" folder and chose "Existing Mobile Project".
1. The Branch Titanium testbed: `testbeds/titanium/Branch-Sdk-Testbed/`, requires the built Branch SDK modules prior to running. If you would like to add these to the testbed app, simply chose the testbed app or your local Titanium SDK as the output location (see above for building instructions).
1. Browse to the testbed app directory: `testbeds/titanium/Branch-Sdk-Testbed/`, leave the default settings, and chose "Finish".
1. To launch the testbed app simply select the Android or iOS simulator in the top left of Appcelerator studio, above the App Explorer, then click the green play button.

This will build and launch the testbed app in the respective simulator, and log output to the Appcelerator console.

{% endif %}

{% if page.web %}
### Quick Install (Web SDK)

#### Manual installation

_Be sure to replace `BRANCH KEY` with your actual Branch Key found in your [account dashboard](https://dashboard.branch.io/#/settings)._

**[Formerly App ID](CHANGELOG.md)** Note that for the time being, initializing the Web SDK with an App ID will still work, it is strongly recomended you switch to using your live and test Branch Keys.

{% highlight html %}
<script type="text/javascript">

	(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-v1.8.0.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setIdentity track validateCode".split(" "), 0);

	branch.init('BRANCH KEY', function(err, data) {
    	// callback to handle err or data
	});
</script>
{% endhighlight %}

#### Bower or npm installation

If you use Bower or npm, you can run `bower install branch-sdk` or `npm install branch-sdk` respectively to get the SDK.

#### Common.JS and RequireJS compatibility

In addition to working as a standalone library, the Branch SDK works great in CommonJS environments (browserify, webpack) as well as RequireJS environments (RequireJS/AMD). Just `require('branch')` or `define(['branch'], function(branch) { ... });` to get started!
{% endif %}