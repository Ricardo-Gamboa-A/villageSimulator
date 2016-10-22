var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.createInUse = createInUse;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();


    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

        function createUser() {
            // set user object to userParam without the cleartext password
            userParam.villagers=0;
            userParam.gatherers=0;
            userParam.lumberjacks=0;
            userParam.stoneMiners=0;
            userParam.metalMiners=0;
            userParam.oreMiners=0;
            userParam.farmers=0;
            userParam.hunters=0;
            userParam.ranchers=0;
            userParam.food=0;
            userParam.wood=0;
            userParam.stone=0;
            userParam.ore=0;
            userParam.metal=0;
            userParam.agriculture=0;
            userParam.animalHusbandry=0;
            userParam.trapping=0;
            userParam.mining=0;
            userParam.masonry=0;
            userParam.construction=0;
            userParam.iron=0;
            userParam.tool=0;
            userParam.wheel=0;
            userParam.road=0;
            userParam.currency=0;
            userParam.guild=0;
            userParam.cart=0;
            userParam.windmill=0;
            userParam.sawmill=0;
            userParam.furnace=0;
            userParam.rockRoad=0;
            userParam.market=0;
            userParam.blacksmith=0;
            userParam.hut=0;
            userParam.cabin=0;
            userParam.house=0;
            userParam.mine=0;
            userParam.quarry=0;
            var user = _.omit(userParam, 'password');

            // add hashed password to user object
            user.hash = bcrypt.hashSync(userParam.password, 10);

            db.users.insert(
                user,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    deferred.resolve();
                });
        }

    return deferred.promise;
}


function createInUse(userParam) {
    var deferred = Q.defer();


    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUserInUse();
            }
        });

        function createUserInUse() {
            // set user object to userParam without the cleartext password
            userParam.villagers=0;
            userParam.gatherers=0;
            userParam.lumberjacks=0;
            userParam.stoneMiners=0;
            userParam.metalMiners=0;
            userParam.oreMiners=0;
            userParam.farmers=0;
            userParam.hunters=0;
            userParam.ranchers=0;
            userParam.food=0;
            userParam.wood=0;
            userParam.stone=0;
            userParam.ore=0;
            userParam.metal=0;
            userParam.agriculture=0;
            userParam.animalHusbandry=0;
            userParam.trapping=0;
            userParam.mining=0;
            userParam.masonry=0;
            userParam.construction=0;
            userParam.iron=0;
            userParam.tool=0;
            userParam.wheel=0;
            userParam.road=0;
            userParam.currency=0;
            userParam.guild=0;
            userParam.cart=0;
            userParam.windmill=0;
            userParam.sawmill=0;
            userParam.furnace=0;
            userParam.rockRoad=0;
            userParam.market=0;
            userParam.blacksmith=0;
            userParam.hut=0;
            userParam.cabin=0;
            userParam.house=0;
            userParam.mine=0;
            userParam.quarry=0;
            var user = _.omit(userParam, 'password');

            // add hashed password to user object
            user.hash = bcrypt.hashSync(userParam.password, 10);

            db.users.insert(
                user,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    deferred.resolve();
                });
        }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            username: userParam.username,
            villageName: userParam.name,
            villagers: userParam.villagers,
            gatherers: userParam.gatherers,
            lumberjacks: userParam.lumberjacks,
            stoneMiners: userParam.stoneMiners,
            metalMiners: userParam.metalMiners,
            farmers: userParam.farmers,
            hunters: userParam.hunters,
            ranchers: userParam.ranchers,
            food: userParam.food,
            wood: userParam.wood,
            stone: userParam.stone,
            metal: userParam.metal,
            agriculture: userParam.agriculture,
            animalHusbandry: userParam.animalHusbandry,
            trapping: userParam.trapping,
            mining: userParam.mining,
            masonry: userParam.masonry,
            construction: userParam.construction,
            iron: userParam.iron,
            tool: userParam.tool,
            wheel: userParam.wheel,
            road: userParam.road,
            currency: userParam.currency,
            guild: userParam.guild,
            cart: userParam.cart,
            windmill: userParam.windmill,
            sawmill: userParam.sawmill,
            furnace: userParam.furnace,
            rockRoad: userParam.rockRoad,
            market: userParam.market,
            blacksmith: userParam.blacksmith,
            hut: userParam.hut,
            cabin: userParam.cabin,
            house: userParam.house,
            mine: userParam.mine,
            quarry: userParam.quarry
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
