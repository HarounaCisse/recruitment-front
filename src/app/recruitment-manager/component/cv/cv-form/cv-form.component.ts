import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Cv } from 'src/app/model/cv';
import { Experience } from 'src/app/model/experience';
import { Formation } from 'src/app/model/formation';
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
  formations: Formation[]=[];
  form: FormGroup
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  //Stepper
  isLinear = false;
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
    private router:Router) {

   }

  ngOnInit(): void {
    this.fetchCvId();
    //this.cv = new Cv();
   // this.cv.experience = new Experience();
    this.formation = new Formation();
    //this.formation.cv.id = this.cv.id
    // this.buildForm();

    //Stepper
    this.stepperFormBuilder();


  }
   /**
     * stepperFormBuilder
     */
    private stepperFormBuilder() {
    this.firstFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumer: ['', Validators.required]
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
      this.cvService.addCv(this.cv).subscribe(() =>{
      this.router.navigate(['/offers']);
      })
    }
    /**
     * addFormationList
     */
    public addFormationList() {
      this.formationService.addFormation(this.cv.id, this.formation)
              .subscribe(()=>{
                console.log(this.formation)
              })
    }
    /**
     * fetchCvId
     */
    public fetchCvId() {
      this.cvService.getById(19).subscribe(data=>{
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


}
