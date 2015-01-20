// Terminal methods

var MESSAGES = {
  coderwall: "https://coderwall.com/wilhelmbot",
  github: "https://github.com/rodowi",
  help: "available commands are coderwall, github, linkedin, twitter, whoami",
  linkedin: "https://www.linkedin.com/in/rodowi",
  twitter: "https://twitter.com/rodowi",
  unknown: "command not found: ",
  whoami: "A civic hacker who used to wear a grey hat. I hack bureaucracies and computer systems. AMA on twitter."
};

var OPTIONS = {
  greetings: "type help to see available commands",
  onBlur: function() { return false; },
  prompt: "Rod@HackBook ~ $ "
};

function help(term) {
  term.echo(MESSAGES.help);
}

function unknown(command, term) {
  term.error(MESSAGES.unknown + command);
  help(term);
}

// On document ready:

$(function() {

  // Initialize jQuery terminal
  $('body').terminal(function(command, term) {
    if (command == 'coderwall') {
      term.echo(MESSAGES.coderwall);
    } else if (command == 'github') {
      term.echo(MESSAGES.github);
    } else if (command == 'help') {
      help(term);
    } else if (command == 'linkedin') {
      term.echo(MESSAGES.linkedin);
    } else if (command == 'twitter') {
      term.echo(MESSAGES.twitter);
    } else if (command == 'whoami') {
      term.echo(MESSAGES.whoami);
    } else {
      unknown(command, term);
    }
  }, OPTIONS);

});

