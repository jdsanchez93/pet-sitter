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
  selector: 'app-add-edit-note',
  standalone: true,
  templateUrl: './add-edit-note.component.html',
  styleUrl: './add-edit-note.component.scss',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, ImageUploadComponent, MatCardModule, MatProgressSpinnerModule, RouterModule],
})
export class AddEditNoteComponent implements OnInit{
  noteForm = this.fb.nonNullable.group({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  isLoading: boolean = false;

  noteId?: number;

  @ViewChild(ImageUploadComponent) imageUploadComponent!: ImageUploadComponent;

  constructor(private noteService: NoteService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['id'];

    if (this.noteId) {
      this.noteService.getNote(this.noteId)
        .pipe(
          tap(x => this.noteForm.patchValue({ ...x }))
        )
        .subscribe();
    }
  }

  onSubmit() {
    if (this.isUpdatingExistingNote()) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }

  private isUpdatingExistingNote(): boolean {
    return (this.noteId !== undefined);
  }

  private createNote() {
    this.isLoading = true;
    let n: Partial<Note> = this.noteForm.value;
    this.imageUploadComponent.uploadPhoto()
      .pipe(
        switchMap(({ s3ObjectName }) => {
          if (s3ObjectName) {
            n.photos = [{ photoId: 0, isDelete: false, s3Key: s3ObjectName }];
          }
          return this.noteService.createNote(n);
        }),
        tap(note => this.router.navigate(['/note', note.noteId]))
      )
      .subscribe();
  }

  private updateNote() {
    this.noteService.patchNote(this.noteId!, this.noteForm.value)
      .subscribe();
  }
}
