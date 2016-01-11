---
type: recipe
directory: features
title: "iOS9/6.0 Universal/App Links TEST overview"
page_title: How To Setup iOS9 or Android Universal App Links With Branch
description: "Learn how to enable iOS9 Universal Links on your Branch deeplinks for tracking and deep linking."
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
platforms:
- ios
- android
---

| [Overview](overview.md) | [Implementation Guide](implementation-guide.md) | Reference Material | [Support](support.md) | 
| --- | --- | --- | --- |

# Reference Material

### Reference Material
* SSL and Custom Domains
* Which Apps/Browsers Support Universal Links

## SSL and Custom Domains
The following error message will appear in your OS-level logs if your domain doesn’t have SSL set up properly:

```
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
```

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the “up” arrow in the bottom left corner of the main view.

To troubleshoot this problem, start by ensuring that you have properly **configured your custom domain.**


## Which Apps/Browsers Support Universal Links
Unfortunately, Universal Links don’t work quite everywhere yet. We’ll maintain this list and keep it up to date. *Last updated 12/12/15.*

| App/Browser | Status |
| --- | --- |
| Messages | works |
| Slack | works |
| Mail | works |
| Safari | works conditionally * |
| Chrome | works conditionally * |
| Google | not working |
| Facebook | not working |
| Twitter | not working |
| Gmail | not working |
| Pinterest | not working |
| FB Messenger | not working |
| Inbox | not working |

*Note: Conditionally working means that it works (i.e., opens the app) some of the time:*

* Universal Links will not work if you paste the link into the browser URL field.
* Universal Links work with a user driven `<a href="...">` element click *across domains*. Example: if there is a Universal Link on google.com pointing to bnc.lt, it will open the app.
* Universal Links will not work with a user driven `<a href="...">` element click on the *same domain*. Example: if there is a Universal Link on google.com pointing to a different Universal Link on google.com, it will not open the app.
* Universal Links cannot be triggered via Javascript (in `window.onload` or via a `.click()` call on an `<a>` element), unless it is part of a user action.