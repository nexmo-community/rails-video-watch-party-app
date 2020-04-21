// Go to screenshare view
export function screenshareMode(session, mode) {
  if (mode == 'on') {
    window.location = '/screenshare?name=' + name;
    session.signal({
      type: 'screenshare',
      data: 'on'
    });
  } else if (mode == 'off') {
    window.location = '/party?name=' + name;
    session.signal({
      type: 'screenshare',
      data: 'off'
    });    
  };
};

// Set moderator button display
export function setButtonDisplay(element) {
  if (name == moderator_env_name) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  };
};

// Format chat message to include participant name
export function formatChatMsg(message) {
  return `${name}: ${message}`
};