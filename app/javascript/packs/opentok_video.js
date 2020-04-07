const OpenTok = require('opentok');
const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_SESSION_ID);
document.addEventListener('DOMContentLoaded', function() {
  // Hide or show watch party link based on participant
  var participant = getCookie("name");
  var watchLink = document.getElementById("watch-mode");
  if (participant == "Yehuda") {
    watchLink.style.display = "block";
  } else {
    watchLink.style.display = "none";
  };

  // Initialize an OpenTok Session object
  var session = OT.initSession(process.env.OPENTOK_API_KEY, process.env.OPENTOK_SESSION_ID);

  // Initialize a Publisher, and place it into the element with id="publisher"
  var video_publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
  }, function(error) {
    if (error) {
      console.error('Failed to initialise publisher', error);
    }
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
  session.connect(process.env.OPENTOK_TOKEN, function(error) {
    if (error) {
      console.error('Failed to connect', error);
    }
  });

  // Party mode if party mode clicked on
  // Set click status
  var clickStatus = 'off';
  var publisher = '';
  watchLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (clickStatus == 'off') {
      clickStatus = 'on';

      // Dark mode
      document.body.style = 'background-color:black'

      // Share screen
      var publishOptions = {};
      publishOptions.maxResolution = { width: 1920, height: 1080 };
      publishOptions.videoSource = 'screen';
      screen_publisher = OT.initPublisher('publisher', publishOptions,
      function(error) {
        if (error) {
          console.log(error);
        } else {
          videoStopStreaming(video_publisher);
          session.publish(screen_publisher, function(error) {
            if (error) {
              console.log(error);
            }
          })
        }
      })
    } else if (clickStatus == 'on') {
      clickStatus = 'off';

      // Light mode
      document.body.style = 'background-color:white'

      // Turn screen share off
      session.unpublish(screen_publisher);
      session.publish(video_publisher, function(error) {
        if (error) {
          console.error('Failed to publish', error);
        }
      });
    }
  })

  // Listen for new chat submissions
  var form = document.querySelector('form');
  var msgTxt = document.querySelector('#message');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    session.signal({
        type: 'msg',
        data: participant + ": " + msgTxt.value
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
  })

  // Get all active video streams and unpublish them
  function videoStopStreaming(session) {
    opentok.listStreams(session.id, function(error, streams) {
      if (error) {
        console.log(error.message);
      } else {
        streams.map(function(stream) {
          console.log(stream.id); // '2a84cd30-3a33-917f-9150-49e454e01572'
          session.forceUnpublish(stream);
        });
      };
    });
  };
});

// Get participant name from cookie
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}