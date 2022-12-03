import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-job-popup',
  templateUrl: './post-job-popup.component.html',
  styleUrls: ['./post-job-popup.component.css']
})
export class PostJobPopupComponent implements OnInit {
  previewJobRequest: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public d: any,public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.previewJobRequest = d;
  }

  ngOnInit(): void {
  }

}
