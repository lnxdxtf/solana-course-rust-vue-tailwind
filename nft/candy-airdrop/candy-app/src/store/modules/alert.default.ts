import Swal from "sweetalert2"

export const successAlert = (title: string, message: any) => {
    Swal.fire({
        title: title,
        html: message,
        position: "top-right",
        backdrop: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        customClass: {
            title: 'bg-green-500',
        }
    })
}

export const errorAlert = (title: string, error: any) => {
    Swal.fire({
        title: title,
        html: error,
        position: "top-right",
        backdrop: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        customClass: {
            title: 'bg-red-500',
        }
    })
}

export const warningAlert = (title: string, warning: any) => {
    Swal.fire({
        title: title,
        html: warning,
        position: "top-right",
        backdrop: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        customClass: {
            title: 'bg-amber-500',
        }
    })
}

export const infoAlert = (title: string, info: any) => {
    Swal.fire({
        title: title,
        html: info,
        position: "top-right",
        backdrop: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        customClass: {
            title: 'bg-indigo-500',
        }
    })
}
