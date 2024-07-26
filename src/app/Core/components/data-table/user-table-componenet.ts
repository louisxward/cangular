const tableConfig: DataTableType = {
  columns: [
    {title: "ID", dataProperty: "id", sortable: true, filterable: false},
    {title: "Username", dataProperty: "username", sortable: true, filterable: true},
    {title: "Email", dataProperty: "email", sortable: false, filterable: false},
  ],
  rowActions: [
    {label: "Edit", actionIdToReturn: "edit", logoImageUrl: "...", showOption: (x: boolean) => true },
  ],
  rowsPerPage: 10,
}

export interface DataTableType{
  columns: DataTableColumn[],
  rowActions: any[],
  rowsPerPage: number,
}

export interface DataTableColumn{
dataField: any
  title: string,
  dataProperty: string,
  sortable: boolean,
  filterable: boolean,
}

export interface DataTableRowAction{
  label: string,
  actionIdToReturn: string,
  logoImageUrl: string,
  filterable: boolean,
}

export interface RowActionWithData<A>{
  actionToPerform: string,
  rowData: A
}