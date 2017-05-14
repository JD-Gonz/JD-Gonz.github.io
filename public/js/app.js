/* global $ angular */
'use strict';

var app = angular.module("PersonalWebsite",  []);

app.controller('AboutCtrl', ['$scope', function($scope) {
  $scope.infoList = [
    {
      'title' : 'About Me',
      'content' : 'Hi, I\'m Jose Daniel Gonzalez, but you can call me Danny or JD whichever you prefer. I am a graduate of the University of Washington. Currently, I am working as a Software Developer based in Seattle, WA.'
    }, {
      'title' : 'Background',
      'content' : 'I grew up in a small town in central Washington, and have been living in Seattle for about seven years now. I came to Seattle in pursuit of higher education at the University of Washington, where I earned a degree in Informatics with a focus in Information Assurance and Cybersecurity. During my time at the University of Washington, I also worked for PEMCO Insurance on a three-month summer internship and Informion as a Software Developer part-time.'
    }, {
      'title' : 'Developer In Training',
      'content' : 'I thought that the tag-line “Developer in Training” was a rather quaint one to use while studying in college. It also sounded like it would be an appropriate phrase while I was still being mentored. I have quickly realized that software developers never really stop learning. We always have to “train” for the next big thing – or, better yet, invent it.'
    }
  ];
  
  $scope.skills = {
    'title' : 'MY SKILLS',    
    'rows' : [  
      [{
        'name' : 'Java',
        'isImage' : true,
        'src' : 'img/icons/java.png',
        'alt' : 'Java icon'
      }, {
        'name' : 'Javascript',
        'isImage' : true,
        'src' : 'img/icons/javascript.png',
        'alt' : 'Javascript icon'
      }, {
        'name' : 'NodeJS',
        'isImage' : true,
        'src' : 'https://s15.postimg.org/y6yh5yhyf/z6_JAz_YU.png',
        'alt' : 'Node icon' 
      }], [{
        'name' : 'jQuery',
        'isImage' : true,
        'src' : 'img/icons/jquery.jpg',
        'alt' : 'jQuery icon'
      }, {
        'name' : 'AngularJS',
        'isImage' : true,
        'src' : 'img/icons/angular.png',
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
        'src' : 'img/icons/bootstrap.png',
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
    'content' : 'DGONZ001@uw.edu'
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

app.controller('PortfolioCtrl', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);

$(function() {
  $(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a')) {
      $(this).collapse('hide');
    }
  });
});