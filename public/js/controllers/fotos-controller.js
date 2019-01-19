angular.module('alurapic').controller('FotosController', function($scope, $http,recursoFoto) {
	
	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoFoto.query(fotos => {
		$scope.fotos = fotos;
	},erro => {
		console.error(erro);
	});

	$scope.remover = function(foto) {
		recursoFoto.delete({fotoId:foto._id}
			,() => {
				var indiceDaFoto = $scope.fotos.indexOf(foto);
				$scope.fotos.splice(indiceDaFoto, 1);
				$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
			},() => {
				console.log(erro);
				$scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
			});
	};
});