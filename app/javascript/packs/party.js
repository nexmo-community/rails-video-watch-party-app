import { screenshareMode, setButtonDisplay } from './app_helpers.js';

export default class Party {
  constructor(session) {
    this.session = session;
    this.watchLink = document.getElementById("watch-mode");
    this.videoPublisher = this.setupVideoPublisher();
    this.clickStatus = 'off';
    this.setupEventHandlers();

    setButtonDisplay(this.watchLink);
  }

  setupVideoPublisher() {
    return OT.initPublisher('publisher', {
      insertMode: 'append',
      width: "100%",
      height: "100%"
    }, function(error) {
      if (error) {
        console.error('Failed to initialise publisher', error);
      };
    });
  }

  setupEventHandlers() {
    let self = this;
    this.session.on({
      // This function runs when session.connect() asynchronously completes
      sessionConnected: function(event) {
        // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
        // clients)
        self.session.publish(self.videoPublisher, function(error) {
          if (error) {
            console.error('Failed to publish', error);
          }
        });
      },

      // This function runs when another client publishes a stream (eg. session.publish())
      streamCreated: function(event) {
        // Subscribe to the stream that caused this event, and place it into the element with id="subscribers"
        self.session.subscribe(event.stream, 'subscribers', {
          insertMode: 'append',
          width: "100%",
          height: "100%"
        }, function(error) {
          if (error) {
            console.error('Failed to subscribe', error);
          }
        });
      }
    });

    this.watchLink.addEventListener('click', function(event) {
      event.preventDefault();
      if (self.clickStatus == 'off') {
        // Go to screenshare view
        screenshareMode(self.session, 'on');
      };
    });
  }
}
