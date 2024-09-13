import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AddressFormComponent } from '../../../locations/components/address-form/address-form.component';
import { UsersHttpService } from '../../services/users-http.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { LocationsHttpService } from '../../../locations/services/locations-http.service';
import { Country } from '../../../locations/models/country';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCityDialogTemplateComponent } from '../../../locations/components/create-city-dialog-template/create-city-dialog-template.component';
import { City } from '../../../locations/models/city';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AddressFormComponent,
    MatDialogModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  countries!: Country[];

  // countries$!:Observable<Country[]>; 

  constructor(private fb: FormBuilder, private userHttpService: UsersHttpService, private router: Router,
     private locationsHttpService: LocationsHttpService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: [''],
      addresses: this.fb.array([], this.minAddressesValidator()),
    });

    this.locationsHttpService.getCountries().subscribe((countries: Country[]) => this.countries = countries);
  }

  get addresses(): FormGroup[] {
    return (this.userForm?.get('addresses') as FormArray).controls as FormGroup[];
  }

  addAddress(): void {
    const addresses = this.userForm.get('addresses') as FormArray
    addresses.push(
      this.fb.group({
        name: ['', Validators.required],
        countryId: [null],
        cityId: [null],
        street: ['', Validators.required],
      })
    );
    addresses.updateValueAndValidity();
  }

  removeAddress(index: number): void {
    const addresses = this.userForm.get('addresses') as FormArray
    addresses.removeAt(index);
    addresses.updateValueAndValidity();
  }

  onAddCity(countryId: string) {
    const dialogRef = this.dialog.open(CreateCityDialogTemplateComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(cityName => {
      if(!cityName) {
        return;
      }
      const city: City = {
        name: cityName,
        countryId
      }
      this.locationsHttpService.createCity(city).pipe(switchMap(() => {
        return this.locationsHttpService.getCities(countryId);
      })).subscribe((countryCities) => {
        this.countries = this.countries.map(country => {
          if (country.id === countryId) {
            return {
              ...country,
              cities: countryCities 
            };
          }
          return country;
        });
      })
    });
  }


  submit(): void {
    if (this.userForm.valid) {
      const user = {
        ...this.userForm.value,
        birthdate: this.userForm.value.birthdate.toString()
      }
      this.userHttpService.createUser(user).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        }
      })
    }
  }

  minAddressesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formArray = control as FormArray;
      return formArray.length > 0 ? null : { 'minAddresses': true };
    };
  }
}

