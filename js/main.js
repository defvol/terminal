// Terminal methods

var MESSAGES = {
  blog: "http://rodowi.github.io/refactor/",
  coderwall: "https://coderwall.com/wilhelmbot",
  github: "https://github.com/rodowi",
  help: "available commands are blog, coderwall, github, help, linkedin, projects, twitter, whoami",
  linkedin: "https://www.linkedin.com/in/rodowi",
  projects: "See my latest projects at https://github.com/mxabierto",
  twitter: "https://twitter.com/rodowi",
  unknown: "command not found: ",
  whoami: "I hack bureaucracies and computer systems.\nCurrently leading a team of hackers to open up the Mexican government, and build Free and open-source software (FOSS) for development, democracy, and resilience."
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
    if (command in MESSAGES)
      term.echo(MESSAGES[command]);
    else
      unknown(command, term);
  }, OPTIONS);

});

