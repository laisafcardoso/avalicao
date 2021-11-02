//listagem de clientes
const newLine = (id, nome, cpf_cnpj, endereco, data_nascimento, sexo) => {
  const trNovo = document.createElement("tr");
  const conteudo = `
        <td>${id}</td>
        <td>${nome}</td>
        <td>${cpf_cnpj}</td>
        <td class="actions"><a href="#"><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal_editar" data-id="${id}" onclick="edit(${id})">Editar</button></a><button id="excluir" onclick="excluir(${id})" class="btn btn-danger">Excluir</button></td>
        <!-- modal editar -->
        <div
      id="modal_editar"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Customers</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
            <input type="hidden" class="form-control" id="id" value="" />
              <div class="mb-3">
                <label for="cpf_cnpj" class="form-label">CPF/CNPJ</label>
                <input type="name" class="form-control" id="cpf_cnpj" />
              </div>
              <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="name" class="form-control" id="nome" />
              </div>
              <div class="mb-3">
                <label for="endereco" class="form-label">Endereço</label>
                <input type="name" class="form-control" id="endereco" />
              </div>
              <div class="mb-3">
                <label for="data_nascimento" class="form-label"
                  >Data Nascimento</label
                >
                <input type="name" class="form-control" id="data_nascimento" />
              </div>
              <div class="mb-3">
                <label for="data_nascimento" class="form-label">Sexo</label>
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  id="sexo"
                >
                  <option value=""></option>
                  <option value="F">Feminino</option>
                  <option value="M">Masculino</option>
                  <option value="I">Não declarar</option>
                </select>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="button" class="btn btn-primary" onclick="atualizar()">
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        `;

  trNovo.innerHTML = conteudo;
  return trNovo;
};

const table = document.querySelector("[data-table]");

let urlAPI = "http://localhost:3000/api/customers/";

const http = new XMLHttpRequest();

http.open("GET", urlAPI);

http.send();

http.onload = () => {
  const data = JSON.parse(http.response);

  data.forEach((element) => {
    table.appendChild(
      newLine(
        element.id,
        element.nome,
        element.cpf_cnpj,
        element.endereco,
        element.data_nascimento,
        element.sexo
      )
    );
  });
};
//função do botão novo
function novo() {
  var elements = document.getElementById("create").elements;
  var obj = {};
  for (var i = 0; i < elements.length; i++) {
    var item = elements.item(i);

    obj[item.id] = item.value;
  }

  var data_novo = {};

  data_novo = JSON.stringify(obj);

  data_novo.cpf_cnpj = obj.cpf_cnpj;
  data_novo.nome = obj.nome;
  data_novo.endereco = obj.endereco;
  data_novo.data_nascimento = obj.endereco;
  data_novo.sexo = obj.sexo;

  var json_novo = data_novo;

  var xhr3 = new XMLHttpRequest();
  xhr3.open("POST", urlAPI, true);
  xhr3.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr3.onload = function () {
    var customers = JSON.parse(xhr3.responseText);
    if (xhr3.readyState == 4 && xhr3.status == "200") {
      $("#modal_novo").modal("hide");
      $("#message-alert").html(
        "<div class='alert alert-success text-left alertaCadastrar'>Dados gravados com sucesso!</div>"
      );
      $(".alertaCadastrar").fadeIn(300).delay(3000).fadeOut(400);
      setTimeout(function () {
        window.location.reload(1);
      }, 3000);
      console.table(customers);
    } else {
      console.error(customers);
    }
  };
  xhr3.send(json_novo);
}

//funções para edição

