import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'notes', loadComponent: () => import('./note/note-list/note-list.component').then(mod => mod.NoteListComponent) },
    { path: 'note/:id', loadComponent: () => import('./note/single-note/single-note.component').then(mod => mod.SingleNoteComponent) },
    { path: 'new-note', loadComponent: () => import('./note/add-note/add-note.component').then(mod => mod.AddNoteComponent) },
    { path: 'edit-note/:id', loadComponent: () => import('./note/add-note/add-note.component').then(mod => mod.AddNoteComponent) },
];
