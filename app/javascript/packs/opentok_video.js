// Initialize an OpenTok Session object

var session = OT.initSession(process.env.OPENTOK_API_KEY, process.env.OPENTOK_SESSION_ID);

// Initialize a Publisher, and place it into the element with id="publisher"
var publisher = OT.initPublisher('publisher', {
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
    session.publish(publisher, function(error) {
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

// Listen for new chat submissions
var form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  session.signal({
      type: 'msg',
      data: msgTxt.value
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
