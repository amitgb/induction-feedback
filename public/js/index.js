// http://angulartutorial.blogspot.com/2014/03/rating-stars-in-angular-js-using.html

(function () {
    'use strict';

    angular
            .module('app', [])
            .controller('RatingController', RatingController)
            .directive('starRating', starRating);

    function RatingController($scope,$http) {
        //this.rating1 = 1;
        //this.rating2 = 1;
        //this.rating3 = 1;

        console.log("I am going to call GET first");
        $http.get('/feedback').success(function(response){
            console.log("I got the response for GET");
          //  $scope.programAndCourseDesign = response;
          //  console.log($scope.programAndCourseDesign.name);
            //$scope.contact="";
        });
     

        this.rateFunction = function (rating) {
            console.log('Rating selected: ' + rating);
        };

        var refresh = function(){
            $scope.programAndCourseDesign.rating1 = 1;
            $scope.programAndCourseDesign.rating2 = 1;
            $scope.programAndCourseDesign.rating3 = 1;
            $scope.programAndCourseDesign.rating4 = 1;
            $scope.programAndCourseDesign.rating5 = 1;
            $scope.programAndCourseDesign.likeAboutProgram ="";
            $scope.programAndCourseDesign.improvementInProgram="";
        }

        $scope.onClickSubmit = function () {
            //alert('Finally you are submitting the feedback');
           // alert($scope.programAndCourseDesign.likeAboutProgram);
           // alert($scope.programAndCourseDesign.improvementInProgram);
            console.log($scope.programAndCourseDesign);

            $http.post('/feedback',$scope.programAndCourseDesign).success(function(response){
                alert('Thank you for your feedback!');
                console.log("Sending the feedback to server");
                console.log(response);
                refresh();
            });
        };

        /*
         $scope.facilitatorList =
         [
         {
         presenter: "Srinivas Krishnarao",
         feedbackParam1: "Depth of Knowledge displayed",
         rating1: 1,
         feedbackParam2: "Style of Delivery",
         rating2: 1,
         feedbackParam3: "Ability to respond to queries",
         rating3: 1
         },
         {
         presenter: "Sunaina",
         feedbackParam1: "Depth of Knowledge displayed",
         rating1: 1,
         feedbackParam2: "Style of Delivery",
         rating2: 1,
         feedbackParam3: "Ability to respond to queries",
         rating3: 1
         },
         {
         presenter: "Sireesha",
         feedbackParam1: "Depth of Knowledge displayed",
         rating1: 1,
         feedbackParam2: "Style of Delivery",
         rating2: 1,
         feedbackParam3: "Ability to respond to queries",
         rating3: 1
         }
         
         ];
         */
        $scope.programAndCourseDesign =

                {
                    title: "Program & Course Design",
                    feedbackParam1: "Did ELITE Induction begin on time?",
                    rating1: 1,
                    feedbackParam2: "Did you get clarity on ELITE program, rules & regulations etc.?",
                    rating2: 1,
                    feedbackParam3: "Did you get an overview of different units in TechM?",
                    rating3: 1,
                    feedbackParam4: "Did ELITE induction structured and executed well?",
                    rating4: 1,
                    feedbackParam5: "Did business leader clarified business expectations from you and importance of communication and other business aspects?",
                    rating5: 1,
                    likeAboutProgram: "",
                    improvementInProgram: ""
                }
        ;

        /*   $scope.trainingFacility =
         [
         {
         title: "Training Facility Feedback",
         feedbackParam1: "Classroom/Lab Ambience",
         rating1: 1,
         feedbackParam2: "Audio/Video Equipments",
         rating2: 1,
         },
         ];
         */
    }

    function starRating() {
        return {
            restrict: 'EA',
            template:
                    '<ul class="star-rating" ng-class="{readonly: readonly}">' +
                    '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
                    '    <i class="fa fa-star"></i>' + // or &#9733
                    '  </li>' +
                    '</ul>',
            scope: {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function (scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                }
                ;
                scope.toggle = function (index) {
                    if (scope.readonly == undefined || scope.readonly === false) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('ratingValue', function (oldValue, newValue) {
                    if (newValue) {
                        updateStars();
                    }
                });
            }
        };
    }
})();