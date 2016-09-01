
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
      section = context.environments.first['page']['section']

      page_title = context.environments.first['page']['title']
      section_index = context.environments.first['page']['sections'].index(section)
      next_section = context.environments.first['page']['sections'][section_index + 1]
      for base_platform in context.registers[:site].data['sections']
        if base_platform['key'] == next_section then
          next_section_formatted = base_platform['name']
        end
      end

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }
      if data ['title'] then
        puts data['title']
      end
      button = 
        if data['next'] then
          if data['title'] then '<a href="/' + data['next'] + '/' + '" class="get-started btn btn-primary btn-lg">Next: &nbsp; <br class="visible-xs"><strong>' + data['title'] + '&nbsp;</strong><i class="material-icons">chevron_right</i></a>' else '<a href="/' + data['next'] + '/' + '" class="get-started btn btn-primary btn-lg"><strong>Next&nbsp;</strong><i class="material-icons">chevron_right</i></a>' end
        elsif data['title'] then '<a href="/' + link_path + '/' + next_section + '" class="get-started btn btn-primary btn-lg">' + data['title'] + '&nbsp;<i class="material-icons">chevron_right</i></a>' else '<a href="/' + link_path + '/' + next_section + '" class="get-started btn btn-primary btn-lg">Get Started: &nbsp; <br class="visible-xs"><strong>' + page_title + '&nbsp;' + next_section_formatted + '&nbsp;</strong><i class="material-icons">chevron_right</i></a>' end
      button
    end
  end
end

Liquid::Template.register_tag('getstarted', Jekyll::GetStartedButton)
