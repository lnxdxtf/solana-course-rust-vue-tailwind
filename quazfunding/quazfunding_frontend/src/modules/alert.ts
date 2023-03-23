import Swal from "sweetalert2"

export const alertNormalizer = (option: Options) => {

    Swal.fire({
        // toast: true,
        title: `<div class="text-white">${option.title}</div>`,
        html: option.message,
        position: 'top-right',
        backdrop: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        customClass: {
            title: 'bg-2',
        }
    })
}


interface Options {
    type: AlertType | number,
    title: string,
    message: string,
}


enum AlertType {
    Success = 0,
    Warning = 1,
    Info = 2,
    Error = 3,
}