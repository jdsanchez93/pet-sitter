import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoteService } from '../note.service';
import { ImageUploadComponent } from '../../photo/image-upload/image-upload.component';
import { MatCardModule } from '@angular/material/card';
import { switchMap, tap } from 'rxjs';
import { Note } from '../../../models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-note',
  standalone: true,
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, ImageUploadComponent, MatCardModule, MatProgressSpinnerModule, RouterModule]
})
export class AddNoteComponent implements OnInit {
  noteForm = this.fb.nonNullable.group({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  isLoading: boolean = false;

  @Input({ required: false }) note: Note | undefined;

  @ViewChild(ImageUploadComponent) imageUploadComponent!: ImageUploadComponent;

  constructor(private noteService: NoteService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let noteId = Number(params.get('id'));
          return this.noteService.getNote(noteId);
        }),
        tap(x => this.note = x)
      )
      .subscribe();
  }

  onSubmit() {
    if (this.isUpdatingExistingNote()) {
      console.log('updatenote')
      // this.updateNote();
    } else {
      console.log('createnote')
      // this.createNote();
    }
  }

  private isUpdatingExistingNote(): boolean {
    console.log('isUpdatingExistingNote', this.note?.noteId);
    if (this.note?.noteId) {
      return true;
    }
    return false;
  }

  private createNote() {
    this.isLoading = true;
    let n: Partial<Note> = this.noteForm.value;
    this.imageUploadComponent.uploadPhoto().pipe(
      switchMap(({ s3ObjectName }) => {
        if (s3ObjectName) {
          n.photos = [{ photoId: 0, isDelete: false, s3Key: s3ObjectName }];
        }
        return this.noteService.createNote(n);
      }),
      tap(note => this.router.navigate(['/note', note.noteId]))
    ).subscribe();
  }

  private updateNote() {
    this.noteService.patchNote(this.note?.noteId!, this.noteForm.value);
  }
}
