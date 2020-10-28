export const validarDataNascimento = input => {
    const dataNascimento = new Date(input.value)
    const dataAtual = new Date();

    const dataFaz18 = new Date(
        // getUTCFullYear tras o ano que o usuario colocou
        dataNascimento.getUTCFullYear() + 18,
        dataNascimento.getUTCMonth(),
        dataNascimento.getUTCDate()
    )

    if( dataFaz18 > dataAtual){
        // Menor de 18 anos

        //Validação personalizada
        input.setCustomValidity("A idade mínima é de 18 anos");
        return;
    }

    input.setCustomValidity("");
    return;
}