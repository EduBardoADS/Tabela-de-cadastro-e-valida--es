class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',

        ]
    }
    // iniciar a validação de todos os campos
    validate(form) {
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }
        // inputs
        let inputs = form.getElementsByTagName('input');

        // HTMLCollection -> array
        let inputsArray = [...inputs];

        //loop nos inputs e validações no que for encontrado
        inputsArray.forEach(function(input){
        // loop em todas as validações existentes
        for(let i = 0; this.validations.length > i; i++) {
            //verifica se a validação atual existe no input
            if(input.getAttribute(this.validations[i]) !=null){
                //limpando a sting para virar método
                let method = this.validations[i].replace('data-','').replace('-','');

                // valor do input
                let value = input.getAttribute(this.validations[i]);
                
                // chamar o método
                this[method](input, value);
            }
        }

        },this);
        
    }
    //verifica os numeros minimos de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    maxlength(input, maxValue) {
            let inputLength = input.value.length;
    
            let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
    
            if(inputLength > maxValue) {
                this.printMessage(input, errorMessage);
            }
    
        

    }

    //método para imprimir msg de erro na tela

    printMessage(input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');
        inputParent.appendChild(template);

        }
        //limpa as validações da tela
        cleanValidations(validations){
            validations.forEach( el => el.remove());

        }

    }



    
        let form =  document.getElementById("register-form");
        let submit = document.getElementById("btn-submit");

        let validator = new Validator();


        
    //evento que dispara as validações
    submit.addEventListener('click', function(e) {
    
    e.preventDefault();
    validator.validate(form);
});
