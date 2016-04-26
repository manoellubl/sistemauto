(function () {
    'use strict';

    /**
     *
     * @param message
     * @returns {*}
     */
    module.exports.repare_message = function (message) {
        var dupkey = 'E11000';

        if (message.indexOf(dupkey) > -1) {
            console.log("DUPKEY FOUND");
            if (message.indexOf('cpf_1') > -1) {
                return "CPF já cadastrado!";
            }
            if (message.indexOf('rg_1') > -1) {
                return "RG já cadastrado!";
            }
            if (message.indexOf('email_1') > -1) {
                return "Email já cadastrado!";
            }
            if (message.indexOf('cnpj_1') > -1) {
                return "CNPJ já cadastrado!";
            }
        }
        return message;
    };

    /**
     *
     * @param cnpj
     * @returns {boolean}
     */
    module.exports.validate_cnpj = function(cnpj) {
        if (cnpj.length != 14) {
            return false;
        }

        for (var k = 0; k < 2; k++) {
            var factor = 2;
            var sum = 0;
            for (var i = 11 + k; i >= 0; i--) {
                var d = parseInt(cnpj.charAt(i));

                if (isNaN(d)) {
                    return false;
                }

                sum += d * factor;
                factor = (factor == 9 ? 2 : (factor + 1));
            }

            sum %= 11;

            if ((sum < 2 ? 0 : 11 - sum) != cnpj.charAt(12 + k)) {
                return false;
            }
        }
        return true;
    };

    /**
     * 
     * @param response
     * @param next
     * @param error
     * @param data
     */
    module.exports.generic_response_callback = function(response, next, error, data) {
        if (error !== null) {
            if(error.message != undefined) {
                error.message = module.exports.repare_message(error.message);
            }
            next(error);
        } else {
            response.json(data);
        }
    };
})();