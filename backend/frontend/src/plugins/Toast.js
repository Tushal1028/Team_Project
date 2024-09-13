import Swal from "sweetalert2";

function Toast(icon, title, position='bottom-right', timer=1500) {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
    });

    return Toast.fire({
        icon: icon,
        title: title,
    });
}

export default Toast;
