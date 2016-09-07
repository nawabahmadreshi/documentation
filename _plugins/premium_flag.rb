require 'kramdown'

# Takes two properties i.e. {% caution title='Be careful of this!!' icon='fa-coffee' %}

module Jekyll
  class PremiumFlag < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @params = text
    end

    def render(context)
      data = {}

      @params.scan(/(\w+)=["']([^'\\]+(\\.[^'\\]+)*)["']/).each { |m|
        data[m[0]] = Liquid::Template.parse(m[1]).render!(context)
      }

      contents = Kramdown::Document.new(super).to_html
      '<img src="/img/premium_star.png" class="premium-flag" />'
    end
  end
end

Liquid::Template.register_tag('premiumflag', Jekyll::PremiumFlag)
