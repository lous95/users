import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
// import { Address } from '../../models/address';
import { Country } from '../../models/country';
import { City } from '../../models/city';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: AddressFormComponent,
  //     multi: true
  //   }
  // ]
})
export class AddressFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() countries!: Country[];
  @Input() formGroup!: FormGroup;
  @Output() addCityEvent = new EventEmitter<string>();
  // address: any = undefined;
  // onTouch: any = () => {};
  // onChange: (value: Address) => void = () => {};
  cities!: City[] | undefined;
  countrySelectionChangeSubscription!: Subscription | undefined;

  constructor(private fb: FormBuilder){
  }
  
  ngOnInit(): void {
    this.countrySelectionChangeSubscription = this.formGroup.get('countryId')?.valueChanges.subscribe(countryId => {
      this.formGroup.get('cityId')?.reset();
      this.filterCitiesBySelectedCountry(countryId);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['countries'] && this.formGroup.get('countryId')?.value) {
      this.filterCitiesBySelectedCountry(this.formGroup.get('countryId')?.value);
    }
  }

  ngOnDestroy(): void {
    this.countrySelectionChangeSubscription?.unsubscribe();
  }

  // writeValue(address: Address): void {
  //   this.address = address;
  //   this.onChange(this.address)
  //   console.log(this.address);
  // }

  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: any): void {
  //   this.onTouch = fn;
  // }

  // onAddressChange() {
  //   this.onChange(this.address);
  // }

  filterCitiesBySelectedCountry(countryId: string){
    this.cities = this.countries.find(country => country.id === countryId)?.cities || [];
  }
  
  addCity(){
    this.addCityEvent.emit(this.formGroup.get('countryId')?.value);
  }
}
