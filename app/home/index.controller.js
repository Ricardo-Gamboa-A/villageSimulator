(function () {
    'use strict';
    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, $scope, $interval, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
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
        $scope.spendResources = function(food, wood, stone, ore, quantity) {
            if ($scope.vm.user.food >= food*quantity && $scope.vm.user.wood >= wood*quantity && $scope.vm.user.stone >= stone*quantity && $scope.vm.user.ore >= ore*quantity){
                $scope.vm.user.food = $scope.vm.user.food- food*quantity;
                $scope.vm.user.wood = $scope.vm.user.wood- wood*quantity;
                $scope.vm.user.stone = $scope.vm.user.stone - stone*quantity;
                $scope.vm.user.ore = $scope.vm.user.ore - ore*quantity;
                return true;
            }
            else return false;
            }
        $scope.farmers = function(add,dead) { //Con add igual a cantidad de aldeanos que se agregan a los granjeros
            if ($scope.vm.user.villagers >= add && add > 0 && $scope.spendResources(100,50,0,0,add)) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.farmers = $scope.vm.user.farmers + add;
            }
            if ($scope.vm.user.farmers >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.farmers = $scope.vm.user.farmers + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.farmers = $scope.vm.user.farmers + add;
                }
            }
        }
        $scope.hunters = function(add,dead) { //Con add igual a cantidad de aldeanos que se agregan a los granjeros
            if ($scope.vm.user.villagers >= add && add > 0 && $scope.spendResources(0,80,20,10,add)) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.hunters = $scope.vm.user.hunters + add;
            }
            if ($scope.vm.user.hunters >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.hunters = $scope.vm.user.hunters + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.hunters = $scope.vm.user.hunters + add;
                }
            }
        }
        $scope.ranchers = function(add,dead) { //Con add igual a cantidad de aldeanos que se agregan a los granjeros
            if ($scope.vm.user.villagers >= add && add > 0 && $scope.spendResources(80,80,0,0,add)) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.ranchers = $scope.vm.user.ranchers + add;
            }
            if ($scope.vm.user.ranchers >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.ranchers = $scope.vm.user.ranchers + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.ranchers = $scope.vm.user.ranchers + add;
                }
            }
        }
        $scope.gatherers = function(add,dead) { //Con add igual a cantidad de aldeanos que se agregan a los granjeros
            if ($scope.vm.user.villagers >= add && add > 0) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.gatherers = $scope.vm.user.gatherers + add;
            }
            if ($scope.vm.user.gatherers >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.gatherers = $scope.vm.user.gatherers + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.gatherers = $scope.vm.user.gatherers + add;
                }
            }
        }
        $scope.lumberjacks = function(add,dead) { //Con add igual a cantidad de aldeanos que se agregan a los leñadores
            if ($scope.vm.user.villagers >= add && add > 0) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.lumberjacks = $scope.vm.user.lumberjacks + add;
            }
            if ($scope.vm.user.lumberjacks >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.lumberjacks = $scope.vm.user.lumberjacks + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.lumberjacks = $scope.vm.user.lumberjacks + add;
                }
            }
        }
        $scope.stoneMiners = function(add,dead) {
            if ($scope.vm.user.villagers >= add && add > 0) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.stoneMiners = $scope.vm.user.stoneMiners + add;
            }
            if ($scope.vm.user.stoneMiners >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.stoneMiners = $scope.vm.user.stoneMiners + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.stoneMiners = $scope.vm.user.stoneMiners + add;
                }
            }
        }
        $scope.oreMiners = function(add,dead) {
            if ($scope.vm.user.villagers >= add && add > 0) {
                $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                $scope.vm.user.oreMiners = $scope.vm.user.oreMiners + add;
            }
            if ($scope.vm.user.oreMiners >= -add && add < 0) {
                if (dead==1){
                    $scope.vm.user.oreMiners = $scope.vm.user.oreMiners + add;
                }
                else {
                    $scope.vm.user.villagers = $scope.vm.user.villagers - add;
                    $scope.vm.user.oreMiners = $scope.vm.user.oreMiners + add;
                }
            }
        }
        $scope.villagers = function(add) {
            if (add > 0 && $scope.spendResources($scope.villagerCost(),0,0,0,add)) {
                $scope.vm.user.villagers = $scope.vm.user.villagers + add;
            }
            if (add < 0) {
                if ($scope.vm.user.villagers >= -add) $scope.vm.user.villagers =$scope.vm.user.villagers +add;
                else $scope.vm.user.villagers = 0;
            }
        }
        $scope.allVillagers = function() {
            return ($scope.vm.user.villagers + $scope.vm.user.farmers + $scope.vm.user.lumberjacks + $scope.vm.user.stoneMiners + $scope.vm.user.oreMiners + $scope.vm.user.gatherers + $scope.vm.user.hunters + $scope.vm.user.ranchers);
        }
        $scope.villagerCost = function(){
            return Math.round(10+10*Math.pow($scope.allVillagers() , 1.4));
        }
        $scope.food = function() {
            if ($scope.vm.user.food < 500)
                return $scope.vm.user.food = $scope.vm.user.food + 1;
            if ($scope.vm.user.windmill==true)
                $scope.vm.user.food = $scope.vm.user.food + 1;
        }
        $scope.wood = function() {
            if ($scope.vm.user.sawmill==1)
                return $scope.vm.user.wood = $scope.vm.user.wood + 1;
            if ($scope.vm.user.wood < 500 )
                $scope.vm.user.wood = $scope.vm.user.wood + 1;
        }
        $scope.stone = function() {
            if ($scope.vm.user.quarry==1)
                return $scope.vm.user.stone = $scope.vm.user.stone + 1;
            if ($scope.vm.user.stone < 500 )
                $scope.vm.user.stone = $scope.vm.user.stone + 1;
        }
        $scope.ore = function() {
            if ($scope.vm.user.mine==1)
                return $scope.vm.user.ore = $scope.vm.user.ore + 1;
            if ($scope.vm.user.ore < 500 )
                $scope.vm.user.ore = $scope.vm.user.ore + 1;
        }
        $scope.deadvillager = function(number) {
            if ($scope.vm.user.villagers >= -number){
              $scope.villagers(number);
            } else if ($scope.vm.user.villagers + $scope.vm.user.lumberjacks > -number){
                $scope.lumberjacks(number + $scope.vm.user.villagers,1);
                $scope.villagers(- $scope.vm.user.villagers);
            } else if ($scope.vm.user.villagers + $scope.vm.user.lumberjacks + $scope.vm.user.stoneMiners >= -number){
                $scope.stoneMiners(number + $scope.vm.user.villagers + $scope.vm.user.lumberjacks,1);
                $scope.lumberjacks(- $scope.vm.user.lumberjacks,1);
                $scope.villagers(- $scope.vm.user.villagers);
            } else if ($scope.vm.user.villagers + $scope.vm.user.lumberjacks + $scope.vm.user.stoneMiners + $scope.vm.user.oreMiners >= -number){
                $scope.oreMiners(number + $scope.vm.user.villagers + $scope.vm.user.lumberjacks + $scope.vm.user.stoneMiners,1);
                $scope.lumberjacks(- $scope.vm.user.lumberjacks,1);
                $scope.stoneMiners(- $scope.vm.user.stoneMiners,1);
                $scope.villagers(- $scope.vm.user.villagers);
            } else {
                $scope.oreMiners(- $scope.vm.user.oreMiners,1);
                $scope.lumberjacks(- $scope.vm.user.lumberjacks,1);
                $scope.stoneMiners(- $scope.vm.user.stoneMiners,1);
                $scope.villagers(- $scope.vm.user.villagers);
            }
        }

        //Funciones de tecnologia
        $scope.agriculture = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.agriculture=1;
           }
        }
        $scope.animalHusbandry = function() {
            if ($scope.spendResources(100,200,50,0,1)) {
                $scope.vm.user.animalHusbandry=1;
           }
        }
        $scope.trapping = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.trapping=1;
           }
        }
        $scope.mining = function() {
            if ($scope.spendResources(0,100,0,0,1)) {
                $scope.vm.user.mining=1;
           }
        }
        $scope.masonry = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.masonry=1;
           }
        }
        $scope.construction = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.construction=1;
           }
        }
        $scope.iron = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.iron=1;
           }
        }
        $scope.tool = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.tool=1;
           }
        }
        $scope.wheel = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.wheel=1;
           }
        }
        $scope.road = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.road=1;
           }
        }
        $scope.currency = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.currency=1;
           }
        }
        $scope.guild = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.guild=1;
           }
        }
        $scope.cart = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.cart=1;
           }
        }

        //funciones de contruccion
        $scope.windmill = function() {
            if ($scope.spendResources(0,500,200,0,1)) {
                $scope.vm.user.windmill=1;
           }
        }
        $scope.sawmill = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.sawmill=1;
           }
        }
        $scope.furnace = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.furnace=1;
           }
        }
        $scope.rockRoad = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.rockRoad=1;
           }
        }
        $scope.market = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.market=1;
           }
        }
        $scope.blacksmith = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.blacksmith=1;
           }
        }
        $scope.hut = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.hut=1;
           }
        }
        $scope.cabin = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.cabin=1;
           }
        }
        $scope.house = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.house=1;
           }
        }
        $scope.mine = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.mine=1;
           }
        }
        $scope.quarry = function() {
            if ($scope.spendResources(200,100,0,0,1)) {
                $scope.vm.user.quarry=1;
           }
        }
        $scope.foodChange=0;
        $scope.woodChange=0;
        $scope.stoneChange=0;
        $scope.oreChange=0;
        $scope.editing=0;
        var nofood=0;
        $interval(function() {
            $scope.foodChange= $scope.vm.user.gatherers + $scope.vm.user.farmers*(3/2) + $scope.vm.user.hunters*(3/2) - (($scope.allVillagers() - ($scope.vm.user.villagers* (1 / 2))) * (1 / 2));
            nofood= $scope.vm.user.food +  $scope.foodChange;
            if (nofood < 0){
                $scope.vm.user.food = 0;
                $scope.deadvillager(Math.round(nofood/5));
            } else $scope.vm.user.food = nofood;
            $scope.woodChange = $scope.vm.user.lumberjacks/ 2;
            $scope.stoneChange = $scope.vm.user.stoneMiners / 3;
            $scope.oreChange = $scope.vm.user.oreMiners / 10;
            $scope.vm.user.wood = $scope.vm.user.wood + $scope.woodChange;
            $scope.vm.user.stone = $scope.vm.user.stone + $scope.stoneChange;
            $scope.vm.user.ore = $scope.vm.user.ore + $scope.oreChange;
            if ($scope.vm.user.food > 500){
                if ($scope.vm.user.windmill!=1){
                    $scope.vm.user.food = 500;
                }
            }
            if ($scope.vm.user.wood > 500){
                if ($scope.vm.user.sawmill!=1){
                    $scope.vm.user.wood = 500;
                }
            }
            if ($scope.vm.user.stone > 500){
                if ($scope.vm.user.quarry!=1){
                    $scope.vm.user.stone = 500;
                }
            }
            if ($scope.vm.user.ore > 500){
                if ($scope.vm.user.mine!=1){
                    $scope.vm.user.ore = 500;
                }
            }

        }, 1000);
        $interval(function() {
            vm.saveUser();
        }, 20000);
    };

    }

)();
