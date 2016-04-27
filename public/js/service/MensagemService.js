(function() {
	'use strict';
	
	/**
	 * Controller de Mensagens do sistema
	 * TODO personalizar para msg de sucesso, erro e alerta
	 */
	angular.module('app').service('MensagemService', [
		'$mdToast',
		MensagemService
	]);
	
	function MensagemService($mdToast) {
		var self = this;

		this.msg = function(mensagem) {
    		var posicao = "top right";
    		$mdToast.show(
      			$mdToast.simple().content(mensagem).position(posicao).hideDelay(3000)
    		);
    	};
  	}
})();