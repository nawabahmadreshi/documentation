
## Structuring a 'dynamic' Deeplink

If you'd like to just build a Branch link by appending query parameters, we support that too. Here's an example of how to do that:

1. Start with your Branch domain. http://bnc.lt (or your white labeled one).
2. Append /a/your_Branch_key. *http://bnc.lt/a/your_branch_key*
3. Append the start of query params '?'. *http://bnc.lt/a/your_branch_key?*
4. [optional] Append the [Branch analytics tags](/link_configuration/). *feature=marketing&channel=email&tags[]=drip1&tags[]=welcome*
5. [optional] Append any custom deep link parameters. *&user_id=4562&name=Alex&article_id=456*
6. [optional] Append the data parameter (base64 encoded) filled with your [Branch _$_ control parameters](/link_configuration/). *data=ew0KICAgICJoaSI6ImhlbGxvIg0KfQ==*

Here's an example of a finalized one:

{% highlight sh %}
https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?has_app=yes&channel=facebook&stage=level4&feature=affiliate&data=ew0KICAgICJoaSI6ImhlbGxvIg0KfQ==
{% endhighlight %}
