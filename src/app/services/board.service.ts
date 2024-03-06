import { Injectable } from '@angular/core';
import { uuidv4 } from "src/app/utils/app.utils";
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskElement } from '../models/app.task';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    private todoItemsSubject: BehaviorSubject<TaskElement[]> = new BehaviorSubject<TaskElement[]>([]);
    private inProgressItemsSubject: BehaviorSubject<TaskElement[]> = new BehaviorSubject<TaskElement[]>([]);
    private blockedItemsSubject: BehaviorSubject<TaskElement[]> = new BehaviorSubject<TaskElement[]>([]);
    private completedItemsSubject: BehaviorSubject<TaskElement[]> = new BehaviorSubject<TaskElement[]>([]);

    constructor() {
        this.initDefaultItems();
    }

    getTodoItems(): Observable<TaskElement[]> {
        return this.todoItemsSubject.asObservable();
    }

    getInProgressItems(): Observable<TaskElement[]> {
        return this.inProgressItemsSubject.asObservable();
    }

    getBlockedItems(): Observable<TaskElement[]> {
        return this.blockedItemsSubject.asObservable();
    }

    getCompletedItems(): Observable<TaskElement[]> {
        return this.completedItemsSubject.asObservable();
    }

    addItem(type: string) {
        const item = {
            id: uuidv4(),
            text: 'new item',
        };

        if (type === 'todo') {
            this.todoItemsSubject.next([...this.todoItemsSubject.value, item]);
        } else if (type === 'progress') {
            this.inProgressItemsSubject.next([...this.inProgressItemsSubject.value, item]);
        } else if (type === 'blocked') {
            this.blockedItemsSubject.next([...this.blockedItemsSubject.value, item])
        } else if (type === 'completed') {
            this.completedItemsSubject.next([...this.completedItemsSubject.value, item]);
        }
        this.saveItemsToLocalStorage();
    }

    removeItem(type: string, id: string) {
        if (type === 'todo') {
            this.todoItemsSubject.next(this.todoItemsSubject.value.filter((item) => item.id !== id));
        } else if (type === 'progress') {
            this.inProgressItemsSubject.next(this.inProgressItemsSubject.value.filter((item) => item.id !== id));
        } else if (type === 'blocked') {
            this.blockedItemsSubject.next(this.blockedItemsSubject.value.filter((item) => item.id !== id));
        } else if (type === 'completed') {
            this.completedItemsSubject.next(this.completedItemsSubject.value.filter((item) => item.id !== id));
        }
        this.saveItemsToLocalStorage();
    }

    saveTextToLocalStorage(type: string, item: TaskElement) {
        const storedItems = localStorage.getItem('kanban');
        if (storedItems) {
            const items = JSON.parse(storedItems);
            const specificItems = items[type] || [];
            const updatedItems = specificItems.map((storedItem: TaskElement) =>
                storedItem.id === item.id ? { ...storedItem, text: item.text } : storedItem
            );
            localStorage.setItem('kanban', JSON.stringify({ ...items, [type]: updatedItems }));
        }
    }

    saveItemsToLocalStorage() {
        const boardItems = {
            todo: this.todoItemsSubject.value,
            progress: this.inProgressItemsSubject.value,
            blocked: this.blockedItemsSubject.value,
            completed: this.completedItemsSubject.value
        };

        localStorage.setItem('kanban', JSON.stringify(boardItems));
    }

    private initDefaultItems() {
        const storedItems = localStorage.getItem('kanban');
        if (storedItems) {
            const items = JSON.parse(storedItems);
            this.todoItemsSubject.next(items?.todo || []);
            this.inProgressItemsSubject.next(items?.progress || []);
            this.blockedItemsSubject.next(items?.blocked || []);
            this.completedItemsSubject.next(items?.completed || []);
        }
    }
}