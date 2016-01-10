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

`cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK`

Or if you want to manage things in NPM, you can use our NPM module:

`npm install branch-cordova-sdk`

### Running Cordova Testbed App
This repo includes a sample app, t
hat demonstrates all of the available methods in the Branch Cordova SDK.
Building this app is very simple:

1. Switch to the Cordova dir: `$ cd cordova-testbed`
2. Run the init script to install all the required plugins
3. `$ ./init.sh`
4. Build the Cordova app and launch in the iOS emulator
5. `$ cordova emulate ios`
{% endif %}

{% if page.xamarin %}
The Branch Xamarin SDK is available as a [NuGet package](https://www.nuget.org/packages/Branch-Xamarin-Linking-SDK). You will need to add the package to your Android, iOS and Forms (if applicable) projects.

- Right click on each project and select `Add` -> `Add NuGet Package` or double click on the Packages folder to bring up the NuGet package dialog in Xamarin Studio.
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

#### Android Module Installation

1. Navigate to the `android/dist` folder (in the root directory of [our repo](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK)) OR [download the zip file of the module](https://s3-us-west-1.amazonaws.com/branchhost/Branch-Titanium-Android-SDK.zip)
2. Extract the contents
3. Copy the `android` folder to your titanium `modules` folder.

#### iOS Module Installation

1. Navigate to the `iphone` folder (in the root directory of [our repo](https://github.com/BranchMetrics/Titanium-Deferred-Deep-Linking-SDK)) OR [download the zip file of the module](https://s3-us-west-1.amazonaws.com/branchhost/Branch-Titanium-iOS-SDK.zip)
2. Extract the contents
3. Copy the `iphone` folder to your titanium `modules` folder.

{% endif %}
