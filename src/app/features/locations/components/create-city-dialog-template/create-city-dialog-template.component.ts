import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-city-dialog-template',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,  
    MatButtonModule,  
    MatDialogTitle,      
    MatDialogContent,     
    MatDialogActions,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './create-city-dialog-template.component.html',
  styleUrl: './create-city-dialog-template.component.css'
})
export class CreateCityDialogTemplateComponent {

  cityName: string = '';

  constructor(public dialogRef: MatDialogRef<CreateCityDialogTemplateComponent>
  ) {}


  onCloseDialog(): void {
    this.dialogRef.close(this.cityName);
  }
}
