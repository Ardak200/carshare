import Swal from 'sweetalert2'
import {removeCar} from "../../axios/lib/rent/carModule";
import {successMessage} from "../../utils/toastMessage";
export const fireOnRemove = (id:string) => {
    Swal.fire({
            title: 'Вы уверены что вы хотите удалить данную запись',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Удалить",
            cancelButtonText: "Отменить",
            icon: 'warning'
        }
    ).then((result) => {
        if (result.isConfirmed) {
            removeCar(id).then(res=> {
                successMessage("Запись удалена")
                window.location.reload();
            })
        }else {
            return;
        }
    })
}