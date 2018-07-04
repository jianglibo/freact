
export default class ActionFormProps {
  constructor(
    public baseUrl: string,
    public method: "GET" | "POST" | "PUT" | "DELETE",
    public selectedItems: Array<{ id: string|number }>
  ) {}
}