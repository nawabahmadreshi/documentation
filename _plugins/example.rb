require 'kramdown'

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
        title = '<h4 class="example__title"> ' + icon + 'Example</h4>'
      contents = Kramdown::Document.new(super).to_html
        '<blockquote class="example">' + title + contents + '</blockquote>'
    end
  end
end

Liquid::Template.register_tag('example', Jekyll::ExampleTag)
