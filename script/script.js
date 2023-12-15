

class Contato {

    constructor() {
        this.id = 1;
        this.arrayContatos = [];
        this.editId = null;
    }

    salvar() {
        let contato = this.lerDados();
        if (this.validaCampo(contato) == true) {
            if(this.editId==null){
                this.adicionar(contato);
            } else {
                this.atualizar(this.editId, contato);
            }
        }
        this.listaTabela();
        this.cancelar();

    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText ='';

        for(let i = 0; i< this.arrayContatos.length;i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_contato = tr.insertCell();
            let td_numero = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayContatos[i].id;
            td_contato.innerText = this.arrayContatos[i].nomeContato;
            td_numero.innerText = this.arrayContatos[i].numContato;

            let imgEdit = document.createElement('img');
            imgEdit.src ='imagens/editar.png';
            td_acoes.appendChild(imgEdit);
            imgEdit.setAttribute("onclick","contato.editar ("+ JSON.stringify(this.arrayContatos[i]) +")")

            let imgDelete = document.createElement('img');
            imgDelete.src='imagens/delete.png';
            imgDelete.setAttribute("onclick","contato.deletar ("+ this.arrayContatos[i].id +")")

            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(contato) {
        this.arrayContatos.push(contato);  
        this.id++;
    }
    atualizar(id,contato) {
        for(let i = 0; i < this.arrayContatos.length;i++) {
            if(this.arrayContatos[i].id == id) {
                this.arrayContatos[i].nomeContato = contato.nomeContato;
                this.arrayContatos[i].numContato = contato.numContato;
            }
        }
    }
    editar(dados) {
        this.editId = dados.id;

        document.getElementById('contato').value = dados.nomeContato;
        document.getElementById('numcontato').value = dados.numContato;
        document.getElementById('btn1').innerText ='Atualizar';
    }

    lerDados() {
        let contato = {};

        contato.id = this.id;
        contato.nomeContato = document.getElementById('contato').value;
        contato.numContato = document.getElementById('numcontato').value;

        return contato;
    }

    validaCampo(contato) {
        let msg = '';
        if (contato.nomeContato == '') {
            msg += '- Informe o nome do contato \n';
        }
        if (contato.numContato == '') {
            msg += '-Informe o número do contato \n';
        } 

        if (msg != '') {
            alert(msg);

            return false
        }
        return true;
    }

    cancelar() {
        document.getElementById('contato').value = '';
        document.getElementById('numcontato').value = '';
        document.getElementById('btn1').innerText='Salvar';
        this.editId = null;
    }

    deletar(id) {
        if(confirm('Deseja realmente deletar o contato do ID ' + id + ' ?')) {
            let tbody = document.getElementById('tbody');
            for(let i = 0; i < this.arrayContatos.length; i++) {
                if(this.arrayContatos[i].id == id) {
                    this.arrayContatos.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

var contato = new Contato();