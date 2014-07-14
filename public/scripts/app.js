//todo plusminus,shotchart,fixplaybyplay
(function () {
        "use strict";
        angular.module("app.chart.directives", []).directive("gaugeChart", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        data: "=",
                        options: "="
                    },
                    link: function (scope, ele) {
                        var data, gauge, options;
                        return data = scope.data, options = scope.options, gauge = new Gauge(ele[0]).setOptions(options), gauge.maxValue = data.maxValue, gauge.animationSpeed = data.animationSpeed, gauge.set(data.val)
                    }
                }
            }
        ]).directive("flotChart", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        data: "=",
                        options: "="
                    },
                    link: function (scope, ele) {
                        var data, options, plot;
                        return data = scope.data, options = scope.options, plot = $.plot(ele[0], data, options)
                    }
                }
            }
        ]).directive("flotChartRealtime", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        var data, getRandomData, plot, totalPoints, update, updateInterval;
                        return data = [], totalPoints = 300, getRandomData = function () {
                            var i, prev, res, y;
                            for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + 10 * Math.random() - 5, 0 > y ? y = 0 : y > 100 && (y = 100), data.push(y);
                            for (res = [], i = 0; i < data.length;) res.push([i, data[i]]), ++i;
                            return res
                        }, update = function () {
                            plot.setData([getRandomData()]), plot.draw(), setTimeout(update, updateInterval)
                        }, data = [], totalPoints = 300, updateInterval = 200, plot = $.plot(ele[0], [getRandomData()], {
                            series: {
                                lines: {
                                    show: !0,
                                    fill: !0
                                },
                                shadowSize: 0
                            },
                            yaxis: {
                                min: 0,
                                max: 100
                            },
                            xaxis: {
                                show: !1
                            },
                            grid: {
                                hoverable: !0,
                                borderWidth: 1,
                                borderColor: "#eeeeee"
                            },
                            colors: ["#5BC0C4"]
                        }), update()
                    }
                }
            }
        ]).directive("sparkline", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        data: "=",
                        options: "="
                    },
                    link: function (scope, ele) {
                        var data, options, sparkResize, sparklineDraw;
                        return data = scope.data, options = scope.options, sparkResize = void 0, sparklineDraw = function () {
                            return ele.sparkline(data, options)
                        }, $(window).resize(function () {
                            return clearTimeout(sparkResize), sparkResize = setTimeout(sparklineDraw, 200)
                        }), sparklineDraw()
                    }
                }
            }
        ]).directive("morrisChart", [
            function () {
                return {
                    restrict: "A",
                    scope: {
                        data: "="
                    },
                    link: function (scope, ele, attrs) {
                        var colors, data, func, options;
                        switch (data = scope.data, attrs.type) {
                        case "line":
                            return colors = void 0 === attrs.lineColors || "" === attrs.lineColors ? null : JSON.parse(attrs.lineColors), options = {
                                element: ele[0],
                                data: data,
                                xkey: attrs.xkey,
                                ykeys: JSON.parse(attrs.ykeys),
                                labels: JSON.parse(attrs.labels),
                                lineWidth: attrs.lineWidth || 2,
                                lineColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                                resize: !0
                            }, new Morris.Line(options);
                        case "area":
                            return colors = void 0 === attrs.lineColors || "" === attrs.lineColors ? null : JSON.parse(attrs.lineColors), options = {
                                element: ele[0],
                                data: data,
                                xkey: attrs.xkey,
                                ykeys: JSON.parse(attrs.ykeys),
                                labels: JSON.parse(attrs.labels),
                                lineWidth: attrs.lineWidth || 2,
                                lineColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                                behaveLikeLine: attrs.behaveLikeLine || !1,
                                fillOpacity: attrs.fillOpacity || "auto",
                                pointSize: attrs.pointSize || 4,
                                resize: !0
                            }, new Morris.Area(options);
                        case "bar":
                            return colors = void 0 === attrs.barColors || "" === attrs.barColors ? null : JSON.parse(attrs.barColors), options = {
                                element: ele[0],
                                data: data,
                                xkey: attrs.xkey,
                                ykeys: JSON.parse(attrs.ykeys),
                                labels: JSON.parse(attrs.labels),
                                barColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                                stacked: attrs.stacked || null,
                                resize: !0
                            }, new Morris.Bar(options);
                        case "donut":
                            return colors = void 0 === attrs.colors || "" === attrs.colors ? null : JSON.parse(attrs.colors), options = {
                                element: ele[0],
                                data: data,
                                colors: colors || ["#0B62A4", "#3980B5", "#679DC6", "#95BBD7", "#B0CCE1", "#095791", "#095085", "#083E67", "#052C48", "#042135"],
                                resize: !0
                            }, attrs.formatter && (func = new Function("y", "data", attrs.formatter), options.formatter = func), new Morris.Donut(options)
                        }
                    }
                }
            }
        ])
    }).call(this),
   
    function () {
        angular.module("app.ui.form.directives", []).directive("uiRangeSlider", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        return ele.slider()
                    }
                }
            }
        ]).directive("uiFileUpload", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        return ele.bootstrapFileInput()
                    }
                }
            }
        ]).directive("uiSpinner", [
            function () {
                return {
                    restrict: "A",
                    compile: function (ele) {
                        return ele.addClass("ui-spinner"), {
                            post: function () {
                                return ele.spinner()
                            }
                        }
                    }
                }
            }
        ]).directive("uiWizardForm", [
            function () {
                return {
                    link: function (scope, ele) {
                        return ele.steps()
                    }
                }
            }
        ])
    }.call(this),
    function () {
        "use strict";
        angular.module("app.ui.directives", []).directive("uiTime", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        var checkTime, startTime;
                        return startTime = function () {
                            var h, m, s, t, time, today;
                            return today = new Date, h = today.getHours(), m = today.getMinutes(), s = today.getSeconds(), m = checkTime(m), s = checkTime(s), time = h + ":" + m + ":" + s, ele.html(time), t = setTimeout(startTime, 500)
                        }, checkTime = function (i) {
                            return 10 > i && (i = "0" + i), i
                        }, startTime()
                    }
                }
            }
        ]).directive("uiWeather", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele, attrs) {
                        var color, icon, skycons;
                        return color = attrs.color, icon = Skycons[attrs.icon], skycons = new Skycons({
                            color: color,
                            resizeClear: !0
                        }), skycons.add(ele[0], icon), skycons.play()
                    }
                }
            }
        ])
    }.call(this),
    function () {
        "use strict";
        angular.module("app", ["ngRoute", "ngAnimate","ui.select", "ui.bootstrap", "easypiechart", "mgo-angular-wizard", "textAngular",  "app.ui.directives", "app.controllers", "app.directives",  "app.ui.form.directives", "app.chart.directives","timer","socket-io"]).config(["$routeProvider",
            function ($routeProvider) {
             	return $routeProvider.when("/", {
						redirectTo: "/dashboard"
					}).when("/dashboard", {
						templateUrl: "views/dashboard.html"
					}).when("/players", {
						templateUrl: "views/pages/players.html"
                    }).when("/referees", {
                        templateUrl: "views/pages/referees.html"
                    }).when("/coaches", {
                        templateUrl: "views/pages/coaches.html"
                    }).when("/teams", {
                        templateUrl: "views/pages/teams.html"                
					}).when("/game-create", {
						templateUrl: "views/pages/game-create.html"
					}).when("/point-panel", {
						templateUrl: "views/pages/point-panel.html"
					}).when("/play-by-play", {
						templateUrl: "views/pages/play-by-play.html"					
					}).when("/pages/signin", {
						templateUrl: "views/pages/signin.html"
					}).when("/pages/signup", {
						templateUrl: "views/pages/signup.html"
					}).when("/pages/lock-screen", {
						templateUrl: "views/pages/lock-screen.html"
					}).when("/pages/profile", {
						templateUrl: "views/pages/profile.html"
					}).when("/404", {
						templateUrl: "views/pages/404.html"
					}).when("/pages/500", {
						templateUrl: "views/pages/500.html"
					}).when("/pages/blank", {
						templateUrl: "views/pages/blank.html"
					}).otherwise({
						redirectTo: "/404"
					})
            }
        ]).factory("Player", ["$http","$rootScope",
            function ($http,$rootScope) {                                
                var players = [];
                return {
                    save:function(player){
                        $http.post('/api/player', player).success(function(resp) {
                            $rootScope.$broadcast('responseHandler',{method:'player.save',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                    },
                
                    get:function(){
                        $http.get('/api/player').success(function(resp) {
                            players = resp;
                            $rootScope.$broadcast('responseHandler',{method:'player.get',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                        return players;
                    }                    
                }
            }
        ]).factory("Coach", ["$http","$rootScope",
            function ($http,$rootScope) {                             
                var coaches = [];
                return {
                    save:function(coach){
                        $http.post('/api/coach', coach).success(function(resp) {
                            $rootScope.$broadcast('responseHandler',{method:'coach.save',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                    },
                
                    get:function(){
                        $http.get('/api/coach').success(function(resp) {
                            coaches = resp;
                            $rootScope.$broadcast('responseHandler',{method:'coach.get',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                        return coaches;
                    }                    
                }
            }
        ]).factory("Team", ["$http","$rootScope",
            function ($http,$rootScope) {                                
                var teams = [];
                return {
                    save:function(team){
                        $http.post('/api/team', team).success(function(resp) {
                            $rootScope.$broadcast('responseHandler',{method:'team.save',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                    },
                
                    get:function(){
                        $http.get('/api/team').success(function(resp) {
                            teams = resp;
                            $rootScope.$broadcast('responseHandler',{method:'team.get',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                        return teams;
                    }                    
                }
            }
        ]).factory("Referee", ["$http","$rootScope",
            function ($http,$rootScope) {                                
                var referees = [];
                return {
                    save:function(referee){
                        $http.post('/api/referee', referee).success(function(resp) {
                            $rootScope.$broadcast('responseHandler',{method:'referee.save',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                    },
                
                    get:function(){
                        $http.get('/api/referee').success(function(resp) {
                            referees = resp;
                            $rootScope.$broadcast('responseHandler',{method:'referee.get',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                        return referees;
                    }                    
                }
            }
        ]).factory("Game", ["$http","$rootScope",
            function ($http,$rootScope) {                                
                var games = [];
                return {
                    save:function(game,action){
                        $http.post('/api/game', game).success(function(resp) {
                            $rootScope.$broadcast('responseHandler',{method:'game.save',data:resp,action:action});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                    },
                
                    get:function(id){
                        id = id||'';
                        $http.get('/api/game/'+id).success(function(resp) {
                            games = resp;
                            $rootScope.$broadcast('responseHandler',{method:'game.get',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                        return games;
                    }                    
                }
            }
        ]).factory("PlayByPlay", ["$http","$rootScope",
            function ($http,$rootScope) {  
                            var  play_by_play =[];                            
                return {
                    save:function(play_by_play){
                        $http.post('/api/play_by_play', play_by_play).success(function(resp) {
                            $rootScope.$broadcast('responseHandler',{method:'play_by_play.save',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                    },
                
                    get:function(id){
                        id = id||'';
                        $http.get('/api/play_by_play/'+id).success(function(resp) {
                            play_by_play = resp;
                            $rootScope.$broadcast('responseHandler',{method:'play_by_play.get',data:resp});
                        }).error(function(resp) {
                            console.log('Error: ' + resp);
                        });
                        return play_by_play;
                    }                    
                }
            }
        ])
    }.call(this),
    function () {

			angular.module("app.controllers", []).controller("AppCtrl", ["$scope", "$location",
				function ($scope, $location) {
					return $scope.isSpecificPage = function () {
						var path;
						return path = $location.path(), _.contains(["/404", "/pages/500", "/point-panel", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/lock-screen"], path)
					}, $scope.main = {
						brand: "Flatify",
						name: "Lisa Doe"
					}
				}
				]).controller("NavCtrl", ["$scope","filterFilter",
				function ($scope, filterFilter) {
					
				}
				]).controller("DashboardCtrl", ["$scope",
				function ($scope) {
									}
				]).controller("PlayerCtrl", ["$scope","Player","Team",
				function ($scope,Player,Team) {	
                    var is_new = false;	
                    $scope.player = {};
                    $scope.players = Player.get();
                    $scope.teams = Team.get();
                    $scope.addPanel =false;
                    $scope.team_selected = '';
                    var initPlayer = function(){
                         $scope.player ={
                            first_name:'',
                            last_name:'',
                            age:0,
                            nationality:'',
                            height:'',
                            weight:'',
                            birthday:'',
                            birth_place:'',
                            gender:'M',
                            is_import:false,
                            status:true,
                        }
                    }                    
                    $scope.$on('responseHandler',function(event,resp){                    
                        
                        if(resp.method=='player.save'){   
                            if(is_new){
                                $scope.players.push(resp.data);                            
                                if($scope.team_selected){
                                    $scope.team_selected.players.push(resp.data);
                                     Team.save($scope.team_selected);
                                }                        
                                $scope.team_selected = '';
                                initPlayer();
                            }
                        }
                        if(resp.method=='player.get') {  
                            $scope.players = resp.data
                        }
                        if(resp.method=='team.get')   
                            $scope.teams = resp.data;
                    });
                    $scope.options = {
                        genders:[{id:'M',name:'Male'},{id:'F',name:'Female'}],
                        status:[{id:true,name:'Active'},{id:false,name:'Inactive'}]
                    }                           
                    $scope.show_add_form = function(show){
                        is_new = true;
                        initPlayer();
                        $scope.addPanel=show;
                    }
                    $scope.edit = function(player){
                        is_new = false;
                        $scope.player = player;
                        $scope.addPanel =true;
                    }
                    $scope.delete = function(player){
                        if(confirm('Delete '+player.last_name+' ?'))
                            $scope.players.splice($scope.players.indexOf(player),1);

                    }
                    $scope.save = function(){
                        Player.save($scope.player); 
                    }				
				}]).controller("CoachCtrl", ["$scope","Coach",
                function ($scope,Coach) {  
                    var is_new = false; 
                    $scope.coach = {};
                    $scope.coaches = Coach.get();
                    $scope.addPanel =false;
                    var initCoach = function(){
                         $scope.coach ={
                            first_name:'',
                            last_name:'',  
                            no:0,                          
                        }
                    }                    
                    $scope.$on('responseHandler',function(event,resp){                    
                        if(resp.method=='coach.save'){   
                            initCoach();
                            if(is_new)
                                $scope.coaches.push(resp.data);
                        }
                        if(resp.method=='coach.get')   
                            $scope.coaches = resp.data

                     
                    });
                                
                    $scope.show_add_form = function(show){
                        is_new = true;
                        initCoach();
                        $scope.addPanel=show;
                    }
                    $scope.edit = function(coach){
                        is_new = false;
                        $scope.coach = coach;
                        $scope.addPanel =true;
                    }
                    $scope.save = function(){          
                        Coach.save($scope.coach); 
                    }               
                }
                ]).controller("RefereeCtrl", ["$scope","Referee",
                function ($scope,Referee) {  
                    var is_new = false; 
                    $scope.referee = {};
                    $scope.referees = Referee.get();
                    $scope.addPanel =false;
                    var initReferee = function(){
                         $scope.referee ={
                            first_name:'',
                            last_name:'',
                            no:0                           
                        }
                    }                    
                    $scope.$on('responseHandler',function(event,resp){                    
                        if(resp.method=='referee.save'){   
                            initReferee();
                            if(is_new)
                                $scope.referees.push(resp.data);
                        }
                        if(resp.method=='referee.get')   
                            $scope.referees = resp.data
                    });
                                
                    $scope.show_add_form = function(show){
                        is_new = true;
                        initReferee();
                        $scope.addPanel=show;
                    }
                    $scope.edit = function(referee){
                        is_new = false;
                        $scope.referee = referee;
                        $scope.addPanel =true;
                    }
                    $scope.save = function(){          
                        Referee.save($scope.referee); 
                    }               
                }
				]).controller("TeamCtrl", ["$scope","Team","Coach","Player",
                function ($scope,Team,Coach,Player) {  
                    var is_new = false;
                    $scope.teams = Team.get();
                    $scope.coaches = Coach.get();
                    $scope.players = Player.get();
                    $scope.addPanel =false;
                    $scope.player_selected={};
                    
                    var initTeam = function(){
                         $scope.team ={
                            team_name:'',
                            team_alias:'',
                            team_coach:{},
                            players:[],
                        }
                    }               


                    $scope.$on('responseHandler',function(event,resp){                    
                        if(resp.method=='team.save'){   
                            if(is_new){
                                $scope.teams.push(resp.data);
                                initTeam();
                            }
                            alert('Team Saved')
                        }
                        if(resp.method=='team.get')   
                            $scope.teams = resp.data
                        if(resp.method=='coach.get')   
                            $scope.coaches = resp.data
                        if(resp.method=='player.get')   
                            $scope.players = resp.data
                    });
                    $scope.add_player = function(){
                        var player = {
                            _id:$scope.selected_player._id,
                            first_name:$scope.selected_player.first_name,
                            last_name:$scope.selected_player.last_name,
                            position:'',
                            no:0,
                            starter:false
                        }
                        $scope.selected_player = undefined;
                        $scope.team.players.push(player);
                    }
                    $scope.show_add_form = function(show){
                        is_new = true;
                        initTeam();
                        $scope.addPanel=show;
                    }
                    $scope.edit = function(team){                    
                        is_new = false;
                        $scope.team = team;
                        $scope.addPanel =true;
                    }
                    $scope.save = function(){          
                        Team.save($scope.team); 
                    }               
                    $scope.remove_player = function(player){
                        $scope.team.players.splice($scope.team.players.indexOf(player),1);

                    }
                }
                ]).controller("GameCreateCtrl", ["$scope","$http","Team","Referee","Game",
				function ($scope,$http,Team,Referee,Game) {
                    Team.get();
                    Referee.get();                    
                    $scope.games = Game.get();
					$scope.options = {
						teams: [],			
						officials:[],
						venue:[
							{_id:'moa',name:'MOA Arena'},
							{_id:'sja',name:'San Juan Arena'},
							{_id:'araneta',name:'Araneta Coliseum'}
						],
						type:[
							{id:'elims',name:'ELIMS ROUND 1'}
						]

					}
                    var initGameVal =function(){
                        $scope.game ={
                            no:0,
                            sched:{
                                date:'2014-07-12',
                                time:''
                            },
                            venue:{
                                _id:'',
                                name:''
                            },
                            type:{
                                 _id:'',
                                name:''
                            },
                            season:{
                                _id:'',
                                no:77,
                                start:'',
                                end:''
                            },
                            officials:[],
                            clock:'10:00',
                            period:0,                          
                            teams:[],
                            boxscore:[]
                        }
                    }
                    initGameVal();
                    $scope.$on('responseHandler',function(event,resp){ 
                        if(resp.method=='team.get')
                            $scope.options.teams = resp.data;                        
                        if(resp.method=='referee.get')   
                            $scope.options.officials = resp.data  
                        if(resp.method=='game.save'){  
                            alert('Game Saved');
                            initGameVal();
                        }
                         if(resp.method=='game.get')
                            $scope.games = resp.data;

                    });
					

                    $scope.add_official =function(){
                         $scope.game.officials.push({_id:'',first_name:'',last_name:'',no:0});
                    }

                    $scope.remove_official = function(idx){                        
                         $scope.game.officials.splice( idx,1);
                    }
					$scope.save = function(){
                        angular.forEach($scope.game.teams,function(team,index){
                            var playersArr = [];                            
                            angular.forEach($scope.game.teams[index].players,function(player){
                                playersArr.push({_id:player._id,no:player.no,first_name:player.first_name,last_name:player.last_name,starter:player.starter,oncourt:player.starter,position:player.position});        
                            });
                            $scope.game.boxscore.push({team:{_id:team._id,team_name:team.team_name},players:playersArr});
                        });
						Game.save($scope.game);
					};
				}
				]).controller("PlayByPlayCtrl", ["$scope","socket",
				function ($scope,socket) {
					$scope.play_by_plays = [];
					socket.on('play_by_plays', function (data) {
						$scope.play_by_plays=data;
					});
					socket.on('add_play', function (data) {
						$scope.play_by_plays.push(data);
					});

				}
				]).controller("PointPanelCtrl", ["$scope", "$http","socket","Game","$interval","PlayByPlay","$filter",
				function ($scope, $http,socket,Game,$interval,PlayByPlay,$filter) {
					var sectorX = '',
					sectorY,play='',result='',fb_pts=0,ft_made=false,is_player_to=false,isOffensive=false,clock=600000;
					$scope.field_goal = {};
					$scope.current_action = '';
					$scope.selected_player = '';
					$scope.selected_team = '';
                    $scope.player_box =[];
                    $scope.games = Game.get();
                    $scope.game = {};                   
                    $scope.play_by_plays=[];
                    $scope.players_on_court =[];
                

                    var abs_plays = {game:{sport: "BASKETBALL",game_schedule: '',school_1:'',school_2: '',game_sequences:[{gs_id: 1,school: "",player_name: "",game_event: "",quarter: 0,gametime: "",school_1_running_score: 0,school_2_running_score: 0},]}}
                    $scope.$on('responseHandler',function(event,resp){   
                        if(resp.method=='game.get')   
                           $scope.games = resp.data
                        if(resp.method=='game.save'){  
                            console.log(resp);
                            console.log(resp)
                            if(resp.action){                      
                                save_play(resp.action);
                            } 
                        }
                        if(resp.method=='play_by_play.get')   
                           $scope.play_by_plays = resp.data;                       
                    });

                    $scope.sub_in = function(sub_in,player,team){
                        if(sub_in){                            
                            if($scope.players_on_court[team].length==5){
                                alert('There are already 5 players in the court');
                                return;
                            }                          
                            var action = {
                              game_event:'sub_in',
                              period:$scope.game.period,
                              game_time:$scope.game.clock,
                              team_id:$scope.game.teams[team]._id,                        
                              player_name:player.last_name+' '+player.first_name,
                              player_no:player.no,
                              team_name:$scope.game.teams[team].team_name,
                              desc:'Player Sub In',
                              light_score:$scope.game.teams[0].score,
                              dark_score:$scope.game.teams[1].score,
                              lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                            };             
                            player.oncourt=true;
                        }else{
                            var action = {
                              game_event:'sub_out',
                              period:$scope.game.period,
                              game_time:$scope.game.clock,
                              team_id:$scope.game.teams[team]._id,                        
                              player_name:player.last_name+' '+player.first_name,
                              player_no:player.no,
                              team_name:$scope.game.teams[team].team_name,
                              desc:'Player Sub Out',
                              light_score:$scope.game.teams[0].score,
                              dark_score:$scope.game.teams[1].score,
                              lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                            };             
                            player.oncourt=false;
                            //player.mins+= player.time_in-(clock?clock:600000);          
                        }

                        $scope.saveGame(action);
                        $scope.players_on_court[team] =  $filter('filter')($scope.game.boxscore[team].players, {oncourt:true});                
                    }

                //shot types
                $scope.shot_types = [
                {id:'L',name:'Layup/Tip-In'},
                {id:'J',name:'Jump'},
                {id:'D',name:'Dunk'},
                ];

                 //button statuses
                 $scope.btn = {
                 	player_select: {
                 		light: {
                 			enabled: false
                 		},
                 		dark: {
                 			enabled: false
                 		}
                 	},
                    team_select: {
                        light: {
                            enabled: false
                        },
                        dark: {
                            enabled: false
                        }
                    },
                 	fg_shot_type: {
                 		enabled: false
                 	},
                    to_type: {
                        enabled: false
                    },
                 	block: {
                 		enabled: false
                 	},
                    foul_type:{enabled:false},                    
                 };

                 var game_ready = function(){
                    if(!$scope.game._id){
                        alert('Select Game To Continue');
                        return false;
                    }

                    
                    return true;  
                 }
                //set period
                $scope.set_period = function(period){
                      $scope.game.period=period;
                      if(!$scope.game.boxscore[1].team.period[period-1]){
                            $scope.game.boxscore[0].team.period[period-1] = {mins:0, pts:0, ass:0, tov:0, stl:0, pts:0, eff:0, srt:0, fg:{md:0, att:0, in_paint:{md:0, att:0, contested:{md:0, att:0 } }, contested:{md:0, att:0 } }, fg2:{md:0, att:0, contested:{md:0, att:0 }, } ,fg3:{md:0, att:0, contested:{md:0, att:0 } }, ft:{md:0, att:0, }, reb:{off:0, def:0, tot:0 }, blk:{bl:0, bo:0 }, fou:{tot:0, tf:0, def:0, off:0, fo:0, wa:0 }, sc_pts:0, tov_pts:0, fb_pts:{att:0, pts:0 }};
                            $scope.game.boxscore[1].team.period[period-1] ={mins:0, pts:0, ass:0, tov:0, stl:0, pts:0, eff:0, srt:0, fg:{md:0, att:0, in_paint:{md:0, att:0, contested:{md:0, att:0 } }, contested:{md:0, att:0 } }, fg2:{md:0, att:0, contested:{md:0, att:0 }, } ,fg3:{md:0, att:0, contested:{md:0, att:0 } }, ft:{md:0, att:0, }, reb:{off:0, def:0, tot:0 }, blk:{bl:0, bo:0 }, fou:{tot:0, tf:0, def:0, off:0, fo:0, wa:0 }, sc_pts:0, tov_pts:0, fb_pts:{att:0, pts:0 }};
                            angular.forEach($scope.game.boxscore[0].players,function(player){
                               player.period[period-1]={plus_minus:0,mins:0, ass:0, tov:{tot:0, receiving:0,travelling:0, dribbling:0, passing:0, three_sec:0, five_sec:0, eight_sec:0, shot_clock:0, off_foul:0, ball_handling:0 }, stl:0, pts:0, eff:0, srt:0, fg:{md:0, att:0, in_paint:{md:0, att:0, contested:{md:0, att:0 } }, contested:{md:0, att:0 } }, fg2:{md:0, att:0, contested:{md:0, att:0 } }, fg3:{md:0, att:0, contested:{md:0, att:0 } }, ft:{md:0, att:0, }, reb:{off:0, def:0, tot:0 }, blk:{bl:0, bo:0 }, fou:{tot:0, tf:0, def:0, off:0, fo:0, wa:0 }};
                            });
                            angular.forEach($scope.game.boxscore[1].players,function(player){
                               player.period[period-1]={plus_minus:0,mins:0, ass:0, tov:{tot:0,receiving:0, travelling:0, dribbling:0, passing:0, three_sec:0, five_sec:0, eight_sec:0, shot_clock:0, off_foul:0, ball_handling:0 }, stl:0, pts:0, eff:0, srt:0, fg:{md:0, att:0, in_paint:{md:0, att:0, contested:{md:0, att:0 } }, contested:{md:0, att:0 } }, fg2:{md:0, att:0, contested:{md:0, att:0 } }, fg3:{md:0, att:0, contested:{md:0, att:0 } }, ft:{md:0, att:0, }, reb:{off:0, def:0, tot:0 }, blk:{bl:0, bo:0 }, fou:{tot:0, tf:0, def:0, off:0, fo:0, wa:0 }};
                            });
                        }
                      $scope.saveGame();
                };

                //player selection for action
                $scope.player_select = function (team, player) {
                	$scope.selected_player = player;
                	switch ($scope.current_action) {
                		case 'shot_attempt':
                		$scope.selected_team = team;
                		$scope.btn.fg_shot_type.enabled = true;
                		break;
                		case 'assist':
                		saveAssist();
                		clear();
                		break;
                		case 'rebound':
                        isOffensive = team == $scope.selected_team;
                		saveRebound(team,true);
                        $scope.selected_team = team;
                		clear();
                		break;
                		case 'block':
                		    saveBlock();
                		    $scope.selected_player = '';
                		    $scope.current_action = 'rebound';
                		    player_select_btn_switch(true);
                		    $scope.btn.block.enabled = false;
                		break;
                		case 'turn_over':
                            is_player_to=true;
                            $scope.selected_team = team;
                		    $scope.btn.to_type.enabled = true;                            
                        break;
                        case 'foul':
                            is_player_to=true;
                            $scope.selected_team = team;
                            $scope.btn.foul_type.enabled=true;                                                
                        break;
                        case 'free_throw':
                            $scope.selected_team = team; 
                            saveFreeThrow();
                            clear();                          
                        break;
                        case 'steal':                   
                            $scope.selected_team = team;
                            saveSteal();                         
                        break;                                               
                	};

                };
                 //team selection for action
                $scope.team_select = function (team) {
                    switch ($scope.current_action) {                      
                        case 'fast_break':                                                 
                            $scope.selected_team = team;
                            saveFastBreak();                         
                        break;  
                        case 'tov_points':                                                
                            $scope.selected_team = team;
                            saveTOPoints();                         
                        break;    
                        case 'second_chance_pts':                                                
                            $scope.selected_team = team;
                            save2ndChancePoints();                         
                        break;   
                        case 'turn_over':
                            is_player_to=false;
                            $scope.selected_player='';
                            $scope.selected_team = team;
                            $scope.btn.to_type.enabled = true;                            
                        break;   
                        case 'team_rebound':
                            $scope.selected_team = team;
                            saveRebound(team,false);                        
                            clear();
                        break;
                        case 'foul':
                            is_player_to=false;
                            $scope.selected_team = team;
                            $scope.btn.foul_type.enabled=true;                                                
                        break;                                                       
                    };
                };
                $scope.set_game = function(){
                    $scope.game = $scope.selected_game;
                    if($scope.game._id){
                        if(!$scope.game.period)
                            $scope.set_period(1);

                        $scope.players_on_court[0] =  $filter('filter')($scope.game.boxscore[0].players, {oncourt:true});
                        $scope.players_on_court[1] =  $filter('filter')($scope.game.boxscore[1].players, {oncourt:true});                        
                        $scope.play_by_plays = PlayByPlay.get($scope.game._id);
                    }
                }

                $scope.get_player_box = function(team,player){
                     $scope.player_box[team] = player;
                };

                //shot attempt action
                $scope.shot_attempt = function (value, zone,is_in_paint) {
                     if(!game_ready())
                        return
                    if(!$scope.current_action=='shot_attempt')
                	   $scope.selected_player = '';
                	$scope.current_action = 'shot_attempt';
                	player_select_btn_switch(true);
                	$scope.field_goal = {
                		shot_type: '',
                		value: value,
                		free_throw: false,
                		game_period: $scope.game.period,
                		game_clock: $scope.game.clock,
                		game_id:$scope.game._id,
                		from_assist: false,
                		shot_zone: zone,
                		made: false,
                		blocked:false,
                		contested: false,
                        is_in_paint:is_in_paint,
                	};
                };
                $scope.saveGame = function(action){                 
                     Game.save($scope.game,action);
                }
                $scope.adjustClock = function(secs){
                     if(!game_ready())
                        return
                    $scope.$broadcast('timer-add-cd-seconds',secs);
                }

                $scope.delete_play = function(play,remove){
                   if(confirm('Are you Sure?')){
                        alert(play.game_event);
                        switch(play.game_event){
                           case 'assist':
                           $scope.game.boxscore[play.op.team_index].players[play.op.player_index].ass-=1;
                           $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].ass-=1;
                           $scope.game.boxscore[play.op.team_index].team.ass -= 1;
                           $scope.game.boxscore[play.op.team_index].team.period[play.period-1].ass-=1;;    
                           break;
                           case 'block':
                           $scope.game.boxscore[play.op.team_index].players[play.op.player_index].blk.bl-=1;
                           $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].blk.bl-=1;
                           $scope.game.boxscore[play.op.team_index].team.blk.bl -= 1;
                           $scope.game.boxscore[play.op.team_index].team.period[play.period-1].blk.bl-=1;;    
                           break;
                           case 'rebound':
                           if(play.op.is_offensive){
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].reb.off-=1;
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].reb.off-=1;
                             $scope.game.boxscore[play.op.team_index].team.reb.off -= 1;
                             $scope.game.boxscore[play.op.team_index].team.period[play.period-1].reb.off-=1;
                           }else{
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].reb.def-=1;
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].reb.def-=1;
                             $scope.game.boxscore[play.op.team_index].team.reb.def -= 1;
                             $scope.game.boxscore[play.op.team_index].team.period[play.period-1].reb.def-=1;
                           }
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].reb.tot-=1;
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].reb.tot-=1;
                             $scope.game.boxscore[play.op.team_index].team.reb.tot -= 1;
                             $scope.game.boxscore[play.op.team_index].team.period[play.period-1].reb.tot-=1;
                           break;
                           case 'foul':
                           if(play.op.is_offensive){
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].fou.off-=1;
                             $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].fou.off-=1;
                             $scope.game.boxscore[play.op.team_index].team.fou.off -= 1;
                             $scope.game.boxscore[play.op.team_index].team.period[play.period-1].fou.off-=1;
                           }else{
                             if(play.op.is_tech){
                               $scope.game.boxscore[play.op.team_index].players[play.op.player_index].fou.tf-=1;
                               $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].fou.tf-=1;
                               $scope.game.boxscore[play.op.team_index].team.fou.tf -= 1;
                               $scope.game.boxscore[play.op.team_index].team.period[play.period-1].fou.tf-=1;
                             }else{
                               $scope.game.boxscore[play.op.team_index].players[play.op.player_index].fou.def-=1;
                               $scope.game.boxscore[play.op.team_index].players[play.op.player_index].period[play.period-1].fou.def-=1;
                               $scope.game.boxscore[play.op.team_index].team.fou.def -= 1;
                               $scope.game.boxscore[play.op.team_index].team.period[play.period-1].fou.def-=1;
                             }
                           }
                           break;
                        }
                        $scope.play_by_plays.actions.splice($scope.play_by_plays.actions.indexOf(play),1);
                        PlayByPlay.save($scope.play_by_plays);   
                        $scope.saveGame();
                   }
                };
                //====Save Functions
                function saveAssist() {
                	$scope.selected_player.ass += 1;
                    $scope.selected_player.period[$scope.game.period-1].ass+=1;
                    $scope.game.boxscore[$scope.selected_team].team.ass += 1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].ass+=1;;    

                	/*$scope.selected_player.periods[$scope.game.period-1].ass+=1;
                	save_play($scope.selected_team.team_name,$scope.selected_team.team_id,$scope.selected_player.id,$scope.selected_player.pfn,$scope.selected_player.no,$scope.game.clock,$scope.game.period,'assist ('+$scope.selected_player.ass+')');
                	saveGame();*/
                    var action = {
                        game_event:'assist',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                        
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:'Assist',
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[$scope.selected_team].players.indexOf($scope.selected_player),
                            team_index:$scope.selected_team,
                            assist:$scope.selected_player.ass,
                        }
                    };                                   
                    $scope.selected_player = '';
                    $scope.current_action = '';
                    $scope.saveGame(action);
                };

                function saveRebound(team,player_reb) {  
                	if(isOffensive){    
                        if(player_reb){
                            $scope.selected_player.reb.off += 1;
                            $scope.selected_player.period[$scope.game.period-1].reb.off+=1;
                        }
                        $scope.game.boxscore[team].team.reb.off += 1; 
                        $scope.game.boxscore[team].team.period[$scope.game.period-1].reb.off+=1;
                	}else{ 
                        if(player_reb){
                            $scope.selected_player.reb.def += 1;
                            $scope.selected_player.period[$scope.game.period-1].reb.def+=1;
                        }
                        $scope.game.boxscore[team].team.reb.def += 1; 
                        $scope.game.boxscore[team].team.period[$scope.game.period-1].reb.def+=1;
                	}
                    if(player_reb){
                	    $scope.selected_player.reb.tot += 1;
                        $scope.selected_player.period[$scope.game.period-1].reb.tot+=1;

                    var action = {
                        game_event:'rebound',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[team]._id,                        
                        team_name:$scope.game.teams[team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:isOffensive?'Offensive Rebound':'Defensive Rebound',
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[team].players.indexOf($scope.selected_player),
                            team_index:team,
                            is_offensive:isOffensive,
                            off:$scope.selected_player.reb.off,
                            def:$scope.selected_player.reb.def
                        }
                        };             
                    }else{
                    var action = {
                        game_event:'team_rebound',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[team]._id,                        
                        team_name:$scope.game.teams[team].team_name,
                        desc:isOffensive?'Team Offensive Rebound':'Team Defensive Rebound',
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            team_index:team,
                        }
                        };             
                    }
                    $scope.game.boxscore[team].team.reb.tot += 1; 
                    $scope.game.boxscore[team].team.period[$scope.game.period-1].reb.tot+=1;
                	$scope.selected_player = '';
                	$scope.current_action = '';
                    $scope.saveGame(action);                	
                };

                function saveSteal() {  
                    $scope.selected_player.stl+=1;
                    $scope.selected_player.period[$scope.game.period-1].stl+=1;                    
                    $scope.game.boxscore[$scope.selected_team].team.stl+=1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].stl+=1;
                     var action = {
                        game_event:'steal',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                        
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:'Steal',
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[$scope.selected_team].players.indexOf($scope.selected_player),
                            team_index:$scope.selected_team,
                            steal:$scope.selected_player.stl,
                        }
                    };              
                    player_select_btn_switch(false, $scope.selected_team);
                    $scope.selected_player = '';
                    $scope.current_action = '';
                    $scope.saveGame(action);
                    //$scope.selected_player.periods[$scope.game.period-1].tov.tot+=1
                    //saveGame();
                };

                function saveFreeThrow() { 
                    if(ft_made){                        
                       $scope.selected_player.ft.md+=1;
                       $scope.selected_player.pts+=1;
                       $scope.selected_player.period[$scope.game.period-1].ft.md+=1;
                       $scope.selected_player.period[$scope.game.period-1].pts+=1;

                       $scope.game.boxscore[$scope.selected_team].team.ft.md+=1;
                       $scope.game.boxscore[$scope.selected_team].team.pts+=1;
                       $scope.game.teams[$scope.selected_team].score+=1;  

                       $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].pts+=1;
                       $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].ft.md+=1;                  
                    }
                    $scope.selected_player.ft.att+=1;
                    $scope.selected_player.period[$scope.game.period-1].ft.att+=1;
                    $scope.game.boxscore[$scope.selected_team].team.ft.att+=1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].ft.att+=1; 
                     var desc = 'Free Throw'+ft_made?' Made':' Missed';
                     var action = {
                        game_event:'free_throw',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                        
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:desc,
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[$scope.selected_team].players.indexOf($scope.selected_player),
                            team_index:$scope.selected_team,
                            made:ft_made,
                            att:$scope.selected_player.ft.att,
                            md:$scope.selected_player.ft.md
                        }
                    };              
                    $scope.selected_player = '';
                    $scope.current_action = ''; 
                    $scope.saveGame(action);   

                	//$scope.selected_player.periods[$scope.game.period-1].tov.tot+=1
                	//saveGame();
                };
                 function saveTurnOver(type,player_to) {  
                    if(player_to){
                        $scope.selected_player.tov.tot+=1;
                        $scope.selected_player.tov.tot[type]+=1;
                        $scope.selected_player.period[$scope.game.period-1].tov.tot+=1;
                        $scope.selected_player.period[$scope.game.period-1].tov[type]+=1;
                    }
                    $scope.game.boxscore[$scope.selected_team].team.tov+=1;
                    $scope.game.boxscore[$scope.selected_team].team.tov[type]+=1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].tov+=1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].tov[type]+=1;
                    var action = {
                        game_event:'turn_over',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                        
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:'Turnover',
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[$scope.selected_team].players.indexOf($scope.selected_player),
                            team_index:$scope.selected_team,
                            tov:$scope.selected_player.tov.tot,
                            type:type,
                        }
                    };                    
                    $scope.selected_player = '';
                    $scope.current_action = '';
                    $scope.saveGame(action);                
                    //$scope.selected_player.periods[$scope.game.period-1].tov.tot+=1
                    //saveGame();
                };

                function saveBlock() {   
                    $scope.selected_player.blk.bl+=1;
                    $scope.selected_player.period[$scope.game.period-1].blk.bl+=1;

                    var team = $scope.selected_team?0:1;
                    $scope.game.boxscore[team].team.blk.bl+=1;                	
                    $scope.game.boxscore[team].team.period[$scope.game.period-1].blk.bl+=1;

                    var action = {
                        game_event:'block',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[team]._id,                        
                        team_name:$scope.game.teams[team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:'Block',
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[team].players.indexOf($scope.selected_player),
                            team_index:team,
                            block:$scope.selected_player.blk.bl,
                        }
                    };                    
                    $scope.saveGame(action);
                	// saveGame();
                };

                function saveFastBreak() {  
                   $scope.game.boxscore[$scope.selected_team].team.fb_pts.pts += fb_pts;
                   $scope.game.boxscore[$scope.selected_team].team.fb_pts.att += 1;
                   $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fb_pts.pts+=fb_pts;
                   $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fb_pts.att+=1;
                   clear();
                   $scope.current_action = ''; 
                   $scope.saveGame();
                    // saveGame();
                };

                function saveTOPoints() {  
                   $scope.game.boxscore[$scope.selected_team].team.tov_pts +=1;
                   $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].tov_pts+=1;
                   clear();
                   $scope.current_action = ''; 
                   $scope.saveGame();
                    // saveGame();
                };
                function save2ndChancePoints() {  
                   $scope.game.boxscore[$scope.selected_team].team.sc_pts += 1;
                   $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].sc_pts+=1;
                   clear();
                   $scope.current_action = ''; 
                   $scope.saveGame();
                    // saveGame();
                };
                function saveFieldGoal() {
                	if ($scope.field_goal.made) {         

                        $scope.selected_player.pts += $scope.field_goal.value;
                        $scope.selected_player.period[$scope.game.period-1].pts += $scope.field_goal.value;
                        $scope.game.teams[$scope.selected_team].score += $scope.field_goal.value;
                        $scope.game.teams[$scope.selected_team].pts += $scope.field_goal.value;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].pts+=$scope.field_goal.value;
                      

                            angular.forEach($scope.players_on_court[$scope.selected_team],function(player){
                                player.plus_minus+=$scope.field_goal.value;
                                player.period[$scope.game.period-1].plus_minus+=$scope.field_goal.value;
                            });
                            var opponent = $scope.selected_team?0:1;                    
                            angular.forEach($scope.players_on_court[opponent],function(player){
                                player.plus_minus-=$scope.field_goal.value;
                                player.period[$scope.game.period-1].plus_minus-=$scope.field_goal.value;
                            });                    





	
						if($scope.field_goal.value==2){

                            $scope.game.boxscore[$scope.selected_team].team.fg2.md+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg2.md+=1;

                            $scope.selected_player.fg2.md+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg2.md +=1;

                            if($scope.field_goal.contested){

                                $scope.game.boxscore[$scope.selected_team].team.fg2.contested.md+=1;
                                $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg2.contested.md+=1;

                                $scope.selected_player.fg2.contested.md+=1;
                                $scope.selected_player.period[$scope.game.period-1].fg2.contested.md+=1;
                            }
						}else{
                            $scope.game.boxscore[$scope.selected_team].team.fg3.md+=1
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg3.md+=1;
                            $scope.selected_player.fg3.md+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg3.md+=1;
                              
                            if($scope.field_goal.contested){
                                $scope.game.boxscore[$scope.selected_team].team.fg3.contested.md+=1;
                                $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg3.contested.md+=1;
                                $scope.selected_player.fg3.contested.md+=1;
                                $scope.selected_player.period[$scope.game.period-1].fg3.contested.md+=1;
                            }
						}

                        $scope.game.boxscore[$scope.selected_team].team.fg.md+=1
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.md+=1;
                        $scope.selected_player.fg.md+=1;
                        $scope.selected_player.period[$scope.game.period-1].fg.md+=1;

                         if($scope.field_goal.contested){
                             $scope.game.boxscore[$scope.selected_team].team.fg.contested.md+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.contested.md+=1;
                            $scope.selected_player.fg.contested.md+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg.contested.md+=1;
                        }

						if ($scope.field_goal.from_assist) {                			
							$scope.current_action = 'assist';
							player_select_btn_switch(true, $scope.selected_team);
						} else {
							player_select_btn_switch(false);
							$scope.current_action = '';
						}             
					result = 'Made'+' ('+$scope.selected_player.pts+' pts)';
					}else {

					 	result = 'Missed';
						if($scope.field_goal.blocked){  
                            $scope.selected_player.blk.bo+=1;
                            $scope.selected_player.period[$scope.game.period-1].blk.bo+=1;
                             $scope.game.boxscore[$scope.selected_team].team.blk.bo+=1;      			
                             $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].blk.bo+=1;
							$scope.current_action = 'block';
							player_select_btn_switch(false, $scope.selected_team)
						}else{
							$scope.current_action = 'rebound';
							player_select_btn_switch(true);
						}

					}

						

                    if($scope.field_goal.is_in_paint){
                        if($scope.field_goal.made){
                            $scope.game.boxscore[$scope.selected_team].team.fg.in_paint.md+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.in_paint.md+=1;

                            $scope.selected_player.fg.in_paint.md+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg.in_paint.md+=1;
                            if($scope.field_goal.contested){
                                $scope.game.boxscore[$scope.selected_team].team.fg.in_paint.contested.md+=1;
                                $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.in_paint.contested.md+=1;
                                $scope.selected_player.fg.in_paint.contested.md+=1;
                                $scope.selected_player.period[$scope.game.period-1].fg.in_paint.contested.md+=1;
                            }
                        }

                        $scope.game.boxscore[$scope.selected_team].team.fg.in_paint.att+=1;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.in_paint.att+=1;
                        $scope.selected_player.fg.in_paint.att+=1;
                        $scope.selected_player.period[$scope.game.period-1].fg.in_paint.att+=1;
                        if($scope.field_goal.contested){
                            $scope.game.boxscore[$scope.selected_team].team.fg.in_paint.contested.att+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.in_paint.contested.att+=1;
                            $scope.selected_player.fg.in_paint.contested.att+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg.in_paint.contested.att+=1;
                        }
                
                    }
					if($scope.field_goal.value==3){
						shot_type = "3pt";
						$scope.game.boxscore[$scope.selected_team].team.fg3.att+=1;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg3.att+=1;
                        $scope.selected_player.fg3.att+=1;
                        $scope.selected_player.period[$scope.game.period-1].fg3.att+=1;

                        if($scope.field_goal.contested){
                            $scope.game.boxscore[$scope.selected_team].team.fg3.contested.att+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg3.contested.att+=1;
                            $scope.selected_player.fg3.contested.att+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg3.contested.att+=1;
                        }
					}else{
						shot_type = $scope.field_goal.shot_type.name;	
                        $scope.game.boxscore[$scope.selected_team].team.fg2.att+=1;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg2.att+=1;
                        $scope.selected_player.fg2.att+=1;
                        $scope.selected_player.period[$scope.game.period-1].fg2.att+=1;

					   if($scope.field_goal.contested){
                            $scope.game.boxscore[$scope.selected_team].team.fg2.contested.att+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg2.contested.att+=1;
                            $scope.selected_player.fg2.contested.att+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg2.contested.att+=1;
                        }
					}

                    $scope.game.boxscore[$scope.selected_team].team.fg.att+=1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.att+=1;
                    $scope.selected_player.fg.att+=1;
                    $scope.selected_player.period[$scope.game.period-1].fg.att+=1;

                    if($scope.field_goal.contested){
                            $scope.game.boxscore[$scope.selected_team].team.fg.contested.att+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fg.contested.att+=1;
                            $scope.selected_player.fg.contested.att+=1;
                            $scope.selected_player.period[$scope.game.period-1].fg.contested.att+=1;
                    }
					play = $scope.game.teams[$scope.selected_team].team_name+' - '+$scope.selected_player.last_name+' '+shot_type+' shot:'+result;
                     var desc = '';
                      if($scope.field_goal.value==3)
                         desc = '3-Point '+$scope.field_goal.made?' Made':' Missed';
                     else
                         desc = '2-Point '+$scope.field_goal.made?' Made':' Missed';
                     var action = {
                        game_event:'field_goal',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                        
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:desc,
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[$scope.selected_team].players.indexOf($scope.selected_player),
                            team_index:$scope.selected_team,
                            is_in_paint:$scope.field_goal.is_in_paint,
                            made:$scope.field_goal.made,
                            value:$scope.field_goal.value,
                            from_assist:$scope.field_goal.from_assist,
                            att:$scope.selected_player.fg.att,
                            md:$scope.selected_player.fg.md,
                            is_blocked:$scope.field_goal.blocked,
                            is_contested:$scope.field_goal.contested
                        }
                    };                  
					$scope.field_goal = {};
					$scope.selected_player = '';
                    $scope.saveGame(action);
				};



				$scope.setShotLocation = function (e) {
					sectorX = (e.pageX - e.currentTarget.offsetLeft);
					sectorY = (e.pageY - e.currentTarget.offsetTop);
				};

				function save_play(action){
                    $scope.play_by_plays.actions.push(action);
                    PlayByPlay.save($scope.play_by_plays);   
                    //socket.emit('add_play',play);                 
				};



                //rebound action
                $scope.team_rebound = function (is_offensive) {
                    if(!game_ready())
                        return
                    isOffensive=is_offensive;
                	$scope.current_action = 'team_rebound';
                	team_select_btn_switch(true);
                };
                //block action
                $scope.block = function () {
                	$scope.current_action = 'block';
                	player_select_btn_switch(false, $scope.selected_team);
                };
                //save field goal
                $scope.save_field_goal = function (made, contested,blocked) {
                	$scope.field_goal.made = made;
                	$scope.field_goal.contested = contested;
                	$scope.field_goal.blocked = blocked;  
                    clear();              	
                	saveFieldGoal();
                    //alert('X-'+sectorX+' Y-'+sectorY);

                };
                $scope.save_turn_over = function (type) {                    
                    clear();                             
                    saveTurnOver(type,is_player_to);
                };
               
                $scope.free_throw = function(made){
                     if(!game_ready())
                        return
                    clear();
                    ft_made = made;
                    $scope.field_goal = {};
                    $scope.selected_player = '';
                    player_select_btn_switch(true);
                    $scope.current_action = 'free_throw';      
                }

                $scope.turn_over = function(){
                     if(!game_ready())
                        return
                	clear();                	
                	$scope.current_action = 'turn_over';
                    $scope.field_goal = {};
                    $scope.selected_player = '';
                	player_select_btn_switch(true);
                    team_select_btn_switch(true);
                }
      
                $scope.second_chance_pts = function(){
                     if(!game_ready())
                        return
                    clear();
                    $scope.field_goal = {};                  
                    $scope.current_action = 'second_chance_pts';
                    team_select_btn_switch(true);
                }


                $scope.fast_break = function(pts){
                    if(!game_ready())
                        return
                    clear();
                    $scope.field_goal = {};
                    fb_pts = pts;                    
                    $scope.current_action = 'fast_break';
                    team_select_btn_switch(true);
                }


                $scope.tov_points = function(){
                     if(!game_ready())
                        return
                    clear();
                    $scope.field_goal = {};                  
                    $scope.current_action = 'tov_points';
                    team_select_btn_switch(true);
                }
               


                    
//=============Dandy's Code

                $scope.foul=function(){   
                    if(!game_ready())
                        return             
                    $scope.field_goal = {};
                    $scope.selected_player = '';
                    player_select_btn_switch(true);
                    team_select_btn_switch(true);
                    $scope.current_action = 'foul';                
                };    
                $scope.foul_on=function(){   
                    if(!game_ready())
                        return             
                    $scope.field_goal = {};
                    $scope.selected_player = '';
                    player_select_btn_switch(true);
                    team_select_btn_switch(true);
                    $scope.current_action = 'foul_on';                
                };    


                $scope.saveFoul=function(isOffensive,withAward,is_tech){
                    var desc = isOffensive?'Offensive Foul':'Defensive Foul';
                    if(is_player_to){    
                        $scope.selected_player.fou.tot+=1;
                        $scope.selected_player.period[$scope.game.period-1].fou.tot+=1;                        
                    }
                    $scope.game.boxscore[$scope.selected_team].team.fou.tot+=1;
                    $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fou.tot+=1;
                    if(isOffensive){
                        if(is_player_to){
                            $scope.selected_player.fou.off+=1;
                            $scope.selected_player.tov.tot+=1;
                            $scope.selected_player.tov.off_foul+=1;
                            $scope.selected_player.period[$scope.game.period-1].fou.off+=1;
                            $scope.selected_player.period[$scope.game.period-1].tov.tot+=1; 
                            $scope.selected_player.period[$scope.game.period-1].tov.off_foul+=1;                                               
                        }
                        $scope.game.boxscore[$scope.selected_team].team.fou.off+=1;
                        $scope.game.boxscore[$scope.selected_team].team.tov+=1;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fou.off+=1;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].tov.tot+=1;
                    }else{  
                        if(is_player_to){                    
                            if(is_tech){
                                $scope.selected_player.fou.tf+=1;
                                $scope.selected_player.period[$scope.game.period-1].fou.tf+=1;                        
                            }else{
                                $scope.selected_player.fou.def+=1;
                                $scope.selected_player.period[$scope.game.period-1].fou.def+=1;                        
                            }
                        }
                        if(is_tech){
                            desc = 'Technical Foul'; 
                            $scope.game.boxscore[$scope.selected_team].team.fou.tf+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fou.tf+=1;
                        }else{
                            $scope.game.boxscore[$scope.selected_team].team.fou.def+=1;
                            $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fou.def+=1;
                        }
                    }
                    if(withAward){
                        if(is_player_to){                    
                          $scope.selected_player.fou.wa+=1;
                          $scope.selected_player.period[$scope.game.period-1].fou.wa+=1;       
                        }                 
                        $scope.game.boxscore[$scope.selected_team].team.fou.wa+=1;
                        $scope.game.boxscore[$scope.selected_team].team.period[$scope.game.period-1].fou.wa+=1;
                    }
                    if(is_player_to){                    
                     var action = {
                        game_event:'foul',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                        
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        player_no:$scope.selected_player.no,
                        player_name:$scope.selected_player.last_name+' '+$scope.selected_player.first_name,
                        desc:desc,
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            player_index:$scope.game.boxscore[$scope.selected_team].players.indexOf($scope.selected_player),
                            team_index:$scope.selected_team,
                            off:$scope.selected_player.fou.off,
                            def:$scope.selected_player.fou.def,
                            tf:$scope.selected_player.fou.tf,
                            wa:withAward,
                            is_tech:is_tech,
                        }
                      };
                    }else{
                     var action = {
                        game_event:'team_foul',
                        period:$scope.game.period,
                        game_time:$scope.game.clock,
                        team_id:$scope.game.teams[$scope.selected_team]._id,                    
                        team_name:$scope.game.teams[$scope.selected_team].team_name,
                        desc:desc,
                        light_score:$scope.game.teams[0].score,
                        dark_score:$scope.game.teams[1].score,
                        lead:$scope.game.teams[0].score-$scope.game.teams[1].score,
                        op:{
                            team_index:$scope.selected_team,
                            wa:withAward,
                        }
                     } 
                     }
                     clear();
                    $scope.selected_player = '';
                    $scope.current_action = '';
                    $scope.saveGame(action);
                };


                $scope.steal=function(){
                     if(!game_ready())
                        return
                    $scope.field_goal = {};
                    $scope.current_action='steal';
                    player_select_btn_switch(true);
                };


//===========End Dandy

                //button switch
                var player_select_btn_switch = function (enabled, team) {
                	if (team != undefined) {
                		if (team==0) {
                			$scope.btn.player_select.light.enabled = enabled;
                			$scope.btn.player_select.dark.enabled = !enabled;
                		} else {
                			$scope.btn.player_select.dark.enabled = enabled;
                			$scope.btn.player_select.light.enabled = !enabled
                		}
                	} else {
                		$scope.btn.player_select.dark.enabled = enabled;
                		$scope.btn.player_select.light.enabled = enabled
                	}

                };
                var team_select_btn_switch = function (enabled, team) {
                    if (team != undefined) {
                        if (team==0) {
                            $scope.btn.team_select.light.enabled = enabled;
                            $scope.btn.team_select.dark.enabled = !enabled;
                        } else {
                            $scope.btn.team_select.dark.enabled = enabled;
                            $scope.btn.team_select.light.enabled = !enabled
                        }
                    } else {
                        $scope.btn.team_select.dark.enabled = enabled;
                        $scope.btn.team_select.light.enabled = enabled
                    }

                };

                var clear = function () {

                	player_select_btn_switch(false);
                    team_select_btn_switch(false);
                	$scope.btn.fg_shot_type.enabled = false;
                	$scope.btn.block.enabled = false;
                    $scope.btn.to_type.enabled = false;
                    $scope.btn.foul_type.enabled = false;
                }
                    //timer
                    $scope.timerRunning = false;
                    $scope.startStopTimer = function () {
                        if(!game_ready())
                            return;
                            
                        $scope.saveGame();                           
                    	if ($scope.timerRunning){
                    		$scope.$broadcast('timer-stop');
                        }else{
                    		$scope.$broadcast('timer-start');
                        }
                    	$scope.timerRunning = !$scope.timerRunning
                    };
                    var counter =0 ;
                    $scope.$on('timer-tick', function (event, args) {                     
                        counter++;
                        if(counter==10){
                            angular.forEach($scope.players_on_court[1],function(player){
                                player.mins+=10000;
                                //player.period[$scope.period-1].mins+=10000;
                                console.log(player)
                            });                    
                            angular.forEach($scope.players_on_court[0],function(player){
                                player.mins+=10000;
                                //player.period[$scope.period-1].mins+=10000;
                                console.log(player)
                            });                    
                            counter=0;
                        }
                    	$scope.game.clock = args.mins+':'+args.secs;
                        clock = args.millis;
                                                
                    });
                }
                ])
    }.call(this),
    function () {
        angular.module("app.directives", []).directive("imgHolder", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        return Holder.run({
                            images: ele[0]
                        })
                    }
                }
            }
        ]).directive("customBackground", function () {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$location",
                    function ($scope, $element, $location) {
                        var addBg, path;
                        return path = function () {
                            return $location.path()
                        }, addBg = function (path) {
                            switch ($element.removeClass("body-home body-special body-tasks body-lock"), path) {
                            case "/":
                                return $element.addClass("body-home");
                            case "/404":
                            case "/pages/500":
                            case "/pages/signin":
                            case "/pages/signup":
                            case "/point-panel":
                                return $element.addClass("body-special");
                            case "/pages/lock-screen":
                                return $element.addClass("body-special body-lock");
                            case "/tasks":
                                return $element.addClass("body-tasks")
                            }
                        }, addBg($location.path()), $scope.$watch(path, function (newVal, oldVal) {
                            return newVal !== oldVal ? addBg($location.path()) : void 0
                        })
                    }
                ]
            }
        }).directive("uiColorSwitch", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        return ele.find(".color-option").on("click", function (event) {
                            var $this, hrefUrl, style;
                            if ($this = $(this), hrefUrl = void 0, style = $this.data("style"), "loulou" === style) hrefUrl = "styles/main.css", $('link[href^="styles/main"]').attr("href", hrefUrl);
                            else {
                                if (!style) return !1;
                                style = "-" + style, hrefUrl = "styles/main" + style + ".css", $('link[href^="styles/main"]').attr("href", hrefUrl)
                            }
                            return event.preventDefault()
                        })
                    }
                }
            }
        ]).directive("toggleMinNav", ["$rootScope",
            function ($rootScope) {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        var $window, Timer, app, updateClass;
                        return app = $("#app"), $window = $(window), ele.on("click", function (e) {
                            return app.hasClass("nav-min") ? app.removeClass("nav-min") : (app.addClass("nav-min"), $rootScope.$broadcast("minNav:enabled")), e.preventDefault()
                        }), Timer = void 0, updateClass = function () {
                            var width;
                            return width = $window.width(), 768 > width ? app.removeClass("nav-min") : void 0
                        }, $window.resize(function () {
                            var t;
                            return clearTimeout(t), t = setTimeout(updateClass, 300)
                        })
                    }
                }
            }
        ]).directive("collapseNav", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        var $a, $aRest, $lists, $listsRest, app;
                        return $lists = ele.find("ul").parent("li"), $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>'), $a = $lists.children("a"), $listsRest = ele.children("li").not($lists), $aRest = $listsRest.children("a"), app = $("#app"), $a.on("click", function (event) {
                            var $parent, $this;
                            return app.hasClass("nav-min") ? !1 : ($this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").slideToggle(), event.preventDefault())
                        }), $aRest.on("click", function () {
                            return $lists.removeClass("open").find("ul").slideUp()
                        }), scope.$on("minNav:enabled", function () {
                            return $lists.removeClass("open").find("ul").slideUp()
                        })
                    }
                }
            }
        ]).directive("highlightActive", [
            function () {
                return {
                    restrict: "A",
                    controller: ["$scope", "$element", "$attrs", "$location",
                        function ($scope, $element, $attrs, $location) {
                            var highlightActive, links, path;
                            return links = $element.find("a"), path = function () {
                                return $location.path()
                            }, highlightActive = function (links, path) {
                                return path = "#" + path, angular.forEach(links, function (link) {
                                    var $li, $link, href;
                                    return $link = angular.element(link), $li = $link.parent("li"), href = $link.attr("href"), $li.hasClass("active") && $li.removeClass("active"), 0 === path.indexOf(href) ? $li.addClass("active") : void 0
                                })
                            }, highlightActive(links, $location.path()), $scope.$watch(path, function (newVal, oldVal) {
                                return newVal !== oldVal ? highlightActive(links, $location.path()) : void 0
                            })
                        }
                    ]
                }
            }
        ]).directive("toggleOffCanvas", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        return ele.on("click", function () {
                            return $("#app").toggleClass("on-canvas")
                        })
                    }
                }
            }
        ]).directive("slimScroll", [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, ele) {
                        return ele.slimScroll({
                            height: "100%"
                        })
                    }
                }
            }
        ]).directive("goBack", [
            function () {
                return {
                    restrict: "A",
                    controller: ["$scope", "$element", "$window",
                        function ($scope, $element, $window) {
                            return $element.on("click", function () {
                                return $window.history.back()
                            })
                        }
                    ]
                }
            }
        ])
    }.call(this);
