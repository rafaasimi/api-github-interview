export default async function fetchGithub(profileGithubUrl) {

    const boxAlert = document.querySelector('[data-alert]')
    const userBox = document.querySelector('.perfil')
    const repoElement = document.querySelector('.lista-repositorios')
    userBox.innerHTML = ''
    repoElement.innerHTML = ''

    try {
        const URL = `https://api.github.com/users/${profileGithubUrl}`
        const profile = await fetch(URL);
        const { status } = profile;
        const profileJSON = await profile.json();

        if (status === 200) {
            boxAlert.innerText = 'Consulta realizada com sucesso.';
            boxAlert.classList.remove('error')
            boxAlert.classList.add('success')
            return profileJSON;
        } else {
            boxAlert.innerText = 'Problema ao realizar a requisição ou o usuário não foi encontrado.';
            boxAlert.classList.remove('success')
            boxAlert.classList.add('error')
        }


    }

    catch (erro) {
        console.log(Error(erro));
    }



}




