import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")
        } catch (e) {
            console.error(`eUnable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(moveId, user, review) {
        try {
            const reviewDoc = {
                moveId: moveId,
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
            return await reviews.findOne({_id: ObjectId(reviewId)})
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
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
            _id: ObjectId(reviewId)
        })

        return deleteResponse
    } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return {error: e}
    }

    static async getReviewsByMovieId(moveId) {
        try {
            const cursor = await reviews.find({
                moveId:parseInt(moveId)
            })
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }
}
