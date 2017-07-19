---
type: recipe
directory: marketing-channels
title: "Criteo"
page_title: "Integrate Branch with Criteo using Universal Ads"
description:
hide_platform_selector: true
sections:
- overview
- guide
- advanced
- support
---

{% if page.overview %}

Branch integrates with Criteo to enable deep linked re-targeting campaigns on the Criteo platform. By using Branch's Universal Ads product to integrate with Criteo, Branch will deep link and postback information to Criteo to further enhance targeting.

{% getstarted %}{% endgetstarted %}

{% elsif page.guide %}


{% prerequisite %}
- To track installs and event, please [integrate the Branch SDK]({{base.url}}/getting-started/sdk-integration-guide) into your app.
- If you want to deep link from your ads directly to content, you should [configure deep link routing]({{base.url}}/getting-started/deep-link-routing).
- The Criteo integration is a part of our Universal Ads product, which is a paid product.
{% endprerequisite %}

## Enable Criteo on Branch Dashboard

Once your prerequisites are complete, navigate to the [Branch dashboard](https://dashboard.branch.io/ads/partner-management) to enable Criteo.

Search for Criteo, and click enable.

TODO: Image of finalized criteo partner here.

## Track Events

Once you've enabled Criteo on the Branch dashboard, you will need to begin tracking events through the Branch SDK. At minimum, we will need to send 5 events to Criteo. These events are View Home, View Listing, View Product, View Basket, and Track Transaction.

When setting these events up in your app, please note that Branch specifically maps your events to Criteo automatically. Here are the mappings:


Branch Event | Criteo Event | Criteo Code | Metadata Passed
--- | --- | --- | --- |
OPEN | View Home | viewHome | ci (User Identity). |
VIEW_CONTENT_ITEMS | View Listing | viewListing | ci (User Identity). product (IDs of listed products) |
VIEW_CONTENT_ITEM | View Product | viewProduct | ci (User Identity). product (ID of single product) |
VIEW_CART | View Basket | viewBasket | ci (User Identity). currency (USD). product (IDs, price, and quantity) |
PURCHASE | Track Transaction | trackTransaction | ci (User Identity). dd (Is attributed to Criteo). nc (New Customer). id (transaction of ID). currency (USD). product (IDs, price, and quantity).


{% elsif page.advanced %}

## All Event Mappings

If you choose to track more events with Branch,

Branch Event | Criteo Event | Criteo Code | Metadata Passed
--- | --- | --- | --- |
INSTALL | Install | viewHome, appLaunch | first_launch (true/false). install_attribution_payload (click id). install_is_attributed (true/false). |
OPEN | View Home | viewHome, appDeeplink | ci (User Identity). deeplink_uri (branchsters://open) |
VIEW_CONTENT_ITEMS | View Listing | viewListing | ci (User Identity). product (IDs of listed products) |
VIEW_CONTENT_ITEM | View Product | viewProduct | ci (User Identity). product (ID of single product) |
VIEW_CART | View Basket | viewBasket | ci (User Identity). currency (USD). product (IDs, price, and quantity) |
PURCHASE | Track Transaction | trackTransaction | ci (User Identity). dd (Is attributed to Criteo). nc (New Customer). id (transaction of ID). currency (USD). product (IDs, price, and quantity). |
ACHIEVE_LEVEL, COMPLETE_TUTORIAL | UI Level | vs | ci (User Identity). ui_level (Integer). |
UNLOCK_ACHIEVEMENT | UI Achievement | vs | ci (User Identity). ui_achievement (String). |

## Country Level Redirects

TODO: Once we decide how we will support this.

{% elsif page.support %}

{% endif %}
