// declare empty global session variable
var session = ''

if (window.location.pathname == '/party') {
  document.addEventListener('DOMContentLoaded', function() {
  // Hide or show watch party link based on participant
    if (name != '' && window.location.pathname == '/party') {
      var watchLink = document.getElementById("watch-mode");
      setButtonDisplay(watchLink);

      // Initialize an OpenTok Session object
      if (session == '') {
        session = OT.initSession(api_key, session_id);
      }

      // Initialize a Publisher, and place it into the element with id="publisher"
      var video_publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
      }, function(error) {
        if (error) {
          console.error('Failed to initialise publisher', error);
        };
      });

      // Attach event handlers
      session.on({
        // This function runs when session.connect() asynchronously completes
        sessionConnected: function(event) {
          // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
          // clients)
          session.publish(video_publisher, function(error) {
            if (error) {
              console.error('Failed to publish', error);
            }
          });
        },

        // This function runs when another client publishes a stream (eg. session.publish())
        streamCreated: function(event) {
          // Subscribe to the stream that caused this event, and place it into the element with id="subscribers" 
          session.subscribe(event.stream, 'subscribers', {
            insertMode: 'append',
          }, function(error) {
            if (error) {
              console.error('Failed to subscribe', error);
            }
          });
        }

      });

      // Connect to the Session using a 'token'
      session.connect(token, function(error) {
        if (error) {
          console.error('Failed to connect', error);
        }
      });

      // Party mode if party mode clicked on
      // Set click status
      var clickStatus = 'off';
      var screen_publisher = '';
      watchLink.addEventListener('click', function(event) {
        event.preventDefault();

        if (clickStatus == 'off') {
          // Go to screenshare view
          turnScreenshareOn(session);

        };
      });

      // Listen for new chat submissions
      var form = document.querySelector('form');
      var msgTxt = document.querySelector('#message');
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        session.signal({
          type: 'msg',
          data: formatChatMsg(msgTxt.value) // name + ": " + msgTxt.value
        }, function(error) {
        if (error) {
          console.log('Error sending signal:', error.name, error.message);
        } else {
          msgTxt.value = '';
        }
      });
    });

      // Append new messages to chat
      var msgHistory = document.querySelector('#history');
      session.on('signal:msg', function signalCallback(event) {
        var msg = document.createElement('p');
        msg.textContent = event.data;
        msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
        msgHistory.appendChild(msg);
        msg.scrollIntoView();
      });

      // Listen for Signal screenshare message
      session.on('signal:screenshare', function screenshareCallback(event) {
        if (event.data == 'on') {
          window.location = '/screenshare?name=' + name;
        };
      });
    };
  });
}

// Go to screenshare view
function turnScreenshareOn(session) {
  window.location = '/screenshare?name=' + name;
  session.signal({
    type: 'screenshare',
    data: 'on'
  });
};

// Set moderator button display
function setButtonDisplay(element) {
  if (name == moderator_env_name) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  };
};

// Format chat message to include participant name
function formatChatMsg(message) {
  return `${name}: ${message}`
};