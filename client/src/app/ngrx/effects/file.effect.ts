import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FileService } from 'src/app/services/file.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { DocumentFile } from 'src/app/models/file.model';
import * as FileActions from '../actions/file.action';

@Injectable()
export class FileEffects {
  constructor(private actions$: Actions, private fileService: FileService) {}

  createFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.createFile),
      switchMap((action) => {
        console.log(action);
        return this.fileService.createFile(action.file);
      }),
      map((file) => {
        console.log(file);
        return FileActions.createFileSuccess({ file: <DocumentFile>file });
      }),
      catchError((error) => of(FileActions.createFileFailure({ error })))
    );
  });

  getFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFileDetail),
      switchMap((action) => {
        return this.fileService.getFileDetail(action.fileId);
      }),
      map((file) => {
        return FileActions.getFileDetailSuccess({ file: <DocumentFile>file });
      }),
      catchError((error) =>
        of(FileActions.getFileDetailFailure({ error: error }))
      )
    );
  });

  getFiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFiles),
      switchMap(() => {
        return this.fileService.getFiles();
      }),
      map((files) => {
        return FileActions.getFilesSuccess({ files: <DocumentFile[]>files });
      }),
      catchError((error) => {
        return of(FileActions.getFilesFailure({ error: error }));
      })
    );
  });

  getFilesByAuthorId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.getFilesByAuthorId),
      switchMap((action) => {
        return this.fileService.getFilesByAuthorId(action.authorId);
      }),
      map((files) => {
        return FileActions.getFilesByAuthorIdSuccess({
          files: <DocumentFile[]>files,
        });
      }),
      catchError((error) => {
        return of(FileActions.getFilesByAuthorIdFailure({ error: error }));
      })
    );
  });

  updateFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.updateFile),
      switchMap((action) => {
        return this.fileService.updateFile(action.fileId, action.file);
      }),
      map((file) => {
        return FileActions.updateFileSuccess({ file: <DocumentFile>file });
      }),
      catchError((error) => {
        return of(FileActions.updateFileFailure({ error: error }));
      })
    );
  });

  inviteCollaborator$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.inviteCollaborator),
      switchMap((action) =>
        this.fileService.inviteCollaborator(action.file, action.uid)
      ),
      map((file) => {
        return FileActions.inviteCollaboratorSuccess();
      }),
      catchError((error: string) => {
        return of(FileActions.inviteCollaboratorFailure({ error }));
      })
    );
  });
}
