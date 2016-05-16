'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users) {
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    // if ($scope.story.author) {
    //   $scope.story.author_id = $scope.story.author.id
    // }
    console.log($scope.story);
    $scope.story.save();
  }, true);
});