---
type: recipe
title: "Content sharing"
ios_page_title: iOS Deep Links for Content Sharing
android_page_title: Android Deep Links for Content Sharing
ios_description: How to create deep links programmatically to share content and how to route to content within your iOS app. With objective-c and swift code snippets.
android_description: How to create deep links programmatically to share content and how to route to content within your Android app. With code snippets.
ios_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views, Content Sharing, Content, Routing, SMS, iOS, objective-c, swift
android_keywords: Contextual Deep Linking, Deep links, Deeplinks, Deep Linking, Deeplinking, Deferred Deep Linking, Deferred Deeplinking, Google App Indexing, Google App Invites, Apple Universal Links, Apple Spotlight Search, Facebook App Links, AppLinks, Deepviews, Deep views,Content Sharing, Content, Routing, SMS, Android
platforms:
- ios
- android
- cordova
- xamarin
- unity
- adobe
- titanium
---

{% ingredient quickstart_preview/quickstart_preview %}{% endingredient %}

## Creating links programmatically to share content

{% ingredient sdk_links/creating_links %}{% override header %}{% endoverride %}{% override learn-more%}{% endoverride %}
                                         
{% endingredient %}

{% protip title="Data is for Deeplinking" %}
You use the data to link directly to content! Instead of "property1": "blue", you could pass in "{% if page.ios %}pictureId{% endif %}{% if page.android %}picture_id{% endif %}": "1234", then when a user clicks on a link you can open the app straight to picture with Id 1234. Keep reading...
{% endprotip %}
{% if page.ios or page.android or page.unity %}

{% ingredient sdk_links/tracking_views %}{% endingredient %}

-----

## Sharing Methods (Optional)
{% endif %}
{% ingredient sdk_links/sharing_links %}{% endingredient %}

-----

## Routing to content within your {{page.platform_formatted}} app

{% ingredient sdk_routing/routing %}{% endingredient %}

-----

## Conclusion

What's next?

{% ingredient recipe_preview/advertising_facebook %}{%endingredient%}
{% ingredient recipe_preview/web_to_app %}{% endingredient %}
{% ingredient recipe_preview/text_me_the_app_page %}{% endingredient %}

-----

{% ingredient recipe_preview/contact_us %}{%endingredient%}

