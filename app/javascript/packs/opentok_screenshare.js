import { screenshareMode, formatChatMsg } from './app_helpers.js';

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
      var watchLink = document.getElementById("watch-mode");
      if (name == moderator_env_name) {
        watchLink.style.display = "block";
        // Share screen
        var publishOptions = {};
        publishOptions.videoSource = 'screen';
        publishOptions.insertMode = 'append';
        publishOptions.height = '100%',
        publishOptions.width = '100%'
        var screen_publisher = OT.initPublisher('screenshare', publishOptions,
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

        var audioPublishOptions = {};
        audioPublishOptions.insertMode = 'append';
        audioPublishOptions.publishVideo = false;
        var audio_publisher = OT.initPublisher('audio', audioPublishOptions,
        function(error) {
          if (error) {
            console.log(error);
          } else {
            session.publish(audio_publisher, function(error) {
              if (error) {
                console.log(error);
              }
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
            screenshareMode(session, 'off');
          };
        });
      } else {
        watchLink.style.display = "none";
        session.on({
          streamCreated: function(event) {
            console.log(event);
            if (event.stream.hasVideo == true) {
              session.subscribe(event.stream, 'screenshare', {
                insertMode: 'append',
                width: '100%',
                height: '100%'
              }, function(error) {
                if (error) {
                  console.error('Failed to subscribe to video feed', error);
                }
              });
            } else if (event.stream.hasVideo == false ) {
              session.subscribe(event.stream, 'audio', {
                insertMode: 'append',
                width: '0px',
                height: '0px'
              }, function(error) {
                if (error) {
                  console.error('Failed to subscribe to audio feed', error);
                }
              });
            };
          }
        });
      };

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
          data: formatChatMsg(msgTxt.value)
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
        if (event.data == 'off') {
          window.location = '/party?name=' + name;
        };
      });
    };
  });
};
