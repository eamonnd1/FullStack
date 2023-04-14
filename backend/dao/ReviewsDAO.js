import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            console.log("db conn")
            return
        }
        try {
            console.log("DB conn aft")
            reviews = await conn.db("reviews").collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({_id:new ObjectId(reviewId)})
        } catch (e) {
            console.error(`Getvreview err (reviewId: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set: {user: user, review: review}}
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return{error: e}
        }
    }

    static async deleteReview(reviewId,) {
        const deleteResponse = await reviews.deleteOne({
            _id:new ObjectId(reviewId)
        })

        return deleteResponse
    } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return {error: e}
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({
                movieId:parseInt(movieId)
            })
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get review (bymovieid): ${e}`)
            return {error: e}
        }
    }
}
