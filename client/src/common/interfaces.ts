import { FormModalMode } from "./constants";

export interface ISearchProps {
  doSearch: (keyword: string, searchBy: string) => void;
}

export interface IFormModalProps {
  mode: FormModalMode;
  setModalMode: (mode: FormModalMode) => void;
}

export interface IApiResponse {
  data: any;
  isErr: boolean;
}
