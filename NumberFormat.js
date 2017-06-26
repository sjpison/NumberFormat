/**
NumberFormat.js
@Version 0.1.1
Developed by: Pison	(codemission.org)
**/

(function() {
    /* NumberFormat */
    this.NumberFormat = function() {
        var defaults = {
            'locale' : 'en-US', // IETF Language tag, BCP47
            'style' : 'decimal', // 'percent', 'currency'
            'currency' : 'USD',
            'currencyDisplay' : 'symbol', // 'symbol'->'₩', 'code'->'KRW', 'name'->'원'. it working style:currency only
            'useIntl' : true
        };

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = function(source, properties) {
                var property;
                for (property in properties) {
                    if (properties.hasOwnProperty(property)) {
                        source[property] = properties[property];
                    }
                }
                return source;
            }(defaults, arguments[0]);
        } else {
            this.options = defaults;
        }
    }

    /* format */
    NumberFormat.prototype.format = function(data) {
        if(this.options.useIntl && typeof Intl != 'undefined') {
            return new Intl.NumberFormat([this.options.locale],
                                        {
                                            currency:this.options.currency,
                                            style:this.options.style,
                                            currencyDisplay:this.options.currencyDisplay
                                        }).format(data);
        }

        var currency_list = {
            'USD': {
                symbol: '$',
                name: 'Dollor'
            },
            'KRW': {
                symbol: '₩',
                name: '원'
            },
            'JPY':{
                symbol:'¥',
                name: 'Japanese yen'
            },
            'CNY':{
                symbol:'元',
                name: 'Chinese yuan'
            }
        }

        data = data.toString();

        var number = '';
        var cutlen = 3;
        var comma = ',';
        var decimal = '';

        if(data.indexOf('.')>-1) {
            var tmp_token = data.split('.');
            data = tmp_token[0];
            decimal = tmp_token[1];
        }
       
        var len = data.length;
        var mod = (len % cutlen);
        var k = cutlen - mod;
        for (var i=0; i<data.length; i++) {
            number = number + data.charAt(i);
            
            if (i < data.length - 1) {
                k++;
                if ((k % cutlen) == 0) {
                    number = number + comma;
                    k = 0;
                }
            }
        }
        if(decimal.length>0) {
            number += '.'+decimal;
        }

        if(this.options.style=='currency') {
            var cr = currency_list[this.options.currency];
            if(this.options.currencyDisplay=='symbol') {
                number = cr.symbol + ' ' + number;
            } else if(this.options.currencyDisplay=='code') {
                number = this.options.currency + ' ' + number;
            } else {
                number += ' ' + cr.name;
            }
        }

        return number;
    }
})();
