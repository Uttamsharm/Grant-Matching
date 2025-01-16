// server/controllers/grantController.js
const Grant = require("../models/Grant");

// @desc Get all grants
// @route GET /api/grants
// @access Public
const getAllGrants = async (req, res) => {
  try {
    const grants = await Grant.find();
    res.status(200).json(grants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Create a new grant
// @route POST /api/grants
// @access Private
const createGrant = async (req, res) => {
  const { name, fundingAmount, eligibility, applicationDeadline, description } = req.body;

  if (!name || !fundingAmount || !eligibility || !applicationDeadline || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const grant = new Grant({
      name,
      fundingAmount,
      eligibility,
      applicationDeadline,
      description,
      createdBy: req.user.id, // `req.user.id` is populated by authentication middleware
    });

    await grant.save();
    res.status(201).json(grant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Update a grant
// @route PUT /api/grants/:id
// @access Private
const updateGrant = async (req, res) => {
  try {
    const grant = await Grant.findById(req.params.id);

    if (!grant) {
      return res.status(404).json({ message: "Grant not found" });
    }

    if (grant.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const updatedGrant = await Grant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedGrant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Delete a grant
// @route DELETE /api/grants/:id
// @access Private
const deleteGrant = async (req, res) => {
  try {
    const grant = await Grant.findById(req.params.id);

    if (!grant) {
      return res.status(404).json({ message: "Grant not found" });
    }

    if (grant.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await grant.remove();
    res.status(200).json({ message: "Grant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllGrants,
  createGrant,
  updateGrant,
  deleteGrant,
};
