require 'kramdown'

# Takes two properties i.e. {% caution title='Be careful of this!!' icon='fa-coffee' %}

module Jekyll
  class CautionTag < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @params = text
    end

    def render(context)
      data = {}

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }

      icon = '<i class="fa ' + (data['icon'] or 'fa-exclamation-triangle') + '"></i> '
      title = if data['title'] then '<h4 class="caution__title"> ' + icon + ' ' + data['title'] + '</h4>' else '' end
      contents = Kramdown::Document.new(super).to_html
      '<blockquote class="caution">' + title + contents + '</blockquote>'
    end
  end
end

Liquid::Template.register_tag('caution', Jekyll::CautionTag)
