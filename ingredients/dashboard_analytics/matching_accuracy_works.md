
## How does Branch matching work?

There are _three_ mechanisms by which we pass data through to the app and attribute app sessions back to the source:

1) Direct deep linking

If the app is currently installed on the phone, and you've configured your Branch links with your app's URI scheme (myapp://), we will open the app immediately and pass a click identifier through to our native library. This click identifier is then sent to the Branch servers to retrieve the dictionary of data associated with the link.

For example, we'd call _myapp://open?link_click_id=123456_ to open the app immediately. The Branch native library parses out link_click_id: 123456 and passes it back to the Branch API to retrieve the link associated with that link click.

2) 100% match browser-app profile hit

When a user clicks a Branch link for your app, and we've seen them click a link for another app on our network, we've already matched them up to a corresponding device identifier. This means that when they install the app, we know with 100% certainty that they just came from that link click.

The fact that we have such a global network of apps with hundreds of millions of users clicking links, means that when you join the platform, you can benefit from the crowd-sourced accuracy gained through all our apps contributing the browser-app profiles. 

3) 100% match techniques per platform

We've built out custom deep linking mechanisms that are specific to each platform to ensure that deep linking is accurate. Here are some of those techniques we use:

- Facebook deferred deep linking API

We've built a custom integration with Facebook where if a user originates from an app invite or advertisement, we connect with Facebooks API to know with 100% certainty if the install originated from this source. You'll need to authenticate with Facebook on the Branch dash if you want to support this.

- Android Google Play referrer

Google Play supports passing a referrer through the install process that we listen for. It's notoriously unreliable and currently unsupported when redirecting from Chrome. However, we'll use it when available.

- iOS 9 Safari cookie passthrough

We built a custom technique into our latest iOS SDK that will guarantee 100% accuracy on iOS 9 if you include SafariServices.framework in your app. We recommend that you do so.

4) Browser to app fingerprint match

Branch collects information about devices both when a user is in the browser -- via a click on a Branch link -- and then after they open the app. This information includes **IP Address**, **OS**, **OS version**, **device model** and other parameters. This is the user's **_digital fingerprint_** and can be obtained in the browser and in the app.

We match the unqiue fingerprint collected in the app to the unique fingerprint collected in the browser to determine where user originated from if the prior two mechanisms were not used.
