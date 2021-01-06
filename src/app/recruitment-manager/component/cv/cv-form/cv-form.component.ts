import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Cv } from 'src/app/model/cv';
import { Experience } from 'src/app/model/experience';
import { Formation } from 'src/app/model/formation';
import { Langues } from 'src/app/model/langues.enum';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';
import { FormationService } from 'src/app/recruitment-manager/service/formation.service';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {

  cv: Cv;
  formation: Formation;
  form: FormGroup
  options: string[] = [Langues.AUCUN, Langues.DEBUTANT, Langues.INTERMEDIAIRE, Langues.AVANCE];
  filteredOptions: Observable<string[]>;

  //Stepper
  isLinear = false;
  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  get studies(): FormArray {
    return this.thirdFormGroup.get('formation') as FormArray;
  }

  //
  constructor(private fb: FormBuilder,
    private cvService:CvService,
    private formationService:FormationService,
    private router:Router,
    private _snackBar: MatSnackBar) {

   }

  ngOnInit(): void {
    if(this.cv){
      this.fetchCvId();
    }
    this.cv = new Cv();
   this.cv.experience = new Experience();
    this.formation = new Formation();
    //this.formation.cv.id = this.cv.id

    //Stepper
    this.stepperFormBuilder();
    //Filter
    this.filteredOptions = this.firstFormGroup.get('langues').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }
  private _filter(value: Langues): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
   /**
     * stepperFormBuilder
     */
    private stepperFormBuilder() {
    this.firstFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumer: ['', Validators.required],
      langues:['']
    });
    this.secondFormGroup = this.fb.group({
      titre: ['', Validators.required],
      employeur: ['', Validators.required],
      lieu: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      formation: this.fb.array([this.buildFormation()]),

    });
    this.getFirstFormData();
    this.getSecondFormData();
    this.getThirdFormData();
    }
    /**
     * getFirstFormData
     */
    private getFirstFormData() {
      this.firstFormGroup.get('firstName').valueChanges.subscribe(value => this.cv.title = value);
      this.firstFormGroup.get('langues').valueChanges.subscribe(value => this.cv.langues = value);
    }

    /**
     * getSecondFormData
     */
    private getSecondFormData() {
      this.secondFormGroup.get('titre').valueChanges.subscribe(value => this.cv.experience.titre = value)
      this.secondFormGroup.get('employeur').valueChanges.subscribe(value => this.cv.experience.nomEmployeur = value)
      this.secondFormGroup.get('lieu').valueChanges.subscribe(value => this.cv.experience.lieu = value)
    }
    /**
     * getThirdFormData
     */
    private getThirdFormData() {
      const formArr = this.thirdFormGroup.get('formation')
      formArr.valueChanges.subscribe(value => {
        //console.log(JSON.stringify(value))
        this.formation = value;
        console.log(this.formation)
      })

    }

    /**
     * addCv
     */
    public addCv() {
      // console.log(this.thirdFormGroup.value);
      this.cvService.addCv(this.cv).subscribe(data =>{
        this.cv = data;
        this.openSnackBar('ENREGISTRE')
      })
    }

    /**
     * addExperience
     */
    public addExperience() {
      this.cvService.upDate(this.cv.id, this.cv)
        .subscribe(() => {
          this.openSnackBar('ENREGISTRE')
          this.stepper.next()
        })
    }

    /**
     * addFormationList
     */
    public addFormationList() {
      if(this.cv.id === this.cv.id)
      this.formationService.addFormation(this.cv.id, this.formation)
              .subscribe(()=>{
                this.openSnackBar('ENREGISTRE')
               this.router.navigate(['/offers']);
              })
    }
    /**
     * fetchCvId
     */
    private fetchCvId() {
      this.cvService.getById(this.cv.id).subscribe(data=>{
        this.cv = data;
      })
    }
    addFormation(): void {
      this.studies.push(this.buildFormation());
    }

    deleteFormation(index: number): void {
      if(this.studies.length !== 1){
        this.studies.removeAt(index);
        this.studies.markAsDirty();
      }
    }
    buildFormation(): FormGroup {
      return this.fb.group({
        etablissement: [''],
        niveau: [''],
        domaine: [''],
      });
    }

    openSnackBar(message: string, action?: string): MatSnackBarRef<SimpleSnackBar>{
      return this._snackBar.open(message, action, {
         duration: 2000,
         horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
       });
     }


}
