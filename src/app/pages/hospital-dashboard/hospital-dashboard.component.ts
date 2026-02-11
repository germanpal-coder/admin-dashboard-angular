import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

import { HospitalService } from '../../services/hospital.service';
import { TreeNode } from '../../models/tree-node.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-hospital-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule
  ],
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.scss']
})
export class HospitalDashboardComponent implements OnInit {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.hospitalService.getHospital().subscribe(hospital => {
      this.dataSource.data = this.mapHospitalToTree(hospital);
    });
  }

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  onNodeClick(node: TreeNode): void {
    if (node.type === 'SECTOR') {
      console.log('Selected sector:', node);
      // en el próximo paso conectamos la tabla
    }
  }

  private mapHospitalToTree(hospital: Hospital): TreeNode[] {
    return [
      {
        id: hospital.id,
        name: hospital.name,
        type: 'HOSPITAL',
        children: hospital.buildings.map(building => ({
          id: building.id,
          name: building.name,
          type: 'BUILDING',
          children: building.floors.map(floor => ({
            id: floor.id,
            name: floor.name,
            type: 'FLOOR',
            children: floor.sectors.map(sector => ({
              id: sector.id,
              name: sector.name,
              type: 'SECTOR'
            }))
          }))
        }))
      }
    ];
  }
}
