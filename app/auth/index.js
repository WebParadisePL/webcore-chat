'use strict';

var config = require('../config');
var passport = require('passport');
var logger = require('../logger');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');

var init = function() {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(error, user) {
			done(error, user);
		});
	});
	
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({username: new RegExp(username, 'i'), socialId: null}, function(error, user) {
				if (error) {
					return done(error);
				}
				
				if (!user) {
					return done(null, false, {message: 'Incorrect username!'});
				}
				user.validatePassword(password, function(error, isMatch) {
					if (error) {
						return done(error);
					}
					if (!isMatch) {
						return done(null, false, {message: 'Incorrect password!'});
					}
					return done(null, user);
				});
			});
		}
	));
	
	var verifySocialAccount = function(tokenA, tokenB, data, done) {
		User.findOrCreate(data, function(error, user) {
			if (error) {
				return done(error);
			}
			return done(error, user);
		});
	}
	
	passport.use(new TwitterStrategy(config.twitter, verifySocialAccount));
	
	return passport;
}

module.exports = init();