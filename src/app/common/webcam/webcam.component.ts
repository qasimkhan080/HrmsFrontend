import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {
  private trigger = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam = new Subject();
  captureImage = '';

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  public triggerSnapshot(flag: boolean): void {
    if (flag) {
      this.trigger.next(this.captureImage);
      this.dialogRef.close(this.captureImage);
    }
    else {
      this.dialogRef.close('');
    }
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
  }

  public get triggerObservable() {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable() {
    return this.nextWebcam.asObservable();
  }
}
