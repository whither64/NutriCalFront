const express = require ("express");
const nutrical = express.Router();
const db = require("../config/database");

nutrical.post("/", async (req,res,next) =>{
    const { nut_name, nut_height, nut_weight, nut_base_experience} = req.body;
    
    if(nut_name && nut_height && nut_weight && nut_base_experience) {
    
    let query = "INSERT INTO nutrical (nut_name, nut_height, nut_weight, nut_base_experience)";
    query += ` VALUES ('${nut_name}', ${nut_height}, ${nut_weight}, ${nut_base_experience})` ;
    
    const rows = await db.query(query);
    console.log(rows)
    if(rows.affectedRows == 1){
        return res.status(201).json({code: 201, message: "Receta insertada correctamente"});
    }

    return res.status(500).json({code:500, message:"Ocurrio un error"})
    }
    return res.status(500).json({code:500, message:"Campos incompletos"})
});

nutrical.delete("/:id([0-9]{1,3})", async (req,res,next) =>{
    const query = `DELETE FROM nutrical WHERE nut_id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code : 200 , message: "Receta borrada correctamente"})
    }
    return res.status(404).json({ code : 404 , message: "Receta no encontrada"})
});

nutrical.put("/:id([0-9]{1,3})", async (req,res,next) =>{
    const { nut_name, nut_height, nut_weight, nut_base_experience} = req.body;


    if(nut_name && nut_height && nut_weight && nut_base_experience) {
    
        let query = `UPDATE nutrical SET nut_name='${nut_name}', nut_height='${nut_height}',`;
        query += `nut_weight=${nut_weight},nut_base_experience=${nut_base_experience} WHERE nut_id=${req.params.id};`;

        
        const rows = await db.query(query);
        console.log(rows)
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Receta actualizada correctamente"});
        }
    
        return res.status(500).json({code:500, message:"Ocurrio un error"});
        }
        return res.status(500).json({code:500, message:"Campos incompletos"});
    });

nutrical.patch("/:id([0-9]{1,3})", async (req,res,next) =>{
    if(req.body.name){
        let query = `UPDATE nutrical SET nut_name='${req.body.nut_name}', WHERE nut_id='${req.params.id}',`;
        
        const rows = await db.query(query);
        console.log(rows)
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Receta actualizada correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrio un error"});;
        }
        return res.status(500).json({code:500, message:"Campos incompletos"});;

    });

nutrical.get("/", async (req,res,next) =>{
    const nutr = await db.query("SELECT * FROM nutrical");
    console.log(nutr);
    return res.status(200).json({code: 200, message: nutr});
});

nutrical.get("/:id([0-9]{1,3})", async (req,res,next) =>{
   const id = req.params.id -1 ;
   if(id >= 1 && id <= 722) {
    const nutr = await db.query("SELECT * FROM pokemon WHERE pok_id=" + id + ";");
    return res.status(200).json({code: 1, message: nutr});
   } else {
    return res.status(404).send({code: 404, message: "Receta no encontrada"})
   }
});