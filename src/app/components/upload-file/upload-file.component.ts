import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConstantsService } from '../../services/constants.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  progress: number = 0;
  message: string = '';
  @Output() public onUploadFinished = new EventEmitter();
  fileName: string = '';
  @Input() placeholderLabel: string = '';

  constructor(private http: HttpClient, private Constants: ConstantsService) { }

  ngOnInit(): void {
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    this.fileName = fileToUpload.name;
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.Constants.urlUpload, formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event:any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
}
