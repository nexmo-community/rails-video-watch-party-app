# Video Watch Party App

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<img src="https://developer.nexmo.com/assets/images/Vonage_Nexmo.svg" height="48px" alt="Nexmo is now known as Vonage" />


Chat with your friends while watching a video together!

This is a video app, which lets people talk via video conferencing, and when ready, the moderator can switch to "Watch Party" mode and share their screen. The "Watch Party" mode will share the moderator's screen, put the site into dark mode and disable everyone's microphones and cameras. Participants can continue to chat via text.

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)

## Requirements

This app requires Ruby v2.5 or greater and Rails 6.0 or greater. 

## Installation

Once you clone the repository, first change into the directory and execute the following commands in your terminal:

```bash
$ bundle install
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

## License

This library is released under the [MIT License][license]

[license]: LICENSE.md