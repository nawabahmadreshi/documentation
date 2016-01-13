---
type: recipe
title: "Apptimize"
page_title: Deep link users through install, and test the best user flow automatically.
description: Branch has partnered with Apptimize to seamlessly A/B test user flows after a deeplink click from Branch. 
keywords: abtesting, apptimize
platforms:
- ios
- android
---

# Apptimize and Branch

We've partnered with Apptimize to seamlessly provide different onboarding flows for users arriving through Branch links. You can design and test different user flows based off the data a Branch deeplink returns to you. 

Have a theory that users clicking Branch links right into a product page convert better than users clicking Branch links but must authenticate first? With our integration, you can define, measure, and prove your hypothesis!

{% protip title="Still need to integrate Branch?" %}This guide assumes that you have already integrated Branch. If you need to integrate Branch still, jump to "[Integrating the SDK](/recipes/add_the_sdk/ios/)".
{% endprotip %}

## How It Works

Currently, both the Branch and Apptimize SDK are required to be integrated inside your mobile application. Right now, you can define a campaign on Apptimize's dashboard, and have it filter and segment on values that come from the deeplink data of a Branch link. The easiest way to do this is to have an Apptimize call to send data inside the Branch initSesssion callback. **However, as long as Apptimize is aware of Branch data before an experiment is ran, you can define this however you'd like.**

## Use Case & Benefits

With Branch and Apptimize, you can effectively segment and measure your users coming from deeplinked campaigns, and figure out what the best UX flow is for your users. Here's a sample flow chart that may convert at different rates:

![flowchart](/img/recipes/apptimize/campaign-flow.png)

You'll also add organic segments to your Apptimize dashboard. With Branch, your organic users will increase, and you'll want to make sure Apptimize is aware. With Apptimize's toolset, you can filter and figure out how your organic users stack against users from other channels.

## Set Up Apptimize

This guide assumes you have an account with Apptimize already. If not, please go to the [Apptimize dashboard](https://apptimize.com/admin/sign-up?p=20) and register for an account. Once there, [install](https://apptimize.com/admin/help) the SDK. For this guide, we will assume the following as the example:

- You're using Branch links on Facebook, to drive downloads to your app
- Your app is an e-commerce app specializing in shoes, and your goal is raise conversions on purchases
- You're not sure if presenting the product itself (in this case, shoes) first, then asking a user to register converts higher, or the opposite order, where a user must authenticate first, then be presented the shoes.

### Configure An Apptimize Campaign

Now that you've imported the Apptimize SDK into your project, it's time to think through and define what your users will see when they click a Branch link and get taken to your app.

![campaign](/img/recipes/apptimize/campaign-creation.png)

*You'll notice the campaign name as Branch Experiment, and different variants. Each variant corresponds to a different piece of code executed, e.g. someone sees a full listing of products instead of a single product*

### Set Targeting (Apptimize dashboard)

Next, you'll need to segment users based off *custom attributes* on the Apptimize dashbaord. This is done using {% if page.ios %}`[Apptimize setUserAttributeString: forKey:]`{% endif %}{% if page.android %} `Apptimize.setUserAttribute("Key", "Value")` {% endif %}, which we'll explain in the section below. In the future, Apptimize will import Branch data, so that you may bypass this step.

For now, we have set a **custom attribute** of channel, and value of **facebook**, meaning that if someone comes from a Branch link with the channel set to Facebook, they will automatically be a part of your campaign, and subject to different flows you've defined. You can choose any custom attribute value.

![targeting](/img/recipes/apptimize/campaign-targeting.png)

### Set Targeting (Code)

Once you've completed the previous steps, we have two remaining items left before you're set in testing all your user flows. You'll first need to define *where* you define a user attribute from the earlier step. Branch recommends setting this based off the callback found inside your {% if page.ios %}`AppDelegate.m`{% endif %}{% if page.android %} `BaseActivity` or `SplashActivity`{% endif %}, but you can do it anywhere. We provide examples of both:


{% if page.ios %}

#### AppDelegate.m

This would be the easiest, as you simply define who the user is if they came from a Branch link.

{% highlight objc %}

-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    // Initalize Branch and register the deep link handler
    // The deep link handler is called on every install/open to tell you if the user had just clicked a deep link
    Branch *branch = [Branch getInstance];
    [branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error){

        // set Attribute inside callback
        if ([params objectForKey:@"channel"] != nil) {
            [Apptimize setUserAttributeString:@"facebook" forKey:@"channel"];
        }

        [Apptimize runTest:@"Branch Experiment" withBaseline:^{
            // baseline
            UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
            AuthViewController *vc = [[AuthViewController alloc] init];
            [navController setViewControllers:@[vc] animated:YES];
        } andVariations:@{@"Call-to-Action variant": ^{
            UINavigationController *navController = (UINavigationController *)self.window.rootViewController;
            ProductViewController *vc = [[ProductViewController alloc] initWithItem:[params objectForKey:@"product_id"]];
            [navController setViewControllers:@[vc] animated:YES];
        }}];
    }];
}
{% endhighlight %}
{% endif %}

