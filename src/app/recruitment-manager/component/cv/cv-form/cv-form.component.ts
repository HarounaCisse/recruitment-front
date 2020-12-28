import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Cv } from 'src/app/model/cv';
import { Experience } from 'src/app/model/experience';
import { Formation } from 'src/app/model/formation';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {

  cv: Cv;
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
    private router:Router) {

   }

  ngOnInit(): void {

    this.cv = new Cv();
    this.cv.experience = new Experience();
    this.cv.formation = new Formation();
    // this.buildForm();

    //Stepper
    this.stepperFormBuilder();
    // this.thirdFormGroup = this.fb.group({
    //   etablissement: [''],
    //   niveau: [''],
    //   domaine: ['']
    // })

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
     // secondCtrl: ['', Validators.required],
      titre: ['', Validators.required],
      employeur: ['', Validators.required],
      lieu: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      formation: this.fb.array([this.buildClass()]),
      // etablissement: [''],
      // niveau: [''],
      // domaine: ['']
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
      // this.thirdFormGroup.get('etablissement').valueChanges.subscribe(value => this.cv.formation.etablissement = value)
      // this.thirdFormGroup.get('niveau').valueChanges.subscribe(value => this.cv.formation.niveau = value)
      // this.thirdFormGroup.get('domaine').valueChanges.subscribe(value => this.cv.formation.domaine = value)
      // this.thirdFormGroup.get('studies.etablissement').valueChanges.subscribe(value => this.cv.formation.etablissement = value);
      // this.thirdFormGroup.get(['studies','etablissement']).valueChanges.subscribe(value => this.cv.formation.etablissement = value);
      // this.thirdFormGroup.get(['studies','niveau']).valueChanges.subscribe(value => this.cv.formation.niveau = value);
      // this.thirdFormGroup.get(['studies','domaine']).valueChanges.subscribe(value => this.cv.formation.domaine = value)
    }

    /**
     * addCv
     */
    public addCv() {
      this.cvService.addCv(this.cv).subscribe(() =>{
      this.router.navigate(['/offers']);
      })
    }
    addClass(): void {
      this.studies.push(this.buildClass());
    }

    deleteClass(index: number): void {
      this.studies.removeAt(index);
      this.studies.markAsDirty();
    }
    buildClass(): FormGroup {
      return this.fb.group({
        etablissement: [''],
        niveau: [''],
        domaine: [''],
      });
    }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      title: this.fb.control(this.cv.title, [Validators.required]),
     experience: [this.cv.experience, [Validators.required]],
     langues: [this.cv.langues, [Validators.required]],

    });
    this.subscribe();
    this.filteredOptions = this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private subscribe(): void {
    // if (!this.form) {
    //   this.buildForm();
    // }
    this.form.get('title').valueChanges.subscribe(value => this.cv.title = value);
    this.form.get('experience').valueChanges.subscribe(value => this.cv.experience = value);
    this.form.get('langues').valueChanges.subscribe(value => this.cv.langues = value);



  }


}
