import sql from "../configs/db.js";


export const getUserCreations = async (req, res)=>{
    try {
        const {userId} = req.auth()

       const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

        res.json({ success: true, creations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getPublishedCreations = async (req, res)=>{
    try {

       const creations = await sql`
       SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

        res.json({ success: true, creations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const toggleLikeCreation = async (req, res)=>{
    try {
        const {userId} = req.auth()
        const {id} = req.body
        const userIdStr = userId.toString();

        // Atomic add/remove in a single UPDATE so two concurrent toggles can't race
        const [updated] = await sql`
            UPDATE creations
            SET likes = CASE
                WHEN ${userIdStr} = ANY(likes) THEN array_remove(likes, ${userIdStr})
                ELSE array_append(likes, ${userIdStr})
            END
            WHERE id = ${id}
            RETURNING likes
        `;

        if(!updated){
            return res.status(404).json({ success: false, message: "Creation not found" })
        }

        const message = updated.likes.includes(userIdStr) ? 'Creation Liked' : 'Creation Unliked'

        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}