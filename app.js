//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Hora do desafio';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumeros = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){

    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    //O código abaixo utiliza JS para falar e foi importado em um script no HTML
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    //rate serve para indicar a velocidade que nesse caso é 1.2

}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Hora do desafio');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('h1', 'Parabéns, você acertou!!');
        exibirTextoNaTela('p', mensagem);

        //vamos acessar o botão do html e remover o disable dele
        let botao = document.querySelector('#reiniciar').removeAttribute('disabled');


    }else if(chute < numeroSecreto){

        exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);

    }else{

        exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);

    }
    //tentativas = tentativas + 1
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    //limpa a lista se todos os números possíveis forem sorteados
    let quantidadeDeElementos = listaDeNumeros.length;

    if(quantidadeDeElementos == numeroLimite){
        listaDeNumeros = [];
    }

    if(listaDeNumeros.includes(numeroEscolhido)){//analisa se o número escolhido está na lista de números
        return gerarNumeroAleatorio(); //é bom evitar recursões desse tipo, mas nesse caso tudo bem
    }else{
        //adiciona o numero escolhido ao fim da lista
        listaDeNumeros.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    tentativas = 1;
    limparCampo();
    //vamos desabilitar novamente o botão
    let botao = document.querySelector('#reiniciar').setAttribute('disabled', true);
    // botao.disabled = true;
}

//lista.length - 1 retorna o último elemento da lista