// Go to screenshare view
export function turnScreenshareOn(session) {
  window.location = '/screenshare?name=' + name;
  session.signal({
    type: 'screenshare',
    data: 'on'
  });
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