const express = require("express");

const multer = require("multer");

const path = require("path");

const Request = require("../models/Request");
const User = require("../models/User");

const sendEmail = require("../utils/sendEmail");

const router = express.Router();


// MULTER STORAGE
const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads");

    },

    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});

const upload = multer({ storage });



// CREATE REQUEST
router.post("/create", async (req,res)=>{

    try{

        const request = await Request.create(req.body);

        const user = await User.findOne({
            email:req.body.studentEmail
        });

        if(user && !user.firstRequestUsed){

            user.firstRequestUsed = true;

            await user.save();

        }


        // EMAIL TO ADMIN
        await sendEmail(

            process.env.EMAIL_USER,

            "New Notes Request",

            `
New Student Request

Student Name: ${request.studentName}

Email: ${request.studentEmail}

Subject: ${request.subject}

Notes Type: ${request.notesType}

Price: ₹${request.price}
            `
        );



        res.status(201).json({
            message:"Request Created Successfully",
            request
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// GET ALL REQUESTS
router.get("/all", async(req,res)=>{

    try{

        const requests = await Request.find()
        .sort({createdAt:-1});

        res.status(200).json(requests);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// UPLOAD PDF
router.put(
    "/upload/:id",
    upload.single("pdf"),

    async(req,res)=>{

        try{

            const request =
            await Request.findById(req.params.id);

            if(!request){

                return res.status(404).json({
                    message:"Request Not Found"
                });

            }

            request.pdf = req.file.path;

            request.status = "Completed";

            await request.save();


            // EMAIL TO STUDENT
            await sendEmail(

                request.studentEmail,

                "Your Notes Are Ready",

                `
Hello ${request.studentName},

Your requested notes are ready.

Subject: ${request.subject}

Notes Type: ${request.notesType}

Thank You For Using Quality Notes.
                `,

                req.file.path
            );



            res.status(200).json({
                message:"PDF Uploaded Successfully",
                request
            });

        }catch(error){

            res.status(500).json({
                message:error.message
            });

        }

    }

);

module.exports = router;