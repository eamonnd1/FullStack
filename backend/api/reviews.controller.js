import ReviewsDAO from "../dao/ReviewsDAO.js";

export default class reviewsCtrl {
    static async apiPostReview(req, res, next) {
        try{
            const movieId = parseInt(req.body.movieId_);
            const review = req.body.review;
            const user = req.body.user;
    
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetReview(req, res, next) {
        try{
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review) {
                res.status(404).json({error: "Not found @ getReview"})
                return
            }
            res.json(review)
        } catch (e) {
            console.log(`ctrl GetRev, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user 

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )

            var {error} = reviewResponse
            if (error) {
                res.status(400).json({error})
            }

            if (reviewResponse.modifiesCount === 0) {
                throw new Error(
                    "Unable to update review"
                )
            }

            res.json({status: "Success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            
        } catch (e) {
        res.status(500).json({error: e.message})
        }
    
    }

    static async apiGetReviewsByMovieId(req, res, next) {
        try {
            let id = req.params.id || {}
            let reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if(!reviews) {
                res.status(404).json({error: "Not found @ MovieByID"})
                return
            }
            res.json(reviews)
        }catch (e) {
            console.log(`ctrl revByMovId, ${e}`)
            res.status(500).json({error: e})
        }
    }
}

