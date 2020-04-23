# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_site_lang_options
  before_action :set_site_welcome_options
  before_action :set_welcome_form_options
  before_action :set_site_navbar_options
  before_action :set_site_chat_options
  CONFIG = YAML.load_file("#{Rails.root}/config/site_info.yml")

  def set_site_lang_options
    @lang = CONFIG['language']
    @lang_dir = CONFIG['lang_direction']
  end

  def set_site_welcome_options
    @welcome_message = CONFIG['landing_page']['welcome_message']['text']
  end

  def set_welcome_form_options
    @name_form_text = CONFIG['landing_page']['name_form']['text']
    @name_placeholder_text = CONFIG['landing_page']['name_form']['name_placeholder_text']
    @password_placeholder_text = CONFIG['landing_page']['name_form']['password_placeholder_text']
    @name_form_submit_button_text = CONFIG['landing_page']['name_form']['submit_button_text']
  end

  def set_site_navbar_options
    @navbar_title = CONFIG['navbar']['title']['text']
  end

  def set_site_chat_options
    @submit_button_text = CONFIG['text_chat']['submit_button_text']
    @chat_placeholder_text = CONFIG['text_chat']['placeholder_text']
  end
end
