import { Component, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent implements OnInit {
  selectedImage: string | undefined;
  @Input()
  images: any;
  
  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImage = this.images[0];
    }
  }
  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }
  get hasImages() {
    return this.images?.length > 0;
  }
}
