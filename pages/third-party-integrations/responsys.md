---
type: recipe
directory: third-party-integrations
title: Responsys Integration
page_title: Automatically convert your email links into multi-platform deep links.
description: Add powerful, best in class deep linking to your email campaigns.
keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Deep Linked Email
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
---

{% if page.overview %}

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email.png" center full alt='With and Without Branch Deep Linked Email' %}

With a script provided by Branch, you can dynamically create Branch links in email. In any place the script is called, the web URL is converted into its corresponding Branch link. The email is then sent.

When a link is clicked by a user without the app, it will route that user to the original web URL (including on desktop). When a link is clicked by a user with your app, it will direct that user into the relevant in-app content regardless of platform or email client.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

{% prerequisite %}
You must have an EMD (Email Message Designer) enabled account in order to use the Branch integration. If you do not have one, or if you’re not sure, please talk to your Responsys Account Manager.
{% endprerequisite %}

## One time setup

### Enable remote deep linking functionality 

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) to enable remote deep linking functionality. 

{% caution title="Ensure compatibility on iOS 9+ with Responsys" %}
In most cases deep linking on iOS 9+ devices requires Apple’s Universal Link technology. Branch will provide you with almost everything you need, but Responsys will have to host an apple-app-site-association file over a secure connection for the click tracking domain.

Don’t worry, your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) will help you with this step as well. 
{% endcaution %} 

## On-going use

Once you’ve completed the one time setup steps, it’s time to send your first email. 

Branch’s script will convert your web URLs to deep links. Simply identify the links you want to deep link with Branch and your Branch Account Manager will help you get set up. 

### Prepare your template

To use the Branch deep link generator, you must make a small change to the document templates that you use for your emails.

Copy the following snippet, and using the “Source” view, paste the snippet directly under the `<html>` tag for every template you plan to add deep linking to. 

Add the link given to you as the branch_base_url value.

~~~~
<#include "cms://contentlibrary/Branch_SDK/branch-sdk.htm"><#assign branch_base_url='https://bnc.lt/AT6n/3p?%243p=rs&%24original_url='>
~~~~

### Create deep links 

Once you create the email, and identify the original link, Branch will convert those original links into Branch Links. Responsys identifies the Branch links and turns them into click tracking urls. The email is then sent.

{% example title="With Link Tracking Disabled" %}
Creating deep links is simple. Wherever you are using `<a>` tags in your email templates, replace those with `<@deeplink>` tags, or `<@tracked_deeplink>`

**Before:**

`<a href=“https://branch.io”>Example link</a>`

**After:**

`<@deeplink “https://branch.io”>Example link</@deeplink>`
{% endexample %}

{% example title="With Link Tracking Enabled" %} 
With link tracking enabled, you can still use Branch links in emails. 

**Before:**

`<a href="https://branch.io/product/1234">Example link</a>`

**After:**

{% highlight html %}
<@tracked_deeplink "https://branch.io/product/1234">
<a href="${clickthrough('TEST_TRACKED_DEEPLINK' , 'deeplink=' + deeplink)}">Example link</a>
{% endhighlight %}
{% endexample %}

{% elsif page.advanced %}

## One time setup 

### Enable remote deep linking functionality

After you contact your Branch Account Manager to enable remote deep linking functionality, the remote configuration page will be unlocked. On this page you can input settings to control a custom deep link remotely. 

{% example title="Link & Secret Key" %} 
You will be provided with a custom link format that will look like this:
'https://bnc.lt/AT6n/3p?%243p=rs&%24original_url=''

As well as a Branch secret key that looks like this:
'HoRywe971pl569DMpU1RzbRTap4ewnbNeqEcisz4FjQ=''
{% endexample%}

### Upload the Branch deep link conversion file to Responsys

As part of your one-time setup, Responsys will have to host an apple-app-site-association file over a secure connection for the click tracking domain.

Navigate to your Content Manager, and under “All Content,” create a new folder called “Branch_SDK.” In that folder, create a new document called “branch-sdk.”

Paste the following code snippet into the file, and put your secret key in it:

~~~~
<#macro deeplink link_to_be_wrapped><#assign branch_hash_secret="fake secret"><#assign final_link=branch_base_url + link_to_be_wrapped?url('ISO-8859-1')><#assign hash=messagedigest(branch_hash_secret+final_link+branch_hash_secret,"SHA","hex")><#assign final_link=final_link+'&%24hash='+hash><a href="${final_link}"><#nested></a> </#macro> 
<#macro tracked_deeplink link_to_be_wrapped><#assign branch_hash_secret="enter your secret key"><#assign deeplink=branch_base_url + link_to_be_wrapped?url('ISO-8859-1')><#assign hash=messagedigest(branch_hash_secret+deeplink+branch_hash_secret,"SHA","hex")><#assign deeplink=deeplink+'&%24hash='+hash></#macro>
~~~~

