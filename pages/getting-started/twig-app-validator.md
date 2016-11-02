---
type: recipe
directory: getting-started
title: Twig App Configuration Validator
page_title: Using the Twig Configuration Validator
description: "Learn how to make use of the Twig Validator to validate your Universal Linking setup"
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Dashboard, custom link domain, conversion funnel, funnels, influencers
hide_platform_selector: true
hide_section_selector: false
sections:
- overview
- guide
---
{% if page.overview %}

## About Twig

Setting up Universal Links can be hard, with lots of places for the configuration to go wrong. With few other options, you may end up spending hours looking for an issue that may be as simple as a typo. Now, Twig can do all the work, letting you find the exact problem with your Universal Linking settings in seconds. By running the local script, the service can check that:

  - The settings on your Branch Dashboard match those of your Xcode project
  - The entries in your .entitlements file are correct
  - The entries in your info.plist file are correct
  - The .entitlements file has the correct build target selected
  - The Apple Developer ID matches the Apple App Prefix on your Dashboard

> The overriding goal for Twig
> is to make it as easy
> as possible to get Universal Linking working for your app.
> Getting users inside of your app is one of the most important parts
> of a deep link. If your Branch links don't open the app, it can severely hurt
> the user's experience. The less time you spend setting up Universal Links,
> the more time you can work on an amazing app for your users.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## The Twig Script

The Twig script is the most important part of this Universal Linking validator; it allows the validator to tell you exactly what the problem is. When directed at your Xcode project, the script gathers the following information:

* The URI scheme(s) entered in your info.plist file
* The Bundle ID of your app
* The Apple Developer ID (Apple App Prefix)
* The Associated Domain(s) entered in the .entitlements file
* The build target selected for your .entitlements file
* The Branch Key(s) entered in your info.plist file

The Twig script does not collect or store:

* Any of your app's code
* Any of your project assets
* Your developer email, or personal information
* Any other information about your app, such as SDK's, app settings, or project structure

Once the configuration information is collected, the Twig script sends it to Branch and returns a short-link so you can see the validator's results.

## Running The Twig Script

Download and extract the [latest version of the script](http://twig.stage.branch.io/static/twigScript/twig_script.sh).

Once the file has finished downloading, open a terminal window and navigate to the location of the script. Once there, type the following command into terminal:
{% highlight sh %}
$ bash twig_script.sh
{% endhighlight %}
Then, before you run the script, drag and drop your .xcodeproj file into the terminal window. This ensures the script will be running on the correct project (Note that you must use the .xcodeproj file, and not the .xcworkspace file). Your command should look something like the following:

{% highlight sh %}
$ bash twig_script.sh /Users/jbauer/Desktop/BranchStuff/Branch-TestBed-Swift/TestBed-Swift.xcodeproj
{% endhighlight %}

Upon hitting enter the script will run, and echo back a message similar to the following:


{% highlight sh %}
#####################################################
 Click the link generated to test your configuration
#####################################################
{"url":"https://twig.app.link/RPyaHjpYJd"}
{% endhighlight %}

Clicking the generated link, or copy & pasting it into you browser, will take you to the Twig validator, where you can see the results of the test.

## The Twig Validator

The Twig validator takes the information pulled from your project and runs it through a series of checklists and comparisons. This allows the validator to determine if anything is configured incorrectly. If something needs to be changed to get your Universal Links working properly, Twig will tell you what needs to be changed, and even what value it should be set to.

In order to keep all of your Branch app and Xcode project settings secure, you will be required to enter the [Branch Secret](https://dashboard.branch.io/settings) for your app. Once you do, the Twig validator will display the results of the validation tests.

After running the test for the first time, you will have an option to refresh the results. This button will recheck the settings on your dashboard, and update the results. However, if you make any changes to your Xcode project, you will need to re-run the Twig script.

If you find any issues with the Twig script or validator, please reach out to [support@branch.io](mailto:support@branch.io)
{% endif %}
