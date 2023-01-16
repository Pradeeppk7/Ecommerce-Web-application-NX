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
  @Input()
  image: any;
  
  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImage = this.images[0];
    }
    else {
      this.selectedImage = this.image;
    }
  }
  changeSelectedImage(images: string) {
    this.selectedImage = images;
  }
  get hasImages() {
    return this.images?.length > 0;
  }
}
