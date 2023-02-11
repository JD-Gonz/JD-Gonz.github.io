/* global $ document angular */
'use strict';

var app = angular.module("PersonalWebsite",  []);

app.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.picture = 'public/img/portrait.jpg';
  
  $scope.infoList = [
    {
      'title' : 'About Me',
      'content' : `My name is Jose Gonzalez. I am currently a software engineer with a passion for problem solving and engaging in meaningful conversations.\n 
      
      Since 2015, I have been working professionally, honing my skills, and expanding my knowledge base to better serve my clients and employers. I take pride in my work and am always striving to improve and innovate.
      
      When I'm not working, I enjoy staying active and engage in physical activities. I'm also a proud father, who values spending quality time with family. In addition to this, I has a love for chess and enjoy trying and picking up new hobbies.`      
    }, {
      'title' : 'Aspiring project/product Manager',
      'content' : `I have always been passionate about technology and software engineering. However, he now feels that it is time for him to take his skills to the next level by transitioning into project/product management.
      
      I believe that my background as a software engineer has given me a unique perspective on the development process and a strong understanding of the technical aspects of a project. I am confident that this knowledge will allow me to effectively manage projects and ensure that they are delivered on time, within budget, and to the required quality standards.
      
      I am drawn to project/product management because I enjoy being at the forefront of the development process, working closely with cross-functional teams, and ensuring that projects are executed efficiently. I am excited about the opportunity to lead projects, manage resources, and contribute to the growth and success of my future mean and company.
      
      I'm eager to bring my strong problem-solving skills, technical knowledge, and passion for technology to the role of project/product manager. I am confident that this transition will allow me to continue growing professionally, while making a meaningful impact on the projects and teams I work with.`
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
    'content' : 'JD.Gonz@outlook.com'
  };
  
  $scope.phone = {
    'title' : 'PHONE',
    'content' : '509.264.0988'
  };
  
  $scope.web = {
    'title' : 'ON THE WEB',
    'content' : [{
      'name' : 'Linkedin',
      'class' : 'fa fa-linkedin fa-fw',
      'href' : 'https://www.linkedin.com/in/jdannygonzalez'
    }, {
      'name' : 'Github',
      'class' : 'fa fa-github fa-fw',
      'href' : 'https://github.com/dgonz001'
    }, {
      'name' : 'freeCodeCamp',
      'class' : 'glyphicon glyphicon-tent',
      'href' : 'https://www.freecodecamp.com/dgonz001'
    }]
  };
}]);

app.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.name = {
    'big' : 'Jose Daniel Gonzalez',
    'small' : 'JD Gonzalez',
    'tagLine' : 'Aspiring Product Manager'
  };
  
  $scope.mediaList = [ {
      'name' : 'Linkedin',
      'class' : 'fa fa-linkedin fa-fw',
      'href' : 'https://www.linkedin.com/in/jdannygonzalez'
    }, {
      'name' : 'Github',
      'class' : 'fa fa-github fa-fw',
      'href' : 'https://github.com/dgonz001'
    }, {
      'name' : 'freeCodeCamp',
      'class' : 'glyphicon glyphicon-tent',
      'href' : 'https://www.freecodecamp.com/dgonz001'
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
  
  $scope.projectBanner = 'public/img/header-portfo.png';

  $scope.projectDiscription = 'A colection of projects I created early on in my software engineering career to showcase my skills.';
  
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
