import Screenshare from './screenshare.js'
import Chat from './chat.js'

// declare empty global session variable
var session = ''

if (window.location.pathname == '/screenshare') {
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize an OpenTok Session object
    if (session == '') {
      session = OT.initSession(api_key, session_id);
    }

    // Hide or show watch party link based on participant
    if (name != '' && window.location.pathname == '/screenshare') {
      new Chat(session);
      new Screenshare(session, name).toggle();

      // Connect to the Session using a 'token'
      session.connect(token, function(error) {
        if (error) {
          console.error('Failed to connect', error);
        }
      });

      // Listen for Signal screenshare message
      session.on('signal:screenshare', function screenshareCallback(event) {
        if (event.data == 'off') {
          window.location = '/party?name=' + name;
        };
      });
    }
  });
};
