angular.module('meusServicos',['ngResource'])
.factory('recursoFoto',function ($resource) {
	return $resource('v1/fotos/:fotoId',null,{
		update:{
			method:'PUT'
		}
	});
})
.factory('cadastroDeFotos', function (recursoFoto,$q,$rootScope) {
	var service = {};

	var evento = 'fotoCadastrada';

	service.cadastrar = function (foto) {
		return $q(function (resolve, reject) {
			if(foto._id){
				recursoFoto.update({fotoId:foto._id},foto,
					function () {
						$rootScope.$broadcast(evento);
						resolve({
							mensagem:'Foto '+foto.titulo+' atualizado com sucesso',
							inclusao: false
						});

					},
					function (erro) {
						console.log(erro);
						reject(
							{mensagem:'Não foi possivel incluir a foto'}
							)
					}
				)
			}else {
				recursoFoto.save(foto,
					()=>{
						$rootScope.$broadcast(evento);
						resolve({
							mensagem:'Foto '+foto.titulo+' incluido com sucesso!',
							inclusao: true
						})
					},
					(erro) => {
						console.log(erro);
						reject({
							mensagem:'Não foi possivel incluir a foto '+foto.titulo,
						});
					}
				)
			}
		})
	};

	return service;
});