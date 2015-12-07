
## Use the Test App on the Branch Dashboard

At the top right of the dashboard, for any given app you see "Live" and "Test". Use the "Test" app and be sure that the [Link Settings](http://dashboard.branch.io/#/settings/link) are properly configured. Use this so as to not pollute your production app's Branch data.

To use this app, grab the Branch Key from the test version of your app. {% if page.ios %}Include this Branch Key in your .plist file, labeled `branch_key`.{% endif %}{% if page.android %}You should swap this test key in place of your live key -- it will start with `key_test_`.{% endif %} Be sure to switch to your live key for production!