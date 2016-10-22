(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService, $cookies) {
        var vm = this;

        vm.user = null;
        vm.login= null;
        vm.saveUser = saveUser;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;

        initController();
        if (vm.user == null) initDefault();

        function initDefault(){
            vm.login= false;
            vm.user= $cookies.getObject("city");
            if (vm.user==null){
              vm.user = {};
              vm.user.villagers=0;
              vm.user.gatherers=0;
              vm.user.lumberjacks=0;
              vm.user.stoneMiners=0;
              vm.user.metalMiners=0;
              vm.user.oreMiners=0;
              vm.user.farmers=0;
              vm.user.hunters=0;
              vm.user.ranchers=0;
              vm.user.food=0;
              vm.user.wood=0;
              vm.user.stone=0;
              vm.user.ore=0;
              vm.user.metal=0;
              vm.user.agriculture=0;
              vm.user.animalHusbandry=0;
              vm.user.trapping=0;
              vm.user.mining=0;
              vm.user.masonry=0;
              vm.user.construction=0;
              vm.user.iron=0;
              vm.user.tool=0;
              vm.user.wheel=0;
              vm.user.road=0;
              vm.user.currency=0;
              vm.user.guild=0;
              vm.user.cart=0;
              vm.user.windmill=0;
              vm.user.sawmill=0;
              vm.user.furnace=0;
              vm.user.rockRoad=0;
              vm.user.market=0;
              vm.user.blacksmith=0;
              vm.user.hut=0;
              vm.user.cabin=0;
              vm.user.house=0;
              vm.user.mine=0;
              vm.user.quarry=0;
            }
        }

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                vm.login=true;
            });
        }

        function createUser() {
            console.log(vm.user);
            UserService.Create(vm.user)
              .then(function () {
                  FlashService.Success('El usuario ha sido creado');
                })
                .catch(function (error) {
                  FlashService.Error(error);
                });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();