{% example title="Create a Folder for the Branch SDK" %}
{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-create-doc.png" half center alt='Example Create Folder' %}
{% endexample%}

{% example title="Your file structure should look as follows" %} 
{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-manage-content.png" half center alt='Example Manage Content' %}
{% endexample%}

### Redirect behavior and tracking

When your customer clicks the click tracking link in an email, the browser will generally open. Once in the browser, the click tracking redirect will happen, followed by an instant redirect to the Branch link. At this point, Branch will either stay in the browser, and load the original URL (if the app is not installed, or the customer is on a desktop device), or Branch will open the app and deep link to content. Branch uses the information from the original URL to deep link to the correct in-app content. 

{% protip title="Universal Links on iOS 9+" %}
There is an alternate case where Universal Links are concerned on Apple iOS 9+ devices. In the case of Universal Links, the app will open immediately, without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will robotically “click” the link, registering the click with the ESP, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. 
{% endprotip %}

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-post-click.png" center full alt='Deep Linked Email Post-Click Flow' %}

{% elsif page.support %}

## How does link creation work?

### Three stages of a link

| Link name| Link example | Link description 
| --- | --- | --- | --- 
| Original link | https://www.shop.com/product | This is the original link that you would put in an email. If emails are dynamically personalized, this will be the link that is filled in by the personalization engine.  
| Branch link | https://branch.shop.com/?original_url=https%3A%2F%2Fwww.shop.com%2Fproduct | A Branch deep link, that handles all redirection for users on any platform, with or without the app.
| Click Tracking URL | https://email.shop.com/click/abcde12345 | A Responsys generated click tracking URL. The URL doesn’t signify anything, but when clicked, records the click and redirects to a given destination.

{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-creation-flow.png" center full alt='Deep Linked Email Creation Flow' %}

## Styling
If you include style tags within your `<a>` tags, you’ll need to separate those out into a separate div inside the `<@deeplink>` tag. If you use tracked links with `<a>` tags, those will work fine.

{% example title="Style Tags within your anchor tags" %} 

**Before:**

{% highlight html %}
<a href="https://branch.io/" style="color:#000001; text-decoration:none;">Branch Website</a>
{% endhighlight %}

**After:**

{% highlight html %}
<@deeplink "https://branch.io/"><div style="color:#000001; text-decoration:none;">Branch Website</div></@deeplink>
{% endhighlight %}

{% endexample%}

## Launch failed error
You’ll see this error if you haven’t included the '<#import >'' snippet in your template. 

{% example title="Launch failed error" %} 
{% highlight objc %}
Launch Failed: Launch failed: Template /contentlibrary/branch test campaign/My Default Template.htm caused an execution error: on line 183, column 92 in cms://contentlibrary/branch test campaign/Content.htm: deeplink is not a user-defined directive. It is a freemarker.template.SimpleScalar
{% endhighlight %}
{% endexample%}

## Using dynamic data from profile extension tables
{% example %}
The '<@deeplink >' and '<@tracked_deeplink >'' tags even work with dynamic links injected via RPL.
{% highlight objc %}<@deeplink “${latestProduct.url}”>${latestProduct.name}</@deeplink>{% endhighlight %}
{% endexample%}

## Universal links and click tracking
For Universal Links to work, Apple requires that a file called an “Apple-App-Site-Association” (AASA) file must be hosted on the domain of the link in question. When the link is clicked, Apple will check for the presence of this file to decide whether or not to open the app. All Branch links are Universal Links, because we will host this file securely on your Branch link domain.

When you click a Branch link directly from an email inside the Mail app on iOS 9+, it functions as a Universal Link - it redirects directly into the desired app. However, if you put a Branch Universal Link behind a click tracking URL, it won’t deep link into the app. This is because generally, a click tracking URL is not a Universal Link. If you’re not hosting that AASA file on the click tracking URL’s domain, you aren’t going to get Universal Link behavior for that link.

{% protip title="iOS 9+ Redirect Failure" %}
When a normal click tracking URL is clicked, it redirects to a Branch Universal Link. However, due to an Apple-imposed technical limitation, Universal Links won’t work behind a redirect. So, generally, when click tracking is enabled, Universal Links won’t work - the user always falls back to mobile web, even if they have the app.  

**Solution** 

To solve this, Responsys will host the AASA file on your click tracking domain. We’ll help you get set up with this, but it’s Responsys who will actually host the file. 
Apple requires that the file is hosted on a “secure” domain. To qualify as secure, the domain must have a website security certificate. Branch will provide the file to Responsys, but you must provide the security certificate to the Responsys.
{% endprotip %}
 
{% image src="/img/pages/third-party-integrations/responsys/deep-linked-email-universal-links.png" center full alt='Deep Linked Email Universal Links' %}

## Coming Soon: “Don’t Deep Link”
In some cases you may have content on web that isn’t in the app - for example, a temporary Mother’s Day promotion. In this case, ideally you would be able to specify in the email that that link should not deep link. Using an alternate domain or path would be the best solution to arrive at this desired behavior, as Universal Links will not parse individual URLs for information without changes being made in the AASA file that specify unique paths. 

We're working with Oracle Responsys to identify a solution for this.

{% endif %}