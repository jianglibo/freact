import { ModalOption } from 'bootstrap';
export default interface IBsModalData {
    container: string;
    title: string;
    content: string;
    ttl?: number,
    closeLabel?: string;
    modalOption?: ModalOption;
    size?: "modal-lg" | "modal-sm"
}