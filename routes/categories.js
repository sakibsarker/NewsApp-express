const router=require("express").Router()
const Category=require("../model/category")

router.post("/",async(req,res)=>{
    const newCategory=new Category(req.body)
    try{
        const saveCategory=await newCategory.save()
        res.status(200).json(saveCategory)
        
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const category=await Category.findById(req.params.id)
        if(category.username===req.body.username){
            try{
                const updateCategory=await Category.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body
                    },
                    {
                        new:true
                    }

                )
                res.status(200).json(updateCategory)

            }catch(err){
                res.status(200).json(err)

            }
        }
        else{
            res.status(401).json('You can update only your category')
        }
        
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const cat=await Category.find()
        res.status(200).json(cat)

    }catch(error){
        res.status(500).json(error)
    }
})
 

module.exports=router