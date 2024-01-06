function fadeOut() {
    document.getElementById("mensagem-connect").style = "opacity: 0; height: 0px;";
}

function fadeIn(mensagem, cor) {
    document.getElementById("mensagem-connect").innerHTML = mensagem;
    document.getElementById("mensagem-connect").style = `opacity: 1; background: ${cor};`;
}

async function connect(){

    let nome_do_usuario = document.getElementById("barra-de-procura").value;

    if(nome_do_usuario == document.getElementById('user-name').innerHTML) {

        fadeIn("Esse nome de usuário acabou de ser pesquisado.", "gray")
        setTimeout(fadeOut, 2000);
        
        return;
    }

    if(!nome_do_usuario) {
        fadeIn("Nome de usuário inválido.", "red")
        setTimeout(fadeOut, 2000);
        
        return;
    }

    document.getElementById("profile-wrapper").style = "opacity: 0; height: 0px";
    document.getElementById("profile-numbers").style = "opacity: 0; height: 0px";
    document.getElementById("project-wrapper").style = "opacity: 0; height: 0px";

    try {
    conteudo = await fetch(`https://api.github.com/users/${nome_do_usuario}`);
    data = await conteudo.json();

    if(!data.name) {
        fadeIn("Usuário não encontrado.", "red")
        setTimeout(fadeOut, 2000);
        
        return;
    }

    fadeIn("Achei!", "green")
        setTimeout(fadeOut, 2000);

    document.getElementById('prof-pic').src = data.avatar_url;
    document.getElementById('nome-completo').innerHTML = data.name;
    document.getElementById('user-name').innerHTML = data.login;
    document.getElementById('link-User').href = data.html_url;
    document.getElementById('compa-ny').innerHTML = data.company;
    document.getElementById('lo-cation').innerHTML =  data.location;
    document.getElementById('blo-og').innerHTML = data.blog;
    document.getElementById('link-Blog').href = data.blog;
    document.getElementById('bi-o').innerHTML = data.bio;
    document.getElementsByTagName('li')[0].innerHTML = "<b>Followers:</b> " + data.followers;
    document.getElementsByTagName('li')[1].innerHTML = "<b>Following:</b> " + data.following;
    document.getElementsByTagName('li')[2].innerHTML = "<b>Gists:</b> " + data.public_gists;
    document.getElementsByTagName('li')[3].innerHTML = "<b>Repos:</b> " + data.public_repos;

    lista_repositorios = await fetch(`https://api.github.com/users/${nome_do_usuario}/repos`);
    lista = await lista_repositorios.json();

    repo_list = document.getElementById("repos-list").innerHTML  = "";

    for(item in lista) {
    repo_list = document.getElementById("repos-list").innerHTML;
    document.getElementById("repos-list").innerHTML = repo_list + "<li class='repo-item'><a target='_blank' href='" + lista[item].html_url + "'>" + lista[item].name + "</a></li>";

    }

    lista_starreds = await fetch(`https://api.github.com/users/${nome_do_usuario}/starred`);
    lista_star = await lista_starreds.json();

    repo_list = document.getElementById("starred-list").innerHTML  = "";

    for(item_star in lista_star) {
    star_list = document.getElementById("starred-list").innerHTML;
    document.getElementById("starred-list").innerHTML = star_list + "<li class='starred-item'><a target='_blank' href='" + lista_star[item_star].html_url + "'>" + lista_star[item_star].name + "</a></li>";

    }

    } catch(e) { console.log(e)}

    document.getElementById("profile-wrapper").style = "opacity: 1; height: auto;";
    document.getElementById("profile-numbers").style = "opacity: 1; height: auto;";
    document.getElementById("project-wrapper").style = "opacity: 1; height: auto;";

}


buttonConnect = document.getElementById("button-trigger");
buttonConnect.addEventListener("click", connect);

document.addEventListener("keypress", (key) => {
    if(key.code == "Enter" || key.code == "NumpadEnter"){ connect(); }
});

setTimeout(fadeOut, 2000);
