import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {
  model: any;
  constructor(@Inject(MAT_DIALOG_DATA) public d: any, public dialog: MatDialog, public dialogRef: MatDialogRef<any>) {
    this.model = d;
  }

  ngOnInit(): void {
  }

  confirmed(param: any) {
    if (param == 'yes')
      this.dialogRef.close(true);
    else
      this.dialogRef.close(false);
  }
}
