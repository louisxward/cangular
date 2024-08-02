import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core'
import { RowActionWithData, DataTableType } from './user-table-componenet'

@Component({
	selector: 'data-table-wrapper',
	templateUrl: './data-table-wrapper.component.html',
})
export class DataTableWrapperComponent<A> implements OnChanges {
	@Input()
	public tableConfig: DataTableType

	@Input()
	public tableContent: A[]

	@Output()
	public getDataForPage = new EventEmitter<any>()

	@Output()
	public startRowAction = new EventEmitter<{}>()

	public pageList: number[] = []

	public ngOnChanges(changes: SimpleChanges) {}

	public onRowActionClicked(actionType: string, rowData: A): void {
		const userAction: RowActionWithData<A> = {
			actionToPerform: actionType,
			rowData: rowData,
		}

		this.startRowAction.emit(userAction)
	}
}
