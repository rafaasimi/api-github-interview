export default async function fetchRepositories(URL) {

    const boxRepositories = document.querySelector('.lista-repositorios')

    try {
        const repository = await fetch(URL);
        const { status } = repository;
        const repositoryJSON = await repository.json()

        if (status === 200) {
            return repositoryJSON;
        } else {
            boxRepositories.innerHTML = `
            <p>Nenhum repositório listado.</p>
            `
        }


    } catch (error) {
        console.log(Error(erro));
    }
}