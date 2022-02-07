import toastr from 'toastr'

/** Site do toastr: https://codeseven.github.io/toastr/
 * Mensagem de erro configurada e criada automaticamente no site: https://codeseven.github.io/toastr/demo.html
 */
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  //Exportando uma função, é uma forma diferente em vez de exportar a classe
  export function mostrarMensagem(titulo, mensagem, tipo){
    /** Comando usado para mostrar a mensagem
     * O tipo pode ser: Success, Info, Warning e Error
     */
    toastr[tipo](mensagem, titulo)
  }

  export function mensagemErro(mensagem){
    mostrarMensagem('Erro', mensagem, 'error')
  }

  export function mensagemSucesso(mensagem){
    mostrarMensagem('Sucesso', mensagem, 'success')
  }

  export function mensagemAlerta(mensagem){
    mostrarMensagem('Alerta', mensagem, 'warning')
  }