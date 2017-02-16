---
type: recipe
directory: basic-setup
title: 2. Dashboard Setup
page_title: Set up your Branch Dashboard
description: Branch's dashboard contains a lot of the logic behind your Branch links.
hide_platform_selector: true
hide_section_selector: true
---
**Estimated Time to Complete**

10-20 Minutes

**Required Personnel**

Product/Marketing Rep (Can optionally be done by an engineer)

**Requires An App Update**

No

The Dashboard setup process is most efficiently done directly on the Dashboard via our onboarding flow. These guides remain here for reference, or in the event that you wish to obtain more context.

## 1. Branch Link Domain

First, you’ll need a special domain for your Branch links. For your convenience, we host the app.link domain and allow you to create a subdomain (e.g. hello.app.link) for that, or we can assign a random four-character subdomain to you. We strongly suggest not using the randomly-assigned subdomain. By white-labelling your Branch links, you dramatically increase their trustworthiness, which helps [improve click-through rate of your links](https://blog.branch.io/do-branded-links-matter/) in places like social media.

## 2. Default Fallbacks

Next, we’ll need to settle on a default behavior for when a user clicks on one of your Branch links and does not have the app installed. Usually this is one of two things:

1. Take them to the store page so they can download my app.
2. Take them to my mobile web site

Bear in mind that this behavior can be changed at any time, and can easily be overridden for each link you generate, but we still want a fallback for the default scenario.

_Some notes on fallbacks:_

Some of our partners who have a strong mobile web presence would rather direct their users to the mobile web instead of directly to the app store, and then use other mechanisms to convert their mobile web traffic into higher-value app users. Read more about our [Journeys Web-to-App Conversion tools]({{base.url}}/features/journeys/overview) to help with these sorts of conversions.

Read more about link fallback behavior best practices.

__What if my app is not in the store yet?__

If you’re testing out Branch before you’ve launched your app, you can set this fallback to a TestFlight, HockeyApp, or other download URL and preserve the deep link through install functionality. There’s no magic that requires you to go through the store first to get this to work! You simply click the link, download the app, then open and we'll take it from there!

## 3. Default Open Graph Data

Open Graph data defines how your links appear when shared via social media. As with fallback behavior, this can be overridden on a per-link basis, but we still need something to display in case this information isn’t set on a link. This includes three pieces of information:

1. An image (often your company logo)
2. A title
3. A description

Here are some examples of how this data will look:

By default, we’ll pull this information based on the fallback URL that you set for your desktop users. If you’d like to set it to something different you can do so.

## Additional Notes

Branch allows you to support two different setups under the same account. The Live/Test switch that’s visible at the top of every page of the dashboard will allow you to switch between the Live setup and your Test setup. Each of these setups will have unique settings, so that if you use a different package identifier during development, for example, you can define that here without having to affect your production build. Analytics on your Test setup won’t show up on your Live dashboard, and vice versa.

{% image src='/img/pages/basic-setup/setup-dashboard/live-test-switch.gif' center alt='The Live/Test Switch on your Dashboard'%}

It’s important to note that links generated on your Test setup will not work if your app is using the Live setup (and vice versa). We’ll dig more into the usage of keys when we walk through the [Mobile SDK Setup]({{base.url}}/basic-setup/setup-mobile-sdk).

__But I also have a QA build and a Dev build and...__

Unfortunately right now an individual account can only have a Live and a Test setup, with all the appropriate settings therein. If you need to support other versions of your app, you can create a second account which will give you two more setups that you can use for testing purposes. Just make sure you’re using the correct key for your testing!

<h3 style="margin-top:0;"><a href="{{base.url}}/basic-setup/setup-mobile-sdk" class="get-started btn btn-primary btn-lg" style="margin-bottom:0;">Next: &nbsp; <br class="visible-md"><strong>Set up the Mobile SDK</strong><i class="material-icons">chevron_right</i></a>
<div class="clearfix"></div>