const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) => { // Quando essa promessa der certo, vamos ter um retorno dentro do resolve e quando der errado vamos ter um retorno dentro do reject
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name}) // Se a leitura do fileReader der certo, vamos retornar o resolve com a url do nosso arquivo e o nome do arquivo
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo);
    } );
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener('change', async (e) => { // Definimos essa função como assíncrona
    const arquivo = e.target.files[0];

    if (arquivo){
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); // Ocorrer espera quando for utilizar a função lerConteuDoArquivo
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch(erro) { // Se der algo errado, o catch captura o erro
            console.error("Erro na leitura do arquivo"); 
        }
    }
})

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

listaTags.addEventListener('click', e => {
    if(e.target.classList.contains("remove-tag")){
        const tagQueQueremosRemover = e.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = ["front-end", "programação", "back-end", "data science", "full-stack", "HTML", "CSS", "javascript"];

async function verificaTagsDisponiveis(tagTexto){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto.toLowerCase()));
        }, 1000);
    })
}

inputTags.addEventListener('keypress', async e => {
    if(e.key === 'Enter'){
        e.preventDefault();
        const tagTexto = inputTags.value.trim();

        if(tagTexto !== ""){
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if(tagExiste){
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.")
                }
            } catch(error){
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.");
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if(deuCerto){
                resolve("Projeto publicado com sucesso");
            } else {
                reject("Erro ao publicar o projeto");
            }
        }, 1000)
    })
}

botaoPublicar.addEventListener("click", async e => {
    e.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(tag => tag.textContent);

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto)
        console.log(resultado);
        alert("Deu tudo certo!");
    }catch(erro){
        console.log("Deu errado" + erro);
    }
    
})

