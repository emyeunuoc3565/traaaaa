(function () {
	myApp.controller('cardCtr', function($scope, $http){
		$scope.getData = function(){
			$http.post("/get-card",{},{}).then(function(res){
	  			if(res.data.message == 'success'){
	  				$scope.cards = res.data.cards;
	  				$scope.pinsList = res.data.pins;
	  			}else{
	  				alert('Có lỗi xảy ra');
	  			}
	  		})
		}
		$scope.getData();
		$scope.tag = '';
		$scope.add = {
			title:'',
			tags:[],
		};

		$scope.addTag = function(){
			if($scope.tag == ''){
				alert('không được để trống tag');
				return;
			}
			$scope.add.tags.push({name:$scope.tag}); 
		}
		$scope.rmAddTag = function(i){
			$scope.add.tags.splice(i,1);
		}


		$scope.submitAdd = function(){
			if($scope.add.title == ''){
				alert('không được để trống title');
				return;
			}
			$http.post("/add-card",$scope.add,{}).then(function(res){
	  			if(res.data.message == 'success'){
	  				window.location.reload();
	  			}else{
	  				alert('Có lỗi xảy ra');
	  			}
	  		})
		}

		$scope.deleteCard = function(card){
			utils.confirm({
                title:'Thông báo',
                msg: 'Bạn có muốn xóa  "' + card.title,
                callback: function(){
                	$http.post("/delete-card",{id:card.id},{}).then(function(res){
			  			if(res.data.message == 'success'){
			  				window.location.reload();
			  			}else{
			  				alert('Có lỗi xảy ra');
			  			}
			  		})
                }
            });
			
		}

		$scope.addUpdateTag = function(){
			if($scope.updatetag == ''){
				alert('không được để trống tag');
				return;
			}
			$scope.updateCard.tag.push({name:$scope.updatetag}); 
		}

		$scope.showUpdate = function(card){
			$scope.updateCard = card;
			console.log($scope.updateCard)
		}

		$scope.rmUpdateTag = function(i){
			$scope.updateCard.tag.splice(i,1);
		}

		$scope.submitUpdate = function(){
			if($scope.updateCard.title == ''){
				alert('không được để trống title');
				return;
			}
			utils.confirm({
                title:'Thông báo',
                msg: 'Bạn có muốn update  "' + $scope.updateCard.title,
                callback: function(){
                	$http.post("/update-card",$scope.updateCard,{}).then(function(res){
			  			if(res.data.message == 'success'){
			  				window.location.reload();
			  			}else{
			  				alert('Có lỗi xảy ra');
			  			}
			  		})
                }
            });
		}

		$scope.pin = function(card){
			$http.post("/pin-card",card,{}).then(function(res){
	  			if(res.data.message == 'success'){
	  				$scope.getData();
	  			}else{
	  				alert('Có lỗi xảy ra');
	  			}
	  		})
		}

	});
})();
