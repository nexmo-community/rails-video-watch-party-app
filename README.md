# Video Watch Party App

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<img src="https://assets.tokbox.com/img/vonage/Vonage_VideoAPI_black.svg" height="48px" alt="Tokbox is now known as Vonage" />

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Chat with your friends while watching a video together!

This is a video app, which lets people talk via video conferencing, and when ready, the moderator can switch to "Watch Party" mode and share their screen. The "Watch Party" mode will share the moderator's screen, put the site into dark mode and disable everyone's microphones and cameras. Participants can continue to chat via text.

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
    * [Customizing The App](#customizing-the-app)
    * [Deploying to Heroku](#deploying-to-heroku)
* [License](#license)

## Requirements

This app requires Ruby v2.5 or greater and Rails 6.0 or greater. 

## Installation

Once you clone the repository, first change into the directory and execute the following commands in your terminal:

```bash
$ bundle install
$ yarn install
$ rake db:migrate
```

Lastly, rename the `.env.sample` file to `.env`.

## Usage

To use this app you must sign up for an account with the Vonage Video API. Once you have an account, you can create a
new video project. That project will assign you a project level API key and secret. Copy those values into your `.env`
file in the `API_KEY` and `API_SECRET` parameters, respectively.

You also must define a moderator name, which will be used to provide one user with moderator privileges. Those
privileges include the ability to switch between video chat and screen share modes. You can define that name in the
`.env` file within the `MODERATOR_NAME` value. 

Once you have done that, you can start your app locally by running `bundle exec rails s` from the command line and
navigate to `localhost:3000` in your web browser.

### Customizing the App

The app reads from `/config/site_info.yml` to gather data such as the website title and the various textual elements of the site. This is entirely customizable. 

To edit the data open up `/config/site_info.yml` in your code editor. The following options are available:

```yaml
lang_direction: # The language direction of the text, values can be either rtl or ltr
landing_page:
  welcome_message:
    text: # The landing page welcome message, any string of text
  name_form:
    text: # The text in the form asking for the name of the participant, any string of text
    submit_button_text: # The text for the name form submit button, any string of text
navbar:
  title:
    text: # The title in the navigation bar, any string of text
text_chat:
  submit_button_text: # The text for the chat form submit button, any string of text
  placeholder_text: # The placeholder text for the chat form text form, any string of text
```

If you do not edit the data in the `site_info.yml`, the defaults in the file in this repository will be rendered.

### Deploying to Heroku

You can deploy the application directly from this GitHub repository by clicking on the `Deploy to Heroku` button at the top of this README. Once you do that you still must set your Vonage OpenTok API credentials and information in Heroku. You can either do so at the time you are initializing your application after you have the clicked the `Deploy to Heroku` button above, or after from within the Heroku Dashboard.

After you have clicked the above `Deploy to Heroku` button, you will see three `config vars` in the Heroku deployment settings. Add your Vonage OpenTok API credentials and moderator name in the appropriate value box for each key before clicking the final `Deploy app` button. This will ensure your application is deployed to Heroku with your information.

Alternatively, you can do so from with your Heroku Dashboard's application settings by [managing the config vars](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) for your Video Watch Party app after deploying. You will need to add the three environment variables listed above in the [Installation and Usage](#installation-and-usage) section of this README: `OPENTOK_API_KEY`, `OPENTOK_API_SECRET`, `MODERATOR_NAME`. 

## License

This library is released under the [MIT License][license]

[license]: LICENSE.md