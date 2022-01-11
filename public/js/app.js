/* global $ document angular */
'use strict';

var app = angular.module("PersonalWebsite",  []);

app.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.picture = 'public/img/portrait.jpg';
  
  $scope.infoList = [
    {
      'title' : 'About Me',
      'content' : 'Hi, I\'m Jose Daniel Gonzalez, but you can call me Danny or JD, whichever you prefer. I am a graduate of the University of Washington. I created this page to showcase some of the work I have done while practicing my coding skills.'
    }, {
      'title' : 'Background',
      'content' : 'I grew up in central Washington, and have been living in Seattle since moving here in 2010. I came to Seattle in pursuit of higher education at the University of Washington, where I earned a degree in Informatics with a focus in Information Assurance and Cybersecurity.'
    }, {
      'title' : 'Aspiring Product Manager',
      'content' : 'I have really enjoyed my time as a software engineer, but I now want to try my had at product/technical project management. Since I have shifted my focus, this page will inevitably become more of a historical marker of what I had accomplished earlier in my career.'
    }
  ];
  
  $scope.skills = {
    'title' : 'MY SKILLS',    
    'rows' : [  
      [{
        'name' : 'Java',
        'isImage' : true,
        'src' : 'public/img/icons/java.png',
        'alt' : 'Java icon'
      }, {
        'name' : 'Javascript',
        'isImage' : true,
        'src' : 'public/img/icons/javascript.png',
        'alt' : 'Javascript icon'
      }, {
        'name' : 'NodeJS',
        'isImage' : true,
        'src' : 'public/img/icons/nodejs.png',
        'alt' : 'Node icon' 
      }], [{
        'name' : 'jQuery',
        'isImage' : true,
        'src' : 'public/img/icons/jquery.jpg',
        'alt' : 'jQuery icon'
      }, {
        'name' : 'AngularJS',
        'isImage' : true,
        'src' : 'public/img/icons/angular.png',
        'alt' : 'AngularJS icon'
      }, {
        'name' : 'CSS3',
        'isImage' : false,
        'icon' : 'fa fa-css3 fa-fw'
      }], [{
        'name' : 'HTML5',
        'isImage' : false,
        'icon' : 'fa fa-html5 fa-fw'
      }, {
        'name' : 'SQL',
        'isImage' : false,
        'icon' : 'fa fa-database fa-fw'
      }, {
        'name' : 'Bootstrap',
        'isImage' : true,
        'src' : 'public/img/icons/bootstrap.png',
        'alt' : 'Bootstrap icon'
      }]
    ]}; 
}]);

app.controller('ContactCtrl', ['$scope', function($scope) {
  $scope.resume = {
    'title' : 'REVIEW MY RESUME!',
    'content' : 'DOWNLOAD RESUME',
    'class' : 'fa fa-cloud-download'
  };
  
  $scope.email = {
    'title' : 'EMAIL',
    'content' : 'JODG509@gmail.com'
  };
  
  $scope.phone = {
    'title' : 'PHONE',
    'content' : '509.264.0988'
  };
  
  $scope.web = {
    'title' : 'ON THE WEB',
    'content' : [{
      'name' : 'freeCodeCamp',
      'class' : 'glyphicon glyphicon-tent',
      'href' : 'https://www.freecodecamp.com/dgonz001'
    }, {
      'name' : 'Github',
      'class' : 'fa fa-github fa-fw',
      'href' : 'https://github.com/dgonz001'
    }, {
      'name' : 'Linkedin',
      'class' : 'fa fa-linkedin fa-fw',
      'href' : 'https://www.linkedin.com/in/jdannygonzalez'
    }, {
      'name' : 'Twitter',
      'class' : 'fa fa-twitter fa-fw',
      'href' : 'https://twitter.com/danny_b0y03'
    }]
  };
}]);

app.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.name = {
    'big' : 'Jose Daniel Gonzalez',
    'small' : 'JD Gonzalez',
    'tagLine' : 'Aspiring Product Manager'
  };
  
  $scope.mediaList = [{
      'name' : 'freeCodeCamp',
      'class' : 'glyphicon glyphicon-tent',
      'href' : 'https://www.freecodecamp.com/dgonz001'
    }, {
      'name' : 'Github',
      'class' : 'fa fa-github fa-fw',
      'href' : 'https://github.com/dgonz001'
    }, {
      'name' : 'Linkedin',
      'class' : 'fa fa-linkedin fa-fw',
      'href' : 'https://www.linkedin.com/in/jdannygonzalez'
    }, {
      'name' : 'Twitter',
      'class' : 'fa fa-twitter fa-fw',
      'href' : 'https://twitter.com/danny_b0y03'
    }];
}]);

