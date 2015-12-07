
You can define the deep link metadata in the `Branch Universal Object` that you'll create before creating a deep link.

{% if page.ios %}

{% tabs %}
{% tab objective-c %}
{% highlight objective-c %}
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

// Add the custom deep link keys and values as metadata
[branchUniversalObject addMetadataKey:@"product_picture" value:@"12345"];
[branchUniversalObject addMetadataKey:@"user_id" value:@"6789"];
{% endhighlight %}
{% endtab %}
{% tab swift %}
{% highlight swift %}
let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
branchUniversalObject.title = "My Content Title"
branchUniversalObject.contentDescription = "My Content Description"
branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"

// Add the custom deep link keys and values as metadata
branchUniversalObject.addMetadataKey("product_picture", value: "12345")
branchUniversalObject.addMetadataKey("user_id", value: "6789")
{% endhighlight %}
{% endtab %}
{% endtabs %}

{% endif %}
<!--- /iOS -->


<!--- Android -->
{% if page.android %}

{% highlight java %}
 BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("content/12345")
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)

                // Add the custom deep link keys and values as metadata
                .addContentMetadata("product_picture", "12345")
                .addContentMetadata("user_id", "6789");
{% endhighlight %}

{% endif %}