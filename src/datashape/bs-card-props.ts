export default interface IBsCardProps {
    container: string;
    title: string;
    subTitle: string;
    content: string;
    staySeconds: number;
    links: Array<{label: string, onClick: () => void}>;
    styles: {[key: string]: string}
}