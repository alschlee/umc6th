export const ReviewDTO = (storeId, rating, comment, photos) => {
    return {
      storeId: storeId,
      rating: rating,
      comment: comment,
      photos: photos
    };
  };  