{% if page.android %}

#### Activity#onCreate()

The easiest thing to do is to set your experiment up after you've successfully initiailized a session with Branch.

{% highlight java %}

    Branch branch = Branch.getInstance();
    branch.initSession(new BranchReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, BranchError error) {
            if (error == null) {
                if (referringParams.has("facebook")) {
                    Apptimize.setUserAttribute("channel", "facebook");
                }

                Bundle extras = new Bundle();
                try {
                    extras.putString("product_id", referringParams.getString("product_id"));
                } catch (JSONException e) { //no-op }

                Apptimize.runTest("Branch Experiment", new ApptimizeTest() {
                    @Override
                    public void baseline() {
                        // take user through auth flow, then product
                        startActivity(new Intent(getApplicationContext(), AuthActivity.class), extras)
                    }

                    @SuppressWarnings("unused")
                    public void variation1() {
                        // Variant: Take user directly to product
                        startActivity(new Intent(getApplicationContext(), ProductActivity.class), extras)
                    }
                });
            }
        }, this.getIntent().getData(), this);
{% endhighlight %}

{% endif %}

As you may have noticed from earlier screen shots, the {% if page.ios %}`[Apptimize runTest: withBaseline: andVariations:]`{% endif %}{% if page.android %} Apptimize.runTest("Branch Experiment", ...){% endif %} takes the parameters we have defined from campaign creation. The `runTest` parameter takes the string *Branch Experiment*, which corresponds to what we named our campaign inside the Apptimize dashboard. The baseline and variation values correspond to the string value specified in the campaign dashboard, as well.

#### Save a goal

Like Branch, you can track events with Apptimize. You'd do this to measure conversions from different flows; an appropriate goal to track here would be purchases from the initial product.

You'd save a goal like so:

{% if page.ios %}

{% highlight objc %}

[Apptimize track:@"completed_purchase"];

{% endhighlight %}

{% endif %}

{% if page.android %}

{% highlight java %}

Apptimize.track("completed_purchase");

{% endhighlight %}

{% endif %}

## FAQ / Testing

After setting the campaign up, you're on your way to testing user flows. In order to test different flows from a Branch link click, we recommend the following steps:

- Run your app locally on the XCode simulator / local Android Phone
- Take the Branch link you'll be testing and copy and paste inside the simulator / local Android Phone
- Run the application afterwards
- Once you've tested the code block, hit 'Reset Content and Settings' inside the iOS simulator or Reset Google IDFA
- Repeat to try your second variation

**My code variations aren't showing!**

One thing to note is that it takes **10** minutes to propogate a campaign change. Please check after 10 minutes.

**How do I tell Apptimize about my Branch channel data?**

Currently, the easiest way to do this is to define it before you release a campaign. After you create a branch link and know your segment, tell Apptimize about it through the SDK, and then you can filter on it. This will be modified.
