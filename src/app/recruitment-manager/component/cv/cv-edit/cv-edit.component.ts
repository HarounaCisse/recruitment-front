import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cv } from 'src/app/model/cv';
import { Formation } from 'src/app/model/formation';
import { Langues } from 'src/app/model/langues.enum';
import { CvService } from 'src/app/recruitment-manager/service/cv.service';
import { FormationService } from 'src/app/recruitment-manager/service/formation.service';
import { UtilityService } from 'src/app/recruitment-manager/service/utility.service';

@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.scss']
})
export class CvEditComponent implements OnInit {
  cvToUpdate: Cv;
  isLinear = false;
  errorMessage: any;
  private sub: Subscription;

  formation: Formation;
  //form: FormGroup
  options: string[] = [Langues.AUCUN, Langues.DEBUTANT, Langues.INTERMEDIAIRE, Langues.AVANCE];
  filteredOptions: Observable<string[]>;

  // @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  get studies(): FormArray {
    return this.thirdFormGroup.get('formation') as FormArray;
  }


  constructor(
    private fb: FormBuilder,
    private cvService:CvService,
    private formationService:FormationService,
    private router:Router,
    private notify: UtilityService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    //Read the ID from URL using snapshop approach
   const paramId = +this.route.snapshot.paramMap.get('id');
   console.log(paramId);
  //  this.fetchCvId(paramId);
  this.findCV(paramId);
  this.cvToUpdate = this.cvService.cv
   console.log("Newlly created one: "+this.cvToUpdate.title);

  // Read the product Id from the route parameter using
  //Observable paramMap
  // this.route.paramMap.subscribe(
  //   params => {
  //     const id = +params.get('id');
  //     this.findCV(id);
  //   }
  // );

   //Filter
    // this.filteredOptions = this.firstFormGroup.get('langues').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );





     this.stepperFormBuilder();

  }



  // ngOnInit(): void {
  //   if(this.cv){
  //     this.fetchCvId();
  //   }
  //   this.cv = new Cv();
  //  this.cv.experience = new Experience();
  //   this.formation = new Formation();
  //   //this.formation.cv.id = this.cv.id

  //   //Stepper
  //   this.stepperFormBuilder();
  //   //Filter
  //   this.filteredOptions = this.firstFormGroup.get('langues').valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value => this._filter(value))
  //     );

  // }
  private _filter(value: Langues): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
   /**
     * stepperFormBuilder
     */
    private stepperFormBuilder() {
      console.log("Check this route: "+this.route.snapshot.paramMap.get('id'));

    this.firstFormGroup = this.fb.group({
      title: [this.cvToUpdate.title, Validators.required],
      lastName: [''],
      phoneNumer: [''],
      langues:[this.cvToUpdate.langues]
    });
    this.secondFormGroup = this.fb.group({
      titre: [this.cvToUpdate.title, Validators.required],
      employeur: ['', Validators.required],
      lieu: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      formation: this.fb.array([this.buildFormation()]),

    });

    // this.firstFormGroup.patchValue({
    //   title: this.cvToUpdate.title,
    //     lastName: this.cvToUpdate.experienceLevel,
    //     phoneNumer: this.cvToUpdate.experienceLevel,
    //     langues: this.cvToUpdate.langues
    //   });
    this.getFirstFormData();
    this.getSecondFormData();
    this.getThirdFormData();
    }
    dummyData(){
      this.cvService.upDate(this.cvToUpdate.id, this.cvToUpdate)
        .subscribe(data => {
          console.log("Current Data "+data.title)
          this.cvService.cv = data
          this.notify.openSnackBar('ENREGISTRE');
          this.router.navigate(['/cv']);
          //this.stepper.next()
        })
    }
    /**
     * getFirstFormData
     */
    private getFirstFormData() {
      this.getObjetFromForm()
      this.firstFormGroup.get('title').valueChanges.subscribe(value => this.cvToUpdate.title = value);
      this.firstFormGroup.get('langues').valueChanges.subscribe(value => this.cvToUpdate.langues = value);
    }
    getObjetFromForm() {
      //Both ways are working
      this.firstFormGroup.patchValue({
        title: this.cvToUpdate.title,
        lastName: this.cvToUpdate.experienceLevel,
        phoneNumer: this.cvToUpdate.experienceLevel,
        langues: this.cvToUpdate.langues
      })
      this.filteredOptions = this.firstFormGroup.get('langues').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      // const fcontrol = this.firstFormGroup.value;
      // console.log(fcontrol);
      // this.cvToUpdate.title = fcontrol.title;
      // this.cvToUpdate.langues = fcontrol.langues;
      // this.cvToUpdate.experienceLevel = fcontrol.lastName


    }

    /**
     * getSecondFormData
     */
    private getSecondFormData() {
      this.secondFormGroup.get('titre').valueChanges.subscribe(value => this.cvToUpdate.experience.titre = value)
      this.secondFormGroup.get('employeur').valueChanges.subscribe(value => this.cvToUpdate.experience.nomEmployeur = value)
      this.secondFormGroup.get('lieu').valueChanges.subscribe(value => this.cvToUpdate.experience.lieu = value)
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
      this.cvService.addCv(this.cvToUpdate).subscribe(data =>{
        this.cvToUpdate = data;
        this.notify.openSnackBar('ENREGISTRE')
      })
    }

    /**
     * addExperience
     */
    public addExperience() {
      this.cvService.upDate(this.cvToUpdate.id, this.cvToUpdate)
        .subscribe(() => {
          this.notify.openSnackBar('ENREGISTRE')
          //this.stepper.next()
        })
    }

    /**
     * addFormationList
     */
    public addFormationList() {
      if(this.cvToUpdate.id && this.studies.length - 1)
      this.formationService.addFormation(this.cvToUpdate.id, this.formation)
              .subscribe(()=>{
                this.notify.openSnackBar('ENREGISTRE')
               this.router.navigate(['/cv']);
              })
    }
    /**
     * fetchCvId
     */
    private fetchCvId(id: number) {
      this.cvService.getById(id).subscribe(data=>{
        console.log(data);
      });
    }

    private findCV(id: number){
    this.cvService.find(id).subscribe( data => {
      this.cvToUpdate = data;
        console.log(data)
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


    //Experment this solution
  //  private getCv(id: number): void {
  //     this.cvService.find(id)
  //       .subscribe({
  //         next: (cv: Cv) => this.displayCv(cv),
  //         error: err => this.errorMessage = err
  //       });
  //   }

    //DisplayCv
    // private displayCv(cv: Cv): void {
    //   if (this.firstFormGroup) {
    //     this.firstFormGroup.reset();
    //   }
    //   this.cvToUpdate = cv;

    //   if (this.cvToUpdate.id === 0) {
    //     this.addCv();
    //   } else {
    //     this.cvService.upDate(this.cvToUpdate.id, this.cvToUpdate);
    //   }

    //   // Update the data on the form
    //   this.firstFormGroup.patchValue({
    //     firstName: this.cvToUpdate.title,
    //       lastName: this.cvToUpdate.experienceLevel,
    //       phoneNumer: this.cvToUpdate.experienceLevel,
    //       langues: this.cvToUpdate.langues
    //   });
    //  // this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    // }

    //Update
    // updateCV(): void {
    //   if (this.firstFormGroup.valid) {
    //     if (this.firstFormGroup.dirty) {
    //       const p = { ...this.cvToUpdate, ...this.firstFormGroup.value };

    //       if (p.id === 0) {
    //         this.cvService.addCv(p)
    //           .subscribe({
    //             next: () => this.onSaveComplete(),
    //             error: err => this.errorMessage = err
    //           });
    //       } else {
    //         this.cvService.upDate(p.id,p)
    //           .subscribe({
    //             next: () => this.onSaveComplete(),
    //             error: err => this.errorMessage = err
    //           });
    //       }
    //     } else {
    //       this.onSaveComplete();
    //     }
    //   } else {
    //     this.errorMessage = 'Please correct the validation errors.';
    //   }
    // }

    // onSaveComplete(): void {
    //   // Reset the form to clear the flags
    //   this.firstFormGroup.reset();
    //   this.router.navigate(['/products']);
    // }

}
