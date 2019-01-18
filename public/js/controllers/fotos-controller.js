angular.module('alurapic').controller('FotosController', function($scope, $http,$resource) {
	
	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	const recursoFoto = $resource('v1/fotos/:fotoId');

	recursoFoto.query(function (fotos) {
		$scope.fotos = fotos;
	},function (erro) {
		console.error(erro);
	});

	$scope.remover = function(foto) {
		recursoFoto.delete({fotoId:foto._id}
		,function (success) {
			var indiceDaFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceDaFoto, 1);
			$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
		},function (error) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
		});
	};

});