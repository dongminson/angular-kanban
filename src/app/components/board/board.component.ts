import { Component, OnInit } from "@angular/core";
import { BoardService } from "../../services/board.service";
import { TaskElement } from "src/app/models/app.task";
import { CdkDropList } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  todoItems!: TaskElement[];
  inProgressItems!: TaskElement[];
  blockedItems!: TaskElement[];
  completedItems!: TaskElement[];
  otherListsTemplateRef!: (CdkDropList | string)[];

  constructor(private boardService: BoardService) {
    this.otherListsTemplateRef = [];
  }

  ngOnInit() {
    this.boardService.getTodoItems().subscribe((items: TaskElement[]) => {
      this.todoItems = items;
    });

    this.boardService.getInProgressItems().subscribe((items: TaskElement[]) => {
      this.inProgressItems = items;
    });

    this.boardService.getBlockedItems().subscribe((items: TaskElement[]) => {
      this.blockedItems = items;
    });

    this.boardService.getCompletedItems().subscribe((items: TaskElement[]) => {
      this.completedItems = items;
    });
  }

  templateRefReady(templateRef:CdkDropList | string) {
    this.otherListsTemplateRef.push(templateRef);
  }

  saveItem(type: string, item: TaskElement) {
    this.boardService.saveTextToLocalStorage(type, item);
  }

  addItem(type: string) {
    this.boardService.addItem(type);
  }

  removeItem(type: string, id: string) {
    this.boardService.removeItem(type, id);
  }

  handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}