import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-company-popup',
  templateUrl: './preview-company-popup.component.html',
  styleUrls: ['./preview-company-popup.component.css']
})
export class PreviewCompanyPopupComponent implements OnInit {
  previewCompanyRequest: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.previewCompanyRequest = d;
  }
  ngOnInit(): void {
  }

  SaveOrCancel(param: any) {
    if (param == 'save')
      this.dialogRef.close(true);
    else
      this.dialogRef.close(false);
  }
}
