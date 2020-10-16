import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagsSeo } from '@shared/models/tags-seo.model';
import { User } from '@shared/models/user.model';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public user: User;
  url: string;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    private readonly service: UserService
  ) {}

  ngOnInit(): void {
    this.url="https://www.facebook.com/sharer/sharer.php?u="+window.location.href;
    const id = this.route.snapshot.params.id;
    this.get(id);
  }

  private async get(id: string) {
    try {
      this.service.get(id).subscribe((res) => {
        this.user = res;

        const seo: TagsSeo = {
          title: `${this.user.data.first_name} ${this.user.data.last_name}`,
          description: this.user.ad.text,
          image: this.user.data.avatar,
          url: '',
        };
        this.service.setSeo(seo);
      });
    } catch (error) {
      console.error(error);
    }
  }

  goBack() {
    this.location.back();
  }
}
