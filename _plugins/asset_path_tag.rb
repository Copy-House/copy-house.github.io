# frozen_string_literal: true

# rubocop: disable Metrics/LineLength

# Title: Asset path tag for Jekyll
# Authors:
#     Sam Rayner http://samrayner.com
#     Otto Urpelainen http://koti.kapsi.fi/oturpe/projects/
#
# Description: Output a relative URL for assets based on the post or page
#
# Syntax
#    {% asset_path filename post_id %}
#    {% asset_path "filename with whitespace" post_id %}
#
# Examples:
# {% asset_path kitten.png %} on post 2013-01-01-post-title
# {% asset_path pirate.mov %} on page page-title
# {% asset_path document.pdf /2012/05/25/another-post-title %}
# {% asset_path "document with spaces in name.pdf" /2012/05/25/another-post-title %}
# {% asset_path image.jpg /my_collection/document_in_collection %}
#
# Output:
# /assets/posts/post-title/kitten.png
# /assets/page-title/pirate.mov
# /assets/posts/another-post-title/document.pdf
# /assets/posts/another-post-title/document with spaces in name.pdf
# /assets/my_collection/document_in_collection/image.jpg
#
# Looping example using a variable for the pathname:
#
# File _data/image.csv contains:
#   file
#   image_one.png
#   image_two.png
#
# {% for image in site.data.images %}{% asset_path {{ image.file }} %}{% endfor %} on post 2015-03-21-post-title
#
# Output:
# /assets/posts/post-title/image_one.png
# /assets/posts/post-title/image_two.png
#
# Looping example over posts:
#
# Site contains posts:
#   post-title
#   another-post-title
#
# {% for post in site.posts %}{% asset_path cover.jpg {{post.id}} %}{% endfor %} on index.html
#
# Output:
# /assets/posts/post-title/cover.jpg
# /assets/posts/another-post-title/cover.jpg

# rubocop: enable Metrics/LineLength

# Jekyll plugin.
module Jekyll
  def self.get_post_path(page_id, collections)
    collections.each do |collection|
      doc = collection.docs.find { |doc| doc.id == page_id }
      if doc
        slug = Jekyll::VERSION >= '3.0.0' ? doc.data["slug"] : doc.slug
        return "#{collection.label}/#{slug}"
      end
    end
    ''
  end

  class AssetPathTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      return 'Error: {% asset_path filename [post_id_or_folder] %}' if @markup.empty?

      filename, second_param = parse_parameters(context)
      second_param = nil if second_param == 'nil'

      # Get either post path or fixed folder
      path = resolve_path(context, second_param)

      # Remove filename if it's a file (e.g., ends with .png, .jpg, etc.)
      path = File.dirname(path) if path =~ /\.\w+$/

      baseurl = context.registers[:site].config['baseurl'] || ''
      "#{baseurl}/assets/images/#{path}/#{filename}".gsub(%r{/{2,}}, '/')
    end

    private

    def parse_parameters(context)
      rendered = Liquid::Template.parse(@markup).render(context).strip

      if ['"', "'"].include?(rendered[0])
        last_quote = rendered.rindex(rendered[0])
        filename = rendered[1...last_quote]
        second_param = rendered[(last_quote + 1)..-1].strip
        return [filename, second_param]
      end

      rendered.split(/\s+/, 2)
    end

    def resolve_path(context, value)
      page = context.environments.first['page']
      collections = context.registers[:site].collections.map { |_, c| c }

      # Try to resolve as post_id
      if value && value.match(%r{^/?[A-Za-z0-9\-_\/]+$})
        post_path = Jekyll.get_post_path(value, collections)
        return post_path unless post_path.empty?
      end

      # If not found or not valid post_id, treat as folder name
      value || File.dirname(page['url'] || '')
    end
  end
end

Liquid::Template.register_tag('asset_path', Jekyll::AssetPathTag)

