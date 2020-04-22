# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_site_lang_options
  before_action :set_site_welcome_options
  before_action :set_site_navbar_options
  before_action :set_site_chat_options

  def set_site_lang_options
    config = YAML.load_file("#{Rails.root}/config/site_info.yml")
    @lang = config['language']
    @lang_dir = config['lang_direction']
  end

  def set_site_welcome_options
    config = YAML.load_file("#{Rails.root}/config/site_info.yml")
    @welcome_message = config['landing_page']['welcome_message']['text']
    @name_form_text = config['landing_page']['name_form']['text']
    @name_form_submit_button_text = config['landing_page']['name_form']['submit_button_text']
  end

  def set_site_navbar_options
    config = YAML.load_file("#{Rails.root}/config/site_info.yml")
    @navbar_title = config['navbar']['title']['text']
  end

  def set_site_chat_options
    config = YAML.load_file("#{Rails.root}/config/site_info.yml")
    @submit_button_text = config['text_chat']['submit_button_text']
    @chat_placeholder_text = config['text_chat']['placeholder_text']
  end
end
