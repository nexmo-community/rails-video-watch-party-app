const OpenTok = require('opentok');
var opentok = new OpenTok(api_key, api_secret);
var session = ''
if (window.location.pathname == '/screenshare') {
  document.addEventListener('DOMContentLoaded', function() {
  // Hide or show watch party link based on participant
    if (name != '' && window.location.pathname == '/screenshare') {
      console.log('inside the second if')
      var watchLink = document.getElementById("watch-mode");
      if (name == "Yehuda") {
        watchLink.style.display = "block";
      } else {
        watchLink.style.display = "none";
      };

      console.log(session);
      // Initialize an OpenTok Session object
      if (session == '') {
        session = OT.initSession(api_key, session_id);
      }

      // Share screen
      var publishOptions = {};
      publishOptions.videoSource = 'screen';
      publishOptions.insertMode = 'append';
      publishOptions.fitMode = 'cover';
      screen_publisher = OT.initPublisher('screenshare', publishOptions,
      function(error) {
        if (error) {
          console.log(error);
        } else {
          session.publish(screen_publisher, function(error) {
            if (error) {
              console.log(error);
            };
          });
        };
      });

      // screen share mode off if clicked off
      // Set click status
      var clickStatus = 'on';
      watchLink.addEventListener('click', function(event) {
        event.preventDefault();

        if (clickStatus == 'on') {
          clickStatus = 'off';

          // TODO: GO BACK TO VIDEO CHAT

        };
      });

      // Connect to the Session using a 'token'
      session.connect(token, function(error) {
        if (error) {
          console.error('Failed to connect', error);
        }
      });

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
    };
  });
};