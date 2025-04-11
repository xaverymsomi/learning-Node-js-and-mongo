const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");
// @desc Get all Contacts
// @route Get /api/contacts as prefix
// @access is public for now

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
        res.status(200).json(contacts);
});

// @desc Create new Contact
// @route POST /api/contacts as prefix
// @access is public for now

const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body; // Example of reading from the request body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Name and email are required");
        // return res.status(400).json({ error: "Name and email are required" });
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });
    // Logic to add the contact goes here...
    res.status(201).json(contact);
});


// @desc Get Contact
// @route GET /api/contacts/:id as prefix
// @access is public for now


const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found"); // Fixed typo: "Contant" → "Contact"
    }

    res.status(200).json(contact);
});


// @desc Update Contact
// @route PUT /api/contacts/:id as prefix
// @access is public for now

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    // console.log(contact); // Fixed typo: console.Console → console.log

    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found"); // Fixed typo: "Contant" → "Contact"
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact); // 200 is more appropriate for updates than 201
});

// @desc delete Contact
// @route DELETE /api/contacts/:id as prefix
// @access is public for now

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found");
    }

    await contact.deleteOne(); // deletes only this specific contact

    res.status(200).json({
        message: "Contact deleted successfully",
        contact,
    });
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };