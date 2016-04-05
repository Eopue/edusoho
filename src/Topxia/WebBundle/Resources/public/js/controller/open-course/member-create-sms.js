define(function(require, exports, module) {
	var Validator = require('bootstrap.validator');
	require('common/validator-rules').inject(Validator);

    var SmsSender = require('../widget/sms-sender');

    exports.run = function() {

    	var $form = $('#js-sms-modal-form');

		var smsValidator = new Validator({
            element: $form,
            autoSubmit: false,
            onFormValidated: function(error){
                if (error) {
                    return false;
                }

                $.post($form.attr('action'),$form.serialize(),function(){
	                $("#alert-btn").hide();
	                $("#alerted-btn").show();
	            })
            }
        });

        smsValidator.addItem({
            element: '[name="mobile"]',
            required: true,
            rule: 'phone',
            display: '手机号码'           
        });
		
        smsValidator.addItem({
            element: '[name="sms_code_modal"]',
            required: true,
            triggerType: 'submit',
            rule: 'integer fixedLength{len:6} remote',
            display: '短信验证码'           
        });

	    var smsSender = new SmsSender({
	    	element: '.js-sms-send',
	    	url: $('.js-sms-send').data('url'),
	        smsType:'sms_open_course_member_notify' 
	    });

    	
	    /*$('.js-confirm').click(function(e){
	    	smsValidator.execute(function(error, results, element) {
                if (error) {
                    return false;
                }
                var smsCode = $('[name="sms_code_modal"]').val();	    	
		    	$('[name="sms_code"]').val(smsCode);
		    	$('#modal').modal('hide');
		    	$('#order-create-form').submit();
            });	            
	    	return false;
	    });*/

	}

});