---
type: recipe
directory: features
title: "Support"
page_title: How To Setup iOS9 or Android Universal App Links With Branch
description: "Learn how to enable iOS9 Universal Links on your Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- android
sections:
- overview
- guide
- support
---

| [Overview](overview.md) | [Implementation Guide](implementation-guide.md) | [Reference Material](reference-material.md) | Support | 
| --- | --- | --- | --- |

# Support

### Reference Material
* What Happens to Existing Links 
* Troubleshooting Universal Links
* Understanding the Changes in iOS 9 and 9.2

## What Happens to Existing Links 

### If you use bnc.lt as your domain
Universal Links are of the form `https://bnc.lt/«four-letter-identifier»/«link-hash»`. Existing links created prior to enabling Universal Links are of the form `https://bnc.lt/m/«link-hash»` or `https://bnc.lt/l/«link-hash»` and will continue to function as non-Universal Links.

Aliased links on the bnc.li domain (e.g., `bnc.lt/download`) are not compatible with Universal Links.

### If you use a custom domain
Branch links with custom domains are always enabled for Universal Links, even if generated prior to when you enable the feature

## Troubleshooting Universal Links

1. **Is it definitely a Universal Link?** Universal Links are in the form https://bnc.lt/«four-letter-identifier»/«link-hash». If there is a four letter code between two slashes, then it’s a Universal Link. If it isn’t a Universal Link, follow the above instructions to enable Universal Links, and double check that your Branch Dashboard Settings > Link Settings for iOS have “Enable Universal Links” checked. Note that aliased links such as bnc.lt/link don't work unless you're using a white labeled domain.
2. **Are you testing by manually entering into Safari?** Universal Links don’t work properly when entered into Safari. Use Notes or iMessage for testing.
3. **Are your applinks entitlements correct?** Check Xcode for the correct setup.
4. **Is the entitlements file included for your build target?** It seems that Xcode, by default, will not include the entitlements file in your build. You have to check the box in the right sidebar against the correct target to ensure it’s included in your app.
5. **Do your Team ID & Bundle ID match those on your dashboard?** You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to “Enable Universal Links.” They should match your Team ID and Bundle ID. Team ID can be found here https://developer.apple.com/membercenter/index.action#accountSummary. Your Bundle ID is found in Xcode, in the General tab for the correct build target.
6. **Have you deleted the app and reinstalled it?** iOS does not re-scrape the apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the applinks entitlement, Universal Links will start working for them.)
7 **Universal Links can be disabled, unfortunately.** If you are successfully taken into your app via a Universal Link, you’ll see “bnc.lt” (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages or Notes and choose ‘Open in «App»’.
8. **Using a custom domain?** You may need to update your whitelabeled domain. If you’re using a custom subdomain: update your CNAME to point to custom.bnc.lt and check your Link Settings in the Dashboard. If you’re using a custom root domain: you’ll need to **use CloudFlare to proxy the traffic to Branch.**

## What Changed in iOS 9 and 9.2?

Apple introduced Universal Links in iOS 9.0, as an alternative to the conventional method of JavaScript/URL-scheme link routing. Apple made it impossible to use JavaScript/URL-scheme routing beginning with iOS 9.2, leaving Universal Links as the only supported method. 

We have published a number of resources that can help you understand the changes and how it impacts your app:

* How to Setup Universal Links to Deep Link on Apple iOS 9 - [Original Blog Release](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
* iOS 9.2 Update: [The Fall of URI Schemes](https://blog.branch.io/ios-9.2-redirection-update-uri-scheme-and-universal-links)
* iOS 9.2 Transition Guide - [Original Blog](https://blog.branch.io/ios-9.2-deep-linking-guide-transitioning-to-universal-links)
* Why You Should Use Branch for [Universal Links](https://blog.branch.io/why-you-should-use-branch-for-universal-links)