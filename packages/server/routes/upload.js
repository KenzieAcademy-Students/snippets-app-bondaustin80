import express from 'express'
const router = express.Router()
import { upload } from '../middleware'
import { User } from '../models'

router.post("/:id", upload.single('myFile'), async (req, res) => {
   try {
       const { id } = req.params
       console.log(id)
       const userUpdate = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          profile_image: "/" + req.file.filename
        },
        {
          new: true,
        }
      )
       console.log(req.file)
       res.status(200).send("Upload successful")
   } catch (error) {
       res.status(500).send("Upload failed")
   }
})

module.exports = router