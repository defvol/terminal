// Terminal methods

var MESSAGES = {
  blog: "http://rodowi.github.io/refactor/",
  coderwall: "https://coderwall.com/wilhelmbot",
  github: "https://github.com/rodowi",
  help: "available commands are blog, coderwall, github, help, linkedin, npm, projects, twitter, whoami",
  linkedin: "https://www.linkedin.com/in/rodowi",
  npm: "https://www.npmjs.com/~rodowi",
  projects: "See my latest projects at https://github.com/mxabierto",
  twitter: "https://twitter.com/rodowi",
  unknown: "command not found: ",
  whoami: "I hack bureaucracies and computer systems.\nCurrently leading a team of hackers to open up the Mexican government, and build Free and open-source software (FOSS) for development, democracy, and resilience."
};

var OPTIONS = {
  greetings: "Booting...",
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

function progress(percent, width) {
  var size = Math.round(width*percent/100);
  var left = '', taken = '', i;
  for (i=size; i--;) {
    taken += '=';
  }
  if (taken.length > 0) {
    taken = taken.replace(/=$/, '>');
  }
  for (i=width-size; i--;) {
    left += ' ';
  }
  return '[' + taken + left + '] ' + percent + '%';
}

var animation = false;
var timer;
var prompt;
var string;

function startLoading(term, done) {
  var i = 0, size = 80;
  prompt = term.get_prompt();
  string = progress(0, size);
  term.set_prompt(progress);
  animation = true;
  (function loop() {
    string = progress(i++, size);
    term.set_prompt(string);
    if (i < 100) {
      timer = setTimeout(loop, 20);
    } else {
      term.echo(progress(i, size) + ' [[b;green;]OK]')
      .set_prompt(prompt);
      animation = false;
      done();
    }
  })();
}

function type(term, message, delay, done) {
  var c = 0;
  var interval = setInterval(function() {
    term.insert(message[c++]);
    if (c == message.length) {
      clearInterval(interval);
      setTimeout(done, delay);
    }
  }, delay);
}

// On document ready:

$(function() {

  // Initialize jQuery terminal
  var term = $('body').terminal(function(command, term) {
    if (command in MESSAGES)
      term.echo(MESSAGES[command]);
    else
      unknown(command, term);
  }, OPTIONS);

  var greeting = [
    'Hello friend. Here we are again.',
    'We wanted to save the world. Did you think it would be that easy?'
  ]

  startLoading(term, function () {
    type(term, greeting.join(' '), 100, function () {
      term.set_command('');
      term.echo('Our real work is just beginning. Now type something.')
    });
  });

});
