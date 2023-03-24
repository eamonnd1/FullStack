import express from "express";
import reviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/movie/:id").get(reviewsCtrl.apiGetReviews);
router.route("/new").post(reviewsCtrl.apiPostReview);
router.route("/:id")
        .get(reviewsCtrl.apiGetReviews)
        .put(reviewsCtrl.apiUpdateReview)
        .delete(reviewsCtrl.apiDeleteReview)

export default router;