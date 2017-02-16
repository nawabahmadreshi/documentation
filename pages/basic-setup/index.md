---
type: landing
directory: basic-setup
title: "Basic Setup"
page_title: "Getting started with Branch"
description: "Getting started with Branch"
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Android App Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, iOS9
hide_platform_selector: true
hide_section_selector: true
---

**Estimated Time to Complete**

1-2 Hours

**Required Personnel**

Product/Marketing Rep (Dashboard setup. Can optionally be done by an engineer)
Mobile Developer (Mobile SDK setup)
Web Developer (Web SDK setup)

**Requires An App Update**

Yes

## Overview
Branch is a linking platform that connects users to the in-app content they desire. The most engaging interactions occur within your app, but due to varying standards across browsers, channels, and operating systems, linking into apps is broken. With Branch, your links will work across your entire mobile marketing ecosystem, fostering optimal user experience and providing rich attribution data.

The future of mobile marketing lies in your ability to deliver a unified experience. Your platforms and teams are duplicating spend and metrics working in silos between web and app, and your users are feeling the disconnection as well. Branch is revolutionizing mobile marketing by unifying your worlds, allowing you to see your user’s path to conversion across platforms and channels as one holistic picture, covering:

- Web to App Conversion
- Deep Linked Emails
- Deep Linked Ads
- Content Sharing
- Install Attribution
- Search (Google Search, Spotlight Search)
- Social Media

We also recognize that the specialization of some providers affords you certain benefits. That’s why Branch gives you the power to automatically send your Branch attribution data to these providers with a few clicks on our dashboard.

The core functionality of Branch requires a few things in order to work. This guide is intended to walk you through them in order.

- Dashboard Setup
- Mobile SDK Integration
- Web SDK Integration and Additonal Web Setup
- Testing

### After this...
- You will be able to create links from the dashboard, which when clicked...
    + Will take users who have the app directly to the app and route them to the appropriate content.
    + Will take users who do not have the app either:
        * Take users to the appropriate App/Play Store and route them to the appropriate content post-install.
        * Take users to your mobile web site.
- You will be able to see the effectiveness of your dashboard links.

## How Do I Get Started?
To get up and running with Branch you will need, at the very least:

- An app developer
- An app

Depending on which features of Branch you wish to use, you may also need:

- A web developer
- A mobile product manager
- An email marketing manager

## Taking Stock

Before going further, let's take stock of what you have already.

**My App Already Does Deep Linking**

That at least partially solves a major step: routing logic. A traditional deep link usually looks something like this:

`my-app://product/12345`

Your routing logic takes the path (e.g. product/12345) and figures out where in the app to go. Branch can tie into that, but you’ll need to change things a little bit to accommodate some edge cases like deep linking through install. We’ll go through that in the next section.

**Universal Links Are Already Set Up On My Website**

Those links will continue to function as normal, and take your users to the app if they already have it installed. Branch links can live alongside your existing Universal Links and actually drive your users to the app even if they don’t have it installed!

**I’ve Got Facebook App Link Tags On My Website**

That means that you probably also have deep linking! Facebook App Links allow you to put tags in your html that can tell other systems how to deep link to that same page within the app.

**I Don't Have a Mobile Website (Yet)**

Not a problem! Branch has [Deepviews]({{base.url}}/features/deepviews/overview) which can act as simple web pages to back your Branch links. We can get into that later.

**My App Isn't In The App Store (Yet)**

That’s fine! You’ll still be able to test out Branch’s functionality, and you’ll be able to leverage all that Branch has to offer to help drive the growth of your app from the beginning!

<h3 style="margin-top:0;"><a href="before-getting-started" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;"><br class="visible-md"><strong>Let's Go!</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>