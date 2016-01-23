require 'kramdown'

# Takes two properties i.e. {% protip title='Check out this Protip!' icon='fa-coffee' %}

module Jekyll
  class ProtipTag < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @params = text
    end

    def render(context)
      data = {}

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }

      icon = '<i class="fa ' + (data['icon'] or 'fa-bookmark-o') + '"></i> '
      title = if data['title'] then '<h4 class="protip__title"> ' + icon + ' Tip: ' + data['title'] + '</h4>' else '<h4 class="protip__title">' + icon + ' Tip</h4>' end
      contents = Kramdown::Document.new(super).to_html
      '<blockquote class="protip">' + title + contents + '</blockquote>'
    end
  end
end

Liquid::Template.register_tag('protip', Jekyll::ProtipTag)
