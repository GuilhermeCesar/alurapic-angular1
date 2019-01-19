angular.module('alurapic')
	.controller('FotoController', function($scope,$routeParams,recursoFoto) {

		$scope.foto = {};
		$scope.mensagem = '';

		if($routeParams.fotoId) {
			recursoFoto.get(
				{fotoId:$routeParams.fotoId},
				(foto)=>$scope.foto = foto,
				(erro) =>{
					console.log(erro);
					$scope.mensagem = 'Não foi possível obter a foto'
				}
			);
		}


		$scope.submeter = function() {

			if ($scope.formulario.$valid) {
				if($routeParams.fotoId) {
					recursoFoto.update({fotoId: $scope.foto._id},$scope.foto,
						() => {
							$scope.mensagem = 'Foto alterada com sucesso';
						},(erro) => {
							console.log(erro);
							$scope.mensagem = 'Não foi possível cadastrar a foto';
						}
					);
					} else {
						recursoFoto.save($scope.foto,
							() => {
								$scope.foto = {};
								$scope.mensagem = 'Foto cadastrada com sucesso';
							},(error) => console.error(error));
				}
			}
		};
	});