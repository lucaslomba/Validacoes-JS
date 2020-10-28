import { validarDataNascimento } from "./validarDataNascimento.js"

const retornarMensagemDeErro = (tipo, validity) => {
    let mensagemDeErro = "";
    const tiposDeErro = ["valueMissing", "typeMismatch", "tooShort", "rangeUnderflow"]

    const mensagensDeErro = {
        email: {
            valueMissing: "O e-mail é necessario",
            typeMismatch: "Este não é um e-mail valido"
        },
        senha: {
            valueMissing: "A senha é necessario",
            tooShort: "A senha deve ter no minimo 4 caracteres"
        },
        dataNascimento: {
            valueMissing: "A data de nascimento é necessario",
            rangeUnderflow: "A data minima é 01/01/1901",
            customError: "A idade minima é de 18 anos",
        },
        cpf: {
            valueMissing: "O CPF é necessario",
        },
        rg: {
            valueMissing: "O RG é necessario",
        },
        cep: {
            valueMissing: "O CEP é necessario",
        },
        logradouro: {
            valueMissing: "O logradouro é necessario",
        },
        cidade: {
            valueMissing: "A cidade é necessario",
        },
        estado: {
            valueMissing: "O estado é necessario",
        },
    }

    tiposDeErro.forEach(erro => {
        if(validity[erro]){
            mensagemDeErro =  mensagensDeErro[tipo][erro];
        }
    })

    return mensagemDeErro;
}

export const validarInput = (input, adicionarErro = true) => {
    const classeElementoErro = "erro-validacao"
    const classeInputErro = "possui-erro-validacao"
    const elementoPai = input.parentNode;
    const elementoErroExiste = elementoPai.querySelector(`.${classeElementoErro}`);
    const elementoErro = elementoErroExiste || document.createElement("div")
    const elementoEhValido = input.validity.valid;

    const tipo = input.dataset.tipo;
    const validadoresEspecificos = {
        dataNascimento: () => validarDataNascimento(input)
    };

    if(validadoresEspecificos[tipo]){
        validadoresEspecificos[tipo](input)
    }

    if(!elementoEhValido){
        // Nao é valido
        elementoErro.className = classeElementoErro;
        elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);
        if(adicionarErro){
            input.after(elementoErro)
            input.classList.add(classeInputErro);
        }
    }else{
        // É valido
        elementoErro.remove();
        input.classList.remove(classeInputErro)
    }
}