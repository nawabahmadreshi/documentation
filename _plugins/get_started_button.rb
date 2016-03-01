
require 'kramdown'

# Takes one property i.e. {% getstarted title='Get started with this concept' %}

module Jekyll
    class GetStartedButton < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @params = text
    end

    def render(context)
      data = {}
 
      link_path = context.environments.first['page']['current_path']

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }

      button = if data['title'] then '<a href="/' + link_path + '/guide" class="get-started btn btn-primary btn-lg">' + data['title'] + '</a>' else '<a href="/' + link_path + '/guide" class="get-started btn btn-primary btn-lg">Get Started</a>' end
      button
    end
  end
end

Liquid::Template.register_tag('getstarted', Jekyll::GetStartedButton)
