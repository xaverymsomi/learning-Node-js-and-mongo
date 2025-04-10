// @desc Get all Contacts
// @route Get /api/contacts as prefix
// @access is public for now

const getContacts = (req, res) => {
    res.status(200).json({ message: `Get all contacts`})
};

// @desc Create new Contact
// @route POST /api/contacts as prefix
// @access is public for now

const createContact = (req, res) => {
    const { name, email } = req.body; // Example of reading from the request body
    if (!name || !email) {
        res.status(400);
        throw new Error("Name and email are required");
        
        // return res.status(400).json({ error: "Name and email are required" });
    }
    // Logic to add the contact goes here...
    res.status(201).json({ message: "Contact added", contact: { name, email } });
};


// @desc Get Contact
// @route GET /api/contacts/:id as prefix
// @access is public for now

const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}`})
};

// @desc Update Contact
// @route PUT /api/contacts/:id as prefix
// @access is public for now

const updateContact = (req, res) => {
    res.status(201).json({ message: `Update contact for ${req.params.id}`})
};

// @desc delete Contact
// @route DELETE /api/contacts/:id as prefix
// @access is public for now

const deleteContact = (req, res) => {
    res.status(201).json({ message: `Delete contact for ${req.params.id}`})
};

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };