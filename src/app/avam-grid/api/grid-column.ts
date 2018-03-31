import { TemplateRef } from "@angular/core";

export class GridColumn {
  index: number;
  name : string;
  caption? : string;
  width?: number;
  template?: TemplateRef<any>;
  sortable?: boolean;
  filterable?: boolean;
  volatile?: boolean;
}