function edit(id) {
  //$("#modal_novo").on("show.bs.modal", function (e) {
  const http4 = new XMLHttpRequest();

  http4.open("GET", urlAPI + "/" + id, true);

  http4.send();
  http4.onload = function () {
    if (http4.readyState == 4 && http4.status == "200") {
      const data = JSON.parse(http4.response);

      console.log(data.cpf_cnpj);
      $("#id").val(data.id);
      $("#cpf_cnpj").val(data.cpf_cnpj);
      $("#nome").val(data.nome);
      $("#endereco").val(data.endereco);
      $("#data_nascimento").val(data.data_nascimento);
      $("#sexo").val(data.sexo);
    }
  };
  //});
}

//botão da modal atualizar
function atualizar() {
  var data = {};
  var id = $("#id").val();
  data.nome = $("#nome").val();
  data.cpf_cnpj = $("#cpf_cnpj").val();
  data.endereco = $("#endereco").val();
  data.data_nascimento = $("#data_nascimento").val();
  data.sexo = $("#sexo").val();
  var json = JSON.stringify(data);

  console.log(json);
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", urlAPI + "/" + id, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.onload = function () {
    var customers = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      $("#modal_editar").modal("hide");
      $("#message-alert").html(
        "<div class='alert alert-success text-left alertaCadastrar'>Dados atualizados com sucesso!</div>"
      );
      $(".alertaCadastrar").fadeIn(300).delay(3000).fadeOut(400);
      setTimeout(function () {
        window.location.reload(1);
      }, 3000);
    } else {
      console.error(customers);
    }
  };
  xhr.send(json);
}

function excluir(id) {
  swal({
    title: "Confirma a exclusão desse registro?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      var xhr2 = new XMLHttpRequest();
      xhr2.open("DELETE", urlAPI + "/" + id, true);
      xhr2.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr2.onload = function () {
        var customers = JSON.parse(xhr2.responseText);
        if (xhr2.readyState == 4 && xhr2.status == "200") {
          swal("Registro excluído com sucesso!", {
            icon: "success",
          }).then(function () {
            location.reload();
          });
        } else {
          console.error(customers);
        }
      };
      xhr2.send(null);
    } else {
      swal("Registro NÂO excluído");
    }
  });
}

let cpf = document.getElementById("cpf_cnpj");

function ValidarCPF(strCPF) {
  var soma;
  var resto;
  soma = 0;

  if (
    strCPF.length < 11 ||
    strCPF == "00000000000" ||
    strCPF == "11111111111" ||
    strCPF == "22222222222" ||
    strCPF == "33333333333" ||
    strCPF == "44444444444" ||
    strCPF == "55555555555" ||
    strCPF == "66666666666" ||
    strCPF == "77777777777" ||
    strCPF == "88888888888" ||
    strCPF == "99999999999"
  )
    return false;

  if (strCPF.length === 11) {
    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) return false;
    soma = 0;
    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  } else if (strCPF.length === 14) {
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
}

cpf.blur(function () {
  var numeros_cpf = cpf.value.replace(/\D/g, "");
  if (!ValidarCPF(numeros_cpf)) {
    cpf.classList.remove("is-valid");
    cpf.classList.add("is-invalid");
    document.getElementById("salvar").disabled = true;
  }
});

cpf.onkeyup = function () {
  let validado;
  let numeros_cpf = cpf.value.replace(/\D/g, "");
  if (numeros_cpf.length === 11 && ValidarCPF(numeros_cpf)) {
    cpf.classList.remove("is-invalid");
    cpf.classList.add("is-valid");
    validado = true;
  } else if (numeros_cpf.length === 11 && !ValidarCPF(numeros_cpf)) {
    cpf.classList.remove("is-valid");
    cpf.classList.add("is-invalid");
    document.getElementById("salvar").disabled = true;
  } else if (numeros_cpf.length === 0 || numeros_cpf.length < 11) {
    cpf.classList.remove("is-valid");
    cpf.classList.add("is-invalid");
    document.getElementById("salvar").disabled = true;
  } else if (validado) {
    cpf.classList.remove("is-invalid");
    cpf.classList.add("is-valid");
  }
};

//buscar
function search() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-customers");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      console.log(txtValue);
      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
