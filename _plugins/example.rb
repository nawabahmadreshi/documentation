require 'kramdown'

# Takes one property i.e. {% example title='Here's how you can use this' %}

module Jekyll
    class ExampleTag < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @params = text
    end

    def render(context)
      data = {}

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }

      icon = '<i class="fa fa-pencil-square-o"></i> '
      title = if data['title'] then '<h4 class="example__title"> ' + icon + ' Example: ' + data['title'] + '</h4>' else '<h4 class="example__title">' + icon + ' Example</h4>' end
      contents = Kramdown::Document.new(super).to_html
      '<blockquote class="example">' + title + contents + '</blockquote>'
    end
  end
end

Liquid::Template.register_tag('example', Jekyll::ExampleTag)
