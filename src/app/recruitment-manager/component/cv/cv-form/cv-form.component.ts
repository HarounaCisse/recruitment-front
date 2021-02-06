import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {filter, map, startWith, tap} from 'rxjs/operators';
import { Cv } from 'src/app/model/cv';
import { Experience } from 'src/app/model/experience';
import { Formation } from 'src/app/model/formation';
import { Langues } from 'src/app/model/langues.enum';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';
import { FormationService } from 'src/app/recruitment-manager/service/formation.service';
import { UtilityService } from 'src/app/recruitment-manager/service/utility.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CompetenceService } from 'src/app/recruitment-manager/service/competence.service';
import { Competence } from 'src/app/model/competence';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvFormComponent implements OnInit {

  cv: Cv;
  ///@Input() cvEdit: Cv;
  competence: Competence;
  formation: Formation;
  form: FormGroup
  options: string[] = [Langues.AUCUN, Langues.DEBUTANT, Langues.INTERMEDIAIRE, Langues.AVANCE];
  filteredOptions: Observable<string[]>;

  //Stepper
  isLinear = false;
  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;
  // horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  comptenceFormGroup: FormGroup;

  get studies(): FormArray {
    return this.thirdFormGroup.get('formation') as FormArray;
  }

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;

  allFruits: string[] = [];
  fruits: string[] = [];
  competences$: string[];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  //------------Construtor----------------------
  constructor(private fb: FormBuilder,
    private cvService:CvService,
    private formationService:FormationService,
    private router:Router,
    private notify: UtilityService,
    private competenceService: CompetenceService) {

   }

  ngOnInit(): void {
    if(this.cv){
      this.fetchCvId();
    }
    this.cv = new Cv();
   this.cv.experience = new Experience();
    this.formation = new Formation();
    //this.competence = [];
    this.competence = new Competence();
    //this.formation.cv.id = this.cv.id
    //this.cvEdit = this.cv;
    //Stepper
    this.stepperFormBuilder();
    //Filter
    this.filteredOptions = this.firstFormGroup.get('langues').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.filteredFruits = this.comptenceFormGroup.get('competence').valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) => fruit ? this.filter(fruit) : this.allFruits.slice()))

       this.competenceService.competencesList$.pipe(
         map(competences => competences.map(comp => {
           ///this.competences$ = comp.competence
           this.allFruits.push(comp.competence)

          }))).subscribe(()=> console.log(this.allFruits))
  }
  //End OnInit
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
    this.comptenceFormGroup = this.fb.group({
      competence:['']
    })
    this.getFirstFormData();
    this.getSecondFormData();
    this.getThirdFormData();
    this.getCompetenceFormData();
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
        //console.log(this.formation)
      })

    }

    // ADD COMPT
    getCompetenceFormData(){
     const compt = this.comptenceFormGroup.get('competence');
     compt.valueChanges
      .subscribe(value => this.competence.competence = value);
    }

    /**
     * addCv
     */
    public addCv() {
      // console.log(this.thirdFormGroup.value);
      this.cvService.addCv(this.cv).subscribe(data =>{
        this.cv = data;
        this.notify.openSnackBar('ENREGISTRE')
      })
    }

    /**
     * addExperience
     */
    public addExperience() {
      this.cvService.upDate(this.cv.id, this.cv)
        .subscribe(() => {
          this.notify.openSnackBar('ENREGISTRE')
          this.stepper.next()
        })
    }

    /**
     * addFormationList
     */
    public addFormationList() {
        if (this.cv.id) {
          this.formationService.addFormation(this.cv.id, this.formation)
                  .subscribe(()=>{
                    this.notify.openSnackBar('ENREGISTRE')
                   this.router.navigate(['/cv/'+this.cv.id]);
                  })
        }

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

    /**
     * addCompetence
     */
    public addCompetence() {
      this.competenceService.addCompetence(this.cv.id,this.competence)
      .subscribe(data => console.log("See Compt :"+data))
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.comptenceFormGroup.get("competence").setValue(null);
    }

    remove(fruit: string): void {
      const index = this.fruits.indexOf(fruit);

      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.fruits.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.comptenceFormGroup.get("competence").setValue(null);
    }

    private filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allFruits?.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

}
