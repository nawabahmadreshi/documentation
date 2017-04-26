---
type: recipe
directory: other
title: "Template Page"
page_title: "A template for Branch documentation pages"
description: Use this file as a template when creating new pages for the Branch documentation portal.
keywords: Branch, Template, Documentation, Docs, Documentation Template,
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
sections:
- overview
- guide
- advanced
- support
- custom-1
- custom-2
hide_platform_selector:
- advanced
- custom-2
contents:
  list:
  number:
    - advanced
  hide:
    - custom-2
exclude_from_google_search: true
---

<!--
Be sure to

	1. Fill in the correct "directory"
	2. Remove "exclude_from_google_search: true"

above before publishing!
-->

{% if page.overview %}

What this feature does and why you might want it, like the dust jacket blurb on a book.

{% getstarted title="Get started with my title" %}{% endgetstarted %}

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}

<!--Use this if the only prerequisite is integrating the SDK-->
{% ingredient quickstart-prerequisite %}{% endingredient %}

<!--Use this to specify more complex prerequisites-->
{% prerequisite title="Do these things first" %}
You need to do these things before you can implement this:

- Thing one
- Thing two

{% endprerequisite %}

## The first thing to do

Simple, step-by-step instructions to implement this feature.

1. First step
1. Second step
1. Third step with code example:

{% if page.ios %}

Content for iOS only!

{% tabs %}
{% tab objective-c %}
{% highlight objc %}

// Objective C code here

{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}

// Swift code here

{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}


{% if page.android %}

Content for Android only!

{% highlight java %}

// Java code here

{% endhighlight %}

{% endif %}


{% if page.cordova %}

Content for Cordova/Ionic only!

{% highlight js %}

// JavaScript code here

{% endhighlight %}

{% endif %}


{% if page.android %}

Content for Xamarin only!

{% highlight c# %}

// C# code here

{% endhighlight %}

{% endif %}


{% if page.unity %}

Content for Unity only!

{% highlight c# %}

// C# code here

{% endhighlight %}

{% endif %}


{% if page.adobe %}

Content for Air ANE only!

{% highlight java %}

// Java code here

{% endhighlight %}

{% endif %}


{% if page.titanium %}

Content for Titanium only!

{% highlight js %}

// JavaScript code here

{% endhighlight %}

{% endif %}

## The next thing to do

More simple, step-by-step instructions to implement this feature.

{% image src='/img/pages/features/template/sampleimg.png' full center alt='This is a non-existent sample image' %}

{% protip title="This is a tip!" %}
What a cool tip, right?
{% endprotip %}

{% caution title="Watch out for this!" %}
Don't miss this. It's important.
{% endcaution %}

{% example title="Try it this way!" %}
A cool way to use this feature. Give it a go.
{% endexample %}

## The third thing to do

{% getstarted next='true' %}{% endgetstarted %}

{% getstarted title='My title' next='features/deepviews' %}{% endgetstarted %}

{% elsif page.advanced %}

## Advanced topic 1

## Advanced topic 2

{% elsif page.support %}

## Support topic 1

## FAQ

##### Question 1
A helpful answer

##### Question 2
Another helpful answer

{% elsif page.custom-1 %}

## Custom 1 topic 1

## Custom 1 topic 2

{% elsif page.custom-2 %}

## Custom 2 topic 1

## Custom 2 topic 2

{% endif %}