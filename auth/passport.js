const { serializeUser } = require('passport');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt=passportJwt.ExtractJwt;
const StrategyJwt=passportJwt.Strategy;
const players =require("../model/user")

passport.use(
    new StrategyJwt({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.JWT_SECRET

    },
    function(jwtPayload,done){
        return players.findOne({where:{id:jwtPayload.id}})
            .then((player)=>{
                return done(null,player)
            })
            .catch((err)=>{
                return done(err)
            })
    })
)
