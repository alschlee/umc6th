export class ReviewDTO {
  constructor(storeId, storeName, rating, comment, photos, reviewPage, reviewButton) {
    this.storeId = storeId;
    this.storeName = storeName;
    this.rating = rating;
    this.comment = comment;
    this.photos = photos;
    this.reviewPage = reviewPage;
    this.reviewButton = reviewButton;
  }
}
