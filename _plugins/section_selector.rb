require 'open3'
require_relative '_utils.rb'

module Jekyll

  class SectionSelectorTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      @markup = markup.gsub(/[^a-z_0-9\-]/, "")
    end

    def render(context)
      if context.environments.first['page']['sections'] != nil then
        sections = Array.new
        for section in context.environments.first['page']['sections']
          for base_section in context.registers[:site].data['sections']
            if base_section['key'] == section then
              sections.push(base_section)
            end
          end
        end
      else
        sections = context.registers[:site].data['sections']
      end
      current_path = context.environments.first['page']['current_path'] || '/'
      site_map = context.registers[:site].data['site_map']

      return BranchUtils.instance.react(
        '<SectionSelector
          current_path="' + current_path + '"
          site_map=' + BranchUtils.instance.json_property(site_map) + '
          sections=' + BranchUtils.instance.json_property(sections) + '/>')
    end
  end

end

Liquid::Template.register_tag('section_selector', Jekyll::SectionSelectorTag)