app.controller('PortfolioCtrl', ['$scope', function($scope) {
  let brokenProjects = [{
    'name' : 'Quote Machine',
    'img' : 'public/img/projects/randomQuote.png',
    'site' : 'https://codepen.io/jdg99/full/jqbOoV/'
  }, {
    'name' : 'Local Weather App',
    'img' : 'public/img/projects/weather.png',
    'site' : 'https://codepen.io/jdg99/full/oxbpJR/'
  }, {
    'name' : 'Twitch Streamer',
    'img' : 'public/img/projects/twitch.png',
    'site' : 'https://codepen.io/jdg99/full/mPmeLN/'
  }];
  
  $scope.banner = 'public/img/header-portfo.png';
  
  $scope.frontendProjects = [{
    'name' : 'Tribute Project',
    'img' : 'public/img/projects/tribute.png',
    'site' : 'https://codepen.io/jdg99/full/JGVjPR/'
  }, {
    'name' : 'Wikipedia Viewer',
    'img' : 'public/img/projects/wiki.png',
    'site' : 'https://codepen.io/jdg99/full/qZNmoG/'
  }, {
    'name' : 'Digital Calculator',
    'img' : 'public/img/projects/calculator.png',
    'site' : 'https://codepen.io/jdg99/full/aNYojq/'
  }, {
    'name' : 'Pomodoro Clock',
    'img' : 'public/img/projects/pomodoro.png',
    'site' : 'https://codepen.io/jdg99/full/NNYodV/'
  }, {
    'name' : 'Tic-Tac-Toe',
    'img' : 'public/img/projects/ticTacToe.png',
    'site' : 'https://codepen.io/jdg99/full/MyZgMB/'
  }, {
    'name' : 'Simon Says',
    'img' : 'public/img/projects/simon.png',
    'site' : 'https://codepen.io/jdg99/full/BKeJvm/'
  }];
    
  $scope.apis = [{
    'name' : 'Timestamp Microservice',
    'discription' : 'Passed a string as a parameter, it will check to see whether that string contains either a unix timestamp or a natural language date.',
    'repo' : 'https://github.com/dgonz001/timestampApi',
    'site' : 'https://jdg-timestamp.herokuapp.com/'
  }, {
    'name' : 'Request Header Parser Microservice',
    'discription' : 'This Microservice eturns the IP address, language and operating system for the current browser.',
    'repo' : 'https://github.com/dgonz001/headerParser',
    'site' : 'https://jdg-header-parser.herokuapp.com/'
  }, {
    'name' : 'URL Shortener Microservice',
    'discription' : 'Generates and returns a shortened URL.',
    'repo' : 'https://github.com/dgonz001/urlShortener',
    'site' : 'https://jdg-short.herokuapp.com/'
  }, {
    'name' : 'Image Search Abstraction Layer',
    'discription' : 'An image search abstraction layer that allows a user to search for images and view the most recent searches.',
    'repo' : 'https://github.com/dgonz001/imageSearch',
    'site' : 'https://jdg-image.herokuapp.com/'
  }, {
    'name' : 'File Metadata Microservice',
    'discription' : 'This microservice gives you the size (in bytes) of any formdata that you provide for upload.',
    'repo' : 'https://github.com/dgonz001/fileMetadata',
    'site' : 'https://jdg-metadata.herokuapp.com/'
  }];
    
  $scope.webApps = [{
    'name' : 'Voting App',
    'discription' : 'Pollapalooza is an app that allows you to create, view, and vote on user made polls.',
    'repo' : 'https://github.com/dgonz001/votingApp',
    'site' : 'https://pollapalooza.herokuapp.com/'
  }];
  
  $scope.reactProjects = [{
    'name' : 'Markdown Previewer',
    'img' : 'public/img/projects/markdown.png',
    'site' : 'https://codepen.io/jdg99/full/yXmxKL'
  }];
}]);

$(function() {
  $(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a')) {
      $(this).collapse('hide');
    }
  });
});
