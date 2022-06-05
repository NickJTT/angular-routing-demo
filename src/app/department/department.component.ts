import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department',
  template: `
    <p>You've selected department with id equal to {{id}}</p>
    <a (click)='previous()'>Previous</a>
    <a (click)='next()'>Next</a>
    <div>
      <button (click)='overview()'>Overview</button>
      <button (click)='contact()'>Contact</button>
    </div>
    <router-outlet></router-outlet>
    <div>
      <button (click)='goToDepartments()'>Back</button>
    </div>
  `,
  styles: [
    `
      a {
        cursor: pointer;
        padding: 4px;
      }
    `
  ]
})
export class DepartmentComponent implements OnInit {
  public id: number = 0;
  public count: number = 0;

  constructor(private readonly route: ActivatedRoute,
  private readonly router: Router,
  private readonly departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    /*
    This approach doesn't let us navigate to this component from the same component, but
    with different URL parameter:

    this.id = parseInt(this.route.snapshot.paramMap.get('id') || undefined);
    */

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id') || '');
    });

    this.departmentsService.getDepartments().subscribe(data => this.count = data.length);
  }

  public previous() {
    if (this.id > 1) {
      /*
      Replacing absolute path navigation with Relative Navigation for a better flexibility.

      this.router.navigate(['/departments', this.id - 1]);
      */

      this.router.navigate(['../', this.id - 1], { relativeTo: this.route });
    }
  }

  public next() {
    if (this.id < this.count) {
      /*
      Replacing absolute path navigation with Relative Navigation for a better flexibility.

      this.router.navigate(['/departments', this.id + 1]);
      */

      this.router.navigate(['../', this.id + 1], { relativeTo: this.route });
    }
  }

  public goToDepartments() {
    /*
    Replacing absolute path navigation with Relative Navigation for a better flexibility.

    this.router.navigate(['/departments', { id: this.id }]);
    */

    this.router.navigate(['../', { id: this.id }], { relativeTo: this.route });
  }

  public overview() {
    this.router.navigate(['overview'], { relativeTo: this.route });
  }

  public contact() {
    this.router.navigate(['contact'], { relativeTo: this.route });
  }
}
