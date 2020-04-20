const OpenTok = require('opentok');
var opentok = new OpenTok(api_key, api_secret);
var session = ''
if (window.location.pathname == '/party') {
  document.addEventListener('DOMContentLoaded', function() {
  // Hide or show watch party link based on participant
    if (name != '' && window.location.pathname == '/party') {
      var watchLink = document.getElementById("watch-mode");
      if (name == "Yehuda") {
        watchLink.style.display = "block";
      } else {
        watchLink.style.display = "none";
      };

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
          clickStatus = 'on';

          // Go to screenshare view
          turnScreenshareOn();

        } else if (clickStatus == 'on') {
          clickStatus = 'off';

          // Turn screen share off
          // TODO: Build redirect back to republishing video cameras
        }
      })

      // Listen for new chat submissions
      var form = document.querySelector('form');
      var msgTxt = document.querySelector('#message');
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        session.signal({
          type: 'msg',
          data: name + ": " + msgTxt.value
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
      function cameraStopStreaming(session) {
        opentok.listStreams(session_id, function(error, streams) {
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
    };
  });
}

// Get participant name from cookie
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// Go to screenshare view
function turnScreenshareOn() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/screenshare?name=" + name, true);
  xhr.send();
  window.location.replace('/screenshare?name=' + name);
};