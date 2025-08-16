// category.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {

  private allowedCategories = ['all', 'womens', 'mens', 'accessories'];
  private allowedSubcategories = ['tops', 'bottoms', 'shoes'];
  private pagesWithSubcategories = ['womens'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const category = route.paramMap.get('category');
    const subcategory = route.paramMap.get('subcategory');

    if (category && !this.allowedCategories.includes(category)) {
      return this.router.parseUrl('/shop/all'); // redirect to home (or /404)
    }

    if (subcategory && (!this.pagesWithSubcategories.includes(category) || !this.allowedSubcategories.includes(subcategory))) {
      return this.router.parseUrl('/shop/'+category);
    }

    return true;
  }
}
