

import Lists from "../models/ListModels.js";


const CreateList = async (req, res) => {

    const { id, name, price, discription } = req.body

    if (!id || !name || !price || !discription) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {

        const oldlist = await Lists.findOne({ id })
        if (oldlist) {
            return res.status(400).json({ message: "Change id this id used" })

        }
        const list = await Lists.create({
            id,
            name,
            price,
            discription
        })


        return res.status(201).json({ message: "list has been created" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateById = async (req, res) => {

    const { id, name, price, discription } = req.body

    if (!id || !name || !price || !discription) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {

        // const oldlist = await Lists.findOne({ id })
        // if (oldlist) {
            // return res.status(400).json({ message: "Change id this id used" })

        // }
        const list = await Lists.updateOne({id},{
            id,
            name,
            price,
            discription
        })


        return res.status(201).json({ message: "list has been updated" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const getAllList = async (req, res) => {
    try {

        const lists = await Lists.find({})

        return res.status(201).json({ message: "all lists", lists })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAllListByIds = async (req, res) => {

    const id =req.params.ids
    try {

        const lists = await Lists.findOne({id})

        return res.status(201).json({ message: "all lists", lists })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const deleteList = async (req, res) => {
    const {ids} = req.params
    console.log(ids)

    try {

        await Lists.deleteOne({ids})
        return res.status(200).json({ message: "list has been deleted" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}
const getSearchByname = async (req, res) => {
    try {
        
        // const lists = await Lists.find({name:req.params})
  const lists = await Lists.find({name:{$regex: req.params.name, $options: `$i`}})


        return res.status(201).json({ message: "all lists", lists })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export { CreateList, getAllList, deleteList,getSearchByname,getAllListByIds, updateById }