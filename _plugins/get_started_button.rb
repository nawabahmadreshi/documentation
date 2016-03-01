
require 'kramdown'

# Takes one property i.e. {% getstarted title='Get started with this concept!' %}

module Jekyll
    class GetStartedButton < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @params = text
    end

    def render(context)
      data = {}

      page_url = context.environments.first['page']['url']
      page_section = context.environments.first['page']['section']

      if page_url.include? page_section then
        link_path = page_url + '../guide'
      else
        link_path = page_url + 'guide'
      end

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }

      title = if data['title'] then '<a href="' + link_path + '" class="get-started btn btn-primary btn-lg">' + data['title'] + '</a>' else '<a href="' + link_path +'" class="get-started btn btn-primary btn-lg">Get Started!</a>' end
      title
    end
  end
end

Liquid::Template.register_tag('getstarted', Jekyll::GetStartedButton)
