import { ModalOption } from 'bootstrap';
export default interface IBsConfirmData {
    container: string;
    title: string;
    content: string;
    callback: (yesOrNo: boolean) => void;
    cancelLabel?: string;
    confirmLabel?: string;
    modalOption?: ModalOption;
}