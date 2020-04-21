class ApplicationController < ActionController::Base
  before_action :set_site_info

  def set_site_info
    config = YAML.load_file("#{Rails.root}/config/site_info.yml")
    @lang_dir = config["lang_direction"]
    @welcome_message = config["landing_page"]["welcome_message"]["text"]
    @name_form_text = config["landing_page"]["name_form"]["text"]
    @name_form_submit_button_text = config["landing_page"]["name_form"]["submit_button_text"]
    @navbar_title = config["navbar"]["title"]["text"]
    @submit_button_text = config["text_chat"]["submit_button_text"]
    @chat_placeholder_text = config["text_chat"]["placeholder_text"]
  end
end
