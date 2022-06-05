import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../departments.service';
import { IDepartment } from '../models/department';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department-list',
  template: `
    <p>Department List:</p>
    <ul>
      <li [class.selected]='isSelected(department.id)' *ngFor='let department of departments' (click)='OnSelect(department.id)'>
        <span>{{department.id}}: {{department.name}}</span>
      </li>
    </ul>
  `,
  styles: [
    `
      ul li span {
        cursor:pointer
      }

      ul li.selected span {
        background-color: lightblue;
        color: darkblue;
      }
    `
  ]
})
export class DepartmentListComponent implements OnInit {
  public departments: IDepartment[] = [];
  public id: number = 0;

  constructor(private readonly departmentsService: DepartmentsService,
  private readonly router: Router,
  private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe(data => this.departments = data);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id') || '');
    });
  }

  public OnSelect(id: number) {
    /*
    Replacing absolute path navigation with Relative Navigation for a better flexibility.

    this.router.navigate(['/departments', id]);
    */

    this.router.navigate([id], { relativeTo: this.route });
  }

  public isSelected(id: number): boolean {
    return this.id === id;
  }
}
