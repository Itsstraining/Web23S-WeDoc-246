import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetFilesState } from 'src/app/ngrx/states/file.state';
import * as FileActions from 'src/app/ngrx/actions/file.action';
import { Observable } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';
import { Router } from '@angular/router';
import { UserState } from 'src/app/ngrx/states/user.state';
import { UserModel } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from 'src/app/components/invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeMainComponent {
  files$: Observable<DocumentFile[]>;
  user$: Observable<UserModel>;

  user!: UserModel;

  constructor(
    private store: Store<{
      getFiles: GetFilesState;
      getByAuthorId: GetFilesState;
      user: UserState;
    }>,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.user$ = store.select('user', 'user');
    this.store.select('user', 'user').subscribe((data) => {
      if (data) {
        this.user = data;
        store.dispatch(FileActions.getFilesByAuthorId({ authorId: data._id }));
      }
    });

    this.files$ = store.select('getFiles', 'files');
  }

  newPaper() {
    this.router.navigate(['/paper']);
  }

  openFile($event: any) {
    this.router.navigate(['/paper/' + $event]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(InviteDialogComponent);
  }
}
