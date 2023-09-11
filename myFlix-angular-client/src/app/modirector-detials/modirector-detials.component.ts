import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modirector-detials',
  templateUrl: './modirector-detials.component.html',
  styleUrls: ['./modirector-detials.component.scss']
})
export class ModirectorDetialsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
      Birth: string,
      Death: string
    }
  ) { }

  ngOnInit(): void { }
}
