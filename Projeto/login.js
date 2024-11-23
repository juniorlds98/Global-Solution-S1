$(frmLogin).on("submit", async (evt) => {
	evt.preventDefault();
	var dUser = $(user).val();
	var dSenha = $(senha).val();

	let dataJson = { //formato do json
		Nome: dUser,
		Senha: dSenha,
	};
	if(dUser === 'admin' & dSenha === 'admin'){
        conectar(0)
	}else{
        try{
            let response = await $.ajax({
                url:buildUrl(`Login`),
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(dataJson),
            })
            if (!(response.result === 'False')){
                conectar(parseInt(response.result))
            }else{
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'error',
                    title: 'Acesso Negado',
                    text: 'Usuario ou Senha incorretos',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
            }
        }catch{
            Swal.fire({
                position: 'top-end',
                toast: true,
                icon: 'error',
                title: 'Acesso Negado',
                text: 'Sem conexão com a api',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            })
        }
    }
});

const conectar = (id) =>{
    localStorage.setItem('UserId', id); //adicionando em cache para usar na próxima página
    //const userId = localStorage.getItem('UserId');
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Logado com suceso',
        text: 'Sendo redirecionado',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
    setTimeout(() => {
        let link = document.createElement("a");
        link.href = "./analise.html";
        link.click();
    }, 3500);

}