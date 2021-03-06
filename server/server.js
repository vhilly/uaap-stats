	var express  = require('express');
	var app      = express(); 	
	var http = require('http')							// create our app w/ express
	var mongoose = require('mongoose'); 
	var server = http.createServer(app);					
	var bodyParser = require('body-parser');
	var io = require('socket.io').listen(server);

	// configuration =================

	mongoose.connect('mongodb://localhost/uaap-season77'); 	// connect to mongoDB database on modulus.io
	//mongoose.connect('mongodb://localhost/vhilly-stats'); 	// connect to mongoDB database on modulus.io

	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use( bodyParser({limit: 1024 * 3000})); 	
	//app.use( bodyParser({limit: 0})); 	
	app.use(express.static('public'));				


	var Player = mongoose.model('player',{		
    	first_name:String,
        last_name:String,
        age:Number,
        nationality:String,
        height:String,
        weight:String,
        birthday:Date,
        birth_place:String,
        gender:String,
        is_import:Boolean,
        status:Boolean,
	});
	var Referee = mongoose.model('referee',{		
    	first_name:String,
    	 last_name:String,
        no:String,
	});


	var Coach = mongoose.model('coach',{		
    	first_name:String,
    	last_name:String,
	});

	var Team = mongoose.model('team',{		
    	team_name:String,
    	team_alias:String,
    	team_coach:{
    		_id:String,
    		first_name:String,
    		last_name:String,
    	},
    	players:[{_id:String,first_name:String,last_name:String,position:String,no:Number,starter:Boolean}]
	});

	var PlayByPlay = mongoose.model('play_by_play',{		
    	game_id:String,
    	game_no:Number,
    	game_schedule:String,
    	light:{
    		team_name:String,
    		score:{type:Number,default:0}
    	},
    	dark:{
    		team_name:String,
    		score:{type:Number,default:0}
    	},
    	actions:[
    		{
    		action_id:String,
    		game_event:String,
    		period:Number,
    		game_time:String,
    		team_id:String,
    		team_name:String,
    		player_id:String,
    		player_no:Number,
    		player_name:String,
    		desc:String,
    		light_score:Number,
    		dark_score:Number,
    		lead:Number,
    		op:Object,
    		}
    	]
	});
	var Game = mongoose.model('Game',{	
		no:0,
		sched:{
			date:Date,
			time:String
		},
		venue:{
			_id:String,
			name:String
		},
		type:{
			_id:String,
			name:String
		},
		season:{
			_id:String,
			no:Number,
			start:Date,
			end:Date
		},
		officials:[{_id:String,first_name:String,last_name:String,no:Number}],
		clock:String,
		period:Number,			
                lead_change:{tot:{type:Number,default:0},period:[]},
                dead_lock:{tot:{type:Number,default:0},period:[]},
		teams:[			
			{	_id:String,
				won:{type:Boolean,default:false},
				score:{type:Number,default:0},
				team_alias:String,
				team_name:String,
				team_coach:String,
				players:[{_id:String,first_name:String,last_name:String,no:Number,position:String,starter:Boolean}]      
			},
		],
		boxscore:[
			{
				players:[
					{
						_id:String,
						no:Number,
						first_name:String,
						oncourt:{type:Boolean,default:false},
						time_in:{type:Number,default:600000},
						last_name:String,
						starter:Boolean,
						position:String,
						mins:{type:Number,default:0},
						plus_minus:{type:Number,default:0},
						ass:{type:Number,default:0},
						tov:{
							tot:{type:Number,default:0},
							travelling:{type:Number,default:0},
							dribbling:{type:Number,default:0},
							passing:{type:Number,default:0},
							three_sec:{type:Number,default:0},
							five_sec:{type:Number,default:0},
							eight_sec:{type:Number,default:0},
							shot_clock:{type:Number,default:0},
							off_foul:{type:Number,default:0},
							ball_handling:{type:Number,default:0},
							receiving:{type:Number,default:0},
						},
						stl:{type:Number,default:0},
						pts:{type:Number,default:0},
						eff:{type:Number,default:0},
						srt:{type:Number,default:0},
						fg:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							in_paint:{
								md:{type:Number,default:0},
								att:{type:Number,default:0},
								contested:{
									md:{type:Number,default:0},
									att:{type:Number,default:0}
								}
							},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}	
						},
						fg2:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}	
						},
						fg3:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}	
						},
						ft:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},						
						},
						reb:{
							off:{type:Number,default:0},
							def:{type:Number,default:0},
							tot:{type:Number,default:0}
						},
						blk:{
							bl:{type:Number,default:0},
							bo:{type:Number,default:0}
						},
						fou:{
							tot:{type:Number,default:0},
							tf:{type:Number,default:0},
							def:{type:Number,default:0},
							off:{type:Number,default:0},
							fo:{type:Number,default:0},
							wa:{type:Number,default:0}
						},period:[{
						mins:{type:Number,default:0},
						plus_minus:{type:Number,default:0},
						ass:{type:Number,default:0},
						tov:{
							tot:{type:Number,default:0},
							travelling:{type:Number,default:0},
							dribbling:{type:Number,default:0},
							passing:{type:Number,default:0},
							three_sec:{type:Number,default:0},
							five_sec:{type:Number,default:0},
							eight_sec:{type:Number,default:0},
							shot_clock:{type:Number,default:0},
							off_foul:{type:Number,default:0},
							ball_handling:{type:Number,default:0},
							receiving:{type:Number,default:0},
						},
						stl:{type:Number,default:0},
						pts:{type:Number,default:0},
						eff:{type:Number,default:0},
						srt:{type:Number,default:0},
						fg:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							in_paint:{
								md:{type:Number,default:0},
								att:{type:Number,default:0},
								contested:{
									md:{type:Number,default:0},
									att:{type:Number,default:0}
								}
							},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}	
						},
						fg2:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}	
						},
						fg3:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}	
						},
						ft:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},						
						},
						reb:{
							off:{type:Number,default:0},
							def:{type:Number,default:0},
							tot:{type:Number,default:0}
						},
						blk:{
							bl:{type:Number,default:0},
							bo:{type:Number,default:0}
						},
						fou:{
							tot:{type:Number,default:0},
							tf:{type:Number,default:0},
							def:{type:Number,default:0},
							off:{type:Number,default:0},
							fo:{type:Number,default:0},
							wa:{type:Number,default:0}
						}}
						]
					}
					],
				team:{
					_id:String,
					team_name:String,
					mins:{type:Number,default:0},
					pts:{type:Number,default:0},
					ass:{type:Number,default:0},
					tov:{type:Number,default:0},
					stl:{type:Number,default:0},
					pts:{type:Number,default:0},
					eff:{type:Number,default:0},
					srt:{type:Number,default:0},
					fg:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						in_paint:{
								md:{type:Number,default:0},
								att:{type:Number,default:0},
								contested:{
									md:{type:Number,default:0},
									att:{type:Number,default:0}
								}
						},
						contested:{
							md:{type:Number,default:0},
							att:{type:Number,default:0}
						}	
					},
					fg2:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},						
						contested:{
							md:{type:Number,default:0},
							att:{type:Number,default:0}
						}		
					}
					,fg3:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						contested:{
							md:{type:Number,default:0},
							att:{type:Number,default:0}
						}	
					},
					ft:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						
					},
					reb:{
						off:{type:Number,default:0},
						def:{type:Number,default:0},
						tot:{type:Number,default:0}
					},
					blk:{
						bl:{type:Number,default:0},
						bo:{type:Number,default:0}
					},
					fou:{
						tot:{type:Number,default:0},
						tf:{type:Number,default:0},
						def:{type:Number,default:0},
						off:{type:Number,default:0},
						fo:{type:Number,default:0},
						wa:{type:Number,default:0}
					},
					sc_pts:{type:Number,default:0},
					tov_pts:{type:Number,default:0},
					fb_pts:{
						att:{type:Number,default:0},
						pts:{type:Number,default:0}
					},
					won:{type:Boolean,default:false},
					big_lead:{type:Number,default:0},
					period:[{
					mins:{type:Number,default:0},
				        plus_minus:{type:Number,default:0},
					pts:{type:Number,default:0},
					ass:{type:Number,default:0},
					tov:{type:Number,default:0},
					stl:{type:Number,default:0},
					pts:{type:Number,default:0},
					eff:{type:Number,default:0},
					srt:{type:Number,default:0},
					fg:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						in_paint:{
							md:{type:Number,default:0},
							att:{type:Number,default:0},
							contested:{
								md:{type:Number,default:0},
								att:{type:Number,default:0}
							}
						},
						contested:{
							md:{type:Number,default:0},
							att:{type:Number,default:0}
						}
					},
					fg2:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						
						contested:{
							md:{type:Number,default:0},
							att:{type:Number,default:0}
						},
					}
					,fg3:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						contested:{
							md:{type:Number,default:0},
							att:{type:Number,default:0}
						}
						
					},
					ft:{
						md:{type:Number,default:0},
						att:{type:Number,default:0},
						
					},
					reb:{
						off:{type:Number,default:0},
						def:{type:Number,default:0},
						tot:{type:Number,default:0}
					},
					blk:{
						bl:{type:Number,default:0},
						bo:{type:Number,default:0}
					},
					fou:{
						tot:{type:Number,default:0},
						tf:{type:Number,default:0},
						def:{type:Number,default:0},
						off:{type:Number,default:0},
						fo:{type:Number,default:0},
						wa:{type:Number,default:0}
					},
					sc_pts:{type:Number,default:0},
					tov_pts:{type:Number,default:0},
					fb_pts:{
						att:{type:Number,default:0},
						pts:{type:Number,default:0}
					},		
					big_lead:{type:Number,default:0},			
					}]
				}				

			}
		]
	});
	app.all('*', function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		next();
 	});

	//post
	
	app.post('/api/player',function(req,res){
		var player = req.body;	
		if(player._id){
			Player.update({_id:player._id},player,function(err,player){
				res.json(player);
			});
		}else{
			Player.create(player,function(err,player){
				res.json(player);
			});
		}
	});
	app.post('/api/referee',function(req,res){
		var referee = req.body;	
		if(referee._id){
			Referee.update({_id:referee._id},referee,function(err,referee){
				res.json(referee);
			});
		}else{
			Referee.create(referee,function(err,referee){
				res.json(referee);
			});
		}
	});
	app.post('/api/coach',function(req,res){
		var coach = req.body;	
		if(coach._id){
			Coach.update({_id:coach._id},coach,function(err,coach){
				res.json(coach);
			});
		}else{
			Coach.create(coach,function(err,coach){
				res.json(coach);
			});
		}
	});
	app.post('/api/team',function(req,res){
		var team = req.body;	
		if(team._id){
			Team.update({_id:team._id},team,function(err,team){
				res.json(team);
			});
		}else{
			Team.create(team,function(err,team){
				res.json(team);
			});
		}
	});	
	app.post('/api/game',function(req,res){
		var game = req.body;	
		if(game._id){
			Game.update({_id:game._id},game,function(err,game){
				res.json(game);
			});
		}else{
			Game.create(game,function(err,game){
				if(game){	
					PlayByPlay.create({game_id:game._id,game_no:game.no,game_schedule:game.sched.date,light:{team_name:game.teams[0].team_name},dark:{team_name:game.teams[1].team_name}},function(err,play_by_play){				
					});		
					res.json(game);
				}
			});
		}
	});
	app.post('/api/play_by_play',function(req,res){
		var play_by_play = req.body;	
		if(play_by_play.game_id){
			PlayByPlay.update({game_id:play_by_play.game_id},play_by_play,function(err,play_by_play){
				res.json(play_by_play);
			});
		}else{
			PlayByPlay.create(play_by_play,function(err,play_by_play){
				if(play_by_play){				
					res.json(play_by_play);
				}
			});
		}
	});

	//get

	app.get('/api/player',function(req,res){
		Player.find({
		},function(err,player){
			if(player)
			res.json(player);	
		});
	});

	app.get('/api/referee',function(req,res){
		Referee.find({
		},function(err,referee){
			if(referee)
			res.json(referee);	
		});
	});

	app.get('/api/coach',function(req,res){
		Coach.find({
		},function(err,coach){
			if(coach)
			res.json(coach);	
		});
	});

	app.get('/api/team',function(req,res){
		Team.find({
		},function(err,team){
			if(team)
			res.json(team);	
		});
	});



	app.get('/api/game',function(req,res){
		Game.find({
		},function(err,game){
			if(game)
			res.json(game);	
		});
	});
	app.get('/api/game_ids',function(req,res){
		Game.find({},{game_id:true,"teams.team_name":true,no:true},function(err,game_ids){
			if(game_ids)
			res.json(game_ids);	
		});
	});

	app.get('/api/play_by_play/:game_id',function(req,res){
		PlayByPlay.findOne({game_id:req.params.game_id
		},function(err,referee){
			if(referee)
			res.json(referee);	
		});
	});

	app.get('/api/game/:id',function(req,res){
		Game.findOne({
			_id:req.params.id,
		},function(err,game){
			if(game)
			res.json(game);	
		});
	});


	app.get('/api/stats/team/summary',function(req,res){
		Game.aggregate([

        {$unwind:"$teams"},
 {$group:{
  _id:"$teams._id",
  team_name:{$first:"$teams.team_name"},
  team_box:{$first:"$boxscore.team"},
  player_box:{$push:"$boxscore.players"},
}}

        

    ], function (err, stats) {
        if (err) {
            console.log(err);
            return;
        }
        if(stats)
			res.json(stats);	
    });
	});


	app.get('/api/stats/player',function(req,res){
		Game.aggregate([
{$unwind:"$boxscore"},
 {$unwind:"$boxscore.players"},
 {$group:{
  _id:"$boxscore.players._id",
  team_name:{$first:"$boxscore.team.team_name"},
  first_name:{$first:"$boxscore.players.first_name"},
  last_name:{$first:"$boxscore.players.last_name"},
  gp:{$sum:{
       $cond: { if: { $ne: [ "$boxscore.players.mins", 0 ] } ,
                                              then: 1,
                                              else: 0
                                            } }
  },
   starts:{$sum:{
       $cond: { if: { $eq: [ "$boxscore.players.starter", true ] } ,
                                              then: 1,
                                              else: 0
                                            } }
  },
  mins:{$sum:"$boxscore.players.mins"},
  mins_avg:{$avg:"$boxscore.players.mins"},
  pts:{$sum:"$boxscore.players.pts"},
  ast:{$sum:"$boxscore.players.ass"},
  stl:{$sum:"$boxscore.players.stl"},
  blk:{$sum:"$boxscore.players.blk.bl"},
  tov:{$sum:"$boxscore.players.tov.tot"},
  reb_off:{$sum:"$boxscore.players.reb.off"},
  reb_def:{$sum:"$boxscore.players.reb.def"},
  fou_off:{$sum:"$boxscore.players.fou.off"},
  fou_def:{$sum:"$boxscore.players.fou.def"},
  fou_tech:{$sum:"$boxscore.players.fou.tf"},
  pts:{$sum:"$boxscore.players.pts"},
  ppg:{$avg:"$boxscore.players.pts"},  
  rpg:{$avg:"$boxscore.players.reb.tot"},
  apg:{$avg:"$boxscore.players.ass"},
  bpg:{$avg:"$boxscore.players.blk.bl"},
  spg:{$avg:"$boxscore.players.stl"},
  ft_att:{$sum:"$boxscore.players.ft.att"},  
  ft_md:{$sum:"$boxscore.players.ft.md"},
  fg_att:{$sum:"$boxscore.players.fg.att"},
  fg_md:{$sum:"$boxscore.players.fg.md"},
  fg2_att:{$sum:"$boxscore.players.fg2.att"},
  fg2_md:{$sum:"$boxscore.players.fg2.md"},
  fg3_att:{$sum:"$boxscore.players.fg3.att"},
  fg3_md:{$sum:"$boxscore.players.fg3.md"},
  fg_cont_att:{$sum:"$boxscore.players.fg.contested.att"},
  fg_cont_md:{$sum:"$boxscore.players.fg.contested.md"},
  hi_pts:{$max:"$boxscore.players.pts"},
  low_pts:{$min:"$boxscore.players.pts"},
  hi_rebs:{$max:"$boxscore.players.reb.tot"},
  low_rebs:{$min:"$boxscore.players.reb.tot"},
  hi_asts:{$max:"$boxscore.players.ass"},
  low_asts:{$min:"$boxscore.players.ass"},
  hi_blks:{$max:"$boxscore.players.blk.bl"},
  low_blks:{$min:"$boxscore.players.blk.bl"}
  }
  },
  {$project:{
      team_name:1,first_name:1,last_name:1,gp:1,starts:1,mins:1,ppg:1,rpg:1,bpg:1,apg:1,spg:1,pts:1,ast:1,blk:1,tov:1,stl:1,
      reb_off:1,reb_def:1,fou_off:1,fou_def:1,fou_tech:1,ft_att:1,ft_md:1,fg_att:1,fg_md:1,fg2_att:1,fg2_md:1,fg3_att:1,fg3_md:1,fg_cont_att:1,
      fg_cont_md:1,hi_pts:1,low_pts:1,hi_rebs:1,low_rebs:1,hi_asts:1,low_asts:1,hi_blks:1,low_blks:1,
      fg_pcnt: { $cond: { if: { $ne: [ "$fg_att", 0 ] } ,then: { $divide: [ "$fg_md", "$fg_att" ]},else: 0} },
      fg2_pcnt: { $cond: { if: { $ne: [ "$fg2_att", 0 ] } ,then: { $divide: [ "$fg2_md", "$fg2_att" ]},else: 0} },
      fg3_pcnt: { $cond: { if: { $ne: [ "$fg3_att", 0 ] } ,then: { $divide: [ "$fg3_md", "$fg3_att" ]},else: 0} },
      ft_pcnt: { $cond: { if: { $ne: [ "$ft_att", 0 ] } ,then: { $divide: [ "$ft_md", "$ft_att" ]},else: 0} }
      }
  },
  {$sort:{ppg:-1}}

    ], function (err, stats) {
        if (err) {
            console.log(err);
            return;
        }
        if(stats)
			res.json(stats);	
    });
	});


	app.get('/api/stats/team',function(req,res){
		Game.aggregate([

{$unwind:"$boxscore"},
{$group:{
  _id:"$boxscore.team._id",    
  team_name:{$first:"$boxscore.team.team_name"},
  gp:{$sum:1},
  ast:{$sum:"$boxscore.team.ass"},
  stl:{$sum:"$boxscore.team.stl"},
  blk:{$sum:"$boxscore.team.blk.bl"},
  tov:{$sum:"$boxscore.team.tov"},
  reb_off:{$sum:"$boxscore.team.reb.off"},
  reb_def:{$sum:"$boxscore.team.reb.def"},
  fou_off:{$sum:"$boxscore.team.fou.off"},
  fou_def:{$sum:"$boxscore.team.fou.def"},
  fou_tech:{$sum:"$boxscore.team.fou.tf"},
  fou_wa:{$max:"$boxscore.team.fou.wa"},
  pts:{$sum:"$boxscore.team.pts"},
  ppg:{$avg:"$boxscore.team.pts"},  
  ftmd:{$sum:"$boxscore.team.ft.md"},
  ft_att:{$sum:"$boxscore.team.ft.att"},  
  ft_md:{$sum:"$boxscore.team.ft.md"},
  fg_att:{$sum:"$boxscore.team.fg.att"},
  fg_md:{$sum:"$boxscore.team.fg.md"},
  fg2_att:{$sum:"$boxscore.team.fg2.att"},
  fg2_md:{$sum:"$boxscore.team.fg2.md"},
  fg3_att:{$sum:"$boxscore.team.fg3.att"},
  fg3_md:{$sum:"$boxscore.team.fg3.md"},
  fg_cont_att:{$sum:"$boxscore.team.fg.contested.att"},
  fg_cont_md:{$sum:"$boxscore.team.fg.contested.md"},
  fg_paint_att:{$sum:"$boxscore.team.fg.in_paint.att"},
  fg_paint_md:{$sum:"$boxscore.team.fg.in_paint.md"},
  fb_att:{$sum:"$boxscore.team.fb_pts.att"},
  fb_pts:{$sum:"$boxscore.team.fb_pts.pts"},  
  sc_pts:{$sum:"$boxscore.team.sc_pts"},
  tov_pts:{$sum:"$boxscore.team.tov_pts"},
  hi_pts:{$max:"$boxscore.team.pts"},
  low_pts:{$min:"$boxscore.team.pts"},
  won:{$sum:{
       $cond: { if: { $eq: [ "$boxscore.team.won", true ] } ,
                                              then: 1,
                                              else: 0
                                            } }
  },

}}
         

    ], function (err, stats) {
        if (err) {
            console.log(err);
            return;
        }
        if(stats)
			res.json(stats);	
    });
	});


	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	var play_by_plays = [];

	// listen (start app with node server.js) ======================================
	server.listen(8080);
	console.log("App listening on port 8080");

io.on('connection', function (socket) {

  socket.emit('play_by_plays', play_by_plays);

  socket.on('add_play', function (data) {
    io.sockets.emit('add_play',data);
  });
});
