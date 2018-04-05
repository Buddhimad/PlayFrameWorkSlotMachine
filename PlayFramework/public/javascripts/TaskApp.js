var app = angular.module('TaskApp', []);

var bell = {
    name: "bell",
    value: 1,
    path: 'images/redseven.png'
}
var cherry = {
    name: "cherry",
    value: 2,
    path: 'images/cherry.png'
}
var plum = {
    name: "plum",
    value: 3,
    path: 'images/plum.png'
}
var watermelon = {
    name: "watermelon",
    value: 4,
    path: 'images/watermelon.png'
}

var redseven = {
    name: 'redseven',
    value: 5,
    path: 'images/redseven.png'
}
var lemon = {
    name: 'lemon',
    value: 6,
    path: 'images/lemon.png'
}
var objects = [bell, plum, redseven, cherry, lemon, watermelon]


app.controller('full', function ($scope, $interval, $http) {

    var promise;
    var promise1;
    var promise2;
    var firstone = false;

    var isrunning = false;

    var fimagestop = false;
    var simagestop = false;
    var timagestop = false;
    var credit = 10;
    var max = 3;
    var min = 1;
    var number1 = 0;
    var number2 = 0;
    var number3 = 0;
    var sum = 0;

    $scope.score = 10;
    $scope.mark = {};
    $scope.bet = 0;
    $scope.woncount = 0;
    $scope.loosecount = 0;
    $scope.image = 'images/background.jpg'
    $scope.image1 = 'images/background.jpg'
    $scope.image2 = 'images/background.jpg'

    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Result', 'Precentage'],
            ['Won', parseInt($scope.woncount)],
            ['Loose', parseInt($scope.loosecount)]

        ]);

        // Optional; add a title and set the width and height of the chart
        var options = {'title': 'FULL GAME STATICS', 'width': 400, 'height': 400};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }

    $scope.start = function () {

        //$scope.stop();
        $scope.player = document.getElementById('name').value;
        if ($scope.player != '' & $scope.bet > 0) {

            promise = $interval(function () {

                $scope.image = objects[0].path;
                number1 = objects[0].value;

                shuffle(objects)
                fimagestop = true;
            }, 80);

            promise1 = $interval(function () {
                $scope.image1 = objects[0].path;
                number2 = objects[0].value;
                shuffle(objects)
                simagestop = true;

            }, 85);
            promise2 = $interval(function () {
                $scope.image2 = objects[0].path;
                number3 = objects[0].value;
                shuffle(objects)
                timagestop = true;
            }, 90)
        } else {
            alert("Please check details again")
        }
    };


    $scope.stop = function () {
        $interval.cancel(promise);
        fimagestop = false;

        if (!fimagestop & !simagestop & !timagestop) {

            sum = number1 + number2 + number3;
            if (number1 == number2 & number2 == number3) {
                $scope.score += (number1 * 3) + $scope.bet;
                $scope.disition = 'won'
            } else {
                $scope.score -= $scope.bet;
                $scope.disition = 'loose'
            }
            $http.post('http://localhost:9000/api/save/', {
                "name": $scope.player,
                "bet": parseInt($scope.bet),
                "credit": $scope.score,
                "result": $scope.disition + ''
            }).then(function (response) {
                console.log(response)
            })
            sum = 0;
            $scope.bet = 0;
            $scope.load();
        }

    };
    $scope.stop1 = function () {

        $interval.cancel(promise1);
        simagestop = false;

        if (!fimagestop & !simagestop & !timagestop) {
            sum = number1 + number2 + number3;
            if (number1 == number2 & number2 == number3) {
                $scope.score += (number1 * 3) + $scope.bet;
                $scope.disition = 'won'
            } else {
                $scope.score -= $scope.bet;
                $scope.disition = 'loose'
            }
            $http.post('http://localhost:9000/api/save/', {
                "name": $scope.player,
                "bet": parseInt($scope.bet),
                "credit": $scope.score,
                "result": $scope.disition + ''
            }).then(function (response) {
                console.log(response)
            })
            sum = 0;
            $scope.bet = 0;
            $scope.load();
        }

    };

    $scope.stop2 = function () {

        $interval.cancel(promise2);
        timagestop = false;

        if (!fimagestop & !simagestop & !timagestop) {
            sum = number1 + number2 + number3;
            if (number1 == number2 & number2 == number3) {
                $scope.score += (number1 * 3) + $scope.bet;
                $scope.disition = 'won'
            } else {
                $scope.score -= $scope.bet;
                $scope.disition = 'loose'
            }


            $http.post('http://localhost:9000/api/save/', {
                "name": $scope.player,
                "bet": parseInt($scope.bet),
                "credit": $scope.score,
                "result": $scope.disition + ''
            }).then(function (response) {
                console.log(response)
            })
            sum = 0;
            $scope.bet = 0;
            $scope.load();
        }
    }

    $scope.addcoin = function () {
        if (!fimagestop & !simagestop & !timagestop) {
            $scope.score += 1;
            console.log('add coin button clicked' + credit)
        }

    }

    $scope.betmax = function () {
        if (!fimagestop & !simagestop & !timagestop & $scope.score > 0 ) {
            $scope.bet += max;
            $scope.score -= max;
            console.log('bet max button clicked' + credit + 'bet ' + $scope.bet)
        }

    }
    $scope.betone = function () {
        if (!fimagestop & !simagestop & !timagestop & $scope.score > 0) {
            $scope.bet += min;
            $scope.score -= min;
            console.log('bet one button clicked' + credit + 'bet ' + $scope.bet)
        }

    }
    $scope.reset = function () {
        if (!fimagestop & !simagestop & !timagestop) {
            $scope.score = 10;
            $scope.bet = 0;
            console.log('reset button clicked' + credit)
        }

    }
    $scope.load = function () {
        $http.get('http://localhost:9000/api/find/', {
            headers: {'content-type': 'application/json', 'accept': 'application/json'}
        }).then(function (data) {
            // console.log(data.data);
            console.log(data.data[0])
            console.log(data.data[0][3])
            $scope.results = data.data[0].reverse();
            for (var i = 0; i < data.data[0].length; i++) {
                if (data.data[0][i].result.toUpperCase() == 'WON') {
                    $scope.woncount += 1;
                } else {
                    $scope.loosecount += 1;
                }
            }
            drawChart();
            $scope.woncount = 0;
            $scope.loosecount = 0;
        });


    }

    $scope.$on('$destroy', function () {
        $scope.stop();
    });
})

function shuffle(array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
