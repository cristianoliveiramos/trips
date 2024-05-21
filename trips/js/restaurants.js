let listaDeRestaurantes = [];
let itemAEditar;

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");
const listaRecuperada = localStorage.getItem("listaDeRestaurantes");

atualizaLocalStorage = () => {
  localStorage.setItem("listaDeRestaurantes", JSON.stringify(listaDeRestaurantes));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarItem();
  mostrarItens();
  itensInput.focus();
});

const salvarItem = () => {
  const compraItem = itensInput.value;

  const valorDuplicado = listaDeRestaurantes.some(
    (element) => element.item.toUpperCase() === compraItem.toUpperCase()
  );

  if (valorDuplicado) {
    alert("Item já adicionado na lista.");
    console.error("VALOR JÁ ADICIONADO!!!");
  } else {
    listaDeRestaurantes.push({
      item: compraItem,
      checar: false,
    });
  }
  itensInput.value = "";
};

const mensagem = (texto) => alert(texto);

const mostrarItens = () => {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";

  listaDeRestaurantes.map((elemento, i) => {
    if (elemento.checar === true) {
      ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${i}">
          <div>
              <input type="checkbox" checked class="is-clickable" />  
              <span class="itens-comprados is-size-5">${elemento.item}</span>
          </div>
          <div>
              <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `;
    } else {
      ulItens.innerHTML += `
          <li class="item-compra is-flex is-justify-content-space-between" data-value="${i}">
            <div>
              <input type="checkbox" class="is-clickable" />
              <input type="text" class="is-size-5" value="${elemento.item}" ${
        i !== Number(itemAEditar) ? "disabled" : ""
      }></input>
            </div>
            
            <div>
            ${
              i === Number(itemAEditar)
                ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
                : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
            }
              <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
          </li>
        `;
    }
  });

  const inputsCheck = document.querySelectorAll('input[type="checkbox"]');

  inputsCheck.forEach((e) =>
    e.addEventListener("click", (event) => {
      const valorDoElemento =
        event.target.parentElement.parentElement.getAttribute("data-value");
      listaDeRestaurantes[valorDoElemento].checar = event.target.checked;
      mostrarItens();
    })
  );

  const deletar = document.querySelectorAll(".deletar");

  deletar.forEach((e) => {
    e.addEventListener("click", (event) => {
      const valorDoElemento =
        event.target.parentElement.parentElement.getAttribute("data-value");
      console.log(valorDoElemento);
      listaDeRestaurantes.splice(valorDoElemento, 1);
      mostrarItens();
    });
  });

  const editarItens = document.querySelectorAll(".editar");

  editarItens.forEach((e) => {
    e.addEventListener("click", (event) => {
      itemAEditar =
        event.target.parentElement.parentElement.getAttribute("data-value");
      console.log(itemAEditar);
      mostrarItens();
    });
  });

  atualizaLocalStorage();
};

if (listaRecuperada) {
  listaDeRestaurantes = JSON.parse(listaRecuperada);
  mostrarItens();
} else {
  listaDeRestaurantes = [];
}

function salvarEdicao() {
  const itemEditado = document.querySelector(
    `[data-value="${itemAEditar}"] input[type="text"]`
  );
  listaDeRestaurantes[itemAEditar].valor = itemEditado.value;
  console.log(listaDeRestaurantes);
  itemAEditar = -1;
  itemEditado.setAttribute('disabled', true);
  mostrarItens();
}
