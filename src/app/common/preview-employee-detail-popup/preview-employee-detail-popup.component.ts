import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-employee-detail-popup',
  templateUrl: './preview-employee-detail-popup.component.html',
  styleUrls: ['./preview-employee-detail-popup.component.css']
})
export class PreviewEmployeeDetailPopupComponent implements OnInit {
  previewEmployeeRsp: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>) {
    this.previewEmployeeRsp = d;
  }
  ngOnInit(): void {
  }

  Cancel() {
    this.dialogRef.close();
  }
}
