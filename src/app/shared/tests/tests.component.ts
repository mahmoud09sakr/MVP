import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-tests',
  imports: [CarouselModule,NgClass,CommonModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent {
  testimonials = [
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
    {
      name: 'أحمد محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image: 'images/young-bearded-man-with-striped-shirt 2.png',
    },
    {
      name: 'حسناء محمد',
      review: 'تجربة رائعة لوريم إيبسوم هو نموذج',
      image:
        'images/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation 2.png',
    },
  ];



testOptions = [
  {
    breakpoint: '991px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
];

  get numVisibleSafe(): number {
    const max = 5;
    const count = this.testimonials?.length ?? 0;
    return count >= max ? max : count || 1;
  }

  get hasTestimonials(): boolean {
    return Array.isArray(this.testimonials) && this.testimonials.length > 0;
  }
}
