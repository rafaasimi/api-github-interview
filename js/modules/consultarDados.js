import fetchGithub from './fetchGithub.js';
import fetchRepositories from './fetchRepositories.js';

export default function consultarDados() {

    const buttonSubmit = document.querySelector('[data-buscar]')
    buttonSubmit.addEventListener('click', puxarUsuario)


    // Função responsável por fazer a solicitação dos dados do perfil procurado.
    async function puxarUsuario(event) {
        event.preventDefault();
        const inputUsuario = document.querySelector('#user').value;
        const profileJSON = await fetchGithub(inputUsuario);

        const { login, name, avatar_url, html_url, bio, public_repos } = profileJSON
        const userElement = createUserElement(login, name, avatar_url, html_url, bio, public_repos)

        const userBox = document.querySelector('.perfil')
        userBox.innerHTML = '';
        userBox.appendChild(userElement);


        const btnRepositories = document.querySelector('[data-repositories]');
        btnRepositories.addEventListener('click', repositoriesConsult)

        const btnStarreds = document.querySelector('[data-starred]');
        btnStarreds.addEventListener('click', starredsConsult)


        function repositoriesConsult() {
            getRepositories(`https://api.github.com/users/${login}/repos`)
        }

        function starredsConsult() {
            getRepositories(`https://api.github.com/users/${login}/starred`)
        }

    }


    // Função responsavel por criar o card do usuario
    function createUserElement(login, name, avatar_url, html_url, bio, public_repos) {

        const userElement = document.createElement('div')
        userElement.innerHTML = `
        <div class="header">
                <img src="${avatar_url}"
                    alt="Foto de ${name}">
                <h3><a href='${html_url}' target='_blank'>${name}</a></h3>
                <span>@${login}</span>
                <h3>Biografia:</h3>
                <span>${bio}</span>
            </div>
            <div class="footer">
                <ul>
                    <li data-repositories><span>${public_repos}</span>Repositórios</li>
                    <li data-starred><span>6</span>Favoritos</li>
                </ul>
            </div>
        `

        return userElement;
    }


    // Função responsável por requisitar a lista de repositorios do usuario
    // Percorre toda a Array, solicitando a criação dos elementos.
    async function getRepositories(URL) {

        const repoElement = document.querySelector('.lista-repositorios')
        const repositoriesJSON = await fetchRepositories(URL)
        const repositoriesLength = document.createElement('span')



        repoElement.innerHTML = '';
        repositoriesLength.innerText = `Encontrado um total de ${repositoriesJSON.length} repositórios.`
        repoElement.appendChild(repositoriesLength);



        repositoriesJSON.forEach((repository) => {
            const { name, description, html_url } = repository;
            const repoItem = createRepositoriesElements(name, description, html_url)

            repoElement.appendChild(repoItem)
        })
    }


    // Função responsável por criar o elemento da lista de repositorios
    // Recebe os padrametros como Nome, Descrição e Endereço do repositorio
    function createRepositoriesElements(name, description, html_url) {

        const userElement = document.createElement('div')
        userElement.innerHTML = `
                <li><a href="${html_url}" target='_blank'>${name}</a>
                    <p>${description}</p>
                </li>
        `

        return userElement;

    }


}