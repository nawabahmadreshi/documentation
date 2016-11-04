---
type: recipe
directory: getting-started
title: Twig Universal Linking Validator
page_title: Using the Twig Universal Linking Validator
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

With Apple's introduction of Universal Links in iOS 9.x, Branch links can take users into your app almost instantly. The introduction of Universal Links brings, however, an all new set of configuration complications. The Twig Universal Linking Validator scans the local configuration files, as well as the Branch Dashboard settings, allowing it to pinpoint errors in the Universal Linking configuration. By running the local script, this service can check that:

  - The settings on your Branch Dashboard match those of your Xcode project
  - The entries in your .entitlements file are correct
  - The entries in your info.plist file are correct
  - The .entitlements file has the correct build target selected
  - The Apple App Prefix on your Dashboard matches you Apple Developer ID


{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

## The Twig Script

The script is the most important part of this Universal Linking validator, allowing it to directly check the app's configuration. When directed at your Xcode project, the script gathers the following information for validation:

* The URI scheme(s) entered in your info.plist file
* The Bundle ID of your app
* The Apple Developer ID (Apple App Prefix)
* The Associated Domain(s) entered in the .entitlements file
* The build target selected for your .entitlements file
* The Branch Key(s) entered in your info.plist file

The script does not collect or store:

* Any of your app's code
* Any of your project assets
* Your developer email, or personal information
* Any other information about your app, such as SDK's, app settings, or project structure

Once the configuration information is collected, the script generates and returns a Branch Link that can be used to view the test results.

## Running The Twig Script

Download and extract the [latest version of the script](https://branch.io/resources/twig/static/twigScript/twig_script.sh).

Once the file has finished downloading open a terminal window, navigate to the location of the script, and enter:
{% highlight sh %}
$ bash twig_script.sh
{% endhighlight %}

Then, before executing the script, drag and drop the projects .xcodeproj file into the terminal window (Note that you must use the .xcodeproj file, and not the .xcworkspace file). The command should look like the following:

{% highlight sh %}
$ bash twig_script.sh /Users/jbauer/Desktop/BranchStuff/Branch-TestBed-Swift/TestBed-Swift.xcodeproj
{% endhighlight %}

Upon execution, the script will echo back a message similar to the following:

{% highlight sh %}
#####################################################
 Click the link generated to test your configuration
#####################################################
{"url":"https://twig.app.link/RPyaHjpYJd"}
{% endhighlight %}

Clicking the generated link, or copy & pasting it into a browser, will open the Twig validator and display the test results.

## The Twig Validator

The validator takes the information pulled from the local project files and performs a series of checks and comparisons. If a setting fails the validation tests, the setting will be displayed, alongside the correct value.

In order to keep the Branch app and Xcode project information secure, the validator will require the [Branch Secret](https://dashboard.branch.io/settings) for the app. Once provided, the validator will display the results of the tests.

After running the test for the first time, there will be an option to refresh the results. This button will re-check the dashboard settings. However, if any changes are made to the Xcode project, the local script must be run again.

If you find any issues with the Twig Universal Linking Validator, please reach out to [support@branch.io](mailto:support@branch.io)
{% endif %}
