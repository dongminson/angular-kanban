import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { TaskElement } from 'src/app/models/app.task';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @ViewChild('list', { static: false }) templateRef!: CdkDropList | string;
    @Input() type!: string;
    @Input() items!: TaskElement[];
    @Input() badgeText!: string;
    @Input() templateRefs!: (CdkDropList | string)[];
    @Output() templateRefReadyEvent = new EventEmitter<CdkDropList | string>();
    @Output() saveItemEvent = new EventEmitter<{type: string, item: TaskElement}>();
    @Output() addItemEvent = new EventEmitter<{type: string}>();
    @Output() removeItemEvent = new EventEmitter<{type: string, itemId: string}>();

    constructor(private boardService: BoardService) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.templateRefReadyEvent.emit(this.templateRef);
    }

    saveItem(type: string, item: TaskElement) {
        this.saveItemEvent.emit({ type, item });
    }

    addItem(type: string) {
        this.addItemEvent.emit({ type });
    }

    removeItem(type: string, itemId: string) {
        this.removeItemEvent.emit({ type, itemId });
    }

    drop(event: CdkDragDrop<TaskElement[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
        this.boardService.saveItemsToLocalStorage();
    }
  

}
