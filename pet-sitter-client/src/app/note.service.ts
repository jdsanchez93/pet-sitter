import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  public getNote(noteId: number): Observable<Note> {
    return this.http.get<Note>(`api/Note/Get/${noteId}`);
  }

  public createNote(noteData: Partial<Note>) {
    return this.http.post('api/Note', noteData);
  }
}

