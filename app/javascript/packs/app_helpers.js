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

// Apply relevant CSS class based on number of streams
export function streamLayout(element, count) {
  if (count >= 6) {
    element.classList.add("grid9");
  } else if (count == 5) {
    element.classList.remove("grid9");
    element.classList.add("grid4");
  } else if (count < 5) {
    element.classList.remove("grid4");
  }
}